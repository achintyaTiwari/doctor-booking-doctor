import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { ManageDataService } from '../../services/manage-data/services.managedata';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html',
})
export class PatientPage {
   
   country:any;
   state:any;
   city:any;
   hospital:any;
   doctor:any;
   selectedDate:any;

   patientForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mnds: ManageDataService,private http: HttpClient) {
     
     this.country = this.navParams.get('country');
     this.state = this.navParams.get('state');
     this.city = this.navParams.get('city');
     this.hospital = this.navParams.get('hospital');
     this.doctor = this.navParams.get('doctor');
     this.selectedDate = this.navParams.get('selectedDate');

     this.initializeForm();

  }


  initializeForm(){

   this.patientForm = new FormGroup({
   	"country": new FormControl(this.country,Validators.required),
   	"state": new FormControl(this.state,Validators.required),
   	"city" :  new FormControl(this.city,Validators.required),
   	"hospital": new FormControl(this.hospital,Validators.required),
   	"doctor": new FormControl(this.doctor,Validators.required),
   	"selectedDate": new FormControl(this.selectedDate,Validators.required),
   	"patients":new FormArray([])
   });

 }
 
 addPatient() {
 	(<FormArray>this.patientForm.controls['patients']).push(new FormGroup({
 		'name': new FormControl('',Validators.required),
 		'age': new FormControl('',Validators.required),
 		'gender': new FormControl('M',Validators.required)
 	}));
 }

 deletePatient(index) {

 	(<FormArray>this.patientForm.controls['patients']).removeAt(index);

 }

 putPatient(newPatient) {

 	console.log(newPatient);
 	this.http.post('http://159.89.164.22/users/book',newPatient)
 	.subscribe(data => {
 		this.mnds.presentToast(data);
 	});

 }

}
