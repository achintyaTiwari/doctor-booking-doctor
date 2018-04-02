import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DoctorMainPage } from '../doctor-main/doctor-main';
import { ManageDataService } from '../../services/manage-data/services.managedata'

@Component({
  selector: 'page-doctor-dashboard',
  templateUrl: 'doctor-dashboard.html',
})
export class DoctorDashboardPage {
	
  constructor(public navCtrl: NavController, public navParams: NavParams, private mnds: ManageDataService) {

  	this.mnds.currentPage = 'DoctorDashboardPage';
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorDashboardPage');
  }

}

