import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AccountProvider} from "../../providers/account/account";
import {AccountEntry} from "../../models/account-entry";
import {AccountPage} from "../account/account";

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'account-detail.html',
})

// Account Detail Page Class
export class AccountDetailPage {

  account: AccountEntry;
  backdrop: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private accountProvider: AccountProvider,
  ) {
    this.account = this.navParams.data;
  }

  // Delete Account from List and Database
  // Existing Booking remains untouched
  deleteAccount(){
    console.log(this.account);
    this.accountProvider.removeAccountEntry(this.account);
    this.navCtrl.push(AccountPage);
  }

}
