import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ManageDataService } from '../../services/manage-data/services.managedata';

@Component({
  selector: 'page-manage-state',
  templateUrl: 'manage-state.html',
})

export class ManageStatePage {
  
  states = [];
  stateForm: FormGroup;

  country = "";

  countries=[];  // will be used for dropdown

  newState:Observable<any>;
 
   

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private mnds: ManageDataService,private alertCtrl:AlertController) {

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

 
  findState(country){

  

  	this.country = country;
  	this.states = [];
	this.mnds.getState(country)
	   .subscribe((data)=>{
	    	if(typeof(data) == "string"){
              this.mnds.presentToast(data);
              this.initializeForm();	    	
	    	}
            else{
            this.country = data.country;
	    	this.states = data.states;
	    	this.initializeForm();
            }
	});

  }

  initializeForm(){
  	
  	this.stateForm = new FormGroup({
  	"country": new FormControl(this.country,Validators.required),
  	"states" : new FormArray([])
  	});

     if(this.states.length>0){ 
  	for (let i= 0; i<this.states.length; i++){
  		(<FormArray>this.stateForm.controls['states']).push((new FormControl(this.states[i],Validators.required)));
  	}

  	console.log("stateform:",this.stateForm);
   }
   
}
  setStates(f) {

  	console.log("setStates",f);
  }

  add(){
  	(<FormArray>this.stateForm.controls['states']).push((new FormControl('',Validators.required)));
  }

  putStates(newState){
  	
  	if(this.stateForm.valid) {

  	console.log("New State",newState);
  	this.newState = this.http.put('http://159.89.164.22/users/states',{country:newState.country,states:newState});
  	this.newState.subscribe((data)=>{
	  		
	  		if(data){
	  			console.log("data coming from database",data);
	          	this.mnds.presentToast('Saved Successfully');
	  		}

	  		else{
	  			console.log("Some kind of error");
	  			this.mnds.presentToast('Error While Saving');
	  		}

  		});


  	}

  	else {

  		this.mnds.presentToast('Form is Invalid');

  	}
  	

  }

  deleteState(i){
   let alert = this.alertCtrl.create({
    title: 'Remove State',
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
      	(<FormArray>this.stateForm.controls['states']).removeAt(i);
  	     this.putStates(this.stateForm.value);
        }
      }
    ]
  });
  alert.present();


  
  }


}