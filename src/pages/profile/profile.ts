import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ManageDataService } from '../../services/manage-data/services.managedata';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
   //days on which doctor is available
   days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  //Values for specialities
  specialities = ['Audiologist','Allergist','Anesthesiologist','Cardiologist','Dentist','Dermatologist','Endocrinologist','Epidemiologist','Gynecologist','Immunologist','Infections Disease Specialist','Internal Medicine Specialist','Medical Geneticist','Microbiologist','Neonatologist','Neurologist','Neurosurgeon','Obstetrician','Oncologist','Orthopedic Surgeon','ENT Specialist','Pediatrician','Physiologist','Plastic Surgeon','Podiatrist','Psychiatrist','Radiologist','Rheumatologist','Surgeon','Urologist']


	profileForm: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private mnds: ManageDataService) {

  	this.mnds.currentPage = 'ProfilePage';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  initializeForm() {

  	this.profileForm = new FormGroup({
		
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
}
