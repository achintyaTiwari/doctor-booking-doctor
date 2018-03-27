import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ManageDataService } from '../../services/manage-data/services.managedata';

@IonicPage()
@Component({
  selector: 'page-manage-doctor',
  templateUrl: 'manage-doctor.html',
})
export class ManageDoctorPage {

  newDoctor:Observable<any>;
  country="";
  state="";
  city="";
  hospital="";
  countries=[];
  states=[];
  cities=[];
  hospitals=[];
  doctors=[];
  doctorForm:FormGroup;

  //Values for days
  days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  //Values for specialities
  specialities = ['Audiologist','Allergist','Anesthesiologist','Cardiologist','Dentist','Dermatologist','Endocrinologist','Epidemiologist','Gynecologist','Immunologist','Infections Disease Specialist','Internal Medicine Specialist','Medical Geneticist','Microbiologist','Neonatologist','Neurologist','Neurosurgeon','Obstetrician','Oncologist','Orthopedic Surgeon','ENT Specialist','Pediatrician','Physiologist','Plastic Surgeon','Podiatrist','Psychiatrist','Radiologist','Rheumatologist','Surgeon','Urologist']


  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient,private mnds:ManageDataService,private alertCtrl:AlertController){
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
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageCityPage');
  }

initializeForm(){

   this.doctorForm = new FormGroup({
   	"country": new FormControl(this.country,Validators.required),
   	"state": new FormControl(this.state,Validators.required),
   	"city" :  new FormControl(this.city,Validators.required),
   	"hospital": new FormControl(this.hospital,Validators.required),
   	"doctors": new FormArray([])
   });

  for (let i= 0; i<this.doctors.length; i++){
  		(<FormArray>this.doctorForm.controls['doctors']).push((new FormGroup({
  			"doctor":new FormControl(this.doctors[i].doctor,Validators.required),
  			"fare": new FormControl(this.doctors[i].fare,Validators.required),
  			"seat": new FormControl(this.doctors[i].seat,Validators.required),
  			"day": new FormArray([new FormControl(this.doctors[i].day[0]),new FormControl(this.doctors[i].day[1]),new FormControl(this.doctors[i].day[2]),new FormControl(this.doctors[i].day[3]),new FormControl(this.doctors[i].day[4]),new FormControl(this.doctors[i].day[5]),new FormControl(this.doctors[i].day[6])]),
  			"speciality": new FormArray([new FormControl(this.doctors[i].speciality[0]),new FormControl(this.doctors[i].speciality[1]),new FormControl(this.doctors[i].speciality[2]),new FormControl(this.doctors[i].speciality[3]),new FormControl(this.doctors[i].speciality[4]),new FormControl(this.doctors[i].speciality[5]),new FormControl(this.doctors[i].speciality[6]),new FormControl(this.doctors[i].speciality[7]),new FormControl(this.doctors[i].speciality[8]),new FormControl(this.doctors[i].speciality[9]),new FormControl(this.doctors[i].speciality[10]),new FormControl(this.doctors[i].speciality[11]),new FormControl(this.doctors[i].speciality[12]),new FormControl(this.doctors[i].speciality[13]),new FormControl(this.doctors[i].speciality[14]),new FormControl(this.doctors[i].speciality[15]),new FormControl(this.doctors[i].speciality[16]),new FormControl(this.doctors[i].speciality[17]),new FormControl(this.doctors[i].speciality[18]),new FormControl(this.doctors[i].speciality[19]),new FormControl(this.doctors[i].speciality[20]),new FormControl(this.doctors[i].speciality[21]),new FormControl(this.doctors[i].speciality[22]),new FormControl(this.doctors[i].speciality[23]),new FormControl(this.doctors[i].speciality[24]),new FormControl(this.doctors[i].speciality[25]),new FormControl(this.doctors[i].speciality[26]),new FormControl(this.doctors[i].speciality[27]),new FormControl(this.doctors[i].speciality[28]),new FormControl(this.doctors[i].speciality[29])])
  		})));
  	}


  	console.log("doctorForm:",this.doctorForm);

}

add(){
  	(<FormArray>this.doctorForm.controls['doctors'])
  	.push((new FormGroup(
  		{  "doctor":new FormControl('',Validators.required),
  			"fare": new FormControl('',Validators.required),
  			"seat": new FormControl('',Validators.required),
  			"day": new FormArray([new FormControl(true),new FormControl(true),new FormControl(true),new FormControl(true),new FormControl(true),new FormControl(true),new FormControl(true)]),
  			"speciality": new FormArray([new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false),new FormControl(false)])
  })
  	));
  }

