import axios from "axios";
import React, { useState, useContext } from "react";
import { UserContext } from "../../context/AppContext";
import Alert from "../common/Alert";
import PackageModal from "./PackageModal";
import Pages from "./Pages";
import SinglePackage from "./SinglePackage";

const MainPackage = (props) => {
  const active = "btn btn-active bg-[#3ABFF8] border-[#3ABFF8] text-black";

  const { initial, setInitial } = useContext(UserContext);

  const [pages, setPages] = useState({
    cPage: 1,
    itemPer: 4,
    itemsNum: props.itemsTotal,
    index: 4,
  });
  const [error, setError] = useState(null);

  const setPage = (e) => {
    setPages({
      ...pages,
      cPage: e.target.value,
      index: e.target.value * pages.itemPer,
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
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/package/delete/", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
          package_id: id,
        },
      })
      .then((data) => {
        const newState = initial.userPackages.filter((item) => {
          if (item.package_id == data.data.package_id) {
            return null;
          }
          return item;
        });
        setInitial({ ...initial, userPackages: newState });
      })
      .catch((err) => {
        // handleError(err);
      });
  };
  return (
    <>
      <h1 className="text-[#A6ADBA] bold text-4xl font-bold font-mono mb-8">
        View your packages
        <label htmlFor="my-modal2" className="block">
          <label
            className="text-[8.5px] font-sans btn btn-sm btn-info xl:text-[9.5px]"
            htmlFor="my-modal2"
          >
            Add a Package
          </label>
        </label>
      </h1>
      <table className="table lg:w-[90%] mb-2">
        <thead>
          <tr>
            <th className="bg-[#282828]">Item Name</th>
            <th className="bg-[#282828]">Tracking #</th>
            <th className="bg-[#282828]">Weight</th>
            <th className="bg-[#282828]">Status</th>
            <th className="bg-[#282828]">Price</th>
            <th className="bg-[#282828]"></th>
          </tr>
        </thead>
        <tbody>
          {initial.userPackages
            ? initial.userPackages.map((pack, index) => {
                if (index < pages.index && index >= pages.index - 4) {
                  return (
                    <SinglePackage
                      data={pack}
                      delete={handleDelete}
                      key={index}
                      active={index % 2 !== 0}
                    />
                  );
                }
              })
            : null}
        </tbody>
      </table>
      <Pages
        active={active}
        clicked={setPage}
        items={initial.userPackages ? initial.userPackages : ""}
        pages={pages.cPage}
      />
      <PackageModal />
      <Alert error={error ? error : ""} />
    </>
  );
};

export default MainPackage;
