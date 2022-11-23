import "./App.css";
import Navbar from "./components/Navbar.js";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";

import axios from "axios";

function App() {
  const [showTodoList, setShowTodoList] = useState(null);
  const URL = process.env.REACT_APP_URL;
  const [todoData, setTodoData] = useState([]);
  const [todoDataLoading, setTodoDataLoading] = useState(false);
  async function getAllTodoDate() {
    setTodoDataLoading(true);
    try {
      const response = await axios.get("/api/get_todos");
      const data = response.data.data;
      setTodoData(data);
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
      {todoDataLoading
        ? "...loading"
        : todoData.map((todo, i) => (
            <Todo
              key={i}
              todo={todo}
              setShowTodoList={setShowTodoList}
              showTodoList={showTodoList}
              i={i}
            />
          ))}
    </div>
  );
}

export default App;
