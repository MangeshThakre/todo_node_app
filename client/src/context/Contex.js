import { createContext, useState } from "react";

export const TodoContext = createContext();

const Context = ({ children }) => {
  const [todoData, setTodoData] = useState([]);
  const [deletePopUp, setDeletePopUp] = useState({
    display: false,
    todoId: "",
    taskId: "",
    type: "",
  });
  return (
    <TodoContext.Provider
      value={{ todoData, setTodoData, deletePopUp, setDeletePopUp }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default Context;
