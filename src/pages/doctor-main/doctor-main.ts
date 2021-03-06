import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DoctorDashboardPage } from '../doctor-dashboard/doctor-dashboard';
import { ManageDataService } from '../../services/manage-data/services.managedata';

@Component({
  selector: 'page-doctor-main',
  templateUrl: 'doctor-main.html',
})
export class DoctorMainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mnds: ManageDataService) {
  this.mnds.currentPage = 'DoctorMainPage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorMainPage');
  }

  login() {
  	this.navCtrl.setRoot(DoctorDashboardPage);
  }

}
