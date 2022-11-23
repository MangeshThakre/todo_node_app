import React, { useState } from "react";
import TaskList from "./TaskList.js";
function Todo({ todo, i, showTodoList, setShowTodoList }) {
  return (
    <div id="accordion-flush">
      <div className="flex items-center justify-between w-full font-medium text-left  focus:ring-gray-800  text-gray-400   bg-gray-700 hover:bg-gray-800">
        <button
          type="button"
          onClick={() =>
            setShowTodoList((preVal) => (preVal == todo._id ? null : todo._id))
          }
          className="flex items-center justify-start w-full p-5 font-medium text-left"
        >
          <svg
            data-accordion-icon
            className="w-6 h-6 shrink-0 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
            ></path>
          </svg>
          <span>{todo.title}</span>
        </button>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Edit
          </button>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>
      </div>
      {/* list */}
      {showTodoList === todo._id ? (
        <div>
          <div className="p-5 font-light border border-b-0  border-gray-700">
            <ul className="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
              {todo.tasks.map((task, i) => (
                <TaskList key={i} task={task} todoId={todo._id} />
              ))}
            </ul>
          </div>
        </div>
      ) : null}
      {/* list end */}
    </div>
  );
}

export default Todo;
