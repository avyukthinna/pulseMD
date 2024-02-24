import { useAuth } from "../../store/AuthProvider"
import { useData } from "../../store/DataProvider"
import { Navigate } from "react-router-dom"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import { Avatar } from "@mui/material"
import BookAppointment from "./BookAppointment"

const FindDoc = () => {
    const {currentUser} = useAuth()
    const {doctors,fetchDoctors} = useData()

    const [search, setSearch] = useState('')
    
    useEffect(() => {
        //FETCH DOCTORS
        fetchDoctors()
    }, [])

    useEffect(() => {
        setSearch('');
    }, []);

    if(currentUser.role === 'doctor'){
       return (
            <Navigate to='/'/>
        )
    }
    
    if(currentUser.role === 'patient'){
        if(currentUser.isverified){
            return(
                <div className="fadein relative top-16 mb-24 font-poppins min-h-screen">
                    <div className="flex flex-col items-center justify-center pt-20">
                        <div data-aos='fade-down' className="w-full text-center text-4xl font-bold">Professional care with a <span className="text-primary-blue"> personal touch</span></div>
                        <input 
                            className="border-2 p-2 mt-5 w-3/5 border-black rounded-xl"
                            type="text" 
                            name="search" 
                            placeholder="Search by Name/Speciality"
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                        />
                    </div>

                    <div className="flex flex-wrap mx-28 my-10 justify-center" data-aos='fade-up'>
                        {doctors.filter((doctor) => {
                            if (doctor.isverified === true) {
                                if (search === "") return doctor;

                                else if (
                                doctor.fullname
                                    .toLowerCase()
                                    .includes(search.toLocaleLowerCase())
                                )
                                return doctor;
                                else if (
                                doctor.speciality
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                                )
                                return doctor;

                            }
                            }).map((doctor) => {
                                
                               
                            return (
                                <div key={doctor.id} className="flex flex-col items-center justify-center shadow-lg p-5 w-60 m-4 duration-300 hover:scale-102">
                                    <Avatar alt="Remy Sharp" src={doctor.image} sx={{ width: 150, height: 150 }} />

                                    <div className="font-semibold text-lg my-2">Dr. {doctor.fullname}</div>
                                    <div>{doctor.speciality}</div>
                                    <div>{doctor.degree}</div>
                                    <div>{doctor.starttime} - {doctor.endtime} hrs</div>

                                    <BookAppointment doctor_id={doctor.id} starttime={doctor.starttime} endtime={doctor.endtime} currentUser={currentUser}/>
                                </div>
                            )
                            })}
                    </div>
                </div>
            )
        } else{
            return (
                <div className="flex items-center justify-center h-screen font-poppins text-6xl">
                    KINDLY COMPLETE YOUR PROFILE
                </div>
            )
        }
    }

}

export default FindDoc