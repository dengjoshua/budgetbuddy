import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { BASE_URL } from "../api";

const cookies = new Cookies();

const SignUp = () => {
  const initialValues = { name: "", password: "", email: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const createAccount = async (e) => {
    e.preventDefault();

    await axios
      .post(`${BASE_URL}/users/signup`, {
        email: formValues.email,
        password: formValues.password,
        name: formValues.name,
      })
      .then((res) => {
        const data = res.data;
        if (data.status_code === 200) {
          cookies.set("auth_token", data["auth_token"]);
          window.location = "/dashboard";
        } else {
          setError(data.detail);
          setFormValues(initialValues);
        }
      })
      .catch((err) => setError(err.data));
  };

  return (
    <div className="h-screen w-full flex bg-gray-200">
      <div className="flex self-center justify-center px-5 sm:w-3/4 sm:mx-auto  md:p-0 lg:form w-full lg:w-1/2">
        <form className="flex flex-col self-center md:w-1/2 w-full lg:auth-form">
          <label className="text-sm sm:text-base">Enter Email:</label>
          <input
            type="text"
            placeholder="Enter your email...."
            onChange={handleChange}
            value={formValues.email}
            name="email"
            className={`h-10 text-sm mb-2 mt-1 sm:text-base auth-input w-full rounded px-2 rounded focus:h-10 ${
              error ? "active outline outline-red-500" : "outline-none"
            }`}
          />

          <label className="text-sm sm:text-base">Enter Name:</label>
          <input
            type="text"
            placeholder="Enter your name...."
            onChange={handleChange}
            value={formValues.name}
            name="name"
            className={`h-10 text-sm mb-2 mt-1 sm:text-base p-2 rounded w-full focus:h-10 ${
              error ? "active outline outline-red-500" : "outline-none"
            }`}
          />
          <label className="text-sm sm:text-base">Enter Password:</label>
          <input
            type="password"
            placeholder="Enter your password...."
            onChange={handleChange}
            value={formValues.password}
            name="password"
            className={`h-10 text-sm mb-2 mt-1 sm:text-base rounded p-2 w-full focus:h-10 ${
              error ? "active outline outline-red-500" : "outline-none"
            }`}
          />
          <button
            className="bg-blue-400 rounded-lg text-white py-2 mt-2 "
            onClick={createAccount}
          >
            Sign up
          </button>
          <p className="my-3 text-sm mt-3 sm:text-base">
            Already have an account,{" "}
            <Link
              to="/login"
              className="text-indigo-700 hover:text-indigo-500 hover:underline"
            >
              sign in?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
