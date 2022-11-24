import React from "react";
import { useState } from "react";

function AddTodo() {
  const [addNewTask, setAddNewTas] = useState(false);
  const [newTask, setTask] = useState({});
  const [newtTaskLoading, setNewTaskLoading] = useState();

  return (
    <div className="w-full mt-4">
      <div></div>

      <div className="w-full flex justify-end">
        <button
          disabled
          type="button"
          className="cursor-pointer  py-2 px-3 mr-2 text-xs font-medium  rounded-lg border border-gray-200  focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 bg-gray-800 text-gray-400 dark:border-gray-600 hover:text-white hover:bg-gray-700 inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Add task
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
