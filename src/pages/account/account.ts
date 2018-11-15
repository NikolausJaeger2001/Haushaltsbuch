import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountProvider} from "../../providers/account/account";
import {AccountEntry} from "../../models/account-entry";
import {AccountDetailPage} from "../account-detail/accoount-detail";

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})

// Category List and Insert Page Class
export class AccountPage {
  public accountForm: FormGroup;
  public accountList: AccountEntry[];
  public accountListFull: AccountEntry[];
  searchTerm: any = "";

  constructor(
    public navCtrl: NavController,
    public accountProvider: AccountProvider,
    formBuilder: FormBuilder
  ) {
    //declare Input Form and Validators
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
  }

  // Call read Data from Database after Inoic is ready
  ionViewDidLoad() {
    this.getAccountList();
  }

  //open details page of selected category
  goToAccountDetails(account: AccountEntry) {
    this.navCtrl.push(AccountDetailPage, account);
  }

  //apply filter to list
  setFilteredItems() {
    if (this.searchTerm.length > 0) {
      this.accountList = this.accountListFull.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    else {
      this.accountList = this.accountListFull;
    }
  }

  // get Account List from Database Provider
  getAccountList() {
    this.accountProvider.getAccountList().on("value", personListSnapshot => {
      this.accountListFull = [];
      personListSnapshot.forEach(personSnapshot => {
        this.accountListFull.push(
          new AccountEntry(
            personSnapshot.key,
            personSnapshot.val().name,
            personSnapshot.val().description)
        );
      });
      this.accountListFull = this.accountListFull.sort(
        function (a, b) {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        }
      );
      this.accountList = this.accountListFull;
    });
  }

  // inserts a new Account to List and Database
  createNewEntry() {
    this.accountProvider.addAccountEntry(
      new AccountEntry(
        '',
        this.accountForm.value.accountName,
        this.accountForm.value.accountDescription
      )
    ).then(() => {
      this.accountForm.reset();
    });
  }
}
