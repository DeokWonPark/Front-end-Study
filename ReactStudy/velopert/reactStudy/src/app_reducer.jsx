import { createContext, useMemo, useReducer } from 'react';
import produce from 'immer';
import './app.css';
import CreateUser from './components/createUser';
import Hello from './components/hello';
import Input from './components/input';
import UserList from './components/userList';
import Wrapper from './components/wrapper';
import Counter2 from './components/counter2';
import Immercom from './components/immer';

function countUser(users) {
  console.log('count...');
  return users.length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    // return {
    //     users:state.users.concat(action.user),
    // }
    case 'REMOVE_USER':
      produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id == action.id);
        draft.splice(index, 1);
      });
    // return {
    //     users:state.users.filter((user)=> user.id!==action.id),
    // }
    default:
      return state;
  }
}

export const userDispatch = createContext(null);

function AppReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countUser(users), [users]);

  return (
    <userDispatch.Provider value={dispatch}>
      <Wrapper>
        <Hello></Hello>
      </Wrapper>
      <Input></Input>
      <CreateUser></CreateUser>
      <UserList users={users} />
      <p>count: {count}</p>
      <Counter2></Counter2>
      <Immercom></Immercom>
    </userDispatch.Provider>
  );
}

export default AppReducer;
