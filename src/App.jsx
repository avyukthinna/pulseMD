import './App.css';
import { Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Public/Home/Home';
import OurTeam from './pages/Public/OurTeam';
import Layout from './pages/Public/Layout';
import Register from './pages/Public/Register/Register';
/*import DocLogin from './pages/doctor/DocLogin';
import DocSignup from './pages/doctor/DocSignup';
import PatientLogin from './pages/patients/PatientLogin';
import PatientSignup from './pages/patients/PatientSignup';*/
import PrivateRoutes from './routes/PrivateRoutes';
import AuthProvider from './store/AuthProvider';
import DataProvider from './store/DataProvider';
import { Dashboard } from './pages/Dashboard/Dashboard';
import PublicRoutes from './routes/PublicRoutes';
import FindDoc from './pages/patients/FindDoc';
import YourPatients from './pages/doctor/YourPatients';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
import Login from './pages/Public/Register/Login';
import Signup from './pages/Public/Register/SignUp';

function App() {
  useEffect(() => {
    AOS.init({
      duration: '1000'
    })
  },[])

  return (
   <>
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path='/' element = {<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path='/our-team' element={<OurTeam/>}/>
          </Route>

          <Route element={<PublicRoutes/>}>
            <Route path='/Register' element={<Register/>}>
              <Route index element={<Login/>}/>
              <Route path='/Register/signup' element={<Signup/>}/>
            </Route>
          </Route>

          <Route element={<PrivateRoutes/>}>
            <Route path='/' element = {<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path='/our-team' element={<OurTeam/>}/>
                
                  <Route path='/dashboard' element={<Dashboard/>}/>
                  <Route path='/find-doctors' element={<FindDoc/>}/>
                  <Route path='/your-patients' element={<YourPatients/>}/>
            </Route>
          </Route>
        </Routes>
        
        <ToastContainer theme="dark" hideProgressBar={true} newestOnTop={true} pauseOnHover={false} autoClose={3500} />
      </DataProvider>
    </AuthProvider>
   </>
  );
}

export default App;
