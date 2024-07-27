import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL } from "../api";

const cookies = new Cookies();

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState();

  const loginRequest = async (e) => {
    e.preventDefault();
    await axios
      .post(`${BASE_URL}/users/login`, { email, password })
      .then((res) => {
        const data = res.data;
        if (data["status_code"] === 200) {
          cookies.set("auth_token", data["auth_token"]);
          localStorage.clear();
          window.location = "/dashboard";
        } else {
          setError(data.detail);
          setPassword("");
        }
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="h-screen w-full flex bg-gray-200">
      <div className="flex self-center justify-center px-5 sm:w-3/4 sm:mx-auto  md:p-0 lg:form w-full lg:w-1/2">
        <form className="flex flex-col self-center md:w-1/2 w-full">
          <label className="text-sm sm:text-base">Enter Email:</label>
          <input
            type="text"
            placeholder="Enter your email...."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="title"
            className="h-10 text-sm mb-3 mt-1 px-2 rounded-md sm:text-base auth-input w-full outline-none focus:h-10"
            required
          />
          <label className="text-sm sm:text-base">Enter Password:</label>
          <input
            type="password"
            placeholder="Enter your password...."
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="title"
            className="h-10 text-sm mb-3 mt-1 px-2 rounded-md sm:text-base outline-none auth-input w-full focus:h-10"
          />
          {error && <span className="text-red-500 mb-2">{error}</span>}

          <div className="flex items-center mb-2">
            <input
              id="remember"
              className="accent-teal-700 m-1"
              type="checkbox"
              name="status"
            />
            <label className="text-sm sm:text-base my-1">
              Always remember me.
            </label>
          </div>

          <button
            className="bg-blue-400 p-3 rounded-lg text-white"
            onClick={loginRequest}
          >
            Login
          </button>

          <p className="my-3 text-sm my-5 sm:text-base">
            Don't have an account,{" "}
            <Link
              to="/signup"
              className="text-indigo-700 hover:text-indigo-500 hover:underline"
            >
              sign up?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
