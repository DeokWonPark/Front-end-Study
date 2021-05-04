import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import createAsyncDispatcher, { createAsyncHandler } from "./asyncActionUtil";
import { initialAsyncState } from "./asyncActionUtil.js";
import * as api from "./api.js";

const initialState = {
  users: initialAsyncState,
  user: initialAsyncState,
};

const handleUsers = createAsyncHandler("GET_USERS", "users");
const handleUser = createAsyncHandler("GET_USER", "user");
function reducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
    case "GET_USERS_SUCCESS":
    case "GET_USERS_ERROR":
      return handleUsers(state, action);

    case "GET_USER":
    case "GET_USER_SUCCESS":
    case "GET_USER_ERROR":
      return handleUser(state, action);

    default:
      return new Error(`unHandeled action type ${action.type}`);
  }
}

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserStateContext.Provider value={state}>
        <UserDispatchContext.Provider value={dispatch}>
          {children}
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
    </>
  );
};

export const useStateContext = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error(`cannot find UserProvider`);
  }
  return context;
};
export const useDispatchContext = () => {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error(`cannot find UserProvider`);
  }
  return context;
};

export const getUsers = createAsyncDispatcher("GET_USERS", api.getUsers);
export const getUser = createAsyncDispatcher("GET_USER", api.getUser);
