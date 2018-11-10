import {Component} from '@angular/core';
import {Config, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
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
  public myConfig: Config;

  constructor(
    config: Config,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen) {
    this.myConfig = config;
    fireBaseApp.initializeApp(fireBaseConfig);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
/*
      config.set('monthNames', moment.months())
      config.set('monthShortNames', moment.monthsShort())
      config.set('dayNames', moment.weekdays())
      config.set('dayShortNames', moment.weekdaysShort())
*/
      statusBar.styleDefault();
      splashScreen.hide();
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

