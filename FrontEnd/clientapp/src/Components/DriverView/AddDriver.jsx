import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS

const AddDriver = () => {
  const [driverData, setDriverData] = useState({
    drivingLicence: '',
    vehicleNumber: '',
    vehicleName: ''
  });
  const [isDriverRegistered, setIsDriverRegistered] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const logged = useSelector((state) => state.user.logstate);
  const nav = useNavigate();

  const licencePattern = /^[A-Z]{2}[0-9]{13}$/; // Match 2 uppercase letters followed by 13 digits
  const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/; // Match pattern for vehicle number (KA12BD0001)

  const [errors, setErrors] = useState({});

  // Validate driving license
  const validateDrivingLicence = () => {
    if (!licencePattern.test(driverData.drivingLicence)) {
      setErrors({ ...errors, drivingLicence: 'License number should be in format (KA0420209876543)' });
      return false;
    }
    setErrors({ ...errors, drivingLicence: '' });
    return true;
  };

  // Validate vehicle number
  const validateVehicleNumber = () => {
    if (!vehicleNumberPattern.test(driverData.vehicleNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        vehicleNumber: 'Invalid vehicle number format. Example: KA12BD0001',
      }));
      return false;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      vehicleNumber: '',
    }));
    return true;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    const isLicenceValid = validateDrivingLicence();
    const isVehicleNumberValid = validateVehicleNumber();

    if (isLicenceValid && isVehicleNumberValid) {
      const { drivingLicence, vehicleNumber, vehicleName } = driverData;
      const vehicleInfo = `${vehicleNumber} ${vehicleName}`; // Concatenate vehicle number and name

      fetch('http://localhost:8130/api/User/RegDriver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userInfo.uid,
          drivingLicence,
          vehicleInfo,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          alert('Driver registration successful!');
          nav('/publishRide'); // Redirect to Home page after successful registration
        })
        .catch((error) => {
          console.error('Error registering driver:', error);
          alert('Registration failed, please try again.');
        });
    } else {
      alert('Please fill in all fields correctly!');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '100px' }}>
        <div className="container mt-5" style={{ maxWidth: '500px', border: '2px dotted black' }}>
          <h2>Mandatory Details to Publish Ride</h2>
          {!isDriverRegistered ? (
            <form onSubmit={handleSubmit} className="mt-4">
              {/* Driving License Input */}
              <div className="mb-3">
                <label htmlFor="drivingLicence" className="form-label">Driving License</label>
                <input
                  type="text"
                  id="drivingLicence"
                  name="drivingLicence"
                  className="form-control"
                  placeholder='KA0420209876543'
                  value={driverData.drivingLicence}
                  onChange={handleInputChange}
                  required
                />
                {errors.drivingLicence && <p className="text-danger">{errors.drivingLicence}</p>}
              </div>

              {/* Vehicle Number Input */}
              <div className="mb-3">
                <label htmlFor="vehicleNumber" className="form-label">Vehicle Number</label>
                <input
                  type="text"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  className="form-control"
                  placeholder='KA12BD0001'
                  value={driverData.vehicleNumber}
                  onChange={handleInputChange}
                  required
                />
                {errors.vehicleNumber && <p className="text-danger">{errors.vehicleNumber}</p>}
              </div>

              {/* Vehicle Name Input */}
              <div className="mb-3">
                <label htmlFor="vehicleName" className="form-label">Vehicle Name</label>
                <input
                  type="text"
                  id="vehicleName"
                  name="vehicleName"
                  className="form-control"
                  placeholder='Swift Dzire'
                  value={driverData.vehicleName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Add Details</button>
              </div>
            </form>
          ) : (
            <div>
              <h3>You are already registered as a driver!</h3>
              <button className="btn btn-secondary" onClick={() => nav('/')}>Go to Home</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddDriver;