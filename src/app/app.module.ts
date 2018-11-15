import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import {HttpClientModule} from "@angular/common/http";
import {LoginPageModule} from "../pages/login/login.module";
import {SignupPageModule} from "../pages/signup/signup.module";
import {ResetPasswordPageModule} from "../pages/reset-password/reset-password.module";
import { registerLocaleData } from '@angular/common';
import localeDeAt from '@angular/common/locales/de-AT';
import localeDeAtExtra from '@angular/common/locales/extra/de-AT';
import { BookingProvider } from '../providers/booking/booking';
import {BookingPage} from "../pages/booking/booking";
import {TabsPage} from "../pages/tabs/tabs";
import {AccountPage} from "../pages/account/account";
import {AccountProvider} from "../providers/account/account";
import {BookingDetailPage} from "../pages/booking-detail/booking-detail";
import {CategoryProvider} from "../providers/category/category";
import {CategoryPage} from "../pages/category/category";
import {CategoryDetailPage} from "../pages/category-detail/category-detail";
import {AccountDetailPage} from "../pages/account-detail/accoount-detail";

registerLocaleData(localeDeAt, localeDeAtExtra);

@NgModule({
  declarations: [
    MyApp,
    BookingPage,
    AccountPage,
    CategoryPage,
    TabsPage,
    BookingDetailPage,
    CategoryDetailPage,
    AccountDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    SignupPageModule,
    ResetPasswordPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BookingPage,
    AccountPage,
    CategoryPage,
    TabsPage,
    BookingDetailPage,
    CategoryDetailPage,
    AccountDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    {
      provide: LOCALE_ID,
      useValue: 'de-AT'
    },
    BookingProvider,
    AccountProvider,
    CategoryProvider
  ]
})
export class AppModule {}
