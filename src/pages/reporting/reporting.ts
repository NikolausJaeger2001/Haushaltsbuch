import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookingEntry} from "../../models/booking-entry";
import {AccountEntry} from "../../models/account-entry";
import {CategoryEntry} from "../../models/category-entry";
import {BookingProvider} from "../../providers/booking/booking";
import {AccountProvider} from "../../providers/account/account";
import {CategoryProvider} from "../../providers/category/category";

/**
 * Generated class for the ReportingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reporting',
  templateUrl: 'reporting.html',
})
export class ReportingPage {
  public reportFilterForm: FormGroup;
  public bookingListFull: BookingEntry[];
  public accountList: AccountEntry[];
  public categoryList: CategoryEntry[];
  searchTerm: any = "";

  constructor(
    public bookingProvider: BookingProvider,
    public accountProvider: AccountProvider,
    public categoryProvider: CategoryProvider,
    formBuilder: FormBuilder
  ) {
    // Declare Booking Form Group with Validators
    this.reportFilterForm = formBuilder.group({
      accountId: [
        '',
        Validators.compose([Validators.required])
      ],
      categories: [
        ''
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
      //this.bookingList = this.bookingListFull;
    });
  }
}
