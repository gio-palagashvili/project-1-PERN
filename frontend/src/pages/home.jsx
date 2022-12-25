import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AppContext";
import axios from "axios";
import Nav from "../components/Nav";
import User from "../components/User";
import Modal from "../components/Modal";
import SinglePackage from "../components/packages/SinglePackage";

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
        <h1 className="text-[#A6ADBA] bold text-4xl font-bold font-mono mb-10 ">
          View your packages
        </h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-zinc-700">Item Name</th>
                <th className="bg-zinc-700">Tracking #</th>
                <th className="bg-zinc-700">Weight</th>
                <th className="bg-zinc-700">Status</th>
                <th className="bg-zinc-700"></th>
              </tr>
            </thead>
            <tbody>
              {initial.userPackages
                ? initial.userPackages.map((pack, index) => {
                    return (
                      <SinglePackage
                        data={pack}
                        key={index}
                        active={index % 2 !== 0 ? "true" : "false"}
                      />
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
