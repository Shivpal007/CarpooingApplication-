import React, { useEffect, useState } from 'react';
import logo from '../Images/Logo2.jpg';
import register from '../Images/Register.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../ReduxStore/UserSlice';
import '../Css/navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    if(windowWidth > 768) setShowDropdown(true);
  }, [windowWidth]);

  const userInfo = useSelector((state) => state.user.userInfo);
  const logged = useSelector((state) => state.user.logstate);
  const role = userInfo?.role?.rid ?? 0;

  const handleLogout = () => {
    alert('You have been logged out');
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <nav className="navbar-container">
        {/* Logo and Title */}
        <div className="navbar-brand">
          <img src={logo} alt="Carpooling Logo" className="navbar-logo" />
          <h1 className="navbar-title">Carpooling</h1>
        </div>

        {/* User Actions */}
        <div className="navbar-actions">
          {logged.login ? (
            <>
              <span className="navbar-username">{userInfo.name}</span>
              <button
                className="navbar-profile-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src={register}
                  alt="Profile"
                  className="navbar-profile-img"
                />
              </button>
            </>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="btn navbar-btn">
                Login
              </Link>
              <Link to="/register" className="btn navbar-btn">
                Register
              </Link>
            </div>
          )}
        </div>
      

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="navbar-dropdown">
          <Link to="/" className="dropdown-link">
            Home
          </Link>
          {logged.login && 
          <><Link to="/profile" className="dropdown-link">
            Profile
          </Link>
          <Link to="/history" className="dropdown-link">
            History
          </Link>
          <Link to="/rides" className="dropdown-link">
            Rides
          </Link>
          </>
          }
          {role == '1' && (
            <Link to="/admin" className="dropdown-link">
              Admin
            </Link>
          )}
          {logged.login && 
          <button className="dropdown-link logout-btn" onClick={handleLogout}>
            Logout
          </button>}
        </div>
      )}
      </nav>
    </>
  );
};

export default Navbar;
