import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ManageDataService } from '../../services/manage-data/services.managedata';

@Component({
  selector: 'page-manage-hospital',
  templateUrl: 'manage-hospital.html',
})
export class ManageHospitalPage {
 newHospital:Observable<any>;
  country="";
  state="";
  city="";
  countries=[];
  states=[];
  cities=[];
  hospitals=[];
  
  hospitalForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,private mnds:ManageDataService,private alertCtrl:AlertController){
 	this.initializeForm();

  	this.mnds.getCountry()
  	.subscribe((data) => {
  		if(typeof(data) == 'string'){

  			this.mnds.presentToast(data);

  		}

  		else {

  			this.countries = data.countries;
  		}
  	});

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageCityPage');
  }

initializeForm(){

   this.hospitalForm = new FormGroup({
   	"country": new FormControl(this.country,Validators.required),
   	"state": new FormControl(this.state,Validators.required),
   	"city" :  new FormControl(this.city,Validators.required),
   	"hospitals": new FormArray([])
   });

  for (let i= 0; i<this.hospitals.length; i++){
  		(<FormArray>this.hospitalForm.controls['hospitals']).push((new FormGroup({
  			"hospital":new FormControl(this.hospitals[i].hospital,Validators.required),
  			"address": new FormControl(this.hospitals[i].address,Validators.required)
  		})));
  	}

  	console.log("hospitalform:",this.hospitalForm);

}

add(){
  	(<FormArray>this.hospitalForm.controls['hospitals'])
  	.push((new FormGroup(
  		{  "hospital":new FormControl('',Validators.required),
  			"address": new FormControl('',Validators.required)})));
  }

putHospital(newHospital){
	console.log(this.hospitalForm.valid);
	if(this.hospitalForm.valid){
  	console.log("New Hospital",newHospital);
  	this.newHospital = this.http.put('http://159.89.164.22/users/hospitals',{country:newHospital.country,state:newHospital.state,city:newHospital.city,hospitals:newHospital});
  	this.newHospital.subscribe((data)=>{
  		if(data){
  			console.log("data coming from database",data);
  			this.mnds.presentToast("Saved Successfully");
          
  		}
  		else{
  			console.log("Some kind of error");
  			this.mnds.presentToast("Error while saving");
  		}});
  		
  	}
  	else{
  		console.log("form invalid");
  	}	
  }

  deleteHospital(i){
    let alert = this.alertCtrl.create({
    title: 'Remove Hospital',
    message: ' Are you sure you want to remove this?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: () => {
      (<FormArray>this.hospitalForm.controls['hospitals']).removeAt(i);
  	console.log(this.hospitalForm.valid);
  	console.log(this.hospitalForm.value);
  	this.putHospital(this.hospitalForm.value);
        }
      }
    ]
  });
  alert.present();
  	

  }

  	


  findState(countryfocus){
    this.country = countryfocus;
    console.log(countryfocus);
    this.states=[];
    this.cities=[];
    this.hospitals=[];
    this.city ='';
    this.state='';
  	this.mnds.getState(this.country)
  	.subscribe((data)=>{
  	   if(typeof(data)=="string"){
  	   	  this.mnds.presentToast(data);
  	   	  this.initializeForm();
  	   }
  	   else{
  	   	  this.country = data.country;
  	   	  this.states = data.states;
  	   	  console.log("states:",this.states);
  	   	  this.initializeForm();
  	   }
  	});
  
  }

  findCity(statefocus){
	   this.state= statefocus;
	   this.city='';
	   this.hospitals=[];
	   this.cities= [];

	   console.log(statefocus);
	   this.mnds.getCity(this.country,this.state)
	  	.subscribe((data)=>{
	  	   if(typeof(data)=="string"){
	  	   	  this.mnds.presentToast(data);
	  	   	  this.initializeForm();
	  	   }
	  	   else{
	  	   	  this.country = data.country;
	  	   	  this.state = data.state;
	  	   	  this.cities = data.cities;
	  	   	  console.log("cities:",this.cities);
	  	   	  this.initializeForm();
	  	   }
	  	});
  
  }

  findHospital(cityfocus){
	   console.log("cityfocus:",cityfocus)
	   this.city= cityfocus;
	   this.hospitals= [];
	   console.log("cityfocus:",cityfocus);
	   this.mnds.getHospital(this.country,this.state,this.city)
	  	.subscribe((data)=>{
	  	   if(typeof(data)=="string"){
	  	   	  this.mnds.presentToast(data);
	  	   	  this.initializeForm();
	  	   }
	  	   else{
	  	   	  this.country = data.country;
	  	   	  this.state = data.state;
	  	   	  this.city = data.city;
	  	   	  this.hospitals = data.hospitals;
	  	   	  console.log("hospitals:",this.hospitals);
	  	   	  this.initializeForm();
	  	   }
	  	});
  
  }
}



