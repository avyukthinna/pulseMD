import { useContext,createContext } from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import pf1 from '../images/test-1.jpg'
import doc_1 from '../images/doc-prof-1.jpg'
import axios from 'axios';
const {Encryption} = require('../utils/AES/AESEncrypt');
const {Decryption} = require('../utils/AES/AESDecrypt');

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
        image: pf1,
        age:'30',
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
    const [userRole, setUserRole] = useState('')

    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate() 

    //USER LOGIN/LOGOUT SIGNIN/SIGNOUT

    const handleSignup = async (name,email,password,role) => {
        name = Encryption(name);
        email = Encryption(email);
        password = Encryption(password);
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
            console.error('Signup error:', error.response.data.message);
            toast.error(error.response.data.message)
          }
    }

    useEffect(() => {
        if (sessionStorage.getItem('currentUser') !== null) {
            setCurrentuser(JSON.parse(sessionStorage.getItem('currentUser')))
            console.log(currentUser)
            console.log(userRole);
        } 
    },[]);

    const handleLogin = async (email,password,role) => {
        //USER FETCHING FUNCTION 
        email = Encryption(email);
        password = Encryption(password);
        try {
            const response = await axios.post('http://localhost:3001/login', {
              email, 
              password, 
              role
            });
            
      
            console.log(response.data); // Successful login message
            const user = await response.data.user;
            //console.info(user);

            try { 
                

            if(user.isverified === true) {
                // Decrypt necessary fields
                user.email = Decryption(user.email);
                user.fullname = Decryption(user.fullname);
                user.age = Decryption(user.age);
                user.image = Decryption(user.image);
                user.gender = Decryption(user.gender);
                user.bloodgroup = Decryption(user.bloodgroup);
                user.address = Decryption(user.address);
            } else {
                user.email = Decryption(user.email);
                user.fullname = Decryption(user.fullname);
            }
            //console.info(user);

            } catch(e) {
                console.error(e)
            }

            console.info('nameeeeeeee:'+(user.fullname === 'B'));

            setUserRole('patient')
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            setCurrentuser(user);
            toast.success("Logged In!")
            navigate('/dashboard')
        } catch (error) {
            console.log(role);
            //console.error('Login error:', error.response.data);
            toast.error(error.response.data.message)
        }

       /*if(role === 'patient'){
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
        }*/
    }

    function handleLogout(){
        //setUserRole('')
        sessionStorage.removeItem('currentUser');
        setCurrentuser('');
        console.log(currentUser)
        navigate('/Register')
    }

    const handleDeleteAccount = async () => {
        try{
            const response = await axios.delete('http://localhost:3001/deleteAccount', {
               data:{
                    email:  currentUser.email,  
                    role:  currentUser.role
                }
            });
            console.log(response.data.message)
            sessionStorage.removeItem('currentUser');
            toast.success(response.data.message)
            setCurrentuser('');
        } catch(error){
            console.log(error);
            toast.error("Error in deleting account")
        }
    }

    //USER DETAILS UPDATE
    const updateUserDetails = (updatedDetails) => {
        console.log(updatedDetails)
        setCurrentuser((prevDetails) => ({
          ...prevDetails,
          ...updatedDetails
        }));
        console.log(currentUser)
    };

    const handleSaveChanges = async () => {
        //FUNCTION UPDATE USER DETAILS IN DB
        console.info('Updated user details:', currentUser);
        try{

            if (currentUser.role === "doctor") {
                // Update fields for doctors
                currentUser.fullname = Encryption(currentUser.fullname);
                currentUser.email = Encryption(currentUser.email);
                //currentUser.image = currentUser.image || ""; //If no image is sent, it is set to ""
                currentUser.gender = Encryption(currentUser.gender);
                currentUser.address = Encryption(currentUser.address);
                currentUser.age = Encryption(currentUser.age);
                currentUser.degree = Encryption(currentUser.degree);
                currentUser.speciality = Encryption(currentUser.speciality);
                currentUser.regno = Encryption(currentUser.regno);
                currentUser.regyear = Encryption(currentUser.regyear);
                currentUser.experience = Encryption(currentUser.experience);
                currentUser.starttime = Encryption(currentUser.starttime);
                currentUser.endtime = Encryption(currentUser.endtime);
                currentUser.isverified = true;
              } else if (currentUser.role === "patient") {
                // Update fields for patients
                currentUser.fullname = Encryption(currentUser.fullname);
                currentUser.email = Encryption(currentUser.email);
                currentUser.age = Encryption(currentUser.age);
                //currentUser.image = currentUser.image || ""; //If no image is sent, it is set to ""
                currentUser.gender = Encryption(currentUser.gender);
                currentUser.bloodgroup = Encryption(currentUser.bloodgroup);
                currentUser.address = Encryption(currentUser.address);
                currentUser.isverified = true;
              }

            const response = await axios.post('http://localhost:3001/updateProfiles', {
                currentUser
            });
            //console.log(response.data.message)
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            setIsEditing(false);
            toast.success("Details Updated!")
            console.info(currentUser);
            // currentUser.email = Encryption(currentUser.email);
            // currentUser.name = Encryption(currentUser.name);
            try {
                const response = await axios.post('http://localhost:3001/fetchUser', {
                    currentUser
                });
          
                const user = await response.data;

                try { 
                    if(user.isverified === true) {
                        // Decrypt necessary fields
                        if(user.role === "patient"){
                            user.email = Decryption(user.email);
                            user.fullname = Decryption(user.fullname);
                            user.age = Decryption(user.age);
                            user.image = Decryption(user.image);
                            user.gender = Decryption(user.gender);
                            user.bloodgroup = Decryption(user.bloodgroup);
                            user.address = Decryption(user.address);
                        }
                        if(user.role === "doctor"){
                            user.fullname = Decryption(user.fullname);
                            user.email = Decryption(user.email);
                            user.image = Decryption(user.image);
                            user.gender = Decryption(user.gender);
                            user.address = Decryption(user.address);
                            user.age = Decryption(user.age);
                            user.degree = Decryption(user.degree);
                            user.speciality = Decryption(user.speciality);
                            user.regno = Decryption(user.regno);
                            user.regyear = Decryption(user.regyear);
                            user.experience = Decryption(user.experience);
                            user.starttime = Decryption(user.starttime);
                            user.endtime = Decryption(user.endtime);
                        }
                    } else {
                        user.email = Decryption(user.email);
                        user.fullname = Decryption(user.fullname);

                        /*user.age = Decryption(user.age);
                        user.image = Decryption(user.image);
                        user.gender = Decryption(user.gender);
                        user.bloodgroup = Decryption(user.bloodgroup);
                        user.address = Decryption(user.address);*/
                    }
                    //console.info(user);
        
                    } catch(e) {
                        console.error(e)
                    }

                sessionStorage.setItem('currentUser', JSON.stringify(user));
                setCurrentuser(user)
            } catch (error) {
                console.error('Login error:', error.response.data);
                //toast.error(error)
            }
        } catch(error){
            console.log(error);
            toast.error("Error in updating profile")
        }
    }
    
    const value = {
        currentUser: currentUser,
        userRole: userRole,
        isEditing: isEditing,
        setIsEditing: setIsEditing,
        handleLogin: handleLogin,
        handleSignup: handleSignup,
        handleSaveChanges: handleSaveChanges,
        updateUserDetails: updateUserDetails,
        handleLogout: handleLogout,
        handleDeleteAccount: handleDeleteAccount
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}