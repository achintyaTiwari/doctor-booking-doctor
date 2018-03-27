import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ManageCountryPage } from '../manage-country/manage-country';
import { ManageStatePage } from '../manage-state/manage-state';
import { ManageCityPage } from '../manage-city/manage-city';
import { ManageHospitalPage } from '../manage-hospital/manage-hospital';
import { ManageDoctorPage } from '../manage-doctor/manage-doctor';

@Component({
  selector: 'page-data-admin',
  templateUrl: 'data-admin.html',
})
export class DataAdminPage {
 manageCountry= ManageCountryPage;
  manageState= ManageStatePage;
  manageCity= ManageCityPage;
  manageHospital= ManageHospitalPage;
  manageDoctor= ManageDoctorPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataAdminPage');
  }

}
