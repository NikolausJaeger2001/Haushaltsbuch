import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BookingEntry} from "../../models/booking-entry";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MyApp} from "../../app/app.component";
import {BookingProvider} from "../../providers/booking/booking";
import {AccountProvider} from "../../providers/account/account";
import {AccountEntry} from "../../models/account-entry";
import {BookingDetailPage} from "../booking-detail/booking-detail";
import {CategoryProvider} from "../../providers/category/category";
import {CategoryEntry} from "../../models/category-entry";

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})
export class BookingPage {
  public bookingForm: FormGroup;
  public bookingList: BookingEntry[];
  public accountList: AccountEntry[];
  public categoryList: CategoryEntry[];
  searchTerm : any ="";

  constructor(
    public navCtrl: NavController,
    public bookingProvider: BookingProvider,
    public accountProvider: AccountProvider,
    public categoryProvider: CategoryProvider,
    formBuilder: FormBuilder) {

    //get accountList
    //this.getAccountList();

    //get cateoryList
    //this.getCategoryList();

    this.bookingForm = formBuilder.group({
      comment: [
        '',
        Validators.compose([Validators.required])
      ],
      date: [
        '',
        Validators.compose([Validators.required])
      ],
      amount: [
        '',
        Validators.compose([Validators.required])
      ],
      accountId: [
        '',
        Validators.compose([Validators.required])
      ]
    });
    //MyApp
  }

  //load accounts from database
  getAccountList() {
    this.accountProvider.getAccountList().on("value", accountListSnapshot => {
      this.accountList = [];
      accountListSnapshot.forEach(as => {
        this.accountList.push(
          new AccountEntry(
            as.key,
            as.val().name,
            as.val().description)
        );
      });
      this.accountList = this.accountList.sort(
        function (a, b) {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        }
      );
    });
  }

  //load categories from database
  getCategoryList() {
    this.categoryProvider.getCategoryList().on("value", categoryListSnapshot => {
      this.categoryList = [];
      categoryListSnapshot.forEach(cs => {
        this.categoryList.push(
          new CategoryEntry(
            cs.key,
            cs.val().name)
        );
      });
      this.categoryList = this.categoryList.sort(
        function (a, b) {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        }
      );
    });
  }

  //load list on load
  ionViewDidLoad() {
    this.getAccountList();
    this.getCategoryList();
    this.bookingProvider.getBookingList().on("value", bookingListSnapshot => {
      this.bookingList = [];
      bookingListSnapshot.forEach(bs => {
        this.bookingList.push(
          new BookingEntry(
            bs.key,
            bs.val().accountId,
            bs.val().date,
            bs.val().comment,
            bs.val().amount,
            bs.val().categories
            )
        );
      });
      this.bookingList = this.bookingList.sort(
        function (a, b) {
          if (a.date < b.date) return 1;
          if (a.date > b.date) return -1;
          return 0;
        }
      );
    });
  }

  //open details page of selected booking
  goToBookingDetails(booking: BookingEntry) {
    this.navCtrl.push(BookingDetailPage, booking);
  }

  //apply filter to list
  setFilteredItems() {
    if(this.searchTerm.length > 0)
    {
      this.bookingList = this.bookingList.filter(item =>item.comment.toLowerCase().includes(this.searchTerm.toLowerCase())
                                                                 || item.accountId.toLowerCase().includes(this.searchTerm.toLowerCase())
                                                                 || item.date.toLowerCase().includes(this.searchTerm.toLowerCase()));
      console.log(this.bookingList);
    }
    else
    {
      //Reload data
      this.ionViewDidLoad();
    }
  }

  //create new BookingEntry
  //insert new entry into firebase database
  onSubmit(myForm: NgForm) {
    this.bookingProvider.addBookingEntry(
      new BookingEntry(
        '',
        myForm.form.controls.accountId.value,
        myForm.form.controls.date.value,
        myForm.form.controls.comment.value,
        myForm.form.controls.amount.value,
        []
        //myForm.form.controls.categories.value
      )
    );

    console.log(myForm);
  }
}
