import React from "react";
import { useState } from "react";
import axios from "axios";
import loading from "../assets/loading.svg";
function TaskList({ task, todoId }) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);
  const [istaskLoading, setIsTaskLoading] = useState(false);
  const URL = process.env.REACT_APP_URL;
  console.log(todoId);
  // edit task
  async function handleEditTask(e) {
    e.preventDefault();
    setIsTaskLoading(true);
    try {
      const response = await axios({
        method: "put",
        url: "/api/update_task",
        data: {
          todoId,
          taskId: task._id,
          checked: currentTask.checked,
          task: currentTask.task,
        },
      });
      const data = response.data;
      setIsEdit(false);
      setIsTaskLoading(false);
    } catch (error) {
      setIsTaskLoading(false);
    }
  }

  // delete task
  async function handleDeleteTask() {
    try {
      const response = await axios({
        method: "delete",
        url: `/api/delete_task/${todoId}/${task._id}`,
      });
      const data = response.data;
    } catch (error) {}
  }

  return (
    <li key={task._id} className="py-3 sm:pb-4   md:px-10  ">
      {istaskLoading ? (
        <div className="absolute w-full flex justify-center items-center ">
          <img className="h-12 w-12" src={loading} alt="loding" />
        </div>
      ) : null}
      <form
        className="flex items-center space-x-4"
        onSubmit={(e) => handleEditTask(e)}
      >
        <div className="w-full flex  gap-8">
          <div className="flex items-center">
            {currentTask.checked ? (
              <>
                <svg
                  className="w-4 h-4  md:w-6 md:h-6 cursor-pointer text-green-400"
                  data-tooltip-target="tooltip-default"
                  data-tooltip-trigger="hover"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div
                  id="tooltip-default"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  unCheck
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4  md:w-6 md:h-6 cursor-pointer text-red-400"
                  data-tooltip-target="tooltip-animation"
                  data-tooltip-trigger="hover"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div
                  id="tooltip-animation"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  Check
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <input
              type="text"
              onChange={(e) =>
                setCurrentTask((preVal) => {
                  return {
                    task: e.target.value,
                    checked: preVal.checked,
                  };
                })
              }
              name="floating_email"
              id="floating_email"
              className={
                isEdit
                  ? "block md:py-2.5 py-1 px-0 w-full text-lg text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  : "block py-2.5 px-0 w-full text-lg text-gray-300 bg-transparent border-0   appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              }
              placeholder="Enter task"
              disabled={!isEdit}
              required
              defaultValue={currentTask.task}
            />
          </div>
        </div>
        {/* edit delete button */}
        <div className="inline-flex   gap-4 items-center text-base font-semibold text-white">
          {isEdit ? (
            <>
              <button type="submit">
                <svg
                  className="w-6 h-6 rotate-90  text-blue-500 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>

              <svg
                onClick={() => setIsEdit((preVal) => !preVal)}
                className="w-6 h-6    cursor-pointer text-red-500"
                data-tooltip-target="tooltip-animation"
                data-tooltip-trigger="hover"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </>
          ) : (
            <>
              <svg
                onClick={() => setIsEdit((preVal) => !preVal)}
                className="w-6 h-6 cursor-pointer  text-green-500"
                data-tooltip-target="tooltip-animation"
                data-tooltip-trigger="hover"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                data-tooltip-target="tooltip-default"
                data-tooltip-trigger="hover"
                className="w-6 h-6    cursor-pointer text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </>
          )}
          <div
            id="tooltip-animation"
            role="tooltip"
            className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
          >
            Edit Task
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>

          <div
            id="tooltip-default"
            role="tooltip"
            className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
          >
            Delete Task
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        {/* edit delete button  end */}
      </form>
    </li>
  );
}

export default TaskList;
