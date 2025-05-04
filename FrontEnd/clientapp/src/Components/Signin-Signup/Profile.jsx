import React, { useState } from 'react';
import Navbar from '../Layout/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const nav = useNavigate();

  const initialProfile = {
    uid: userInfo.uid,
    name: userInfo.name,
    contactNo: userInfo.contactno,
    email: userInfo.email,
    gender: userInfo.gender,
    dob: userInfo.dob,
    address: userInfo.address,
    password: userInfo.password,
  };

  const [profile, setProfile] = useState(initialProfile);
  const [isEditable, setIsEditable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    fetch("http://localhost:8130/auth/ProfileUpdate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
    .then(response => {
      if (response.status === 200) { 
        console.log("Profile updated successfully.");
        alert("Profile updated successfully.");
        nav('/login');
      } else if (response.status === 404) {
        console.error("User not found.");
        alert("User not found.");
      } else {
        console.error("Unexpected error:", response.status);
      }
    })
    .catch(error => {
      console.error("Network error:", error);
      });
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
    if (isEditable) {
      setProfile(initialProfile);
    }
  };


  const calculateMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.setFullYear(today.getFullYear() - 18));
    return maxDate.toISOString().split('T')[0];
  };

  const [error, setError] = useState("");

  const validatePassword = (e) => {
    const value = e.target.value;
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@%$_.-])[A-Za-z\d@%$_.-]{8,12}$/;
    
    if (!pattern.test(value)) {
      setError("Password must be 8-12 characters long and include at least one letter, one number, and one special character (@, %, $, _, ., -).");
    } else {
      setError(""); 
    }

    handleChange(e); 
  };


  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ paddingTop: '130px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{isEditable ? 'Edit Profile' : 'Profile'}</h2>
          <button
            onClick={toggleEdit}
            className="btn btn-secondary"
          >
            {isEditable ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td><label>Name:</label></td>
                <td>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    readOnly={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td><label>Contact Number:</label></td>
                <td>
                  <input
                    type="tel"
                    name="contactNo"
                    className="form-control"
                    value={profile.contactNo}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    required
                    readOnly={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td><label>Email:</label></td>
                <td>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    readOnly={!isEditable}
                  />
                </td>
              </tr>

              <tr>
                <td><label>Gender:</label></td>
                <td>
                  <select
                    name="gender"
                    className="form-control"
                    value={profile.gender}
                    onChange={handleChange}
                    required
                    disabled={!isEditable}
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td><label>Date of Birth:</label></td>
                <td>
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    value={formatDate(profile.dob)}
                    onChange={handleChange}
                    required
                    readOnly={!isEditable}
                    max={calculateMaxDate()} // Set the maximum date to 18 years ago
                  />
                </td>
              </tr>

              <tr>
                <td><label>Address:</label></td>
                <td>
                  <textarea
                    name="address"
                    className="form-control"
                    value={profile.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    rows="3"
                    required
                    readOnly={!isEditable}
                  />
                </td>
              </tr>
              <tr>
                <td><label>Password:</label></td>
                <td>
                  <div className="input-group">
                  <input
        type={showPassword ? "text" : "password"}
        name="password"
        className="form-control"
        value={profile.password}
        onChange={validatePassword}
        required
        pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[@%$_.-])[A-Za-z\d@%$_.-]{8,12}"
        title="Password must be 8-12 characters long and include at least one letter, one number, and one special character (@, %, $, _, ., -)."
        readOnly={!isEditable}
      />
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "🙈" : "👁️"}
      </button>
      {error && <div className="text-danger mt-2">{error}</div>}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary" disabled={!isEditable}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
