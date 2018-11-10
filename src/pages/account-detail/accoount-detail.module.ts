import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountDetailPage } from './accoount-detail';

@NgModule({
  declarations: [
    AccountDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountDetailPage),
  ],
})
export class AccountDetailPageModule {}
