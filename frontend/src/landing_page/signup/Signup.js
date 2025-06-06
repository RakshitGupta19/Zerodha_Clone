import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      handleError("All fields are required");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3002/signup",
        {
          ...inputValue,
          createdAt: new Date(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        setInputValue({
          email: "",
          password: "",
          username: "",
        });
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response) {
        handleError(error.response.data.message || "Server error occurred");
      } else if (error.request) {
        handleError("Unable to connect to server. Please check if the server is running.");
      } else {
        handleError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Signup Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={username}
                  placeholder="Enter your username"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
              <div className="mt-3 text-center">
                <span>
                  Already have an account? <Link to="/login">Login</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
