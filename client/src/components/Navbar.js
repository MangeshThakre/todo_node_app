import React from "react";
import todoLogo from "../assets/todo.png";
import swaggerApiSvg from "../assets/swagger.svg";

function navbar() {
  const URL = process.env.REACT_APP_URL;
  return (
    <nav className=" fixed w-full top-0 bg-gray-600   border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center">
          <img src={todoLogo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Todo App
          </span>
        </div>
        <a
          target="_blanK"
          href={URL + "/api-docs"}
          className="flex items-center cursor-pointer"
        >
          <img
            src={swaggerApiSvg}
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center text-sm font-semibold whitespace-nowrap dark:text-white">
            API documentation
          </span>
        </a>
      </div>
    </nav>
  );
}

export default navbar;
