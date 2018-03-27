import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms'

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title text-center>
      New Patient
    </ion-title>
    <ion-buttons start>
      <button ion-button icon-only (click)="dismiss()">
       <ion-icon name="md-close-circle"></ion-icon> 
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content padding>
  <form [formGroup]="patient" (ngSubmit)="dismiss(f)" #f="ngForm">	
  <ion-list>
      <ion-item>
        <ion-label fixed>Name</ion-label>
        <ion-input type="text" formControlName="name"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label fixed>Age</ion-label>
        <ion-input type="number" formControlName="age"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label fixed>Gender</ion-label>
        <ion-select formControlName="gender">
        <ion-option value="M">Male</ion-option>
        <ion-option value="F">Female</ion-option>
        <ion-option value="O">Other</ion-option>        
        </ion-select>
     </ion-item>
     <ion-item>
     <button ion-button type="submit">Add</button>
     </ion-item>
  	</ion-list>
  </form>
</ion-content>
`
})

export class AddNewPatient {
	
	patient: FormGroup;
  constructor(
    public viewCtrl: ViewController
  ) {

  	this.initializeForm();
  }

  initializeForm() {
  	this.patient = new FormGroup({
  		'name': new FormControl('achintya',Validators.required),
  		'age' : new FormControl(20,Validators.required),
  		'gender' : new FormControl('M',Validators.required),
  		'status' : new FormControl(false,Validators.required),
  		'active' : new FormControl(true,Validators.required),
  		'reasonOfCancellation' : new FormControl(0,Validators.required)  		
  	});  	
  }

  dismiss(f:NgForm) {
  	if (f) {
    	this.viewCtrl.dismiss(f.value);
  	}
  	else {
  		this.viewCtrl.dismiss();
  	}

  }
}