import React from "react";
import styled from "styled-components";
import { useTodoState } from "../todoContext";
import TodoItem from "./todoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const TodoList = (props) => {
  const todos = useTodoState();
  return (
    <>
      <TodoListBlock>
        {todos.map((todo) => (
          <TodoItem
            text={todo.text}
            done={todo.done}
            key={todo.id}
            id={todo.id}
          />
        ))}
      </TodoListBlock>
    </>
  );
};

export default TodoList;
