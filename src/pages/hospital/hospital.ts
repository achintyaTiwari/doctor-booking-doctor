import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DoctorPage } from '../doctor/doctor';
import { ManageDataService } from '../../services/manage-data/services.managedata';

@Component({
  selector: 'page-hospital',
  templateUrl: 'hospital.html',
})
export class HospitalPage {
  country:any;
  state:any;
  city:any;
  hospital:any;

  hospitals=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private mnds: ManageDataService ) {
   
   this.country = this.navParams.get('country');
   this.state = this.navParams.get('state');
   this.city = this.navParams.get('city');

   this.mnds.getHospital(this.country,this.state,this.city)
   .subscribe(data => {
     if(typeof data == 'string') {

      this.mnds.presentToast(data);

     }

     else {

        this.country = data.country;
        this.state = data.state;
        this.city = data.city;

        this.hospitals = data.hospitals;

     }

   });
   
  }

 findDoctor(hospitalfocus){
 
    this.hospital = hospitalfocus;
    this.navCtrl.push(DoctorPage,{"country":this.country,"state":this.state,"city":this.city, "hospital":this.hospital});
 
 }

}
