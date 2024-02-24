import { useContext,createContext } from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import pf1 from '../images/test-1.jpg'
import doc_1 from '../images/doc-prof-1.jpg'
import axios from 'axios';

export const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({children}){
    /*const [currentUser, setCurrentuser] = useState(
        {id:10, 
        email:'john@gmail.com',
        password:'john1234',
        fullname:'John Doe', 
        image: pf1,age:'30',
        gender:'Male',
        bloodgroup:'A+',
        address:'123 Baker Street',
        role:'patient', 
        isverified:true})*/

    /*const [currentUser, setCurrentuser] = useState(
        {id:'1',
        email:'mark@gmail.com',
        password:'mark1234',
        fullname:'Mark Doe',
        image: doc_1,
        age:'55',
        gender:'Male',
        address:'123 Baker Street',
        role:'doctor',
        degree:'MBBS, MD',
        speciality: 'Pediatrician',
        regno:'12345678',
        regyear:'1998',
        experience: '15',
        starttime: '09:00',
        endtime: '17:00',
        isverified:true})*/

    const [currentUser, setCurrentuser] = useState('')
    //const [userRole, setUserRole] = useState('patient')

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate() 

    //USER LOGIN/LOGOUT SIGNIN/SIGNOUT

    const handleSignup = async (name,email,password,role) => {
        try {
            const response = await axios.post('http://localhost:3001/signup', {
              role,
              name,
              email,
              password,
            });
      
            console.log(response.data); // Successful registration message
            navigate('/Register')
            toast.success("Signed Up!")
          } catch (error) {
            console.log(role);
            //console.error('Signup error:', error.response.data);
            toast.error("Sign Up Error!")
          }
    }

    useEffect(() => {
        if (sessionStorage.getItem('currentUser') !== null) {
            setCurrentuser(JSON.parse(sessionStorage.getItem('currentUser')))
        } 
    },[]);

    const handleLogin = async (email,password,role) => {
        /*USER FETCHING FUNCTION 
        try {
            const response = await axios.post('http://localhost:3001/login', {
              email, 
              password, 
              role
            });
      
            console.log(response.data); // Successful login message
            sessionStorage.setItem('currentUser', JSON.stringify(response.data));
            setCurrentuser(response.data); // Set the user state upon successful login
            toast.success("Logged In!")
            navigate('/dashboard')
        } catch (error) {
            console.log(role);
            //console.error('Login error:', error.response.data);
            toast.error("Login Error")
        }*/

        if(role === 'patient'){
            //setUserRole('patient')
            const user = {id:10, 
                email:email,
                password:password,
                fullname:'John Doe', 
                image: pf1,
                age:'30',
                gender:'Male',
                bloodgroup:'A+',
                address:'123 Baker Street',
                role:'patient', 
                isverified:true}
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            setCurrentuser(user)
            toast.success("Logged In!")
            navigate('/dashboard')
        }

        if(role === 'doctor'){
            //setUserRole('doctor')
            const user = {id:'1',
            email:email,
            password:password,
            fullname:'Mark Doe',
            image: doc_1,
            age:'55',
            gender:'Male',
            address:'123 Baker Street',
            role:'doctor',
            degree:'MBBS, MD',
            speciality: 'Pediatrician',
            regno:'12345678',
            regyear:'1998',
            experience: '15',
            starttime: '09:00',
            endtime: '17:00',
            isverified:true}

        sessionStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentuser(user);
            toast.success("Logged In!")
            navigate('/dashboard')
        }
    }

    function handleLogout(){
        //setUserRole('')
        sessionStorage.removeItem('currentUser');
        setCurrentuser('');
        console.log(currentUser)
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
        //FUNCTION UPDATE USER DETAILS IN DB
        setIsEditing(false);
        toast.success("Details Updated!")
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        console.log('Updated user details:', currentUser);
    }
    
    const value = {
        currentUser: currentUser,
        //userRole: userRole,
        isEditing: isEditing,
        setIsEditing: setIsEditing,
        handleLogin: handleLogin,
        handleSignup: handleSignup,
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