import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HospitalPage } from '../hospital/hospital';
import { LedgerPage } from '../ledger/ledger';
import { DataAdminPage } from '../data-admin/data-admin';
import { ManageDataService } from '../../services/manage-data/services.managedata';
import { DoctorDashboardPage } from '../doctor-dashboard/doctor-dashboard';

@Component({
  selector: 'page-city',
  templateUrl: 'city.html',
})
export class CityPage {


	ledger = LedgerPage;
  dataAdmin = DataAdminPage;
  doctorDashboard =DoctorDashboardPage;
  country="";
  state="";
  city="";
  countries=[];
  states=[];
  cities=[];
  hospitals=[];

  
  constructor(public navCtrl: NavController, public navParams: NavParams,private mnds: ManageDataService) {
   
   this.mnds.getCountry()
    .subscribe((data) => {
      if(typeof(data) == 'string'){

        this.mnds.presentToast(data);

      }

      else {

        this.countries = data.countries;
      }
    });


    this.mnds.currentPage = 'CityPage';

  }

  findState(countryfocus){
    this.country = countryfocus;
    console.log(countryfocus);
    this.states=[];
    this.cities=[];
    this.city ='';
    this.state='';
    this.mnds.getState(this.country)
    .subscribe((data)=>{
       if(typeof(data)=="string"){
          this.mnds.presentToast(data);
       }
       else{
          this.country = data.country;
          this.states = data.states;
          console.log("states:",this.states);
       }
    });
  
  }

  findCity(statefocus){
     this.state= statefocus;
     this.city = '';
     this.cities= [];

     console.log(statefocus);
     this.mnds.getCity(this.country,this.state)
      .subscribe((data)=>{
         if(typeof(data)=="string"){
            this.mnds.presentToast(data);
         }
         else{
            this.country = data.country;
            this.state = data.state;
            this.cities = data.cities;
            console.log("cities:",this.cities);
         }
      });
  
  }

  findHospital(cityfocus) {

    this.city = cityfocus;
    console.log(cityfocus);
    this.navCtrl.push(HospitalPage, {"country":this.country,"state":this.state,"city":this.city})
  }

}