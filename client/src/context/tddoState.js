import react from "react";
import TodoContex from "./todoContex";

const TodoState = () => {
  const state = {
    todo: [],
  };
  return (
    <TodoContex.provider value={state}>{props.children}</TodoContex.provider>
  );
};

export default TodoState;
