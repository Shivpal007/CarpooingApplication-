import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validateContactNo = (contactNo) => {
    return /^[0-9]{10}$/.test(contactNo); // Ensures only 10-digit numbers
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validateContactNo(contactNo)) {
      setError("Please enter a valid 10-digit contact number.");
      return;
    }

    fetch("http://localhost:8130/auth/forget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, contactNo }), // Sending both fields
    })
      .then((response) => response.text()) // Expecting plain text response
      .then((message) => {
        console.log(message);
        setSuccess("Password is sent to your email.");
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch(() => {
        setError("Network error. Please try again later.");
      });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "10vh" }}>
      <div className="card p-4 shadow-lg rounded" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              className="form-control"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
        </form>
        <p className="text-center mt-3">Enter your Email ID and Contact Number</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
