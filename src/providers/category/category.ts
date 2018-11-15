import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import {CategoryEntry} from "../../models/category-entry";


// this class is handling the categoriex in the firebase database
@Injectable()
export class CategoryProvider {
  public categoryListRef: firebase.database.Reference;

  // this constructor adds a function for updating local bookingListReference to the firebase changeAuthEvent
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.categoryListRef = firebase.database().ref(`/user/${user.uid}/categoryList`);
      }
    });
  }

  // this function returns the categoryList
  getCategoryList() : firebase.database.Reference {
    return this.categoryListRef;
  }

  // this function adds a Category to the categoryList and stores it to the database
  addCategoryEntry(category: CategoryEntry): PromiseLike<any> {
    return this.categoryListRef.push({
      name: category.name
    });
  }

  // this function updates a Category to the categoryList and stores it to the database
  updateCategoryEntry(category: CategoryEntry): PromiseLike<any> {
    return this.categoryListRef.child(category.key).set({
      name: category.name
    });
  }

  // this function delete a Category from the categoryList and deletes it on the database
  removeCategoryEntry(category: CategoryEntry): PromiseLike<any> {
    return this.categoryListRef.child(category.key).remove();
  }

}
