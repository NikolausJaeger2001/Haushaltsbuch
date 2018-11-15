import { Component } from '@angular/core';
import {BookingPage} from "../booking/booking";
import {AccountPage} from "../account/account";
import {CategoryPage} from "../category/category";



@Component({
  templateUrl: 'tabs.html'
})
// Basic Tab Handling
export class TabsPage {

  tab1Root = BookingPage;
  tab2Root = AccountPage;
  tab3Root = CategoryPage;
  tab4Root = BookingPage;

  constructor() {

  }
}
