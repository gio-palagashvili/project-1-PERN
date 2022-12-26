import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AppContext";
import axios from "axios";
import Nav from "../components/Nav";
import User from "../components/User";
import Modal from "../components/Modal";
import MainPackage from "../components/packages/MainPackage";

const Home = () => {
  const { initial, setInitial } = useContext(UserContext);
  const navigate = useNavigate();

  const getPackages = () => {
    const user = localStorage.getItem("user");
    axios
      .get("http://localhost:5000/package/me/recent", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
        },
      })
      .then((data) => {
        setInitial({ ...initial, userPackages: data.data.packages });
      })
      .catch((err) => {
        console.log(err);
      });
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
      <div className="packs w-full mt-10">
        <div className="overflow-x-auto">
          {initial.currentPage === "Packages" ? (
            <MainPackage data={initial.userPackages} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
