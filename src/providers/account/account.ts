import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import {AccountEntry} from "../../models/account-entry";


// this class is handling the accounts in the firebase database
@Injectable()
export class AccountProvider {
  public accountListRef: firebase.database.Reference;

  // this constructor adds a function for updating local accountListReference to the firebase changeAuthEvent
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.accountListRef = firebase.database().ref(`/user/${user.uid}/accountList`);
      }
    });
  }

  // this function returns the accountList
  getAccountList() : firebase.database.Reference {
    return this.accountListRef;
  }

  // this function adds a account to the accountList and stores it to the database
  addAccountEntry(account: AccountEntry): PromiseLike<any> {
    return this.accountListRef.push({
      name: account.name,
      description: account.description
    });
  }

  // this function updates a account to the accountList and stores it to the database
  updateAccountEntry(account: AccountEntry): PromiseLike<any> {
    return this.accountListRef.child(account.key).set({
      name: account.name,
      description: account.description
    });
  }

  // this function deletes a account from the accountList and deletes it on the database
  removeAccountEntry(account: AccountEntry): PromiseLike<any>  {
    return this.accountListRef.child(account.key).remove();
  }
}
