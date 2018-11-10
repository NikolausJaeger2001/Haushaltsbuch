import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyApp} from "../../app/app.component";
import {AccountProvider} from "../../providers/account/account";
import {AccountEntry} from "../../models/account-entry";
import {AccountDetailPage} from "../account-detail/accoount-detail";

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  public accountForm: FormGroup;
  public accountList: AccountEntry[];
  searchTerm : any ="";

  constructor(
    public navCtrl: NavController,
    public accountProvider: AccountProvider,
    formBuilder: FormBuilder){

    this.accountForm = formBuilder.group({
      accountName: [
        '',
        Validators.compose([Validators.required])
      ],
      accountDescription: [
        '',
        Validators.compose([Validators.required])
      ]
    });
    MyApp
  }

  //open details page of selected category
  goToAccountDetails(account: AccountEntry) {
    this.navCtrl.push(AccountDetailPage, account);
  }

  //apply filter to list
  setFilteredItems() {
    if(this.searchTerm.length > 0)
    {
      this.accountList = this.accountList.filter(item =>item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      console.log(this.accountList);
    }
    else
    {
      //Reload data
      this.ionViewDidLoad();
    }
  }

  ionViewDidLoad() {
    this.accountProvider.getAccountList().on("value", personListSnapshot => {
      this.accountList = [];
      personListSnapshot.forEach(personSnapshot => {
        //console.log(personSnapshot.val().name + ' ' + personSnapshot.val().amount);
        this.accountList.push(
          new AccountEntry(
            personSnapshot.key,
            personSnapshot.val().name,
            personSnapshot.val().description)
        );
      });
      this.accountList = this.accountList.sort(
        function (a, b) {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        }
      );
      //console.log(this.accountList);
    });
  }

  createNewEntry() {
    if (!this.accountForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.accountForm.value}`
      );
    } else {
      this.accountProvider
        .addAccountEntry(
          new AccountEntry(
            '',
            this.accountForm.value.accountName,
            this.accountForm.value.accountDescription
           ))
        .then((newBooking) => {
          this.accountForm.reset();
        });
    }
  }
}
