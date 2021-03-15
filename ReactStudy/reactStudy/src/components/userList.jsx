import React, { useEffect } from 'react';

function User({ user, onRemove }) {
    useEffect(() => {
        console.log('user 값이 설정됨');
      });
    return (
      <div>
        <b>{user.username}</b> <span>({user.email})</span>
        <button onClick={onRemove.bind(this,user.id)}>삭제</button>
      </div>
    );
  }
  

const UserList = ({ users, onRemove }) => {
    return (
        <div>
          {users.map(user => (
            <User user={user} key={user.id} onRemove={onRemove} />
          ))}
        </div>
      );
}

export default UserList;