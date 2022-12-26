import React from "react";
import SinglePackage from "./SinglePackage";

const MainPackage = (props) => {
  return (
    <>
      <h1 className="text-[#A6ADBA] bold text-4xl font-bold font-mono mb-10 ">
        View your packages
      </h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th className="bg-[#282828]">Item Name</th>
            <th className="bg-[#282828]">Tracking #</th>
            <th className="bg-[#282828]">Weight</th>
            <th className="bg-[#282828]">Status</th>
            <th className="bg-[#282828]"></th>
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
    </>
  );
};

export default MainPackage;
