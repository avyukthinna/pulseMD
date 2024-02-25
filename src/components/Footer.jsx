import { useAuth } from "../store/AuthProvider"
import { Link } from "react-router-dom"
import { Links,patientLinks,doctorLinks } from "./Navbar"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import XIcon from '@mui/icons-material/X';
import PhoneIcon from '@mui/icons-material/Phone';
import CopyrightIcon from '@mui/icons-material/Copyright';


const Footer = () => {
    const {currentUser,userRole} = useAuth()

    return (
        <div className="bg-blue-600 text-primary-white p-4 md:pb-3 md:p-7 font-poppins">
            <div className="flex flex-col-reverse justify-center items-center md:flex-row md:justify-around md:items-start">
                <div className="w-5/6 md:w-2/6">
                    <div className="text-4xl font-logo text-center md:text-left">PulseMD</div>
                    <ul>
                        <li className="my-2 text-center md:text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci quidem ad ea animi tenetur sit aliquid veniam totam est? Eius similique voluptate iure at dolores nemo qui commodi</li>
                        <ul className="flex justify-center md:justify-start">
                            <li className="hover:scale-102"><a href=""><InstagramIcon fontSize="large"/></a></li>
                            <li className="mx-3 hover:scale-102"><a href=""><FacebookIcon fontSize="large"/></a></li>
                            <li className="hover:scale-102"><a href=""><XIcon fontSize="large"/></a></li>
                        </ul>
                    </ul>
                </div>

                <div className="my-8 md:my-0">
                    <div className="font-logo text-4xl mb-2 text-center">Links</div>
                    <ul className="text-center">
                        {currentUser.role === '' && Links.map((link) => (
                            <li key={link.path} className="mt-1 hover:scale-102"><Link to={link.path}>{link.page}</Link></li>
                        ))}

                        {currentUser.role === 'patient' && patientLinks.map((link) => (
                            <li key={link.path} className="mt-1 hover:scale-102"><Link to={link.path}>{link.page}</Link></li>
                        ))}

                    {currentUser.role === 'doctor' && doctorLinks.map((link) => (
                            <li key={link.path} className="mt-1 hover:scale-102"><Link to={link.path}>{link.page}</Link></li>
                    ))}
                    </ul>
                </div>
                <div>
                    <div className="font-logo text-4xl">Have a Question?</div>

                    <ul className="text-center">
                        <li className="mt-2 hover:scale-102"><a href='https://mail.google.com/' target="blank"><EmailIcon/> pulseMD@gmail.com</a></li>
                        <li className="mt-1"><PhoneIcon/> + 1800 3433 23</li>
                    </ul>
                </div>
            </div>

            <hr className="my-4" />
            <p className="text-center text-sm"><CopyrightIcon fontSize="small"/> Copyright 2023 PulseMD</p>
        </div>
    )
}

export default Footer