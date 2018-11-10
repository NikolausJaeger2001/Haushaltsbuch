import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {BookingProvider} from "../../providers/booking/booking";
import {BookingEntry} from "../../models/booking-entry";
import {AccountEntry} from "../../models/account-entry";
import {AccountProvider} from "../../providers/account/account";
import {BookingPage} from "../booking/booking";

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
export class BookingDetailPage {

  booking: BookingEntry;
  public accountList: AccountEntry[];
  backdrop: string;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              private bookingProvider: BookingProvider,
              public accountProvider: AccountProvider,
  ) {
    this.getAccountList();
    this.booking = this.navParams.data;
  }

  getAccountList() {
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

  saveBooking(booking: BookingEntry){
    this.bookingProvider.updateBookingEntry(booking);
    this.navCtrl.push(BookingPage);
  }

  deleteBooking(booking: BookingEntry){
    this.bookingProvider.removeBookingEntry(booking)
    this.navCtrl.push(BookingPage);
  }

}
