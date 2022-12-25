import React, { useEffect, useState } from "react";
import axios from "axios";

const Modal = (props) => {
  const [user, setUser] = useState({
    firstName: "",
    email: "",
    lastName: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/me", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
        },
      })
      .then((data) => {
        const data2 = data.data;
        setUser({
          email: data2.user.email,
          firstName: data2.user.firstName,
          lastName: data2.user.lastName,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    var reg =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (user.email.match(reg)) {
    }
  };
  return (
    <div className="modal_2">
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-[#1B1B1B] patch w-[90%] xl:w-1/2">
          <h3 className="font-bold text-lg">{props.promptText}</h3>
          <div className="data py-2 h-full w-full">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">email</span>
              </label>
              <input
                type="email"
                name="email"
                onChange={(e) => handleChange(e)}
                defaultValue={user.email}
                className="input w-full input-x h-[45px] bg-zinc-800 px-2 rounded-md"
              />
              <div className="w-full flex">
                <div className="w-1/2 mr-2">
                  <label className="label">
                    <span className="label-text">first name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={user.firstName}
                    className="w-full input-x h-[45px] bg-zinc-800 px-2 rounded-md opacity-50 hover:cursor-not-"
                    autoComplete="off"
                    disabled
                  />
                </div>
                <div className="w-1/2">
                  <label className="label">
                    <span className="label-text">last name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={user.lastName}
                    className="w-full input-x h-[45px] bg-zinc-800 px-2 rounded-md opacity-50 hover:cursor-not-allowed"
                    autoComplete="off"
                    disabled
                  />
                </div>
              </div>

              <main
                tabIndex={0}
                className="bg-zinc-800 rounded-md mt-3 w-full h-[45px] p-2"
              ></main>
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn btn-sm btn-error text-[12px] capitalize w-1/2 bg-transparent border-0 text-white hover:text-black"
            >
              close
            </label>
            <label
              htmlFor="my-modal"
              className="btn btn-sm btn-success text-[12px] capitalize w-1/2 bg-transparent border-0 text-white hover:text-black"
              onClick={handleClick}
            >
              Save
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
