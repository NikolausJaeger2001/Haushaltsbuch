import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import {AccountEntry} from "../../models/account-entry";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountProvider {
  public accountListRef: firebase.database.Reference;
  user: any;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.accountListRef = firebase
          .database()
          .ref(`/user/${user.uid}/accountList`);
      }
    });
  }

  getAccountList() : firebase.database.Reference {
    return this.accountListRef;
  }

  addAccountEntry(account: AccountEntry): PromiseLike<any> {
    return this.accountListRef.push({
      id: account.id,
      name: account.name,
      description: account.description
    });
  }

  removeAccountEntry(account: AccountEntry) {
    return this.accountListRef.child(account.id).remove();
  }

}
