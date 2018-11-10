import { Component } from '@angular/core';
import {BookingPage} from "../booking/booking";
import {AccountPage} from "../account/account";
import {CategoryPage} from "../category/category";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AccountPage;
  tab2Root = BookingPage;
  tab3Root = CategoryPage;
  tab4Root = BookingPage;

  constructor() {

  }
}
