import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ManageDataService } from '../../services/manage-data/services.managedata';

@Component({
  selector: 'page-booking-ledger',
  templateUrl: 'booking-ledger.html',
})
export class BookingLedgerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mnds: ManageDataService ) {
  
  	this.mnds.currentPage = 'DoctorDashboardPage';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingLedgerPage');
  }

}
