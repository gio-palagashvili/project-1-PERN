import React, { useEffect, useState } from "react";
import axios from "axios";

const Modal = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
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
        setUser({ username: data2.user.username, email: data2.user.email });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="modal_2 ">
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box bg-[#1B1B1B]">
          <h3 className="font-bold text-lg">{props.promptText}</h3>
          <div className="data py-2 h-full w-full">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                className="w-full input-x h-[45px] bg-zinc-800 px-2 rounded-md opacity-30 cursor-not-allowed"
                disabled
              />
              <label className="label">
                <span className="label-text">Your username</span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user.username}
                className="input w-full input-x h-[45px] bg-zinc-800 px-2 rounded-md"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn btn-sm btn-error text-[12px] text-white capitalize w-1/2"
            >
              {props.buttonText}
            </label>
            <label
              htmlFor="my-modal"
              className="btn btn-sm btn-success text-[12px] text-white capitalize w-1/2"
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
