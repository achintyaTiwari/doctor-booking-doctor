import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CityPage } from '../city/city';
import { DoctorDashboardPage } from '../doctor-dashboard/doctor-dashboard';
import { DataAdminPage } from '../data-admin/data-admin';


@Component({
  selector: 'page-doctor-main',
  templateUrl: 'doctor-main.html',
})
export class DoctorMainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorMainPage');
  }

  doctor() {
  	this.navCtrl.setRoot(DoctorDashboardPage);
  }

  admin() {
  	this.navCtrl.setRoot(DataAdminPage);
  }

  user() {
  	this.navCtrl.setRoot(CityPage);
  }
  
}
