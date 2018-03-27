import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//uncertain - import { NgForm } from '@angular/forms'

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
        <ion-input type="text" formControlName="name" [disabled]=true></ion-input>
      </ion-item>
      <ion-item>
        <ion-label fixed>Age</ion-label>
        <ion-input type="number" formControlName="age" [disabled]=true></ion-input>
      </ion-item>
      <ion-item>
        <ion-label fixed>Gender</ion-label>
        <ion-select formControlName="gender" [disabled]=true>
        <ion-option value="M">Male</ion-option>
        <ion-option value="F">Female</ion-option>
        <ion-option value="O">Other</ion-option>        
        </ion-select>
     </ion-item>
     <ion-item>
     <ion-label fixed>Active</ion-label>
     <ion-toggle formControlName="active"></ion-toggle>
     </ion-item> 
     <ion-item *ngIf="!f.value.active">
     <ion-label fixed>Reason</ion-label>
     <ion-select formControlName="reasonOfCancellation">
     <ion-option value="1">Cancelled by patient</ion-option>
     <ion-option value="2">Cancelled by doctor</ion-option>
     <ion-option value="3">Doctor unavailable</ion-option>
     <ion-option value="4">Patient resheduled</ion-option>
     </ion-select>
     </ion-item>     
     <ion-item>
     <button ion-button type="submit">Save</button>
     </ion-item>
    </ion-list>
  </form>
</ion-content>
`
})

export class EditPatient {
  
  patient: FormGroup;
  constructor(
    public viewCtrl: ViewController,
    private params: NavParams
  ) {

    this.initializeForm();

  }

  initializeForm() {
    let data = this.params.data
    this.patient = new FormGroup({
      'name': new FormControl(data.name,Validators.required),
      'age' : new FormControl(data.age,Validators.required),
      'gender' : new FormControl(data.gender,Validators.required),
      'status' : new FormControl(data.status,Validators.required),
      'active' : new FormControl(data.active,Validators.required),      
      'reasonOfCancellation' : new FormControl(data.reasonOfCancellation)
    });   
  }

  dismiss(f) {
    if (f) {
      this.viewCtrl.dismiss(f.value);
    }
    else {
      this.viewCtrl.dismiss();
    }

  }
}