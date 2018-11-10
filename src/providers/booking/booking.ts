import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BookingEntry} from "../../models/booking-entry";
import { AngularFireDatabase } from 'firebase/database';
import firebase from "firebase";

/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingProvider {
  public bookingListRef: firebase.database.Reference;
  user: any;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.bookingListRef = firebase
          .database()
          .ref(`/user/${user.uid}/bookingList`);
      }
    });
  }

  getBookingList() {
    return this.bookingListRef;
  }

  addBookingEntry(booking: BookingEntry): PromiseLike<any> {
    return this.bookingListRef.push({
      comment: booking.comment,
      date: booking.date,
      amount: booking.amount,
      accountId: booking.accountId,
      categories: booking.categories
    });
  }

  updateBookingEntry(booking: BookingEntry) {
    return this.bookingListRef.update(booking);
  }

  removeBookingEntry(booking: BookingEntry) {
    return this.bookingListRef.child(booking.id).remove();
  }

  filterItems(searchTerm) {
/*    return this.bookingListRef.filter((item) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });*/

    this.bookingListRef.orderByChild('comment').equalTo(searchTerm.toLowerCase());
    this.bookingListRef.once('value', function (snapshot) {
      console.log(snapshot.val()) //contains all results
    })

/*    //const requestRef = firebase.database().ref('request');
    this.bookingListRef.orderByChild('name')
      .equalTo(true)
      .once('value')
      .then(snapshot => snapshot.val())
      .then((data) => {data.name = })*/

    return this.bookingListRef;
  }
}
