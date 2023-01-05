import React, { useState } from "react";
import axios from "axios";
import { UserContext } from "../context/AppContext";
import { useContext } from "react";
import { json, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const { initial, setInitial } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (initial.user) {
      navigate("/");
    }
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/user/login", {
        email: data.email,
        password: data.password,
      })
      .then((s) => {
        if (s.data.status === "success") {
          localStorage.setItem("user", JSON.stringify(s.data.token));
          setInitial({
            ...initial,
            user: s.data.token,
          });
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="w-screen h-[90vh] flex justify-center items-center flex-col">
        <div className="w-1/3 h-[55%] flex justify-center min-w-max  bg-[#1b1b1b] items-center flex-col rounded-lg">
          <div className="text-center mb-10 -mt-10">
            <h1 className="text-3xl">Welcome Back</h1>
            <p className="text-[13px] text-gray-400">
              Enter your email and password to log into your account
            </p>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className={
                !error
                  ? "input w-full max-w-md input-xl mb-2 bg-zinc-800 h-[40%]"
                  : "input w-full max-w-md input-xl mb-2 bg-zinc-800 h-[40%] input-error"
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
                !error
                  ? "input w-full max-w-md mb-1 bg-zinc-800 h-[40%]"
                  : "input w-full max-w-md input-xl mb-2 bg-zinc-800 h-[40%] input-error"
              }
            />
            <a
              href="./register"
              className="m-1 text-sm text-gray-400 hover:text-blue-300 block hover:underline"
            >
              Don't have an account?
            </a>
            <input
              type="submit"
              className="btn btn-accent w-full m-1 max-w-md "
              value="Log In"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
