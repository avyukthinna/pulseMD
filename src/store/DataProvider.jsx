import { useContext,createContext } from "react";
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import doc_1 from '../images/doc-prof-1.jpg'
import doc_2 from '../images/doc-prof-2.jpg'
import doc_3 from '../images/doc-prof-3.jpg'
import pf1 from '../images/test-1.jpg'
import pf2 from '../images/test-2.jpg'
import axios from "axios";
import { toast } from 'react-toastify';


export const DataContext = createContext()

export function useData() {
    return useContext(DataContext);
}

export default function DataProvider({children}){
    const {currentUser} = useAuth()

    const [yourPatients, setYourPatients] = useState([
        {
            fullname:'John Doe', 
            image: pf1,
            age:'30',
            gender:'Male',
            bloodgroup:'A+',
            symptoms: 'Fever',
            prescriptions:['Cetrizine - 3 days','Paracetamol - 5 days'],
            date: new Date(),
            isConfimed: true //GRAB DATA ONLY FOR THOSE RECORDS THAT ARE TRUE
        },
        {
            fullname:'Jack Morgan', 
            image: pf2,
            age:'44',
            gender:'Male',
            bloodgroup:'O+',
            symptoms: 'Sore Throat',
            prescriptions:['Cetrizine - 3 days'],
            date: new Date(),
            isConfimed: true //GRAB DATA ONLY FOR THOSE RECORDS THAT ARE TRUE
        },
        {
            fullname:'William Dankworth', 
            age:'39',
            gender:'Male',
            bloodgroup:'O+',
            symptoms: 'Cough',
            prescriptions:['Cetrizine - 3 days'],
            date: new Date(),
            isConfimed: true //GRAB DATA ONLY FOR THOSE RECORDS THAT ARE TRUE
        },
        {
            fullname:'Ashley Gordan', 
            age:'33',
            gender:'Female',
            bloodgroup:'AB+',
            symptoms: 'Cough',
            prescriptions:['Cough Syrup - 7 days'],
            date: new Date(),
            isConfimed: true //GRAB DATA ONLY FOR THOSE RECORDS THAT ARE TRUE
        }
    ])

    const [doctors, setDoctors] = useState([/*
        {
            id:'1',
            fullname:'Mark Doe',
            image: doc_1,
            degree:'MBBS, MD',
            speciality: 'Pediatrician',
            starttime: '09:30',
            endtime: '17:00',
            isverified:true
        },
        {
            id:'2',
            fullname:'Jack Allen',
            degree:'MBBS, MD',
            image: doc_2,
            speciality: 'Orthopedics',
            starttime: '09:00',
            endtime: '15:00',
            isverified:true
        },
        {
            id:'3',
            fullname:'Brown Allen',
            degree:'MBBS, MD',
            speciality: 'Orthopedics',
            starttime: '09:00',
            endtime: '15:00',
            isverified:true
        },
        {
            id:'4',
            fullname:'William Brown',
            degree:'MBBS, MD',
            speciality: 'Radiology',
            starttime: '10:00',
            endtime: '15:00',
            isverified:true
        },
        {
            id:'5',
            fullname:'Max Wood',
            degree:'MBBS, MD',
            speciality: 'Dermatalogy',
            starttime: '11:00',
            endtime: '17:00',
            isverified:true
        },
        {
            id:'6',
            fullname:'Jennifer Allen',
            degree:'MBBS, MD',
            image: doc_3,
            speciality: 'Gynacologist',
            starttime: '09:00',
            endtime: '17:00',
            isverified:true
        }*/
    ])

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:3001/doctors/verified-doctors');
            setDoctors(response.data);
          } catch (error) {
            //toast.error("Couldn't Fetch Doctors")
            console.error('Error fetching verified doctors:', error);
          }
    }

    const value = {
        doctors: doctors,
        fetchDoctors: fetchDoctors,
        yourPatients: yourPatients
    }

    return(
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )

    
}