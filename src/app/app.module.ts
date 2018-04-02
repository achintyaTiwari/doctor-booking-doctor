import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { LedgerPage } from '../pages/ledger/ledger';
import { AddNewPatient } from '../modal/add-new-patient/AddNewPatient';
import { EditPatient } from '../modal/edit-patient/EditPatient';
import { ManageDataService } from '../services/manage-data/services.managedata';
import { DatePickerModule } from 'ionic3-datepicker';
import { Availability } from '../modal/availability/availability';
import { DoctorDashboardPage } from '../pages/doctor-dashboard/doctor-dashboard';
import { DoctorMainPage } from '../pages/doctor-main/doctor-main';
import { BookingLedgerPage } from '../pages/booking-ledger/booking-ledger';
import { SettingsPage } from '../pages/settings/settings';
import { ProfilePage } from '../pages/profile/profile';
import { InitialProfilePage } '../pages/initial-profile/initial-profile';
import { SupportPage } from '../pages/support/support';
import { TermsPage } from '../pages/terms/terms';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';


const config: SocketIoConfig = { url: 'http://159.89.164.22:80' , options: {} };

@NgModule({
  declarations: [
    MyApp,
    AddNewPatient,
    EditPatient,
    LedgerPage,
    Availability,
    DoctorDashboardPage,
    DoctorMainPage,
    BookingLedgerPage,
    SettingsPage,
    ProfilePage,
    InitialProfilePage,
    SupportPage,
    TermsPage

  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    DatePickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddNewPatient,
    EditPatient,
    LedgerPage,
    Availability,
    DoctorDashboardPage,
    DoctorMainPage,
    BookingLedgerPage,
    SettingsPage,
    ProfilePage,
    InitialProfilePage,    
    SupportPage,
    TermsPage             
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ManageDataService
  ]
})
export class AppModule {}
