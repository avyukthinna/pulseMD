import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DocLogin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [emailError, setEmailError] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        navigate('/')
    }
    return (
        <div className="rounded-xl backdrop-blur-lg bg-white/30 shadow-lg ring-black-5 w-4/5 py-8 flex flex-col justify-center items-center">
            <div className="text-4xl mb-4 font-bold">Log In</div>
            <div className="flex">
                <Link className="mr-4 py-1 px-3 rounded-full bg-gradient-to-r from-blue-700 from-50% to-white/30 to-50% bg-right bg-200% hover:bg-left transition-all duration-300 hover:text-primary-white" to='/Register'>Patient</Link>
                <Link className="py-1 px-3 rounded-full border-blue-700 bg-blue-700 text-primary-white" to='Register/doclogin'>
                    Doctor
                </Link>
            </div>

            <div className="mt-8 mb-4 w-4/5 flex-col">
                <form onSubmit={handleLogin}>
                    <div>
                        <label className="text-primary-blue font-semibold" htmlFor="email">Email Address</label><br />
                        <input 
                        className="outline w-full mt-2 mb-7 h-8 p-2 rounded-md" 
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label className="text-primary-blue font-semibold" htmlFor="password">Password</label><br />
                        <input
                        className="outline w-full mt-2 h-8 p-2 mb-2 rounded-md" 
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="text-center mt-4">
                        <input type="submit" value='Login' className="border-2 text-primary-white bg-blue border-blue-700 bg-blue-700 w-full text-lg rounded-md hover:bg-blue-600 hover:border-blue-600 cursor-pointer"/>
                    </div>
                </form>
            </div>

            <div><span>Don't have an account? </span><Link className="underline text-primary-blue" to='/Register/docsignup'>Sign up</Link></div>
        </div>
    )
}

export default DocLogin;