import { useContext,createContext } from "react";
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import doc_1 from '../images/doc-prof-1.jpg'

export const DataContext = createContext()

export function useData() {
    return useContext(DataContext);
}

export default function DataProvider({children}){
    const {currentUser} = useAuth()
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([
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
            speciality: 'Gynacologist',
            starttime: '09:00',
            endtime: '17:00',
            isverified:true
        },
    ])

    const value = {
        doctors: doctors,
    }

    return(
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )

    
}