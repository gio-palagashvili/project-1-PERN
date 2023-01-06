import React, { useState } from "react";
import PackageModal from "./PackageModal";
import SinglePackage from "./SinglePackage";

const MainPackage = (props) => {
  return (
    <>
      <h1 className="text-[#A6ADBA] bold text-4xl font-bold font-mono mb-10 ">
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
      <table className="table lg:w-[90%]">
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
      <PackageModal />
    </>
  );
};

export default MainPackage;
