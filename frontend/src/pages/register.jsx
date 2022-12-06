import React, { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/AppContext";

const Register = () => {
  const { initial } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (initial.user) {
      navigate("/");
    }
  }, []);

  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    passwordR: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password === data.passwordR) {
      axios({
        method: "POST",
        url: "http://localhost:5000/user/register",
        data: {
          email: data.email,
          password: data.password,
          username: data.username,
        },
      })
        .then((s) => {
          navigate("/login");
          console.log("ss");
        })
        .catch((err) => {
          console.log(err);
          setData({ ...data, email: "" });
          setError(err.response.data.message);
        });
    } else {
      setError("Passwords do not match");
      setData({ ...data, passwordR: "" });
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="w-screen h-[90vh] flex justify-center items-center flex-col">
        <div className="w-1/3 h-[60%] min-w-max flex justify-center bg-[#1b1b1b] flex-col rounded-lg place-content-center items-center m-auto">
          <div className="text-center -mt-40 mb-6">
            <h1 className="text-3xl">Welcome Back</h1>
            <p className="text-[13px] text-gray-400">
              To create a new account fill in the forms
            </p>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="max-w-md">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className={
                error && error.indexOf("length") > -1
                  ? "input w-full max-w-md input-xl mb-2 bg-zinc-800 h-[30%] input-error"
                  : "input w-full max-w-md input-xl mb-2 bg-zinc-800 h-[30%]"
              }
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              name="email"
              placeholder={
                error && error.indexOf("duplicate") > -1
                  ? "Email already in use"
                  : "Email"
              }
              value={data.email}
              required
              className={
                error && error.indexOf("duplicate") > -1
                  ? "input w-full max-w-md input-xl mb-2 bg-zinc-800 h-[30%] input-error"
                  : "input w-full max-w-md input-xl mb-2 bg-zinc-800 h-[30%]"
              }
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              onChange={(e) => handleChange(e)}
              className={
                error && error.indexOf("match") > -1
                  ? "input w-full max-w-md mb-2 bg-zinc-800 h-[30%] input-error"
                  : "input w-full max-w-md mb-2 bg-zinc-800 h-[30%]"
              }
            />
            <input
              type="password"
              name="passwordR"
              required
              value={data.passwordR}
              placeholder={
                error && error.indexOf("match") > -1
                  ? "Passwords don't match"
                  : "Repeat password"
              }
              onChange={(e) => handleChange(e)}
              className={
                error && error.indexOf("match") > -1
                  ? "input w-full max-w-md mb-2 bg-zinc-800 h-[30%] input-error"
                  : "input w-full max-w-md mb-2 bg-zinc-800 h-[30%]"
              }
            />
            <a
              href="./login"
              className="m-1 text-sm text-gray-400 hover:text-blue-300 block hover:underline"
            >
              Already have an account? Sign in.
            </a>
            <input
              type="submit"
              className="btn btn-accent w-full m-1  max-w-md"
              value="Register"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
