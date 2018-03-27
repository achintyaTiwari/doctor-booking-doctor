import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ManageDataService {

  currentPage = 'DoctorMainPage';

	constructor(public http:HttpClient,public toastCtrl: ToastController) {

	}


  getCountry(){
  	
    return this.http.get('http://159.89.164.22/users/countries');

    }


  getState(country){

  	return this.http.get('http://159.89.164.22/users/states?country='+country);
  	

    }


  getCity(country,state){
     return this.http.get('http://159.89.164.22/users/cities?country='+country+'&state='+state);
      
    }	



  getHospital(country,state,city){
     
    return this.http.get('http://159.89.164.22/users/hospitals?country='+country+'&state='+state+'&city='+city);
      
  }

  getDoctor(country,state,city,hospital){

    return this.http.get('http://159.89.164.22/users/doctors?country='+country+'&state='+state+'&city='+city+'&hospital='+hospital);
      
    }

  getLedger(country,state,city,hospital,doctor,date){
    
   return this.http.get('http://159.89.164.22/users/ledger?country='+country+'&state='+state+'&city='+city+'&hospital='+hospital+'&doctor='+doctor+'&date='+date);
      
  }


  presentToast(message) {
      let toast:any;
      
      toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
      
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
   }


}

