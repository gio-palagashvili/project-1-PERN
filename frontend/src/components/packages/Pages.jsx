import React from "react";

const Pages = (props) => {
  return (
    <div className="w-[90%] flex mb-3">
      <div className="btn-group mx-auto">
        {props.items
          ? props.items.map((item, index) => {
              index++;
              if (index <= Math.ceil(props.items.length / 4)) {
                if (index == props.pages) {
                  return (
                    <button
                      className={props.active}
                      onClick={props.clicked}
                      value={index}
                      key={index}
                    >
                      {index}
                    </button>
                  );
                }
                return (
                  <button
                    className="btn"
                    onClick={props.clicked}
                    value={index}
                    key={index}
                  >
                    {index}
                  </button>
                );
              }
            })
          : ""}
      </div>
    </div>
  );
};

export default Pages;
