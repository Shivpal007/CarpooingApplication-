import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Layout/Navbar';

const TripHistory = () => {
  const [publishedTrips, setPublishedTrips] = useState([]);
  const [bookedTrips, setBookedTrips] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setfeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB') + " " + new Date(date).toLocaleTimeString();
  };

  useEffect(() => {
    if (!userInfo?.uid) return;

    fetch(`http://localhost:8130/api/User/GetUserCompletedRides?uid=${userInfo.uid}`)
      .then(response => response.json())
      .then(data => setPublishedTrips(data))
      .catch(error => console.error('Error fetching published trips:', error));

    fetch(`http://localhost:8130/api/User/GetUserCompletedBookinks?uid=${userInfo.uid}`)
      .then(response => response.json())
      .then(data => setBookedTrips(data))
      .catch(error => console.error('Error fetching booked trips:', error));
  }, [userInfo, rating, feedback]);

  // Open Feedback Modal
  const handleFeedbackClick = (trip) => {
    setSelectedTrip(trip);
    setShowFeedbackModal(true);
  };

  // Submit Feedback API Call
  const submitFeedback = () => {
    if (!rating || !feedback) {
      alert("Please provide both rating and feedback.");
      return;
    }
    setFeedbackSubmitted(true);

    const feedbackData = {
      rideId: selectedTrip.rideId,
      bookingId: selectedTrip.bookingId,
      rating,
      feedback
    };

    fetch('http://localhost:8130/api/User/GiveFeedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData)
    })
      .then(response => response.json())
      .then(() => {
        alert("Feedback submitted successfully!");
        setShowFeedbackModal(false);
        setRating(0);
        setfeedback('');
        setFeedbackSubmitted(false);
      })
      .catch(error => console.error('Error submitting feedback:', error));
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ paddingTop: "150px" }}>
        <div className="row">
          {/* Trips Published */}
          <div className="col-md-6">
            <div className="card shadow-lg border-0" style={{ backgroundColor: "rgba(125, 145, 255, 0.53)" }}>
              <div className="card-body">
                <h2 className="card-title mb-4 text-center">Trips Published</h2>
                <div className="list-group">
                  {publishedTrips.map((trip, index) => (
                    <div key={index} className="list-group-item mb-3 border-0 rounded shadow-sm">
                      <div className="text-center">
                        <h5 className="mb-2">{trip.sourceCityNavigation.cityname} to {trip.destinationCityNavigation.cityname}</h5>
                        <p className="mb-1">Travel Date: {formatDate(trip.ridedate)}</p>
                        <p className="mb-1">Seats Available: {trip.noseat}</p>
                        <p className="mb-1">Fare ₹: {trip.fare}</p>
                        <p className="mb-0">Status: {trip.status === 'c' ? 'Completed' : 'Canceled'}</p>
                        <p className="mb-0">Bookings: {trip.bookings.length}</p>
                        <p className="mb-0">Rating: {trip.triphistories.length > 0
                          ? (trip.triphistories.reduce((a, b) => a + b.rating, 0) / trip.triphistories.length).toFixed(1)
                          : "No Ratings Yet"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trips Booked */}
          <div className="col-md-6">
            <div className="card shadow-lg border-0" style={{ backgroundColor: "rgba(125, 145, 255, 0.53)" }}>
              <div className="card-body">
                <h2 className="card-title mb-4 text-center">Trips Booked</h2>
                <div className="list-group">
                  {bookedTrips.map((trip, index) => (
                    <div key={index} className="list-group-item mb-3 border-0 rounded shadow-sm">
                      <div className="text-center">
                        <h5 className="mb-2">{trip.ride.sourceCityNavigation.cityname} to {trip.ride.destinationCityNavigation.cityname}</h5>
                        <p className="mb-1">Booking Date: {formatDate(trip.bookingdate)}</p>
                        <p className="mb-1">Travel Date: {formatDate(trip.ride.ridedate)}</p>
                        <p className="mb-1">Fare ₹: {trip.ride.fare}</p>
                        <p className="mb-0">Status: {trip.ride.status === 'c' ? 'Attended' : 'Canceled'}</p>
                        {!trip.triphistories.length && (
                          <button className="btn btn-primary mt-2" onClick={() => handleFeedbackClick(trip)}>Give Feedback</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document" style={{ paddingTop: '120px' }}>
          <div className="modal-content">
      
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title">Submit Feedback</h5>
              <button type="button" className="close" onClick={() => setShowFeedbackModal(false)}>
                <span>❌</span>
              </button>
            </div>
      
            <div className="modal-body">
              <label>Rating (0-10):</label>
              <input
                type="number"
                min="0"
                max="10"
                className="form-control"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              />
              <label className="mt-3">Feedback:</label>
              <textarea
                className="form-control"
                rows="3"
                value={feedback}
                onChange={(e) => setfeedback(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={submitFeedback}>
                {feedbackSubmitted ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>      
        </div>
      )}
    </>
  );
};

export default TripHistory;
