import { Component, OnDestroy } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddNewPatient } from '../../modal/add-new-patient/AddNewPatient';
import { EditPatient } from '../../modal/edit-patient/EditPatient';
import { ManageDataService } from '../../services/manage-data/services.managedata';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Socket } from 'ng-socket-io';


@Component({
  selector: 'page-ledger',
  templateUrl: 'ledger.html'
})
export class LedgerPage implements OnDestroy {
    country  = 'india';
    state = 'uttar pradesh';
    city = 'sultanpur';
    hospital = 'Navjeevan Hospital';
    doctor = 'shyam narayan';
    choosenDate = new Date('2018-3-21');
    totalSeats = 50;

    selectedDate = (this.choosenDate).getFullYear()+'-'+(this.choosenDate).getMonth()+'-'+(this.choosenDate).getDate();

	reason=["No reason specified","Cancelled by patient","Cancelled by doctor","Doctor unavailable","Patient resheduled"];

    ledger = {

        date: this.selectedDate,
        seats: this.totalSeats, 
        data: []
    }

    ledgerSubscribe: Subscription;

    path: string;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private mnds: ManageDataService, private http: HttpClient, private socket: Socket) {
    
    this.mnds.getLedger(this.country,this.state,this.city,this.hospital,this.doctor,this.selectedDate)
    .subscribe(ledger => {
        if(typeof ledger == 'string'){
            this.mnds.presentToast(ledger);
        }
        else {

            this.ledger = ledger;
        
        }
    });

  
    this.ledgerSubscribe = this.getUpdatedLedger()
    .subscribe(data => {
        console.log(data);
        this.ledger = data.data;
    });


  }

	addPatient() {
		
		let contactModal = this.modalCtrl.create(AddNewPatient);
		contactModal.onDidDismiss( data => {
			if (data){
			this.ledger.data.push(data);
            this.putLedger();
			} 
		});
   	contactModal.present();


	}

	editPatient(index) {

		let contactModal = this.modalCtrl.create(EditPatient,(this.ledger.data[index]));
		contactModal.onDidDismiss( data => {
			if (data){
				this.ledger.data[index] = data;
                this.putLedger();
			}
		});
   	contactModal.present();


	}

    putLedger(){
        this.http.put('http://159.89.164.22/users/ledger',{country:this.country,state:this.state,city:this.city,hospital:this.hospital,doctor:this.doctor,ledger:this.ledger})
        .subscribe(data => {
            this.mnds.presentToast(data);
        })

    }

    getUpdatedLedger(){

        this.path = 'ledger-changed'+'/'+this.country+'/'+this.state+'/'+this.city+'/'+this.hospital+'/'+this.doctor+'/'+this.selectedDate;

        let observable = new Observable(observer => {
            this.socket.on(this.path, data => {
                
                observer.next(data);
            });
        });

        return observable;


    }

    ngOnDestroy() {
        this.ledgerSubscribe.unsubscribe();
    }

}
