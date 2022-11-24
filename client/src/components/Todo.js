import React, { useState, useRef, useEffect, useContext } from "react";
import TaskList from "./TaskList.js";
import axios from "axios";
import { TodoContext } from "../context/Contex";
import AddTask from "./AddTask.js";

function Todo({ todo, showTodoList, setShowTodoList }) {
  const { todoData, setTodoData, deletePopUp, setDeletePopUp } =
    useContext(TodoContext);
  const [isTodoTitleEdit, setIsTodoTitleEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(todo);
  const titleInputRef = useRef(null);
  const [isTitleLoading, setIstitleLoading] = useState(false);
  async function handleUpdateTodoTitle(e) {
    e.preventDefault();
    setIstitleLoading(true);
    try {
      const response = await axios({
        method: "put",
        url: "/api/update_todo_title",
        data: { todoId: currentTodo._id, title: currentTodo.title },
      });
      const data = response.data;
      const newtodoData = todoData.map((todo) => {
        return todo._id === currentTodo._id ? currentTodo : todo;
      });
      setTodoData(newtodoData);
      setIsTodoTitleEdit(false);
      setIstitleLoading(false);
    } catch (error) {
      setIstitleLoading(false);
    }
  }

  useEffect(() => {
    if (isTodoTitleEdit) titleInputRef.current.focus();
  }, [isTodoTitleEdit]);

  return (
    <div id="accordion-flush  " className="border-0 border-b-2 border-gray-500">
      <form
        onSubmit={(e) => handleUpdateTodoTitle(e)}
        className="flex items-center justify-between w-full font-medium text-left  focus:ring-gray-800  text-gray-400   bg-gray-700 hover:bg-gray-800"
      >
        <button
          type="button"
          onClick={() =>
            !isTodoTitleEdit
              ? setShowTodoList((preVal) =>
                  preVal == todo._id ? null : todo._id
                )
              : null
          }
          className="flex items-center justify-start w-full p-5 font-medium text-left"
        >
          {/*  arrow svg  */}
          {showTodoList === currentTodo._id ? (
            <svg
              className="w-6 h-6 shrink-0 mr-3    text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
              ></path>
            </svg>
          ) : (
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
          )}
          {/*  arrwo svg*/}

          {/* todo title */}
          <span className="w-2/4 cursor-pointer">
            {isTodoTitleEdit ? (
              <input
                type="text"
                ref={titleInputRef}
                onChange={(e) =>
                  setCurrentTodo((preVal) => {
                    return {
                      _id: preVal._id,
                      title: e.target.value,
                      tasks: preVal.tasks,
                    };
                  })
                }
                id="floating_email"
                autoComplete="off"
                className="block md:py-2.5 py-1 px-0 w-full text-lg text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Enter task"
                disabled={!isTodoTitleEdit}
                required
                defaultValue={todo.title}
              />
            ) : (
              <span
                className=" block py-2.5 px-0 text-lg w-full text-gray-300 bg-transparent border-0   appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                style={
                  showTodoList === currentTodo._id
                    ? { color: "white", fontWeight: "600" }
                    : null
                }
              >
                {currentTodo.title}
              </span>
            )}
          </span>
          {/* todo title  */}
        </button>

        {/* edit deleter button */}
        <div className="flex items-center justify-between">
          {isTodoTitleEdit ? (
            <>
              <button
                type="submit"
                className=" flex justify-center items-center cursor-pointer py-2 mr-3 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none "
              >
                Save
                {isTitleLoading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline  ml-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  </>
                ) : null}
              </button>
              <div
                type="button"
                onClick={() => {
                  setIsTodoTitleEdit(false);
                }}
                className="  cursor-pointer py-2 focus:outline-none px-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mr-2 "
              >
                Cancle
              </div>
            </>
          ) : (
            <>
              <div
                type="button"
                onClick={() => setIsTodoTitleEdit(true)}
                className="cursor-pointer py-2 focus:outline-none px-3  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-xs  mr-2 "
              >
                Edit
              </div>
              <div
                type="button"
                className="cursor-pointer py-2 focus:outline-none px-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mr-2 "
                onClick={() =>
                  setDeletePopUp({
                    todoId: currentTodo._id,
                    type: "Todo",
                    display: true,
                  })
                }
              >
                Delete
              </div>
            </>
          )}
        </div>
        {/* edit delete button  end*/}
      </form>
      {/* list */}
      {showTodoList === todo._id ? (
        <div className="p-5 font-light border border-b-0  border-gray-700">
          <ul className="max-w-full divide-y divide-gray-200 dark:divide-gray-700">
            {todo.tasks.map((task) => (
              <TaskList key={task._id} currentTask={task} currentTodo={todo} />
            ))}
            <AddTask currentTodo={todo} />
          </ul>
        </div>
      ) : null}
      {/* list end */}
    </div>
  );
}

export default Todo;
