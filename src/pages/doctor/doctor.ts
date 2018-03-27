import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ManageDataService } from '../../services/manage-data/services.managedata';
import { Availability } from '../../modal/availability/availability';


@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html',
})
export class DoctorPage {
   
   country:any;
   state:any;
   city:any;
   hospital:any;
   doctor:any;

   doctors =[];

    //Values for days
    days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    //Values for specialities
    specialities = ['Audiologist','Allergist','Anesthesiologist','Cardiologist','Dentist','Dermatologist','Endocrinologist','Epidemiologist','Gynecologist','Immunologist','Infections Disease Specialist','Internal Medicine Specialist','Medical Geneticist','Microbiologist','Neonatologist','Neurologist','Neurosurgeon','Obstetrician','Oncologist','Orthopedic Surgeon','ENT Specialist','Pediatrician','Physiologist','Plastic Surgeon','Podiatrist','Psychiatrist','Radiologist','Rheumatologist','Surgeon','Urologist']

    specialityfinal = [];

   constructor(public navCtrl: NavController, public navParams: NavParams,private mnds: ManageDataService,private modalCtrl: ModalController) {


    this.country = this.navParams.get('country');
    this.state = this.navParams.get('state');
    this.city = this.navParams.get('city');
    this.hospital = this.navParams.get('hospital');


    this.mnds.getDoctor(this.country,this.state,this.city,this.hospital)
    .subscribe(data => {
      if (typeof data == 'string'){

        this.mnds.presentToast(data);

      }

      else {

        this.country = data.country;
        this.state = data.state;
        this.city = data.city;
        this.hospital = data.hospital;

        this.doctors = data.doctors;
      

        for(let i=0; i < this.doctors.length; i++) {
          let specialityArr = [];
          for(let j=0; j<this.doctors[i].speciality.length;j++) {
            if(this.doctors[i].speciality[j]){
              specialityArr.push(this.specialities[j]);              
            }

          }
          this.specialityfinal.push(specialityArr);
        }

      }



    })
  }

 checkAvailability(index){ 

    let availabilityModal = this.modalCtrl.create(Availability,{"country":this.country,"state":this.state,"city":this.city,"hospital":this.hospital,"doctor":this.doctors[index].doctor, "day":this.doctors[index].day});
   
    availabilityModal.onDidDismiss( data => {
      if (data){
      
      console.log(data);
      
      } 
    });

    availabilityModal.present();

  }


}


