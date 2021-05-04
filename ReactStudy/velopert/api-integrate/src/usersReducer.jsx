import React, { useState } from "react";
import User from "./user";
import { getUsers, useDispatchContext, useStateContext } from "./usersContext";

const UsersReducer = (props) => {
  const [userId, setUserId] = useState(null);

  const state = useStateContext();
  const dispatch = useDispatchContext();
  const { loading, error, data: users } = state.users;

  const fetchUsers = () => {
    getUsers(dispatch);
  };

  if (loading) return <div>로딩중 ...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return <button onClick={fetchUsers}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>Refresh</button>
      {userId && <User id={userId}></User>}
    </>
  );
};

export default UsersReducer;
