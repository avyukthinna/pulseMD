import { useContext,createContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import doc_1 from '../images/doc-prof-1.jpg'

export const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({children}){
    //const [currentUser, setCurrentuser] = useState({id:10, email:'john@gmail.com',password:'john1234',fullname:'John Doe', image: doc_1,age:'30',gender:'Male',bloodgroup:'A+',address:'123 Baker Street',role:'patient', isverified:true})
    const [currentUser, setCurrentuser] = useState(
        {id:'1',
        email:'mark@gmail.com',
        password:'mark1234',
        fullname:'Mark Doe',
        image: doc_1,
        age:'55',
        gender:'Male',
        bloodgroup:'O+',
        address:'123 Baker Street',
        role:'doctor',
        degree:'MBBS, MD',
        speciality: 'Pediatrician',
        regno:'12345678',
        regyear:'1998',
        experience: '15',
        starttime: '09:00',
        endtime: '17:00',
        isverified:false})


    //const [currentUser, setCurrentuser] = useState('')
    const [userRole, setUserRole] = useState('')

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate() 

    //USER LOGIN/LOGOUT SIGNIN/SIGNOUT

    /*function handleSignup(name,email,password,role){

    }*/

    function handleLogin(email,password,role){
        //DATA FETCHING FUNCTION COMES HERE
        if(role === 'patient'){
            setUserRole('patient')
            setCurrentuser(true)
            navigate('/dashboard')
        }

        if(role === 'doctor'){
            setUserRole('doctor')
            setCurrentuser(true)
            navigate('/dashboard')
        }
    }

    function handleLogout(){
        setUserRole('')
        setCurrentuser({})
        navigate('/Register')
    }

    //USER DETAILS UPDATE
    const updateUserDetails = (updatedDetails) => {
        console.log(updatedDetails)
        setCurrentuser((prevDetails) => ({
          ...prevDetails,
          ...updatedDetails
        }));
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
        console.log('Updated user details:', currentUser);
    }
    
    const value = {
        currentUser: currentUser,
        userRole: userRole,
        isEditing: isEditing,
        setIsEditing: setIsEditing,
        handleLogin: handleLogin,
        handleSaveChanges: handleSaveChanges,
        updateUserDetails: updateUserDetails,
        handleLogout: handleLogout,
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}