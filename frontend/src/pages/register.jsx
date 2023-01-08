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
    passwordR: "",
    firstName: "",
    lastName: "",
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
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
        },
      })
        .then((s) => {
          navigate("/login");
        })
        .catch((err) => {
          setData({ ...data, email: "" });
          setError(err.response.data.message);
          if (err.response.data.message.indexOf("name")) {
            setData({ ...data, firstName: "", lastName: "" });
          }
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
        <div
          className="w-1/3 h-[75%] min-w-max flex justify-center bg-[#1b1b1b] flex-col rounded-lg
         place-content-center items-center m-auto"
        >
          <div className="text-center -mt-28 mb-6">
            <h1 className="text-3xl">Welcome Back</h1>
            <p className="text-[13px] text-gray-400">
              To create a new account fill in the forms
            </p>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="max-w-md">
            <div className="w-full flex">
              <input
                type="text"
                name="firstName"
                placeholder="first name"
                required
                className={
                  error && error.indexOf("name") > -1
                    ? "input w-1/2 max-w-md input-xl mb-2 bg-zinc-800 h-[60px] input-error"
                    : "input w-1/2 max-w-md input-xl mb-2 bg-zinc-800 h-[60px]"
                }
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                name="lastName"
                placeholder={
                  error && error.indexOf("name") > -1
                    ? "duplicate user"
                    : "last name"
                }
                value={data.lastName}
                required
                className={
                  error && error.indexOf("name") > -1
                    ? "input w-1/2 max-w-md input-xl mb-2 bg-zinc-800 h-[60px] input-error"
                    : "input w-1/2 max-w-md input-xl mb-2 bg-zinc-800 h-[60px] ml-1"
                }
                onChange={(e) => handleChange(e)}
              />
            </div>
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
                  ? "input w-full max-w-md input-xl mb-2 bg-zinc-800 h-[25%] input-error"
                  : "input w-full max-w-md input-xl mb-2 bg-zinc-800 h-[25%]"
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
                  ? "input w-full max-w-md mb-2 bg-zinc-800 h-[25%] input-error"
                  : "input w-full max-w-md mb-2 bg-zinc-800 h-[25%]"
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
                  ? "input w-full max-w-md mb-2 bg-zinc-800 h-[25%] input-error"
                  : "input w-full max-w-md mb-2 bg-zinc-800 h-[25%]"
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
              className="btn btn-info w-full m-1  max-w-md"
              value="Register"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
