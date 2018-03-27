import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DoctorMainPage } from '../doctor-main/doctor-main';

@Component({
  selector: 'page-doctor-dashboard',
  templateUrl: 'doctor-dashboard.html',
})
export class DoctorDashboardPage {
	
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorDashboardPage');
  }

}
