import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/signup.css";

export default function Signup() {

  const navigate = useNavigate();

  // FORM STATE
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE SIGNUP
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      console.log("FORM DATA:", formData);

      // API CALL
      const response = await API.post(
        "/auth/signup",
        formData
      );

      console.log("RESPONSE:", response.data);

      alert("Signup Successful");

      // NAVIGATE TO SIGNIN
      navigate("/");

    } catch(error) {

      console.log("FULL ERROR:", error);

      if (error.response) {

        console.log(
          "STATUS:",
          error.response.status
        );

        console.log(
          "DATA:",
          error.response.data
        );

        alert(
          `Error ${error.response.status}`
        );

      } else {

        alert("Network Error");
      }
    }
  };

  return (

    <div className="signup-root">

      {/* LEFT SECTION */}
      <div className="signup-left">

        <div className="school-logo">

          <div className="logo-icon">
            🎓
          </div>

          <div>

            <div className="logo-text">
              Vidyalaya
            </div>

            <div className="logo-sub">
              School Management
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="signup-right">

        <div className="signup-card">

          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* FIRST NAME */}
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />

              {/* LAST NAME */}
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />

            </div>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* BUTTON */}
            <button type="submit">
              Create Account
            </button>

          </form>

          <p>
            Already have an account?
            <Link to="/">
              {" "}Signin
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}