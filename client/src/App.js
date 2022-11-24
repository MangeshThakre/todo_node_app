import "./App.css";
import Navbar from "./components/Navbar.js";
import Todo from "./components/Todo";
import { useContext, useEffect, useState } from "react";
import DeletePopUp from "./components/DeletePopUp";
import AddTodo from "./components/AddTodo.js";
import loadingSvg from "./assets/loading.svg";
import axios from "axios";
import { TodoContext } from "./context/Contex";

function App() {
  const URL = process.env.REACT_APP_URL;
  const [showTodoList, setShowTodoList] = useState(null);
  const { todoData, setTodoData, deletePopUp, setDeletePopUp } =
    useContext(TodoContext);

  const [todoDataLoading, setTodoDataLoading] = useState(false);
  async function getAllTodoDate() {
    setTodoDataLoading(true);
    try {
      const response = await axios.get(URL + "/api/get_todos");
      const data = response.data.data;
      setTodoData(data.reverse());
      setTodoDataLoading(false);
    } catch (error) {
      setTodoDataLoading(false);
    }
  }

  useEffect(() => {
    getAllTodoDate();
  }, []);

  return (
    <div className="App-header">
      <Navbar />

      <div
        className="flex flex-col    overflow-y-auto"
        style={{ height: "100vh" }}
      >
        <div style={{ paddingTop: "4rem", paddingBottom: "4xrem" }}>
          <AddTodo />
          {todoDataLoading ? (
            <div className="w-full  flex justify-center">
              <img src={loadingSvg} alt="loading" />
            </div>
          ) : (
            todoData.map((todo, i) => (
              <Todo
                key={todo._id}
                todo={todo}
                setShowTodoList={setShowTodoList}
                showTodoList={showTodoList}
                i={i}
              />
            ))
          )}
        </div>
      </div>

      {deletePopUp.display ? (
        <DeletePopUp
          todoData={todoData}
          setTodoData={setTodoData}
          deletePopUp={deletePopUp}
          setDeletePopUp={setDeletePopUp}
        />
      ) : null}
    </div>
  );
}

export default App;
