import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import {CategoryEntry} from "../../models/category-entry";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {
  public categoryListRef: firebase.database.Reference;
  user: any;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.categoryListRef = firebase
          .database()
          .ref(`/user/${user.uid}/categoryList`);
      }
    });
  }

  getCategoryList() : firebase.database.Reference {
    return this.categoryListRef;
  }

  addCategoryEntry(category: CategoryEntry): PromiseLike<any> {
    return this.categoryListRef.push({
      id: category.id,
      name: category.name,
    });
  }

  //remove the given entry from the database
  removeCategoryEntry(category: CategoryEntry) {
    return this.categoryListRef.child(category.id).remove();
  }

}
