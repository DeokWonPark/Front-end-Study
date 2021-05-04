import React, { useEffect } from "react";
import { getUser, useDispatchContext, useStateContext } from "./usersContext";

const User = ({ id }) => {
  const state = useStateContext();
  const dispatch = useDispatchContext();

  const { loading, error, data: user } = state.user;

  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!user) return null;

  return (
    <>
      <h1>{user.username}</h1>
      <p>
        <b>{user.email}</b>
      </p>
    </>
  );
};

export default User;
