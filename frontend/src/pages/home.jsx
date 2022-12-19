import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AppContext";
import axios from "axios";
import Nav from "../components/Nav";
import User from "../components/User";
import Modal from "../components/Modal";

const Home = () => {
  const { initial, setInitial } = useContext(UserContext);
  const navigate = useNavigate();

  const getPackages = () => {
    const user = localStorage.getItem("user");
    axios
      .get("http://localhost:5000/packages/")
      .then((data) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    if (!initial.user) {
      navigate("/login");
    }
    getPackages();
  }, []);

  return (
    <div className="w-[65%] mx-auto">
      <Nav />
      <Modal initialText="Profile" buttonText="close" promptText="My profile" />
    </div>
  );
};

export default Home;
