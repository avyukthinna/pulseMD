import { useAuth } from "../../store/AuthProvider"
import { useState } from "react";
import MyProfile from "./MyProfile";
import ScheduledMeetings from "./ScheduledMeetings";
import { Avatar } from "@mui/material";

export const Dashboard = () => {
    const [tab, setTab] = useState("profile")
    const {currentUser} = useAuth()

    return(
        <div className="w-full relative top-24 flex flex-col lg:flex-row font-poppins items-center mb-48 min-h-screen px-5">
            <div className="flex flex-col items-center justify-center mb-4 mx-5">
                <Avatar className="mb-5" alt="Remy Sharp" src={currentUser.image} sx={{ width: 150, height: 150 }} />
            
                <div className="text-center text-6xl font-bold">Hello <span className="text-primary-blue">{currentUser.role === 'doctor' && `Dr.`} {currentUser.fullname}!</span></div>
            </div>

            <div className="px-8 py-5 rounded-lg shadow-xl w-3/5 ">
                <div className="flex-col flex lg:flex-row justify-center">
                    <button onClick={() => setTab('profile')} className={`${tab === 'profile' && "active-tab"} tab px-3 py-2`}>My Profile</button>
                    <button onClick={() => setTab('meetings')} className={`${tab === 'meetings' && "active-tab"} tab px-3 py-0 mx-3`}>Scheduled Meetings</button>
                    {currentUser.role === 'patient' && <button onClick={() => setTab('prescriptions')} className={`${tab === 'prescriptions' && "active-tab"} tab px-3 py-2 `}>My Prescriptions</button>}
                </div>
                
                {tab === 'profile' && <MyProfile/>}
                {tab === 'meetings' && <ScheduledMeetings/>}

                
            </div>
        </div>
    )
}