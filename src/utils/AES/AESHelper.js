const {Encryption} = require('./AESEncrypt');
const {Decryption} = require('./AESDecrypt');
const { default: YourPatients } = require('../../pages/doctor/YourPatients');

function decryptAndClean(field) {
	const decryptedField = Decryption(field);
	//console.info('Decrypted field:', decryptedField); // Log the decrypted value
	return decryptedField.replace(/\u0000/g, ''); // Remove \u0000 and any trailing characters
}

function EncryptPatient(user) {
	user = JSON.parse(user);

	user.fullname = Encryption(user.fullname);
	user.email = Encryption(user.email);
	user.age = Encryption(user.age);
	//user.image = user.image || ""; //If no image is sent, it is set to ""
	user.gender = Encryption(user.gender);
	user.bloodgroup = Encryption(user.bloodgroup);
	user.address = Encryption(user.address);
	user.isverified = true;

	return user;
}

function DecryptPatient(user) {
	user = JSON.parse(user);

    user.email = decryptAndClean(user.email);
    user.fullname = decryptAndClean(user.fullname);
    user.age = decryptAndClean(user.age);//.slice[0,7];
    user.image = decryptAndClean(user.image);
    user.gender = decryptAndClean(user.gender);
    user.bloodgroup = decryptAndClean(user.bloodgroup);
    user.address = decryptAndClean(user.address);

    return user;
}

function EncryptDoctor(user) {
	user = JSON.parse(user);

	user.fullname = Encryption(user.fullname);
	user.email = Encryption(user.email);
	//currentUser.image = currentUser.image || ""; //If no image is sent, it is set to ""
	user.gender = Encryption(user.gender);
	user.address = Encryption(user.address);
	user.age = Encryption(user.age);
	user.degree = Encryption(user.degree);
	user.speciality = Encryption(user.speciality);
	user.regno = Encryption(user.regno);
	user.regyear = Encryption(user.regyear);
	user.experience = Encryption(user.experience);
	user.starttime = Encryption(user.starttime);
	user.endtime = Encryption(user.endtime);
	user.isverified = true;

	return user;
}

function DecryptDoctor(user) {
	user = JSON.parse(user);

    user.fullname = decryptAndClean(user.fullname);
	user.email = decryptAndClean(user.email);
	user.image = decryptAndClean(user.image);
	user.gender = decryptAndClean(user.gender);
	user.address = decryptAndClean(user.address);
	user.age = decryptAndClean(user.age);
	user.degree = decryptAndClean(user.degree);
	user.speciality = decryptAndClean(user.speciality);
	user.regno = decryptAndClean(user.regno);
	user.regyear = decryptAndClean(user.regyear);
	user.experience = decryptAndClean(user.experience);
	user.starttime = decryptAndClean(user.starttime);
	user.endtime = decryptAndClean(user.endtime);

    return user;
}

function DecryptAppointment(appointment) {
	appointment = JSON.parse(appointment);

	appointment.date = decryptAndClean(appointment.date);
	appointment.symptoms = decryptAndClean(appointment.symptoms);
	appointment.doctor_id = decryptAndClean(appointment.doctor_id);
	appointment.doctor_name = decryptAndClean(appointment.doctor_name);
	appointment.patient_id = decryptAndClean(appointment.patient_id);
	appointment.prescriptions = appointment.prescriptions.map(prescription => decryptAndClean(prescription));
	appointment.patient_name = decryptAndClean(appointment.patient_name);

	return appointment;
}

function DecryptYourPatients(list) {
	//lisdate":"/yOdoje2yhwi715aci/iZA==","symptoms":"DtIqy+2FMAxcjWLyxJPmlQ==","doctor_id":"TsCKslEJ5bBnDjVxvbm33A==","prescriptions":[],"isConfirmed":true,"patient_id":"gcCKsscJ5bDSDjVxhLm33A==","patient_name":"ryOdoii2yhw/715aDC/iZA==","patient_age":"jcOdonGgyhyYel5aMhriZA==","patient_gender":"/yOdoje2yhwi715aci/iZA==","patient_bloodgroup":"SSOdoo62yhwy715aXy/iZA=="}]
}

module.exports = {
	EncryptPatient,
	DecryptPatient,
	DecryptDoctor,
	DecryptAppointment,
}