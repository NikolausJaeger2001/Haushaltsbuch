import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {CategoryEntry} from "../../models/category-entry";
import {AccountProvider} from "../../providers/account/account";
import {CategoryPage} from "../category/category";

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {

  category: CategoryEntry;
  backdrop: string;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              private categoryProvider: CategoryProvider,
              public accountProvider: AccountProvider,
  ) {
    this.category = this.navParams.data;
  }

  deleteCategory(category: CategoryEntry){
    this.categoryProvider.removeCategoryEntry(category)
    this.navCtrl.push(CategoryPage);
  }

}
