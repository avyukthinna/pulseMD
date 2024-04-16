import { useData } from "../../store/DataProvider"
import { useEffect } from "react"
import { useAuth } from "../../store/AuthProvider"

export const Prescriptions = () => {
    const {fetchUserAppointments,userAppointments} = useData()
    const {currentUser} = useAuth();

    useEffect(() => {
        fetchUserAppointments(currentUser.email,currentUser.role)
    }, [])

    const PastAppointments = userAppointments.filter((app) => {
        const appDate = new Date(app.date)
        const currentDate = new Date()
        if(appDate < currentDate && app.prescriptions.length !== 0 && app.isConfirmed === true) return app;
    })
    
    if(PastAppointments.length === 0){
        return (
            <div className="flip min-h-96 mt-8 font-poppins flex items-center justify-center" data-aos="fade-up">
                <div className="text-6xl font-medium text-center">No Prescriptions Yet</div>
            </div>
        )
    } else{
        return (
            <div className="min-h-96 mt-6 font-poppins flex flex-col" data-aos="fade-up">
            {PastAppointments.map((app) => {
                return (
                    <div className="bg-blue-100 mb-4 rounded-md p-3 flex flex-col sm-xl:flex-row items-center sm-xl:items-baseline justify-between hover:scale-101 hover:duration-200">
                            <div className="flex flex-col text-center sm-xl:text-left">
                                <div className="font-semibold text-lg text-primary-blue sm-xl:mb-2">Dr. {app.doctor_name}</div>
                                <div>{app.prescriptions.map((presc) => {
                                    return (
                                        <li>{presc}</li>
                                    )
                                })}</div>
                            </div>
                            <div className="mt-3 sm-xl:mt-0">{app.date}</div>
                    </div>
                )
            })}
        </div>
    )}
}