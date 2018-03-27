import { Component, Injectable, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DoctorMainPage } from '../pages/doctor-main/doctor-main';
import { DoctorDashboardPage } from '../pages/doctor-dashboard/doctor-dashboard';
import { ManageDataService } from '../services/manage-data/services.managedata';

@Component({
  templateUrl: 'app.html'
})


export class MyApp {

  @ViewChild('nav')navCtrl: NavController; 

  rootPage:any = DoctorMainPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private mnds: ManageDataService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });  

  }

  getNav() {
    console.log(this.navCtrl.getActive().name);
    return this.navCtrl.getActive().name;
  }

}

