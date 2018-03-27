import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ManageDataService } from '../../services/manage-data/services.managedata';

@Component({
  selector: 'page-manage-city',
  templateUrl: 'manage-city.html',
})
export class ManageCityPage {
  newCity:Observable<any>;
  country="";
  state="";
  cities=[];
  countries=[];
  states=[];
  cityForm:FormGroup;

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

   this.cityForm = new FormGroup({
   	"country": new FormControl(this.country,Validators.required),
   	"state": new FormControl(this.state,Validators.required),
   	"cities": new FormArray([])
   });

  for (let i= 0; i<this.cities.length; i++){
  		(<FormArray>this.cityForm.controls['cities']).push((new FormGroup({
  			"city":new FormControl(this.cities[i].city,Validators.required),
  			"pincode": new FormControl(this.cities[i].pincode,Validators.required)
  		})));
  	}

  	console.log("cityform:",this.cityForm);

}

add(){
  	(<FormArray>this.cityForm.controls['cities'])
  	.push((new FormGroup(
  		{"city":new FormControl('',Validators.required),
  		"pincode":new FormControl('',Validators.required)})));
  }

putCity(newCity){
	if(this.cityForm.valid){
  	console.log("New City",newCity);
  	this.newCity = this.http.put('http://159.89.164.22/users/cities',{country:newCity.country,state:newCity.state,cities:newCity});
  	this.newCity.subscribe((data)=>{
  		if(data){
  			console.log("data coming from database",data);
  			this.mnds.presentToast("Saved Successfully");
          
  		}
  		else{
  			console.log("Some kind of error");
  			this.mnds.presentToast("Error while saving");
  		}});
  		
  	}
  	{
  		console.log("form invalid");
  	}	
  }

  deleteCity(i){
   let alert = this.alertCtrl.create({
    title: 'Remove City',
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
      (<FormArray>this.cityForm.controls['cities']).removeAt(i);
  	   this.putCity(this.cityForm.value);
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
	  	   	  console.log("states:",this.cities);
	  	   	  this.initializeForm();
	  	   }
	  	});
  
  }


  }








