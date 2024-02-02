import { useAuth } from "../../store/AuthProvider"
import { useData } from "../../store/DataProvider"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { Avatar } from "@mui/material"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const YourPatients = () => {
    const {currentUser} = useAuth()
    const {yourPatients} = useData()

    useEffect(() => {
        //FETCH YOUR PATIENTS
    }, [])

    if(currentUser.role === 'patient'){
        return <Navigate to='/'/>
    }

    if(yourPatients){
        return (
            <div className="fadein mb-48 relative top-28 font-poppins min-h-screen">
                <div className="grid grid-cols-1 gap-y-6 mx-8 md:mx-20" data-aos="fade-up">
    
                    {yourPatients.map((patient) => {
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
                                    <div className="text-lg font-bold">{patient.fullname}</div>
                                    <div><span className="font-bold ">Age: </span> {patient.age}</div>
                                </div>
                            </div>
                        </AccordionSummary>
                            
                        <AccordionDetails>
                            <hr className="border-2 w-full border-blue-600"/>
                            <div className="bg-blue-200 mt-3 py-2 gap-y-4 grid md:grid-cols-2 lg:grid-cols-4 gap-x-5 text-center">
                                <div>
                                    <div className="font-bold text-md">Gender</div>
                                    <div>{patient.gender}</div>
                                </div>
                                <div>
                                    <div className="font-bold text-md">Blood group</div>
                                    <div>{patient.bloodgroup}</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-md">Symptoms</div>
                                    <div>{patient.symptoms}</div>
                                </div>
                                <div>
                                    <div className="font-bold text-md">Apppointment Date</div>
                                    <div>{patient.date.toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
                                </div>
                            </div>
                            <div className="text-center py-2 bg-blue-100 ">
                                <div className="font-bold text-md">Prescriptions</div>
                                <ul>{patient.prescriptions.map((pres) => {
                                    return (
                                        <li className="mx-3 inline">{pres}</li>
                                    )
                                })}</ul>
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
            <div className="fadein relative top-8 min-h-screen font-poppins font-bold flex items-center justify-center text-6xl">YOU HAVE NO<span className="text-primary-blue ml-2"> PATIENTS!</span></div>
        )
    }
}

export default YourPatients