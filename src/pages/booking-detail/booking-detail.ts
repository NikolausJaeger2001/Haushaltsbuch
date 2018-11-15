import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BookingProvider} from "../../providers/booking/booking";
import {BookingEntry} from "../../models/booking-entry";
import {AccountEntry} from "../../models/account-entry";
import {BookingPage} from "../booking/booking";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryEntry} from "../../models/category-entry";
import {AmountValidator} from "../../validators/amount";

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'booking-detail.html',
})

// Booking Detail, Change and Delete Page Class
export class BookingDetailPage {
  booking: BookingEntry;
  public bookingForm: FormGroup;
  public accountList: AccountEntry[];
  public categoryList: CategoryEntry[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private bookingProvider: BookingProvider,
              formBuilder: FormBuilder
  ) {
    // All Data are send by the caller
    this.booking = this.navParams.data.booking;
    this.accountList = this.navParams.data.accountList;
    this.categoryList = this.navParams.data.categoryList;

    // declare Booking FormGroup with Validators
    this.bookingForm = formBuilder.group({
      accountId: [
        this.booking.accountId,
        Validators.compose([Validators.required])
      ],
      categories: [
        this.booking.categories
      ],
      comment: [
        this.booking.comment,
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      amount: [
        this.booking.amount,
        Validators.compose([Validators.required, AmountValidator.isValid])
      ],
      date: [
        this.booking.date,
        Validators.compose([Validators.required])
      ]
    });
  }

  // save the Booking Changes to the Database
  saveBooking(){
    this.booking.accountId = this.bookingForm.value.accountId;
    this.booking.categories = this.bookingForm.value.categories;
    this.booking.comment = this.bookingForm.value.comment;
    this.booking.amount = this.bookingForm.value.amount;
    this.booking.date = this.bookingForm.value.date;

    this.bookingProvider
      .updateBookingEntry(this.booking)
      .then(() => {
        this.navCtrl.push(BookingPage);
      });
  }

  // remove a booking from the List and the Database
  deleteBooking(){
    this.bookingProvider
      .removeBookingEntry(this.booking)
      .then(() => {
        this.navCtrl.push(BookingPage);
      });
  }

}
