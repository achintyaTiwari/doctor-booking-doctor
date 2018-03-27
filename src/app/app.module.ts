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
import { UserService } from '../services/doctor-services/services.hospital';
import { CityPage } from '../pages/city/city';
import { HospitalPage } from '../pages/hospital/hospital';
import { DoctorPage } from '../pages/doctor/doctor';
import { PatientPage } from '../pages/patient/patient';
import { DataAdminPage } from '../pages/data-admin/data-admin';
import { ManageCountryPage } from '../pages/manage-country/manage-country';
import { ManageStatePage } from '../pages/manage-state/manage-state';
import { ManageCityPage } from '../pages/manage-city/manage-city';
import { ManageHospitalPage } from '../pages/manage-hospital/manage-hospital';
import { ManageDoctorPage } from '../pages/manage-doctor/manage-doctor';
import { ManageDataService } from '../services/manage-data/services.managedata';
import { DatePickerModule } from 'ionic3-datepicker';
import { Availability } from '../modal/availability/availability';
import { DoctorDashboardPage } from '../pages/doctor-dashboard/doctor-dashboard';
import { DoctorMainPage } from '../pages/doctor-main/doctor-main';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';


const config: SocketIoConfig = { url: 'http://159.89.164.22:80' , options: {} };

@NgModule({
  declarations: [
    MyApp,
    AddNewPatient,
    EditPatient,
    CityPage,
    HospitalPage,
    DoctorPage,
    PatientPage,
    LedgerPage,
    DataAdminPage,
    ManageStatePage,
    ManageCityPage,
    ManageHospitalPage,
    ManageDoctorPage,
    ManageCountryPage,
    Availability,
    DoctorDashboardPage,
    DoctorMainPage
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
    CityPage,
    HospitalPage,
    DoctorPage,
    PatientPage,
    LedgerPage,
    DataAdminPage,
    ManageStatePage,
    ManageCityPage,
    ManageHospitalPage,
    ManageDoctorPage,
    ManageCountryPage,
    Availability,
    DoctorDashboardPage,
    DoctorMainPage     
     
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    ManageDataService
  ]
})
export class AppModule {}
