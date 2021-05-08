import React, { memo, useContext, useEffect } from 'react';
import { userDispatch } from '../app_reducer';

const User=memo(({ user })=> {
const dispatch=useContext(userDispatch);

  useEffect(()=>{
    console.log(`${user.username} rendering..`)
  })
  useEffect(() => {
      console.log('user 값이 설정됨');
    },[user]);
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
      <button onClick={()=> dispatch({ type:"REMOVE_USER", id:user.id})
        }>삭제</button>
    </div>
  );
});
  

const UserList = memo(({ users }) => {
  return (
      <div>
        {users.map(user => (
          <User user={user} key={user.id} />
        ))}
      </div>
    );
});

export default UserList;