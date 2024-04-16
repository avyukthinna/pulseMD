import { NavLink,Link } from "react-router-dom"
import { useAuth } from "../store/AuthProvider"
import {useEffect,useState } from "react"

export const Links = [
    {'page':'Home', 'path': '/'},
    {'page':'Our Team','path':'/our-team'}
]

export const patientLinks = [
    {'page':'Home', 'path': '/'},
    {'page':'Dashboard', 'path':'/dashboard'},
    {'page':'Find Doctors', 'path': '/find-doctors'},
    {'page':'Our Team','path':'/our-team'}
]

export const doctorLinks = [
    {'page':'Home', 'path': '/'},
    {'page':'Dashboard', 'path':'/dashboard'},
    {'page':'Your Patients', 'path': '/your-patients'},
    {'page':'Our Team','path':'/our-team'}
]

const Navbar = () => {
    const {currentUser,handleLogout,userRole} = useAuth()
    const [isSticky, setSticky] = useState(false);
    const [isOpen, setIsopen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsopen(!isOpen)
  }

  const handleUserLogout = () => {
    handleLogout()
  }

    /*if(userRole === 'patient'){
        return (
            <div className={`flex items-center justify-between font-poppins py-3 px-10 absolute w-full z-50 ${isSticky ? 'sticky_header':''}`}>
                <div className="font-logo text-5xl">Pulse<span className="text-primary-blue">MD</span></div>
                <div className="flex justify-center">
                    {patientLinks.map((link) => {
                        return <li className="inline-block mr-8 " key={link.path}>
                                    <NavLink 
                                    className={navClass => navClass.isActive ? "text-primary-blue" :"hover:text-primary-blue"} 
                                    to={link.path}>{link.page}</NavLink>
                                </li>
                    })}
                </div>
                <Link className="font-semibold border-2 border-blue-700 rounded-full px-4 py-1 hover:bg-blue-700 hover:text-primary-white" to='/Register'>Log Out</Link>
            </div>
            )
    }

    if(userRole === 'doctor'){
        return (
            <div className="flex items-center justify-between font-poppins py-3 px-10 absolute w-full z-50">
                <div className="font-logo text-5xl">Pulse<span className="text-primary-blue">MD</span></div>
                <div className="flex justify-center">
                    {doctorLinks.map((link) => {
                        return <li className="inline-block mr-8 " key={link.path}>
                                    <NavLink 
                                    className={navClass => navClass.isActive ? "text-primary-blue" :"hover:text-primary-blue"} 
                                    to={link.path}>{link.page}</NavLink>
                                </li>
                    })}
                </div>
                <Link className="font-semibold border-2 border-blue-700 rounded-full px-4 py-1 hover:bg-blue-700 hover:text-primary-white" to='/Register'>Log Out</Link>
            </div>
            )
    }
    
    return (
            <div className="flex items-center justify-between font-poppins py-3 px-10 absolute w-full z-50">
                <div className="font-logo text-5xl">Pulse<span className="text-primary-blue">MD</span></div>
                <div className="flex justify-center">
                    {Links.map((link) => {
                        return <li className="inline-block mr-8 " key={link.path}>
                                    <NavLink 
                                    className={navClass => navClass.isActive ? "text-primary-blue" :"hover:text-primary-blue"} 
                                    to={link.path}>{link.page}</NavLink>
                                </li>
                    })}
                </div>
                <Link className="font-semibold border-2 border-blue-700 rounded-full px-4 py-1 hover:bg-blue-700 hover:text-primary-white" to='/Register'>Log In</Link>
            </div>
    )*/
    
    console.log(currentUser.role);

    return (
        <div className={`flex items-center justify-between font-poppins py-3 px-10 absolute w-full z-50 ${isSticky && 'sticky_navbar'}`}>
            <div className="font-logo text-5xl">Pulse<span className="text-primary-blue">MD</span></div>
            <div className={`${isOpen && 'open'} side-nav flex justify-center`}>
                <div className="relative cursor-pointer flex flex-col justify-between h-5 lg:hidden" onClick={toggleMenu}>
                    <div className="bar w-6 h-1 bg-black"></div>
                    <div className="bar w-6 h-1 bg-black"></div>
                    <div className="bar w-6 h-1 bg-black"></div>
                </div>

                {!currentUser.role &&
                    Links.map((link) => {
                        return <li className="inline-block mt-5 lg:mr-8 lg:mt-0" key={link.path}>
                                    <NavLink 
                                    className={navClass => navClass.isActive ? "text-primary-blue" :"hover:text-primary-blue"} 
                                    to={link.path}>{link.page}</NavLink>
                                </li>
                    })
                }

                {currentUser.role === 'patient' &&
                    patientLinks.map((link) => {
                        return <li className="inline-block mt-5 lg:mr-8 lg:mt-0"  key={link.path}>
                                    <NavLink 
                                    className={navClass => navClass.isActive ? "text-primary-blue" :"hover:text-primary-blue"} 
                                    to={link.path}>{link.page}</NavLink>
                                </li>
                    })
                }

                {currentUser.role === 'doctor' &&
                    doctorLinks.map((link) => {
                        return <li className="inline-block mt-5 lg:mr-8 lg:mt-0"  key={link.path}>
                                    <NavLink 
                                    className={navClass => navClass.isActive ? "text-primary-blue" :"hover:text-primary-blue"} 
                                    to={link.path}>{link.page}</NavLink>
                                </li>
                    })
                }
            </div>
            <div className="flex flex-row items-center justify-center">
                {!currentUser && <Link className="font-semibold border-2 border-blue-700 rounded-full px-4 py-1 hover:bg-blue-700 hover:text-primary-white" to='/Register'>Log In</Link> }
                {currentUser && <button onClick={handleUserLogout} className="font-semibold border-2 border-blue-700 rounded-full px-4 py-1 hover:bg-blue-700 hover:text-primary-white">Log Out</button>}
                <div className="ml-4 cursor-pointer flex flex-col justify-between h-5 lg:hidden" onClick={toggleMenu}>
                    <div className="w-6 h-1 bg-black"></div>
                    <div className="w-6 h-1 bg-black"></div>
                    <div className="w-6 h-1 bg-black"></div>
                </div>
            </div>
            
        </div>
    )
}

export default Navbar