putDoctor(newDoctor){
	
	console.log(this.doctorForm.valid);
	
	if(this.doctorForm.valid){
  	console.log("New Hospital",newDoctor);
  	this.newDoctor = this.http.put('http://159.89.164.22/users/doctors',{country:newDoctor.country,state:newDoctor.state,city:newDoctor.city,hospital:newDoctor.hospital,doctors:newDoctor});
  	this.newDoctor.subscribe((data)=>{
  		if(data){
  			console.log("data coming from database",data);
  			this.mnds.presentToast("Saved Successfully");
          
  		}
  		else{
  			console.log("Some kind of error");
  			this.mnds.presentToast("Error while saving");
  		}});


  	}

  	else{
  		console.log("form invalid");
  	}
  		
  			
  }

deleteDoctor(i){

  let alert = this.alertCtrl.create({
    title: 'Remove Doctor',
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
       	(<FormArray>this.doctorForm.controls['doctors']).removeAt(i);
		  	console.log(this.doctorForm.valid);
		  	console.log(this.doctorForm.value);
		  	this.putDoctor(this.doctorForm.value);
        }
      }
    ]
  });
  alert.present();
}
  


findState(countryfocus){
    this.country = countryfocus;
    console.log(countryfocus);
    this.states=[];
    this.cities=[];
    this.hospitals=[];
    this.doctors=[];
    this.city ='';
    this.state='';
    this.hospital='';
  	this.mnds.getState(this.country)
  	.subscribe((data)=>{
  	   if(typeof(data)=="string"){
  	   	  this.mnds.presentToast(data);
  	   	  this.initializeForm();
  	   }
  	   else{
  	   	  this.country = data.country;
  	   	  this.states = data.states;
  	   	  console.log("states:",this.states);
  	   	  this.initializeForm();
  	   }
  	});
  
  }

findCity(statefocus){
	   this.state= statefocus;
	   this.city='';
	   this.hospital='';
	   this.hospitals=[];
	   this.cities= [];
	   this.doctors=[];

	   console.log(statefocus);
	   this.mnds.getCity(this.country,this.state)
	  	.subscribe((data)=>{
	  	   if(typeof(data)=="string"){
	  	   	  this.mnds.presentToast(data);
	  	   	  this.initializeForm();
	  	   }
	  	   else{
	  	   	  this.country = data.country;
	  	   	  this.state = data.state;
	  	   	  this.cities = data.cities;
	  	   	  console.log("cities:",this.cities);
	  	   	  this.initializeForm();
	  	   }
	  	});
  
  }

findHospital(cityfocus){
	   console.log("cityfocus:",cityfocus)
	   this.city= cityfocus;
	   this.hospitals= [];
	   this.doctors=[];
	   console.log("cityfocus:",cityfocus);
	   this.mnds.getHospital(this.country,this.state,this.city)
	  	.subscribe((data)=>{
	  	   if(typeof(data)=="string"){
	  	   	  this.mnds.presentToast(data);
	  	   	  this.initializeForm();
	  	   }
	  	   else{
	  	   	  this.country = data.country;
	  	   	  this.state = data.state;
	  	   	  this.city = data.city;
	  	   	  this.hospitals = data.hospitals;
	  	   	  console.log("hospitals:",this.hospitals);
	  	   	  this.initializeForm();
	  	   }
	  	});
  
  }

findDoctor(hospitalfocus){
  
  console.log("hospitalfocus:",hospitalfocus)
	   this.hospital= hospitalfocus;
	   this.doctors=[];
	   console.log("hospitalfocus:",hospitalfocus);
	   this.mnds.getDoctor(this.country,this.state,this.city,this.hospital)
	  	.subscribe((data)=>{
	  	   if(typeof(data)=="string"){
	  	   	  this.mnds.presentToast(data);
	  	   	  this.initializeForm();
	  	   }
	  	   else{
	  	   	  this.country = data.country;
	  	   	  this.state = data.state;
	  	   	  this.city = data.city;
	  	   	  this.hospital = data.hospital;
	  	   	  this.doctors = data.doctors;
	  	   	  console.log("doctors:",this.doctors);
	  	   	  this.initializeForm();
	  	   }
	  	});
  
}

}
