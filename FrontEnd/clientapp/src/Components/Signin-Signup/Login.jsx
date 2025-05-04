import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../ReduxStore/UserSlice';
import imgg from '../Images/securelogin.jpg';

const Login = () => {
  const dispatch = useDispatch();
  let nav = useNavigate();

  const [loginData, setLoginData] = useState({
    contactno: '',
    password: ''
  });

  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData, [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    const reqInf = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };

    fetch("http://localhost:8130/auth/Login", reqInf)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          setMsg("Invalid contact number or password");
        } else {
          dispatch(login(data));
          nav("/");
        }
      })
      .catch((error) => {
        setMsg(error.message || "An error occurred while logging in");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4 d-flex justify-content-center">
          <img src={imgg} alt="Secure Login" className="img-fluid rounded" style={{ maxWidth: "100%", height: "auto",marginTop:"10px" }} />
        </div>
        <div className="col-md-4">
          <div className="border rounded p-4 shadow" style={{ maxWidth: "450px", width: "100%" }}>
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="contactno" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="contactno"
                  id="contactno"
                  placeholder="Contact No"
                  value={loginData.contactno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary w-30 mt-3" disabled={isLoading}>
                  {isLoading ? "⌛ Logging in..." : "Login"}
                </button>
              </div>
              <p className="mt-3 text-center">
                Don't have an account? <a href="/register">Register here</a>
              </p>
              <p className="mt-3 text-center">
                 <a href="/forget">Forget Password?</a>
              </p>
            </form>
            <div className='text-danger text-center mt-2'>{msg}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
