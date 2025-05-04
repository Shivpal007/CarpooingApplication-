import React, { useEffect, useState } from 'react';
import gif from '../Images/gif.gif';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { set } from 'date-fns';

const RegistrationNew = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isRegistered, setIsRegistered] = useState(false);
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onSubmit = (data) => {
    setIsRegistered(true);
    console.log(data);
    const reqInf = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`http://localhost:8130/auth/Register`, reqInf)
      .then((response) => {
        if (!response.ok) {
          alert("Registration Failed");
          setIsRegistered(false);
        } else {
          nav('/login');
        }
      })
      .catch(() => alert("Error Occurred"));
    
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-3">
        {!isMobile && (
          <div className="card mx-5">
            <img
              src={gif}
              alt="Playing GIF"
              height={500}
              style={{ maxWidth: "450px", width: "100%" }}
            />
          </div>
        )}

        <div
          className="container border rounded p-4 shadow"
          style={{ maxWidth: "450px", width: "100%" }}
        >
          <h2 className="text-center mb-4">User Registration</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                {...register("name", {
                  required: "Name is required.",
                  pattern: {
                    value: /^\S{3,}\s\S{2,}$/,
                    message: "Name must have at least 6 characters with a space-separated value (e.g., 'Jack Sparrow').",
                  },
                })}
              />
              {errors.name && <small className="text-danger">{errors.name.message}</small>}
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Contact No"
                {...register("contactno", {
                  required: "Contact number is required.",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Contact number must be exactly 10 numeric characters.",
                  },
                })}
              />
              {errors.contactno && <small className="text-danger">{errors.contactno.message}</small>}
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[A-Za-z0-9_.-]{5,30}@gmail\.com$/,
                    message: "Email must match the pattern (e.g., 'example@gmail.com').",
                  },
                })}
              />
              <p>
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
              </p>
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Address"
                {...register("address", {
                  required: "Address is required.",
                  minLength: {
                    value: 10,
                    message: "Address must be at least 10 characters long.",
                  },
                })}
              />
              {errors.address && <small className="text-danger">{errors.address.message}</small>}
            </div>
            <div className="mb-3">
              <label style={{ paddingRight: "20px" }}>Select Gender:</label>
              <input
                type="radio"
                id="male"
                value="male"
                {...register("gender", { required: "Gender is required." })}
              />
              <label htmlFor="male" style={{ paddingRight: "10px" }}>
                Male
              </label>
              <input
                type="radio"
                id="female"
                value="female"
                {...register("gender", { required: "Gender is required." })}
              />
              <label htmlFor="female" style={{ paddingRight: "10px" }}>
                Female
              </label>
              <p>
                {errors.gender && <small className="text-danger">{errors.gender.message}</small>}
              </p>
            </div>
            <div className="mb-3">
              <label className="label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                {...register("dob", {
                  required: "Date of Birth is required.",
                  validate: (value) => {
                    const currentDate = new Date();
                    const dob = new Date(value);

                    if (dob > currentDate) {
                      return "Date of birth cannot be in the future.";
                    }

                    const age = currentDate.getFullYear() - dob.getFullYear();
                    const isMonthAhead = currentDate.getMonth() < dob.getMonth();
                    const isDayAhead =
                      currentDate.getMonth() === dob.getMonth() &&
                      currentDate.getDate() < dob.getDate();

                    return age > 18 || (age === 18 && !isMonthAhead && !isDayAhead)
                      ? true
                      : "You must be at least 18 years old.";
                  },
                })}
              />
              {errors.dob && <small className="text-danger">{errors.dob.message}</small>}
            </div>

            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Set Password"
                  {...register("password", {
                    required: "Password is required.",
                    pattern: {
                      value: /^[A-Za-z0-9*@%$_.-]{8,12}$/,
                      message: "Password must be 8-12 characters long and have at least one special character number and letter (e.g., 'James@007')",
                    },
                  })}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>
              <p>
                {errors.password && <small className="text-danger">{errors.password.message}</small>}
              </p>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {isRegistered ? "Loading..." : "Register"}
            </button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>

        {!isMobile && (
          <div className="card mx-5">
            <img
              src={gif}
              alt="Playing GIF"
              height={500}
              style={{ maxWidth: "450px", width: "100%" }}
            />
          </div>
        )}
      </div>

    </>
  );
};

export default RegistrationNew;
