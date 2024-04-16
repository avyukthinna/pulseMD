import { useAuth } from "../../store/AuthProvider"
import { useData } from "../../store/DataProvider"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { Avatar } from "@mui/material"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Prescribe from "./Prescribe"

const YourPatients = () => {
    const {currentUser} = useAuth()
    const {yourPatients,fetchYourPatients} = useData()

    useEffect(() => {
        fetchYourPatients(currentUser.email);
    }, [])
    console.log(yourPatients)

    const pastPatients = yourPatients.filter((patient) => {
        const appDate = new Date(patient.date)
        const currentDate = new Date()
        if(appDate < currentDate && patient.isConfirmed === true) return patient;
    })
    console.log(pastPatients)
    if(currentUser.role === 'patient'){
        return <Navigate to='/'/>
    }
    
    if(currentUser.isverified){
        if(pastPatients.length !== 0){
            return (
                <div className="fadein mb-48 relative top-28 font-poppins min-h-screen">
                    <div className="grid grid-cols-1 gap-y-6 mx-8 md:mx-20" data-aos="fade-up">
        
                        {pastPatients.map((patient) => {
                            return(
                        <div className="shadow-xl">
                            <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                >
                                <div className="flex flex-row items-center w-full">
                                    <Avatar className="mr-5" alt="Remy Sharp" src={patient.image} sx={{ width: 75, height: 75 }} />
                                    <div>
                                        <div className="text-lg font-bold">{patient.patient_name}</div>
                                        <div><span className="font-bold ">Age: </span> {patient.patient_age}</div>
                                    </div>
                                </div>
                            </AccordionSummary>
                                
                            <AccordionDetails>
                                <hr className="border-2 w-full border-blue-600"/>
                                <div className="bg-blue-200 mt-3 py-2 gap-y-4 grid md:grid-cols-2 lg:grid-cols-4 gap-x-5 text-center">
                                    <div>
                                        <div className="font-bold text-md">Gender</div>
                                        <div>{patient.patient_gender}</div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-md">Blood group</div>
                                        <div>{patient.patient_bloodgroup}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-md">Symptoms</div>
                                        <div>{patient.patient_symptoms}</div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-md">Appointment Date</div>
                                        <div>{patient.date}</div>
                                    </div>
                                </div>
                                <div className="text-center py-3 bg-blue-100">
                                    <div className="flex flex-col lg:flex-row justify-center items-center">
                                        <div>
                                            <div className="font-bold text-md">Prescriptions</div>
                                            <ul>{patient.prescriptions.map((presc) => {
                                                return (
                                                    <li className="mr-4 inline">{presc}</li>
                                                )
                                            })}</ul>
                                        </div>
                                        <Prescribe patient={patient.patient_name} doctor_id={patient.doctor_id} presc={patient.prescriptions} date={patient.date}></Prescribe>
                                    </div>
                                </div>
                            </AccordionDetails>
                            </Accordion>
                        </div>
                            )  
                        })}
                    </div>
                </div>
                )
        } else{
            return (
                <div className="fadein relative top-8 min-h-screen font-poppins font-bold flex items-center justify-center text-6xl">YOU HAVE NO<span className="text-primary-blue ml-2"> PATIENTS</span></div>
            )
        }
    } else{
        return (
            <div className="fadein relative top-8 min-h-screen font-poppins font-bold flex items-center justify-center text-6xl">YOUR ACCOUNT IS NOT<span className="text-primary-blue ml-2"> VERIFIED</span></div>
        )
    }
    
}

export default YourPatients