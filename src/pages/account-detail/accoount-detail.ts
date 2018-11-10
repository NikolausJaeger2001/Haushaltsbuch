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
export class AccountDetailPage {

  account: AccountEntry;
  backdrop: string;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              private accountProvider: AccountProvider,
  ) {
    this.account = this.navParams.data;
  }

  deleteAccount(account: AccountEntry){
    this.accountProvider.removeAccountEntry(account);
    this.navCtrl.push(AccountPage);
  }

}
