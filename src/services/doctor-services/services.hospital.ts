import { hospitals,doctors } from "./hospitalnewdata";

export class UserService {
	
	constructor() {}

	
getallhospitals(city:string){
	let b=[]
    for(let value of hospitals.cities){
    	if(city==value.city){
    		for(let hospital of value.hospitals){
    		  b.push(hospital.hospital);
    		}
    		return b;
    	}
    }
}

getalldoctors(city:string,hospital:string){

	let l:any[]=[];
	for(let value of doctors){
     for(let doc of value.doctors){
     	  if(value.city==city && value.hospital==hospital){
     	  	 l.push(doc.doctor);
     	  }
     	  
     	  
     	}
     }
   
  return l;
  
}
}





