import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ManageDataService } from '../../services/manage-data/services.managedata';

@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mnds: ManageDataService) {
 
  	this.mnds.currentPage = 'SupportPage';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');
  }

}
