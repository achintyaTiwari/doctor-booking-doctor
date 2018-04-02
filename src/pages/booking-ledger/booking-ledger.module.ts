import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingLedgerPage } from './booking-ledger';

@NgModule({
  declarations: [
    BookingLedgerPage,
  ],
  imports: [
    IonicPageModule.forChild(BookingLedgerPage),
  ],
})
export class BookingLedgerPageModule {}
