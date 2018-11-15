import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BookingEntry} from "../../models/booking-entry";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookingProvider} from "../../providers/booking/booking";
import {AccountProvider} from "../../providers/account/account";
import {AccountEntry} from "../../models/account-entry";
import {BookingDetailPage} from "../booking-detail/booking-detail";
import {CategoryProvider} from "../../providers/category/category";
import {CategoryEntry} from "../../models/category-entry";
import {AmountValidator} from "../../validators/amount";

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})

// Booking Page for Insert New and list Existing
export class BookingPage {
  public bookingForm: FormGroup;
  public bookingListFull: BookingEntry[];
  public bookingList: BookingEntry[];
  public accountList: AccountEntry[];
  public categoryList: CategoryEntry[];
  searchTerm: any = "";

  constructor(
    public navCtrl: NavController,
    public bookingProvider: BookingProvider,
    public accountProvider: AccountProvider,
    public categoryProvider: CategoryProvider,
    formBuilder: FormBuilder
  ) {
    // Declare Booking Form Group with Validators
    this.bookingForm = formBuilder.group({
      accountId: [
        '',
        Validators.compose([Validators.required])
      ],
      categories: [
        ''
      ],
      comment: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)] )
      ],
      amount: [
        '',
        Validators.compose([Validators.required, AmountValidator.isValid])
      ],
      date: [
        new Date().toISOString(),
        Validators.compose([Validators.required])
      ]
    });
  }

  //load list on load
  ionViewDidLoad() {
    this.getAccountList();
    this.getCategoryList();
    this.getBookingList();
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
  };

  //load Bookings from database
  getBookingList() {
    this.bookingProvider.getBookingList().on("value", bookingListSnapshot => {
      this.bookingListFull = [];
      bookingListSnapshot.forEach(bs => {
        this.bookingListFull.push(
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
      this.bookingListFull = this.bookingListFull.sort(
        function (a, b) {
          if (a.date < b.date) return 1;
          if (a.date > b.date) return -1;
          return 0;
        }
      );
      this.bookingList = this.bookingListFull;
    });
  }

  //open details page of selected booking
  goToBookingDetails(booking: BookingEntry) {
    this.navCtrl.push(BookingDetailPage,
      {
        booking: booking,
        accountList: this.accountList,
        categoryList: this.categoryList
      });
  }

  //apply filter to list
  setFilteredItems() {
    if (this.searchTerm.length > 0) {
      this.bookingList = this.bookingListFull
        .filter(booking => booking.containsText(this.searchTerm));
    }
    else {
      this.bookingList = this.bookingListFull;
    }
  }

  //create new BookingEntry
  //insert new entry into firebase database
  insertBookingEntry() {
    this.bookingProvider.addBookingEntry(
      new BookingEntry(
        '',
        this.bookingForm.value.accountId,
        this.bookingForm.value.date,
        this.bookingForm.value.comment,
        this.bookingForm.value.amount,
        this.bookingForm.value.categories
      )
    ).then(() => {
      this.bookingForm.reset();
      this.bookingForm.value.date = new Date().toISOString();
    });
  }
}
