import { Injectable } from '@angular/core';
import {BookingEntry} from "../../models/booking-entry";
import firebase from "firebase/app";


// this class is handling the bookings in the firebase database
@Injectable()
export class BookingProvider {
  public bookingListRef: firebase.database.Reference;

  // this constructor adds a function for updating local bookingListReference to the firebase changeAuthEvent
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.bookingListRef = firebase.database().ref(`/user/${user.uid}/bookingList`);
      }
    });
  }

  // this function returns the bookingList
  getBookingList() {
    return this.bookingListRef;
  }

  // this function adds a Booking to the bookingList and stores it to the database
  addBookingEntry(booking: BookingEntry): PromiseLike<any> {
    return this.bookingListRef.push({
      comment: booking.comment,
      date: booking.date,
      amount: booking.amount,
      accountId: booking.accountId,
      categories: booking.categories
    });
  }

  // this function updates a Booking to the bookingList and stores it to the database
  updateBookingEntry(booking: BookingEntry): PromiseLike<any> {
    return this.bookingListRef.child(booking.key).set({
      comment: booking.comment,
      date: booking.date,
      amount: booking.amount,
      accountId: booking.accountId,
      categories: booking.categories
    });
  }

  // this function delete a Booking from the bookingList and deletes it on the database
  removeBookingEntry(booking: BookingEntry): PromiseLike<any> {
    return this.bookingListRef.child(booking.key).remove();
  }
}
