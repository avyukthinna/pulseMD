import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Alert } from '@mui/material';

const BookAppointment = ({doctor_id,starttime,endtime,currentUser}) => {
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [appointment, setAppointment] = useState({
      date: null,
      symptoms: '',
      doctor_id:doctor_id,
      isConfimed: false
    });
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false)
      setErrorMessage('');
    };

    const handleDateChange = (date) => {
    setAppointment(prevState => ({ ...prevState, date }));
    };

    const handleSymptomsChange = (event) => {
      setAppointment(prevState => ({ ...prevState, symptoms: event.target.value }));
    };

    const isTimeWithinSchedule = (date) => {
      if (!date) return false;
     
      const appointmentTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      return appointmentTime >= starttime && appointmentTime <= endtime;
    };

    const handleBookAppointment = (e) => {
      e.preventDefault()
      if (isTimeWithinSchedule(appointment.date)){
        //FUNCTON TO PUSH APPOINTMENT TO DATABASE
        console.log(appointment)

        alert('Booked!')
        setErrorMessage('')
        setAppointment(prevState => ({ ...prevState, symptoms: '',date:null }));
        setOpen(false)
      } else {
        setErrorMessage("Please choose the time within the doctor's slot");
      }
    };

    return (
      <>
        <button className=" bg-blue-600 text-primary-white text-center w-full p-2 mt-4 hover:bg-blue-700" onClick={handleOpen}>Book Appointment</button>
        <Modal
          open={open}
          onClose={handleClose}
          className="flex justify-center h-fit mt-52 font-poppins"
          >
          <form className="flex flex-col bg-white p-5 w-96"  onSubmit={handleBookAppointment}>
              <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DateTimePicker
                  label="Select Date and Time"
                  value={appointment.date}
                  onChange={handleDateChange}
                  minDate={new Date()} // Optionally set a minimum date
                />
              </LocalizationProvider>
              <textarea className='mt-4 border-2 p-1' value={appointment.symptoms} name="symptoms" id="" cols="30" rows="5" placeholder='Enter Symptoms' onChange={handleSymptomsChange}></textarea>

              <button className='mt-5 p-2 bg-blue-600 text-primary-white hover:bg-blue-700'>Confirm</button>
              {errorMessage && <Alert className='mt-4' severity="error">{errorMessage}</Alert>}
          </form>
        </Modal>
      </>
    )
}

export default BookAppointment