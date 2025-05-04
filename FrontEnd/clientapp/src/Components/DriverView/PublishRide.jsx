import React, { useEffect, useState } from 'react';
import '../Css/PublishRide.css';
import Navbar from '../Layout/Navbar';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const PublishRide = () => {
  const [driverInfo, setDriverInfo] = useState({});
  const [rideDate, setRideDate] = useState('');
  const [rideTime, setRideTime] = useState('');
  const [cities, setCities] = useState([]);
  const [ride, setRide] = useState({
    sourceCity: '',
    destinationCity: '',
    ridedate: '',
    rideComplete: '',
    noseat: '',
    driverId: '',
    fare: ''
  });

  const nav = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const logged = useSelector((state) => state.user.logstate);

  // Combine rideDate and rideTime into a single DateTime
  useEffect(() => {
    if (!rideDate || !rideTime) return;

    console.log('Raw rideTime:', rideTime);

    const dateTime = `${rideDate}T${rideTime}:00`;
    console.log("dateTime " + dateTime);
    const formattedDateTime = new Date(dateTime).toLocaleString();
    console.log("formated " + formattedDateTime);
    setRide((prevRide) => ({
      ...prevRide,
      ridedate: dateTime,
    }));
  }, [rideDate, rideTime]);


  // Add hours to the ride's start time
  const addHours = (hours) => {
    const rideStartTime = new Date(ride.ridedate);
    console.log("start " + rideStartTime);
    rideStartTime.setHours(rideStartTime.getHours() + Number(hours));

    const year = rideStartTime.getFullYear();
    const month = (rideStartTime.getMonth() + 1).toString().padStart(2, '0');
    const day = rideStartTime.getDate().toString().padStart(2, '0');

    const hour = rideStartTime.getHours().toString().padStart(2, '0');
    const minutes = rideStartTime.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hour}:${minutes}:00`;

    setRide((prevRide) => ({
      ...prevRide,
      rideComplete: formattedDate,
    }));
  };

  // Handle form input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRide((prevRide) => ({
      ...prevRide,
      [name]: value,
    }));
  };

  const handlePublish = (e) => {
    e.preventDefault();
    console.log('Publishing Ride:', { ride });

    const publishRide = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ride),
    };

    fetch('http://localhost:8130/api/User/PublishRide', publishRide)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Somthing went wrong`);
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        alert("Ride Published!..");
        nav('/')
      })
      .catch((err) => {
        console.error('Error fetching driver data:', err);
        alert("Not published!...")
        nav('/')
      })
  };

  // Check if the user is a registered driver
  useEffect(() => {
    if (logged.login && userInfo.uid) {
      fetch(`http://localhost:8130/api/User/GetDriverInfo?uid=${userInfo.uid}`)
        .then((response) => {
          if (response.status === 404) {
            nav('/regDriver');
            return null;
          }
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.json();
        })
        .then((data) => {
          if (data) {
            setDriverInfo(data.Driver);
            setRide((prevRide) => ({
              ...prevRide,
              driverId: data.driver.driverId,
            }));
          }
        })
        .catch((error) => console.error('Error fetching driver data:', error));
    } else {
      nav('/login');
    }

    fetch('http://localhost:8130/api/Carpooling/GetCities')
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error('Error fetching cities:', error));
  }, []);

  const handleReset = () => {
    setRide({
      sourceCity: '',
      destinationCity: '',
      ridedate: '',
      rideComplete: '',
      totalSeats: '',
      driverId: '',
      fare: ''
    });
    setRideDate('');
    setRideTime('');
  };

  const handleBack = () => {
    nav('/')
  }

  return (
    <div style={{ paddingTop: '150px' }}>
      <Navbar />
      <div className="publish-ride-container" style={{ marginTop: '20px' }}>
        <h2>Publish a Ride</h2>
        <form className="publish-ride-form" onSubmit={handlePublish}>
          <div className="form-group">
            <label htmlFor="sourceCity">Source</label>
            <select
              id="sourceCity"
              name="sourceCity"
              onChange={handleChange}
              required
            >
              <option value="">Select Source</option>
              {cities.map((city) => (ride.destinationCity!=city.cityname &&
                <option key={city.cityId} value={city.cityId}>
                  {city.cityname}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="destinationCity">Destination</label>
            <select
              id="destinationCity"
              name="destinationCity"
              onChange={handleChange}
              required
            >
              <option value="">Select Destination</option>
              {cities.map((city) => (ride.sourceCity !=city.cityname &&
                <option key={city.cityId} value={city.cityId}>
                  {city.cityname}
                </option>
              ))}
            </select>
          </div>
          <div className="container" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="rideDate">Ride Date</label>
              <input
                type="date"
                id="rideDate"
                value={rideDate}
                onChange={(e) => setRideDate(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="rideTime">Ride Time</label>
              <input
                type="time"
                id="rideTime"
                value={rideTime}
                onChange={(e) => setRideTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="expectedJourneyTime">Expected Journey Time</label>
            <input
              type="number"
              id="expectedJourneyTime"
              name="expectedJourneyTime"
              placeholder="Hours"
              onChange={(e) => addHours(e.target.value)}
              required
            />
          </div>
          <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label htmlFor="noseat">Total Seats</label>
              <input
                type="number"
                id="noseat"
                name="noseat"
                value={ride.noseat}
                onChange={handleChange}
                placeholder="4"
                min="1"
                required
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group" style={{ flex: '1 1 200px' }}>
              <label htmlFor="fare">Fare Charges</label>
              <input
                type="number"
                id="fare"
                name="fare"
                value={ride.fare}
                placeholder="Rs."
                onChange={handleChange}
                required
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="publish-btn">Publish</button>
            <button type="button" className="back-btn" onClick={handleBack}>Back</button>
            <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishRide;