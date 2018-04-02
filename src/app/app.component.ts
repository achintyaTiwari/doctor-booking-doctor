import { Component, Injectable, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DoctorMainPage } from '../pages/doctor-main/doctor-main';
import { DoctorDashboardPage } from '../pages/doctor-dashboard/doctor-dashboard';
import { BookingLedgerPage } from '../pages/booking-ledger/booking-ledger';
import { SettingsPage } from '../pages/settings/settings';
import { ProfilePage } from '../pages/profile/profile';
import { InitialProfilePage } '../pages/initial-profile/initial-profile';
import { SupportPage } from '../pages/support/support';

import { ManageDataService } from '../services/manage-data/services.managedata';

@Component({
  templateUrl: 'app.html'
})


export class MyApp {

  @ViewChild('nav') navCtrl: NavController;

  rootPage:any = DoctorMainPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private mnds: ManageDataService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });  

  }

  home() {

    this.navCtrl.setRoot(DoctorDashboardPage);

  }

  bookingLedger() {

    this.navCtrl.setRoot(BookingLedgerPage);

  }

  settings() {

    this.navCtrl.setRoot(SettingsPage);

  }

  profile() {

    this.navCtrl.setRoot(ProfilePage);

  }

  initialProfile() {

    this.navCtrl.setRoot(InitialProfilePage);

  }

  support() {

    this.navCtrl.setRoot(SupportPage);
  
  }

}