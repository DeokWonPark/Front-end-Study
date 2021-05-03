import { createContext, useContext, useReducer, useRef, useState } from "react";

const initialTodos = [
  {
    id: 1,
    text: "또선생 영어공부",
    done: true,
  },
  {
    id: 2,
    text: "자기소개서 작성",
    done: true,
  },
  {
    id: 3,
    text: "React Study",
    done: false,
  },
  {
    id: 4,
    text: "백준 알고리즘",
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return new Error(`Unhandled action type ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const nextId = useRef(5);
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  return (
    <>
      <TodoStateContext.Provider value={state}>
        <TodoDispatchContext.Provider value={dispatch}>
          <TodoNextIdContext.Provider value={nextId}>
            {children}
          </TodoNextIdContext.Provider>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </>
  );
}

export function useTodoStateContext() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error(`Cannot find TodoProvider`);
  }
  return context;
}
export function useTodoDispatchContext() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error(`Cannot find TodoProvider`);
  }
  return context;
}
export function useTodoNextIdContext() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error(`Cannot find TodoProvider`);
  }
  return context;
}
