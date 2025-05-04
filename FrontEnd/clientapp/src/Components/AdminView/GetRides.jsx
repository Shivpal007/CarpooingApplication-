import React, { useState, useEffect } from 'react';
import '../Css/GetDrivers.css'; // Import the CSS file

const GetRides = () => {
    const [rides, setRides] = useState([]);

    // Define the formatDate function
    const formatDate = (date) => {
        if (!date) return ''; // Handle null or undefined dates
        const formattedDate = new Date(date).toLocaleDateString('en-GB'); // Format the date
        return formattedDate;
    };

    useEffect(() => {
        fetch(`http://localhost:8130/api/Carpooling/GetRides`)
            .then((response) => response.json())
            .then((data) => setRides(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="container">
            <h2>Ride Information</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Ride ID</th>
                        <th>Driver Name</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Fare</th>
                        <th>No. of Seats</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead><tbody className="align-right">
                    {rides.map((ride) => (
                        <tr key={ride.rideId}>
                            <td>{ride.rideId}</td>
                            <td>{ride.driver.uidNavigation.name}</td>
                            <td>{ride.sourceCityNavigation.cityname}</td>
                            <td>{ride.destinationCityNavigation.cityname}</td>
                            <td>{ride.fare}</td>
                            <td>{ride.noseat}</td>
                            <td>{ride.status==="c" ? "Completed" : ride.status=== "n" ? "Not Verified" : "Active"}</td>
                            <td>{formatDate(ride.ridedate)}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default GetRides;
