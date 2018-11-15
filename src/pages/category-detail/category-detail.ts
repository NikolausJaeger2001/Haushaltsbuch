import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {CategoryEntry} from "../../models/category-entry";
import {AccountProvider} from "../../providers/account/account";
import {CategoryPage} from "../category/category";



@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'category-detail.html',
})

// Category Detail Page Class
export class CategoryDetailPage {
  category: CategoryEntry;
  backdrop: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private categoryProvider: CategoryProvider
  ) {
    this.category = this.navParams.data;
  }

  // Delete Category from List and Database
  // Existing Booking remains untouched
  deleteCategory(category: CategoryEntry){
    this.categoryProvider.removeCategoryEntry(category)
    this.navCtrl.push(CategoryPage);
  }

}
