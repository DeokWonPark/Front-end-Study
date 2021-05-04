import { useCallback, useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "SETUSER":
      return {
        users: action.users,
        loading: false,
        error: null,
      };
    case "SETERROR":
      return {
        users: null,
        loading: false,
        error: action.error,
      };
    case "SETLOADING":
      return {
        users: null,
        loading: true,
        error: null,
      };
    default:
      return new Error(`Unhandeled action type ${action.type}`);
  }
}

export default function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: null,
    users: null,
    error: null,
  });

  const fetchUser = useCallback(async () => {
    dispatch({ type: "SETLOADING" });
    try {
      const response = await callback();
      dispatch({ type: "SETUSER", users: response.data });
    } catch (e) {
      dispatch({ type: "SETERROR", error: e });
    }
  }, [callback]);

  useEffect(() => {
    if (skip) return;
    fetchUser();
  }, deps);

  return [state, fetchUser];
}
