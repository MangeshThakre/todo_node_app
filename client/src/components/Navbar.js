import React from "react";
import todoLogo from "../assets/todo.png";

function navbar() {
  return (
    <nav className=" fixed w-full top-0 bg-gray-600   border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center">
          <img src={todoLogo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Todo App
          </span>
        </div>
      </div>
    </nav>
  );
}

export default navbar;
