import React, { memo, useCallback, useContext, useRef } from 'react';
import { userDispatch } from '../app_reducer';
import useInputs from '../hooks/useInputs';

const CreateUser = memo((props) => { 

  const dispatch=useContext(userDispatch)

  const [{ username, email },onChange, reset] = useInputs({
      username:"",
      email:"",
  });

  const nextId = useRef(4);

  const onCreate=useCallback(()=>{
      dispatch({
          type:"CREATE_USER",
          user:{
              id:nextId.current,
              username:username,
              email:email,
          }
      });
      reset();
      nextId.current+=1;
  },[username,email,reset]);

  return (
      <div>
        <input
          name="username"
          placeholder="계정명"
          onChange={onChange}
          value={username}
        />
        <input
          name="email"
          placeholder="이메일"
          onChange={onChange}
          value={email}
        />
        <button onClick={onCreate}>등록</button>
      </div>
    );
})

export default CreateUser;