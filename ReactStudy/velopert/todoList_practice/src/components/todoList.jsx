import React from "react";
import styled from "styled-components";
import { useTodoStateContext } from "../todoContext";
import TodoItem from "./todoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const TodoList = (props) => {
  const todos = useTodoStateContext();
  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          id={todo.id}
          done={todo.done}
          text={todo.text}
          key={todo.id}
        ></TodoItem>
      ))}
    </TodoListBlock>
  );
};

export default TodoList;
