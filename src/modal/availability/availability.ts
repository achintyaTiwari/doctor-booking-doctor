import { DatePickerDirective } from 'ionic3-datepicker';
import { NavController,ViewController,NavParams } from 'ionic-angular';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ManageDataService } from '../../services/manage-data/services.managedata';
import { PatientPage } from '../../pages/patient/patient';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Socket } from 'ng-socket-io';
import * as moment from 'moment';

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
  <span ion-datepicker (ionChanged)="setDate($event);"  [min]="localDate" [value]="currentDate" clear class="ScheduleDate" [disabledDates]="disabledDate" [markDates]="highlightedDate">
      <span>{{currentDate | date}} <ion-icon name="clipboard" item-left ></ion-icon></span>
  </span>

   <ion-grid>
   <ion-row>
   <ion-col>
   Total Seats
   </ion-col>
   <ion-col>
   {{totalSeats}}   
   </ion-col>
   </ion-row>
   <ion-row>
   <ion-col>
   Seats Booked
   </ion-col>
   <ion-col>
   {{seatsBooked}}
   </ion-col>
   </ion-row>
   <ion-row>
   <ion-col>
   Currently Viewing
   </ion-col>
   <ion-col>
   {{currentSeat}} 
   </ion-col>
   </ion-row> 
   <ion-row>
   <ion-col>
   <button ion-button small (click)="proceed()">Proceed</button>
   </ion-col>
   </ion-row>  
   </ion-grid> 
</ion-content>
`
})

export class Availability implements OnDestroy {
  localDate = new Date();
  currentDate = new Date();
  disabledDate = [];
  highlightedDate = [];
  initialDate = true;
  selectedDate = (this.currentDate).getFullYear()+'-'+(this.currentDate).getMonth()+'-'+(this.currentDate).getDate();

  totalSeats : any;
  defaultTotalSeats = 100;
  seatsBooked: any;
  currentSeat: any;
  ledgerSubscribe: Subscription;

  path:string;

  @ViewChild(DatePickerDirective) private datepickerDirective:DatePickerDirective;

  public closeDatepicker(){
      this.datepickerDirective.dismiss();
  }

  constructor(
    public viewCtrl: ViewController,
    private params: NavParams,
    private mnds: ManageDataService,
    private navCtrl: NavController,
    private socket: Socket
  ) {
    
    this.country = this.params.get('country');
    this.state = this.params.get('state');
    this.city = this.params.get('city');
    this.hospital = this.params.get('hospital');
    this.doctor = this.params.get('doctor');
    this.day = this.params.get('day');
    
    this.advanceDays = 30;


    for(let i=0; i<this.advanceDays; i++) {
      if(this.day[moment(this.localDate).add(i, 'days').day()]) {
        this.highlightedDate.push(moment(this.localDate).add(i, 'days')._d);
        if(this.initialDate) {
          this.currentDate = moment(this.localDate).add(i, 'days')._d;
          this.initialDate = false;
        }
      }
      else {
        this.disabledDate.push(moment(this.localDate).add(i, 'days')._d);
      }
    }

    this.mnds.getLedger(this.country,this.state,this.city,this.hospital,this.doctor,this.selectedDate)
    .subscribe(ledger => {

      if (typeof ledger == 'string'){
        this.totalSeats = this.defaultTotalSeats;
        this.seatsBooked = 0;
        this.currentSeat = 0;

      }

      else {
        let count = 0;
        this.totalSeats = ledger.seats;
        this.seatsBooked = ledger.data.length;
        for (var i=0; i<ledger.data.length; i++){
          if(ledger.data[i].status == true) {
            count = i+1;
          }
        }

        this.currentSeat = count;
      }

    });
 
    this.ledgerSubscribe = this.getUpdatedLedger()
    .subscribe(ledger => {
      console.log(ledger);
      if(this.selectedDate == ledger.date){
      let count = 0;
      this.totalSeats = ledger.seats;
      this.seatsBooked = ledger.data.length;
      for (var i=0; i<ledger.data.length; i++){
        if(ledger.data[i].status == true) {
          count = i+1;
        }
      }

      this.currentSeat = count;

      }
    });

  }

  setDate(event){
    
    this.ledgerSubscribe.unsubscribe();


    this.currentDate = event;
    this.selectedDate = (this.currentDate).getFullYear()+'-'+(this.currentDate).getMonth()+'-'+(this.currentDate).getDate();

    this.mnds.getLedger(this.country,this.state,this.city,this.hospital,this.doctor,this.selectedDate)
    .subscribe(ledger => {
      console.log(ledger);
      if (typeof ledger == 'string'){
        this.totalSeats = this.defaultTotalSeats;
        this.seatsBooked = 0;
        this.currentSeat = 0;

      }

      else {
        let count = 0;
        this.totalSeats = ledger.seats;
        
        this.seatsBooked = ledger.data.length;
        for (var i=0; i<ledger.data.length; i++){
          if(ledger.data[i].status == true) {
            count = i+1;
          }
        }
        
        this.currentSeat = count;

      }

    });

    this.ledgerSubscribe = this.getUpdatedLedger()
    .subscribe(ledger => {
      console.log(ledger);
      if(this.selectedDate == ledger.date){
      let count = 0;
      this.totalSeats = ledger.seats;
      this.seatsBooked = ledger.data.length;
      for (var i=0; i<ledger.data.length; i++){
        if(ledger.data[i].status == true) {
          count = i+1;
        }
      }

      this.currentSeat = count;

      }
    });

  }


  proceed() {
    this.navCtrl.push(PatientPage, {country:this.country,state:this.state,city:this.city,hospital:this.hospital,doctor:this.doctor,selectedDate:this.selectedDate});
  }


  getUpdatedLedger(){

    this.path = 'ledger-changed'+'/'+this.country+'/'+this.state+'/'+this.city+'/'+this.hospital+'/'+this.doctor+'/'+this.selectedDate;

    let observable = new Observable(observer => {
        this.socket.on(this.path, data => {
            data = data.data;
            observer.next(data);
        });
    });

    return observable;


  }


  dismiss() {

      this.viewCtrl.dismiss();

  }

  ngOnDestroy() {

    this.ledgerSubscribe.unsubscribe();

  }


}