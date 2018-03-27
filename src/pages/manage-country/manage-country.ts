import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ManageDataService } from '../../services/manage-data/services.managedata';
@Component({
  selector: 'page-manage-country',
  templateUrl: 'manage-country.html',
})
export class ManageCountryPage {

  countries = [];
  countryForm: FormGroup;
  countryData:any;
  newCountry:Observable<any>;
   

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,private http: HttpClient,private mnds:ManageDataService) {
   
  	this.initializeForm();
 	this.mnds.getCountry()
  	.subscribe((data) => {
  		if(typeof(data) == 'string'){
  			this.mnds.presentToast(data);
  		}
  		
  		else {
  		this.countryData = data;
  		this.countries = this.countryData.countries;
		this.initializeForm();
 		} 
  	});
}

   

  initializeForm(){
  	
  	this.countryForm = new FormGroup({
  	"countries" : new FormArray([])
  	}); 
    
  	for (let i= 0; i<this.countries.length; i++){
  		(<FormArray>this.countryForm.controls['countries']).push((new FormControl(this.countries[i])));
  	}

  	console.log("countryform:",this.countryForm);
   
   
}

  add(){
  	(<FormArray>this.countryForm.controls['countries']).push((new FormControl('')));
  }

  putCountry(newCountry){
  	console.log("New Country",newCountry);
  	this.newCountry = this.http.put('http://159.89.164.22/users/countries',{countries:newCountry});
  	this.newCountry.subscribe((data)=>{
  		if(data){
  			console.log("data coming from database",data);
          this.mnds.presentToast("Saved Successfully");
  		}
  		else{
  			console.log("Some kind of error");
  			this.mnds.presentToast("Some error occured");
  		}});
  		
  }

  deleteCountry(i){

  	let alert = this.alertCtrl.create({
    title: 'Remove Country',
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
       (<FormArray>this.countryForm.controls['countries']).removeAt(i);
  	    this.putCountry(this.countryForm.value);
        }
      }
    ]
  });
  alert.present();
  	

  }


}