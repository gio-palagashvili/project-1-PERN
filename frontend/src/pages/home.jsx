import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AppContext";
import axios from "axios";
import Nav from "../components/Nav";
import User from "../components/User";

const Home = () => {
  const { initial, setInitial } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initial.user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-[65%] mx-auto">
      <Nav />
    </div>
  );
};

export default Home;
