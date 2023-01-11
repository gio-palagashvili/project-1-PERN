import React from "react";

const SinglePackage = (props) => {
  const style = "capitalize text-gray-300";
  const badge =
    props.data.status === "delivered"
      ? "badge gap-2 text-[10px] font-bold badge-success"
      : "badge badge-info gap-2 text-[10px] font-bold";
  return (
    <tr className={props.active ? `${style} active` : `${style}`}>
      <td className={props.active ? `odd` : `even`}>{props.data.name}</td>
      <td className={props.active ? `odd` : `even`}>{props.data.code}</td>
      <td className={props.active ? `odd` : `even`}>{props.data.weight}</td>
      <td className={props.active ? `odd` : `even`}>
        <div className={badge}>{props.data.status}</div>
      </td>
      <td className={props.active ? `odd` : `even`}>{props.data.price}</td>
      <td className={props.active ? `odd` : `even`}>
        <button className="btn btn-xs btn-ghost hover:bg-[#3ABEF8] hover:text-black">
          Edit
        </button>
        <button
          className="btn btn-xs btn-ghost hover:bg-red-500"
          onClick={() => props.delete(props.data.package_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SinglePackage;
