import React, { useState, useEffect } from 'react';
import '../Css/FindRide.css'; 
import Navbar from '../Layout/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FindRide = () => {
  const [cities, setCities] = useState([]);
  const [find, setFind] = useState({
    source: '',
    destination: '',
    rideDate: ''
  });
  const logged = useSelector((state) => state.user.logstate);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [isFind, setIsFind] = useState(false);

  const [rides, setRides] = useState([]);
  const[isPressed ,setIsPressed] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date).toLocaleDateString('en-GB') + " " + new Date(date).toLocaleTimeString(); // Format the date
    return formattedDate;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFind((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let nav = useNavigate();
  const [msg, setMsg] = useState("");

  // Fetch cities data
  useEffect(() => {      
    fetch('http://localhost:8130/api/Carpooling/GetCities')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Something went wrong with the connection', error));
  }, []);

  
  const handleRide = (ride) => {
    if (!logged.login) {
      nav('/login');
    } 
    else {
      const reqInf = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'bookingdate': new Date(),
          'rideId': ride.rideId,
          'uid': userInfo.uid,
          'fare': ride.fare,
          'driver':ride.driver.uidNavigation.name,
        })
      };

      fetch("http://localhost:8130/api/User/CheckBooking", reqInf)
        .then((response) => {
          if (response.ok) {
            nav('/payment', { state: { reqInf } });
          } else {
            response.json().then((data) => {
              alert(`Error: ${data.message}`);
              nav("/")
            });
          }
        })
        .catch((error) => {
          console.error("Error confirming booking:", error);
          alert("Something went wrong. Please try again later.");
          nav('/')
        });

    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFind(true);
    


    console.log('Booking Ride:', find);

    fetch(`http://localhost:8130/api/User/GetRides?source=${find.source}&desti=${find.destination}&date=${find.rideDate}`)
      .then((response) => {
        console.log(response);
        setIsFind(false);
        if (!response.ok) {
          // Log if the response was not OK (e.g., 404, 500)
          console.error("Error: Network response was not ok", response.status);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRides(data);
        if(data.length === 0){
          setIsPressed(true);
        }
      }
      )
      .catch((error) => {
        console.error("Error during login:", error);
        setMsg("An error occurred while logging in");
      });


  };

  return (  
    <div style={{ paddingTop: '150px' }}>
      <Navbar />
      <div className="book-ride-container" >
        <h2>Find a Ride</h2>
        <form onSubmit={handleSubmit} className="book-ride-form">
          <div className="form-group">
            <label htmlFor="source">Source</label>
            <select
              id="source"
              name="source"
              value={find.source}
              onChange={handleChange}
              required
            >
              <option value="">Select Source</option>
              {cities.map((city) => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityname}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <select
              id="destination"
              name="destination"
              value={find.destination}
              onChange={handleChange}
              required
            >
              <option value="">Select Destination</option>
              {cities.map((city) => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityname}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rideDate">Ride Date</label>
            <input
              type="date"
              id="rideDate"
              name="rideDate"
              value={find.rideDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <button type="submit" className="submit-btn" >{isFind?"⌛Finding..":"Find Ride"}</button>
        </form>
      </div>

      {rides.length > 0  ? (
    <div className="available-rides container mt-5">
    <h2>Available Rides</h2>
    <div className="row justify-content-center">
      {rides.map(r => (
        <div className="col-md-6 mb-4" key={r.id}> 
          <div className="card custom-card">
            <div className="card-body">
              <h4>{r.driver.uidNavigation.name}</h4>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td><strong>From:</strong> {r.sourceCityNavigation.cityname}</td>
                    <td><strong>To:</strong> {r.destinationCityNavigation.cityname}</td>
                  </tr>
                  <tr>
                    <td><strong>Ride Start:</strong> {formatDate(r.ridedate)}</td>
                    <td><strong>Expected Completion:</strong> {formatDate(r.rideComplete)}</td>
                  </tr>
                  <tr>
                    <td><strong>Gender:</strong> {r.driver.uidNavigation.gender}</td>
                    <td><strong>Age:</strong> {r.driver.age}</td>
                  </tr>
                  <tr>
                    <td><strong>Fare:</strong> {r.fare}</td>
                    <td><strong>Contact:</strong> {r.driver.uidNavigation.contactno}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <button className="btn btn-primary" onClick={() => handleRide(r)} disabled={isLoading}>{isLoading ? "⌛ Loading..." : "Book Ride"}</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
    ) : isPressed ? (
      <h3 style={{color:"red"}}> Sorry!! No rides available </h3>
        ): null}
        </div>
  
  );
};

export default FindRide;
