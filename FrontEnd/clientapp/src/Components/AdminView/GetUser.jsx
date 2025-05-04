import React, { useState, useEffect } from 'react';
import '../Css/GetUsers.css'; 

const GetUser = () => {
  const [users, setUsers] = useState([]);
 // Define the formatDate function
 const formatDate = (date) => {
  if (!date) return ''; // Handle null or undefined dates
  const formattedDate = new Date(date).toLocaleDateString('en-GB'); // Format the date
  return formattedDate;
};

  useEffect(() => {
    fetch(`http://localhost:8130/api/Carpooling/GetUsers`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Error:", error));
  }, [])

  return (
    <div className="container"> 
      <h2>User Information</h2>
      <table className="table table-striped"> 
        <thead>
          <tr>
            <th>UserId</th> 
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}> 
              <td>{user.uid}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactno}</td>
              <td>{formatDate(user.dob)}</td>
              <td>{user.gender}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetUser;