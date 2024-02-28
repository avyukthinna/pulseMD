import { useAuth } from "../../store/AuthProvider"
import { useState,useEffect } from "react";
import { useData } from "../../store/DataProvider";
import axios from "axios";

export default function ScheduledMeetings(){
    const {userAppointments, fetchUserAppointments} = useData()
    const {currentUser} = useAuth();

    const ScheduledAppointments = userAppointments.filter((app) => {
        const appDate = new Date(app.date)
        const currentDate = new Date()
        if(appDate > currentDate) return app;
    })

    useEffect(() => {
        //FETCH APPOINTMENTS
        fetchUserAppointments(currentUser._id,currentUser.role)
    }, [])

    const handleAccept = async (app_id) => {
        console.log(app_id)
      //FUNCTION SENDS APPOINTMENT ID AND CONFIRMS IT
      try {
        const response = await axios.post('/api/appointments', {
          app_id
        });

        fetchUserAppointments(currentUser._id,currentUser.role)
      } catch (error) {
        console.error('Error');
      } 
    }

    const handleReject = async (app_id) => {
        console.log(app_id)
        //FUNCTION SENDS APPOINTMENT ID AND DELETES IT FROM DB
        try {
            const response = await axios.post('/api/appointments', {
              app_id
            });
    
            fetchUserAppointments(currentUser._id,currentUser.role)
          } catch (error) {
            console.error('Error');
          } 
    }

    const DocAppoint = [
        {
            _id:'1',
            patient_name:"Raj Dev",
            date:"Wed Feb 28 2024 15:15:00",
            symptoms:"Cough",
            isConfimed:true
        },
        {   
            _id:'2',
            patient_name:"Jessica Martin",
            date:"Thu Feb 29 2024 15:15:00",
            symptoms:"Sore Throat",
            isConfimed:true
        },
        {   
            _id:'3',
            patient_name:"Sam Welsh",
            date:"Thu Feb 29 2024 10:00:00",
            symptoms:"High Fever",
            isConfimed:false
        }
    ]

    if(currentUser.role === 'patient'){
        return(
            <div>
                {!ScheduledAppointments &&
                <div className="flip min-h-96 mt-8 font-poppins flex items-center justify-center" data-aos="fade-up">
                    <div className="text-6xl font-medium text-center">No Meetings Scheduled</div>
                </div>}

                {ScheduledAppointments &&
                    <div className="min-h-96 mt-6 font-poppins flex flex-col" data-aos="fade-up">
                        {ScheduledAppointments.map((app) => {
                            return (
                                <div className="bg-blue-100 mb-4 rounded-md p-3 flex flex-row items-center justify-between hover:scale-101 hover:duration-200">
                                    <div>
                                        <div className="font-semibold text-lg text-primary-blue">Dr. {app.doctor_name}</div>
                                        <div className="text-center" ><span className="font-semibold">Date:</span> {app.date}</div>
                                        <div><span className="font-semibold">Your Symptoms:</span> {app.symptoms}</div>
                                    </div>
                                    
                                    {app.isConfimed && <a href="https://meet.google.com/" target="blank" className=" bg-blue-700 text-primary-white py-2 px-5 shadow-xl rounded-sm hover:bg-blue-600">JOIN</a>}
                                    {!app.isConfimed && <p className="italic text-error">Status Pending</p>}
                                </div>
                            )
                        })}
                    </div>
                }
                
            </div>
        )
    }

    if(currentUser.role === 'doctor'){
        return(
            <div>
                {!DocAppoint && 
                <div className="flip min-h-96 mt-8 font-poppins flex items-center justify-center" data-aos="fade-up">
                    <div className="text-6xl font-medium text-center">No Meetings Scheduled</div>
                </div>}

                {DocAppoint &&
                    <div className="min-h-96 mt-6 font-poppins flex flex-col" data-aos="fade-up">
                        {DocAppoint.map((app) => {
                            return (
                                <div className="bg-blue-100 mb-4 rounded-md p-3 flex flex-row items-center justify-between hover:scale-101 hover:duration-200">
                                    <div> 
                                        <div className="font-semibold text-lg text-primary-blue">{app.patient_name}</div>
                                        <div className="text-center"><span className="font-semibold">Date:</span> {app.date}</div>  
                                        <div><span className="font-semibold">Symptoms: </span>{app.symptoms}</div>
                                    </div>  
                                    
                                                              
                                    {app.isConfimed && <a href="https://meet.google.com/" target="blank" className=" bg-blue-700 text-primary-white py-2 px-4 shadow-xl rounded-sm hover:bg-blue-600">JOIN</a>}
                                    {!app.isConfimed && 
                                        <div>
                                            <button className="bg-red-600 text-primary-white py-2 px-4 shadow-xl rounded-sm mr-2 cursor-pointer hover:bg-red-700" onClick={() => handleReject(app._id)}>Reject</button>
                                            <button className="bg-green-600 text-primary-white py-2 px-4 shadow-xl rounded-sm cursor-pointer hover:bg-green-500" onClick={() => handleAccept(app._id)}>Accept</button>
                                        </div>}
                                </div>
                            )
                        })}
                    </div>
                }
                
            </div>
        )
    }

    
}