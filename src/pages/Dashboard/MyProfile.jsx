import { useAuth } from "../../store/AuthProvider";
import { useState } from "react";
import { Alert } from "@mui/material";

export default function MyProfile(){
    const {currentUser,updateUserDetails,handleSaveChanges, isEditing, setIsEditing} = useAuth()
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFieldClick = (field) => {
        setIsEditing(field);
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          updateUserDetails({ image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };
    
    const handleInputChange = (e) => {
      updateUserDetails({[e.target.name]: e.target.value});
    };
  
    if(currentUser.role === 'patient'){
      return (
          <div className="mt-8 flex flex-col min-h-96 justify-center" data-aos='fade-up'>
              <div className="flex flex-col mb-4">
                <label className="font-bold text-md">Name*</label>
                <input
                    className="py-2 border-b-2 outline-none focus:border-blue-700"
                    type="text"
                    required
                    placeholder="Full Name"
                    name="fullname"
                    value={currentUser.fullname}
                    onClick={() => handleFieldClick('fullname')}
                    onChange={handleInputChange}
                    readOnly//={!isEditing || isEditing !== 'fullname'}
                />
              </div>

              <div className="flex flex-col justify-between items-baseline mb-4">
                <label className="font-bold text-md">Email*</label>
                  <input
                    className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
                    placeholder="Email"
                    type="email"
                    required
                    name="email"
                    value={currentUser.email}
                    readOnly
                  />
              </div>

              <div className="flex flex-col mb-4">  
                <label className="font-bold text-md ">Password*</label>   
                <input
                  className="py-2 border-b-2 outline-none focus:border-blue-700"
                  placeholder="Password"
                  required
                  type="password"
                  name="password"
                  value={currentUser.password}
                  readOnly
                />                 
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="w-full flex flex-col items-baseline mb-5">
                  <label className="font-bold text-md mr-4">Age</label>                 
                  <input
                  className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
                      type="number"
                      name="age"
                      placeholder="Enter Age"
                      maxLength={2}
                      value={currentUser.age}
                      onClick={() => handleFieldClick('age')}
                      onChange={handleInputChange}
                      readOnly={!isEditing || isEditing !== 'age'}
                  />                
                </div>

                <div className="flex flex-col items-baseline mb-5 w-full">
                  <label className="font-bold text-md">Gender</label>  
                  <select
                    className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
                    name="gender"
                    value={currentUser.gender}
                    onClick={() => handleFieldClick('gender')}
                    onChange={handleInputChange}
                    readOnly={!isEditing || isEditing !== 'gender'}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>                   
                </div>
              </div>
            
              <div className="flex flex-col justify-between items-baseline mb-4">
                  <label className="font-bold text-md"> Blood Group </label>                 
                  <input
                    name="bloodgroup"
                    className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
                    type="text"
                    maxLength={3}
                    value={currentUser.bloodgroup}
                    onClick={() => handleFieldClick('bloodgroup')}
                    onChange={handleInputChange}
                    readOnly={!isEditing || isEditing !== 'bloodgroup'}
                  />                
              </div>

              <div className="flex flex-col justify-between items-baseline mb-4">
                  <label className="font-bold text-md">Address</label>
                  <input
                    name="address"
                    className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
                    type="text"
                    value={currentUser.address}
                    onClick={() => handleFieldClick('address')}
                    onChange={handleInputChange}
                    readOnly={!isEditing || isEditing !== 'address'}
                  />
              </div>
              <div className="flex flex-col justify-between items-baseline mb-4">
                  <label className="font-bold text-md">Profile Picture</label>
                  <input
                    name="image"
                    className="py-2"
                    type="file"
                    onChange={handleImageChange}
                  />
              </div>

          <button className="mb-4 w-full text-primary-white p-2 bg-blue-600 hover:bg-blue-700" onClick={handleSaveChanges}>Save Changes</button>
          <button className="w-full text-primary-white p-2 bg-red-600 hover:bg-red-700" onClick={handleSaveChanges}>Delete Account</button>
      </div>
      )
  }



  if(currentUser.role === 'doctor'){
    return(
      <div className="mt-8 flex flex-col" data-aos='fade-up'>
        {!currentUser.isverified && <Alert className="mb-6" severity="warning">Your profile is yet to be verified by our admins.</Alert>}
        <div className="flex flex-col mb-4">
          <label className="font-bold text-md">Name*</label>
          <input
              className="py-2 border-b-2 outline-none focus:border-blue-700"
              type="text"
              required
              placeholder="Full Name"
              name="fullname"
              value={currentUser.fullname}
              onClick={() => handleFieldClick('fullname')}
              onChange={handleInputChange}
              readOnly//={!isEditing || isEditing !== 'fullname'}
          />
        </div>

        <div className="flex flex-col justify-between items-baseline mb-4">
          <label className="font-bold text-md">Email*</label>
            <input
              className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
              placeholder="Email"
              type="email"
              required
              name="email"
              value={currentUser.email}
              readOnly
            />
        </div>

        <div className="flex flex-col mb-4">  
          <label className="font-bold text-md ">Password*</label>   
          <input
            className="py-2 border-b-2 outline-none focus:border-blue-700"
            placeholder="Password"
            required
            type="password"
            name="password"
            value={currentUser.password}
            readOnly
          />                 
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="w-full flex flex-col items-baseline mb-5">
            <label className="font-bold text-md mr-4">Age</label>                 
            <input
            className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
                type="number"
                name="age"
                placeholder="Enter Age"
                maxLength={2}
                value={currentUser.age}
                onClick={() => handleFieldClick('age')}
                onChange={handleInputChange}
                readOnly={!isEditing || isEditing !== 'age'}
            />                
          </div>

          <div className="flex flex-col items-baseline mb-5 w-full">
            <label className="font-bold text-md">Gender</label>  
            <select
              className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
              name="gender"
              value={currentUser.gender}
              onClick={() => handleFieldClick('gender')}
              onChange={handleInputChange}
              readOnly={!isEditing || isEditing !== 'gender'}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>                   
          </div>

          <div className="w-full flex flex-col items-baseline mb-5">
              <label className="font-bold text-md mr-4">Registration No.</label>                 
              <input
              className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
                  type="number"
                  name="regno"
                  placeholder="Enter Registration No."
                  maxLength={8}
                  value={currentUser.regno}
                  onClick={() => handleFieldClick('regno')}
                  onChange={handleInputChange}
                  readOnly={!isEditing || isEditing !== 'regno'}
              />                
          </div>
          <div className="w-full flex flex-col items-baseline mb-5">
              <label className="font-bold text-md">Registration Year</label>                 
              <input
              className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
                  type="number"
                  name="regyear"
                  placeholder="Enter Registration Year"
                  min={1900}
                  max={2099}
                  maxLength={4}
                  value={currentUser.regyear}
                  onClick={() => handleFieldClick('regyear')}
                  onChange={handleInputChange}
                  readOnly={!isEditing || isEditing !== 'regyear'}
              />                
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-bold text-md">Degree*</label>
          <input
              className="py-2 border-b-2 outline-none focus:border-blue-700"
              type="text"
              required
              placeholder="Degree"
              name="degree"
              value={currentUser.degree}
              onClick={() => handleFieldClick('degree')}
              onChange={handleInputChange}
              readOnly={!isEditing || isEditing !== 'degree'}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="w-full flex flex-col items-baseline mb-5">
            <label className="font-bold text-md">Experience (years)</label>                 
            <input
            className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
                type="number"
                name="experience"
                placeholder="Enter Experience (in years)"
                min={2}
                value={currentUser.experience}
                onClick={() => handleFieldClick('experience')}
                onChange={handleInputChange}
                readOnly={!isEditing || isEditing !== 'experience'}
            />        
          </div>

          <div className="flex flex-col items-baseline mb-5 w-full">
            <label className="font-bold text-md">Speciality</label>  
            <select
              className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
              name="speciality"
              value={currentUser.speciality}
              onClick={() => handleFieldClick('speciality')}
              onChange={handleInputChange}
              readOnly={!isEditing || isEditing !== 'speciality'}
            >
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Radiology">Radiology</option>
              <option value="Surgery">Surgery</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Gynecology">Gynecology</option>
            </select>                   
          </div>
        </div>

        <div className="flex flex-col justify-between items-baseline mb-4">
          <label className="font-bold text-md">Address</label>
          <input
            name="address"
            className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
            type="text"
            value={currentUser.address}
            onClick={() => handleFieldClick('address')}
            onChange={handleInputChange}
            readOnly={!isEditing || isEditing !== 'address'}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="w-full flex flex-col items-baseline mb-5">
            <label className="font-bold text-md">Starting Time*</label>                 
            <input
            className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
                type="time"
                name="starttime"
                value={currentUser.starttime}
                required
                onClick={() => handleFieldClick('starttime')}
                onChange={handleInputChange}
                readOnly={!isEditing || isEditing !== 'starttime'}
            />                
          </div>

          <div className="w-full flex flex-col items-baseline mb-5">
            <label className="font-bold text-md">Ending Time*</label>                 
            <input
            className="w-full py-2 border-b-2 outline-none focus:border-blue-700"
                type="time"
                name="endtime"
                value={currentUser.endtime}
                required
                onClick={() => handleFieldClick('endtime')}
                onChange={handleInputChange}
                readOnly={!isEditing || isEditing !== 'endtime'}
            />                
          </div>
        </div>
        <div className="flex flex-col justify-between items-baseline mb-4">
                  <label className="font-bold text-md">Profile Picture</label>
                  <input
                    name="image"
                    className="py-2"
                    type="file"
                    onChange={handleImageChange}
                  />
              </div>

        <button className="mb-4 w-full text-primary-white p-2 bg-blue-600 hover:bg-blue-700" onClick={handleSaveChanges}>Save Changes</button>
        <button className="w-full text-primary-white p-2 bg-red-600 hover:bg-red-700" onClick={handleSaveChanges}>Delete Account</button>
      </div>
    )
  }
}