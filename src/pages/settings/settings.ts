import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ManageDataService } from '../../services/manage-data/services.managedata';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mnds: ManageDataService) {
  this.mnds.currentPage = 'SettingsPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
