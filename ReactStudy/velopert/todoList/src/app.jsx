import "./app.css";
import styled, { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/todoTemplate";
import TodoHead from "./components/todoHead";
import TodoList from "./components/todoList";
import ToDoCreate from "./components/toDoCreate";
import { TodoProvider } from "./todoContext";

const GlobalStyle = createGlobalStyle`
  body{
    background:#e9ecef;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead></TodoHead>
        <TodoList></TodoList>
        <ToDoCreate></ToDoCreate>
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;
