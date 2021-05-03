import styled, { createGlobalStyle } from "styled-components";
import "./app.css";
import TodoCreate from "./components/todoCreate";
import TodoHead from "./components/todoHead";
import TodoList from "./components/todoList";
import TodoTemplate from "./components/todoTemplate";
import { TodoProvider } from "./todoContext";

const GlobalStyle = createGlobalStyle`
  body{
    background:#e9ecef;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <TodoProvider>
        <TodoTemplate>
          <TodoHead></TodoHead>
          <TodoList></TodoList>
          <TodoCreate></TodoCreate>
        </TodoTemplate>
      </TodoProvider>
    </>
  );
}

export default App;
