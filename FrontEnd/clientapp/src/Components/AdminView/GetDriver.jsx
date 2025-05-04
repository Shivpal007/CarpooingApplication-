import React, { useState, useEffect } from 'react';
import '../Css/GetDrivers.css'; // Import the CSS file

const GetDriver = () => {
  const [drivers, setDrivers] = useState([]);

  // Define the formatDate function
  const formatDate = (date) => {
    if (!date) return ''; // Handle null or undefined dates
    const formattedDate = new Date(date).toLocaleDateString('en-GB'); // Format the date
    return formattedDate;
  };

  useEffect(() => {
    fetch(`http://localhost:8130/api/Carpooling/GetAllDrivers`)
      .then(response => response.json())
      .then(data => setDrivers(data))
      .catch(error => console.error("Error:", error));
  }, [])

  return (
    <div className="container">
      <h2>Driver Information</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Driver ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Driving License</th>
            <th>Vehicle Info</th>
            <th>User ID</th>
            <th>Address</th>
            <th>DOB</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.driverId}>
              <td>{driver.driverId}</td>
              <td>{driver.uidNavigation.name}</td>
              <td>{driver.uidNavigation.email}</td>
              <td>{driver.uidNavigation.contactno}</td>
              <td>{driver.drivingLicence}</td>
              <td>{driver.vehicleInfo}</td>
              <td>{driver.uid}</td>
              <td>{driver.uidNavigation.address}</td>
              <td>{formatDate(driver.uidNavigation.dob)}</td>
              <td>{driver.uidNavigation.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetDriver;