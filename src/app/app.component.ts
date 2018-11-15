import {Component} from '@angular/core';
import {Config, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import fireBaseApp from 'firebase/app';
import {fireBaseConfig} from "./credentials";
import {LoginPage} from "../pages/login/login";
import * as moment from "moment";
import 'moment/src/locale/de-at';
import {TabsPage} from "../pages/tabs/tabs";

moment.locale('de-at');

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any;

  constructor(
    config: Config,
    platform: Platform,
    statusBar: StatusBar) {
    fireBaseApp.initializeApp(fireBaseConfig);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
    });


    const unsubscribe = fireBaseApp.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else {
        this.rootPage = TabsPage;
        unsubscribe();
      }
    });
  }
}

