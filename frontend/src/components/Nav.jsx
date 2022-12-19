import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AppContext";

const Nav = () => {
  const { initial, setInitial } = useContext(UserContext);
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("user");
    setInitial({ ...initial, user: null });
    navigate("/login");
  };
  const pageChangeHandler = (name) => {
    setInitial({ ...initial, currentPage: name });
  };

  return (
    <nav className="sm:px-4 rounded w-[100%]">
      <div className="w-[100%] flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            CompanyName
          </span>
        </a>
        <div className="hidden w-full md:block md:w-auto">
          <ul
            className="flex flex-col p-4 mt-4 border rounded-lg md:flex-row
           md:space-x-8  md:text-sm md:font-medium md:border-0 "
          >
            {initial.pages.map((name, index) => {
              if (initial.currentPage === name) {
                return (
                  <li
                    key={index}
                    className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 hover:cursor-pointer"
                  >
                    {name}
                  </li>
                );
              }
              if (name === "Profile") {
                return (
                  <label htmlFor="my-modal" key={index}>
                    <li
                      className="block hover:cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      {name}
                    </li>
                  </label>
                );
              }
              return (
                <li
                  key={index}
                  onClick={() => pageChangeHandler(name)}
                  className="block hover:cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  {name}
                </li>
              );
            })}
            <li>
              <button
                className="btn btn-error btn-xs text-[10px] text-white rounded-full"
                onClick={logOutHandler}
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
