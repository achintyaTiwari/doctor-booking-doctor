import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { TermsPage } from '../terms/terms';
import { HttpClient } from '@angular/common/http';
import { ManageDataService } from '../../services/manage-data/services.managedata';

@Component({
  selector: 'page-initial-profile',
  templateUrl: 'initial-profile.html',
})


export class InitialProfilePage {

  //days on which doctor is available
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  //Values for specialities
  specialities = ['Audiologist','Allergist','Anesthesiologist','Cardiologist','Dentist','Dermatologist','Endocrinologist','Epidemiologist','Gynecologist','Immunologist','Infections Disease Specialist','Internal Medicine Specialist','Medical Geneticist','Microbiologist','Neonatologist','Neurologist','Neurosurgeon','Obstetrician','Oncologist','Orthopedic Surgeon','ENT Specialist','Pediatrician','Physiologist','Plastic Surgeon','Podiatrist','Psychiatrist','Radiologist','Rheumatologist','Surgeon','Urologist']


	initialForm: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private mnds: ManageDataService) {
  
  this.initializeForm();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialProfilePage');
  }

  initializeForm() {

  	this.initialForm = new FormGroup({
		
		  "country": new FormControl('',Validators.required),
		  "state": new FormControl('',Validators.required),
		  "city": new FormControl('',Validators.required),
		  "hospital": new FormControl('',Validators.required),
		  "doctor": new FormControl('',Validators.required),
		  "dob": new FormControl('',Validators.required),
		  "gender": new FormControl('',Validators.required),
		  "address": new FormControl('',Validators.required),
		  "phone": new FormControl(''),
		  "mobile": new FormControl('',Validators.required),
		  "email": new FormControl('',[Validators.required,Validators.email]),
		  "speciality": new FormArray([new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false)]),
		  "fare": new FormControl('',Validators.required),
		  "day": new FormArray([new FormControl(true),new FormControl(true),new FormControl(true),new FormControl(true),new FormControl(true),new FormControl(true),new FormControl(true)]),
		  "seat": new FormControl('',Validators.required),
		  "averageAppointmentTime": new FormControl('',Validators.required),
		  "openingTime": new FormControl('',Validators.required),
		  "closingTime": new FormControl('',Validators.required)

  	});

  }

 	terms() {
 		this.navCtrl.push(TermsPage);
 	}

 	submitApplication() {
 		if(this.initialForm.valid){
	    
	    this.http.put('http://159.89.164.22/users/submit-doctor-application', this.initialForm.value)
	    .subscribe(data => {
	        this.mnds.presentToast(data);
	    });

 		}

 		else {
 			this.mnds.presentToast('Form Invalid');
 		}

 	}

}
