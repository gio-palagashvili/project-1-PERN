import React, { useState } from "react";
import axios from "axios";
import Alert from "../common/Alert";

const PackageModal = () => {
  const [packageItem, setPackage] = useState({
    name: "",
    weight: 0,
    price: 0,
    code: "",
  });
  const [error, setError] = useState({ error: null });

  const handleChange = (e) => {
    setPackage({
      ...packageItem,
      [e.target.name]: e.target.value,
    });
  };
  const handleError = (text) => {
    let item = document.getElementById("alert-error");

    setError({ error: text });
    item.style.opacity = 1;

    setTimeout(() => {
      item.style.opacity = 0;
      setError({ error: null });
    }, 3000);
  };

  const handleSubmit = () => {
    const reg = new RegExp("^[0-9]+$");

    if (packageItem.code.length > 6) {
      if (packageItem.name.length > 1) {
        if (reg.test(packageItem.weight) && packageItem.weight != 0) {
          axios
            .post("http://localhost:5000/package/create", packageItem, {
              headers: {
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("user")
                )}`,
              },
            })
            .then((data) => {
              window.location.reload();
            })
            .catch((err) => {
              handleError(err.response.data.message);
              console.log(err);
            });
        } else handleError("Invalid weight");
      } else handleError("Invalid name");
    } else handleError("Tracking Code Can't be Shorter Than 6 chatacters");
  };
  return (
    <>
      <input type="checkbox" id="my-modal2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-[#1B1B1B] patch w-[90%] xl:w-1/2">
          <div className="data py-2 h-full w-full">
            <div className="form-control w-full ">
              <h1 className="text-3xl lg:mb-2">Fill out the details</h1>
              <label className="label">
                <span className="label-text">Tracking #</span>
              </label>
              <input
                className="input w-full input-x h-[45px] bg-zinc-800 px-2 rounded-md"
                name="code"
                onChange={(e) => handleChange(e)}
              />
              <div className="w-full flex">
                <div className="w-1/2 mr-2">
                  <label className="label">
                    <span className="label-text">Full Name on item</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    className="w-full input-x h-[45px] bg-zinc-800 px-2 rounded-md hover:cursor-not-"
                    autoComplete="off"
                  />
                </div>
                <div className="w-1/2">
                  <div className="w-full mr-2">
                    <label className="label">
                      <span className="label-text">Weight</span>
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="weight"
                        onChange={(e) => handleChange(e)}
                        className="w-full input-x h-[45px] bg-zinc-800 px-2 rounded-l-md"
                        autoComplete="off"
                      />
                      <span
                        className="inline-flex items-center px-3 text-smborder border-l-0
                     rounded-r-md bg-zinc-700 text-gray-400
                      border-gray-600"
                      >
                        kg
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex">
                <div className="w-full mr-2">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <div className="flex">
                    <span
                      className="inline-flex items-center px-3 text-smborder border-r-0
                     rounded-l-md bg-zinc-700 text-gray-400
                      border-gray-600"
                    >
                      $
                    </span>
                    <input
                      type="text"
                      name="price"
                      onChange={(e) => handleChange(e)}
                      className="w-full input-x h-[45px] bg-zinc-800 px-2 rounded-r-md"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <label
              className="text-[12px] font-sans btn btn-md btn-ghost hover:bg-red-500"
              htmlFor="my-modal2"
            >
              cancel
            </label>
            <button onClick={handleSubmit}>
              <label
                className="text-[12px] font-sans btn btn-md btn-ghost"
                htmlFor={!error.error ? "my-modal2" : ""}
              >
                add
              </label>
            </button>
          </div>
        </div>
      </div>
      <Alert error={error.error} />
    </>
  );
};

export default PackageModal;
