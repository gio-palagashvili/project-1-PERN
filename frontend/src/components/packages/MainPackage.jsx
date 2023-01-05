import SinglePackage from "./SinglePackage";
import React from "react";

const MainPackage = (props) => {
  return (
    <>
      <h1 className="text-[#A6ADBA] bold text-4xl font-bold font-mono mb-10 ">
        View your packages
        <label for="my-modal2" className="block">
          <label
            className="text-[8.5px] font-sans btn btn-sm btn-info"
            for="my-modal2"
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

      <input type="checkbox" id="my-modal2" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box bg-[#1B1B1B] patch w-[90%] xl:w-1/2">
          <h3 class="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p class="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div class="modal-action">
            <label
              className="text-[8.5px] font-sans btn btn-sm btn-ghost"
              for="my-modal2"
            >
              add
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPackage;
