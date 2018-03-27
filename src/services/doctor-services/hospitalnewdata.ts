
export let hospitals:any;
 hospitals=
{
	
	cities:[{

           city:"Sultanpur",
           hospitals:[{hospital:"slnhos1"},
                     {hospital:"slnhos2"},
                     {hospital:"slnhos3"}

                      ]

       }]

}

export let doctors:any;
doctors=[{
    city:"Sultanpur",
    hospital:"slnhos1",
    doctors:[
    	{
        
        	doctor:{
	        	name:"slnhos1doc1",
	        	speciality:"Orthopaedics",
	        	timing:"9:30AM-3:00PM",
	        	status:"Available",
	        	currentNum:0,
	        	seatRem:70,
	        	fare:400
        }},
        {
        	doctor:{
	        	name:"slnhos1doc2",
	        	speciality:"Physician",
	        	timing:"9:30AM-3:00PM",
	        	status:"Available",
	        	currentNum:19,
	        	seatRem:65,
	        	fare:500
        }}]

    },
    {
    city:"Sultanpur",
    hospital:"slnhos2",
    doctors:[
    	{
        
        	doctor:{
	        	name:"slnhos2doc1",
	        	speciality:"Surgeon",
	        	timing:"9:30AM-3:00PM",
	        	status:"Available",
	        	currentNum:23,
	        	seatRem:54,
	        	fare:700
        }},
        {
        	doctor:{
	        	name:"slnhos2doc2",
	        	speciality:"Heart",
	        	timing:"9:30AM-3:00PM",
	        	status:"Available",
	        	currentNum:43,
	        	seatRem:18,
	        	fare:800
        }},
        {
        	doctor:{
	        	name:"slnhos2doc3",
	        	speciality:"Diabetes",
	        	timing:"9:30AM-3:00PM",
	        	status:"Available",
	        	currentNum:39,
	        	seatRem:21,
	        	fare:600
        }}]

    },
    {
    city:"Sultanpur",
    hospital:"slnhos3",
    doctors:[
    	{
        
        	doctor:{
	        	name:"slnhos3doc1",
	        	speciality:"Surgeon",
	        	timing:"9:30AM-3:00PM",
	        	status:"Available",
	        	currentNum:23,
	        	seatRem:54,
	        	fare:700
        }},
        {
        	doctor:{
	        	name:"slnhos3doc2",
	        	speciality:"Heart",
	        	timing:"9:30AM-3:00PM",
	        	status:"Available",
	        	currentNum:43,
	        	seatRem:18,
	        	fare:800
        }},
        {
        	doctor:{
	        	name:"slnhos3doc3",
	        	speciality:"Diabetes",
	        	timing:"9:30AM-3:00PM",
	        	status:"Available",
	        	currentNum:39,
	        	seatRem:21,
	        	fare:600
        }}]

    }
    ]
