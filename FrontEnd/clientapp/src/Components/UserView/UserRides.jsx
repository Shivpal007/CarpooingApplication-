import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Layout/Navbar';

const UserRides = () => {
  const [publishedRides, setPublishedRides] = useState([]);
  const [bookedRides, setBookedRides] = useState([]);
  const userInfo = useSelector((state) => state.user.userInfo);

  const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date).toLocaleDateString('en-GB') + " " + new Date(date).toLocaleTimeString(); // Format the date
    return formattedDate;
  };

  useEffect(() => {
    // Fetch data for rides published by the user
    fetch(`http://localhost:8130/api/User/GetUserRides?uid=${userInfo.uid}`)
      .then(response => response.json())
      .then(data => {
        // Set the published rides first
        setPublishedRides(data);
      })
      .catch(error => console.error('Error fetching published rides:', error));

    // Fetch data for rides booked by the user
    fetch(`http://localhost:8130/api/User/GetUserBookinks?uid=${userInfo.uid}`) // Fill the link for fetching booked rides
      .then(response => response.json())
      .then(data => setBookedRides(data))
      .catch(error => console.error('Error fetching booked rides:', error));
  }, []);

  return (<>
    <Navbar />
    <div className="container mt-4" style={{ paddingTop: "150px" }}>
      <div className="row">
        {/* Column for Rides Published */}
        <div className="col-md-6">
          <div className="card shadow-lg border-0" style={{ backgroundColor: "rgba(125, 145, 255, 0.53)" }}>
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Rides Published</h2>

              <div className="list-group">
                {publishedRides.map((ride, index) => (
                  <div key={index} className="list-group-item mb-3 border-0 rounded shadow-sm">
                    <div className="d-flex justify-content-center align-items-center text-center">
                      <div>
                        <h5 className="mb-2">{ride.sourceCityNavigation.cityname} to {ride.destinationCityNavigation.cityname}</h5>
                        <p className="mb-1">Schedule Date: {formatDate(ride.ridedate)}</p>
                        <p className="mb-1">Seats: {ride.noseat}</p>
                        <p className="mb-1">Fare ₹: {ride.fare}</p>
                        <p className="mb-0">Status: {ride.status === 'a' ? 'Active' : 'Inactive'}</p>
                        <p className="mb-0">Bookings: {ride.bookings.length}</p>
                      
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Column for Rides Booked */}
        <div className="col-md-6">
          <div className="card shadow-lg border-0" style={{ backgroundColor: "rgba(125, 145, 255, 0.53)" }}>
            <div className="card-body">
              <h2 className="card-title mb-4 text-center">Rides Booked</h2>

              <div className="list-group">
                {bookedRides.map((booking, index) => (
                  <div key={index} className="list-group-item mb-3 border-0 rounded shadow-sm">
                    <div className="d-flex justify-content-center align-items-center text-center">
                      <div>
                        <h5 className="mb-2">{booking.ride.sourceCityNavigation.cityname} to {booking.ride.destinationCityNavigation.cityname}</h5>
                        <p className="mb-1">Booking Date: {formatDate(booking.bookingdate)}</p>
                        <p className="mb-1">Schedule Date: {formatDate(booking.ride.ridedate)}</p>
                        <p className="mb-1">Fare ₹: {booking.ride.fare}</p>
                        <p className="mb-0">Name: {booking.ride.driver.uidNavigation.name}</p>
                        <p className="mb-1">Mobile No: {booking.ride.driver.uidNavigation.contactno}</p>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  </>

  );
};

export default UserRides;
