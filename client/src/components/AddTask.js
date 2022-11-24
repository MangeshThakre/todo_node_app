import axios from "axios";
import { useState, useContext, useRef, useEffect } from "react";
import { TodoContext } from "../context/Contex";
function AddTodo({ currentTodo }) {
  const URL = process.env.REACT_APP_URL;
  const { todoData, setTodoData } = useContext(TodoContext);
  const [isAddNewTask, setIsAddNewTask] = useState(false);
  const [newTask, setTask] = useState({ task: "", checked: false });
  const [newtTaskLoading, setNewTaskLoading] = useState();
  const taskInputRef = useRef(null);
  async function handleEditTask(e) {
    e.preventDefault();
    setNewTaskLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/create_task",
        data: { todoId: currentTodo._id, taskObj: newTask },
      });

      const data = await response.data.data;
      console.log(currentTodo);
      const newTasks = [...currentTodo.tasks, data];
      const newTodoData = todoData.map((todo) => {
        return todo._id === currentTodo._id
          ? {
              _id: currentTodo._id,
              title: currentTodo.title,
              tasks: newTasks,
            }
          : todo;
      });

      // console.log(newTasks);
      setTodoData(newTodoData);
      setTask({ task: "", checked: false });
      setNewTaskLoading(false);
      setIsAddNewTask(false);
    } catch (error) {
      setNewTaskLoading(false);
    }
  }

  useEffect(() => {
    if (isAddNewTask) taskInputRef.current.focus();
  }, [isAddNewTask]);

  return (
    <div className="w-full">
      {isAddNewTask ? (
        // <ul className="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:pb-4   md:px-10  ">
          <form
            className="flex items-center space-x-4"
            onSubmit={(e) => handleEditTask(e)}
          >
            <div className="w-full flex  gap-8">
              {/* checked  */}
              <div className="flex items-center">
                {newTask.checked ? (
                  <button
                    type="button"
                    className="h-8 w-8   hover:bg-gray-600  rounded-full flex items-center justify-center"
                    onClick={() =>
                      setTask((preVal) => {
                        return {
                          task: preVal.task,
                          checked: false,
                        };
                      })
                    }
                  >
                    <svg
                      className="w-6 h-6  md:w-6 md:h-6 cursor-pointer text-green-400"
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
                  </button>
                ) : (
                  <button
                    className="h-8 w-8   hover:bg-gray-600  rounded-full flex items-center justify-center"
                    type="button"
                    onClick={() =>
                      setTask((preVal) => {
                        return {
                          task: preVal.task,
                          checked: true,
                        };
                      })
                    }
                  >
                    <svg
                      className="w-6 h-6  md:w-6 md:h-6 cursor-pointer text-red-400"
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
                  </button>
                )}
              </div>
              {/* input field */}
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  ref={taskInputRef}
                  onChange={(e) =>
                    setTask((preVal) => {
                      return {
                        task: e.target.value,
                        checked: preVal.checked,
                      };
                    })
                  }
                  id="floating_email"
                  autoComplete="off"
                  className="block md:py-2.5 py-1 px-0 w-full text-lg text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder="Enter task"
                  required
                />
              </div>
              {/* input field */}
              {/* checked   end*/}
            </div>
            {/* add cancle */}
            <div className="inline-flex   gap-4 items-center text-base font-semibold text-white">
              <button type="submit">
                {newtTaskLoading ? (
                  "loading"
                ) : (
                  <svg
                    className="w-6 h-6 rotate-90  text-blue-500 cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )}
              </button>

              <svg
                onClick={() => setIsAddNewTask(false)}
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
            </div>
            {/* add cancle */}
          </form>
        </li>
      ) : (
        //  </ul>
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={() => setIsAddNewTask(true)}
            disabled={isAddNewTask}
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
      )}
    </div>
  );
}

export default AddTodo;
