import React, { useState, useContext } from "react";
import { UserContext } from "../../context/AppContext";
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
  const setPage = (e) => {
    setPages({
      ...pages,
      cPage: e.target.value,
      index: e.target.value * pages.itemPer,
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
          </tr>
        </thead>
        <tbody>
          {props.data
            ? props.data.map((pack, index) => {
                if (index < pages.index && index >= pages.index - 4) {
                  return (
                    <SinglePackage
                      data={pack}
                      key={index}
                      active={index % 2 !== 0 ? "true" : "false"}
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
    </>
  );
};

export default MainPackage;
