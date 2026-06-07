import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/signin.css";

export default function Signin() {

  const navigate = useNavigate();

  // FORM STATE
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      console.log("FORM DATA:", formData);

      // API CALL
      const response = await API.post(
        "/auth/login",
        formData
      );

      // RESPONSE
      console.log("RESPONSE:", response.data);

      // TOKEN
      const token =
        response.data.accessToken ||
        response.data.token ||
        response.data.jwt;

      console.log("TOKEN:", token);

      // SAVE TOKEN
      localStorage.setItem("token", token);

      // VERIFY TOKEN
      console.log(
        "STORED TOKEN:",
        localStorage.getItem("token")
      );

      alert("Login Success");

      // NAVIGATION
      navigate("/");

    } catch (error) {

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

    <div className="signin-root">

      {/* LEFT SECTION */}
      <div className="signin-left">

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

        <h1 className="left-headline">
          Welcome Back <span>Teacher</span>
        </h1>

      </div>

      {/* RIGHT SECTION */}
      <div className="signin-right">

        <div className="signin-card">

          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>

            {/* USERNAME */}
            <input
              type="text"
              placeholder="Enter Username"
              name="userName"
              value={formData.userName}
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
              Sign In
            </button>

          </form>

          <p>
            Don't have an account?
            <Link to="/signup">
              {" "}Signup
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}