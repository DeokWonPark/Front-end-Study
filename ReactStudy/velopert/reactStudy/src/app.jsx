import { useCallback, useMemo, useRef, useState } from 'react';
import './app.css';
import CreateUser from './components/createUser';
import Hello from './components/hello';
import Input from './components/input';
import UserList from './components/userList';
import Wrapper from './components/wrapper';

function App() {
  const countUser = () => {
    console.log('count...');
    return users.length;
  };

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });
  const { username, email } = inputs;

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs],
  );
  const [users, setUsers] = useState([
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
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
    const temp = {
      id: nextId.current,
      username: username,
      email: email,
    };

    setUsers((users) => [...users, temp]);

    setInputs({
      username: '',
      email: '',
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(
    (id) => {
      const temp = users.filter((user) => {
        return user.id !== id;
      });
      setUsers(temp);
    },
    [users],
  );

  const count = useMemo(() => countUser(), [users]);

  return (
    <>
      <Wrapper>
        <Hello></Hello>
      </Wrapper>
      <Input></Input>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      ></CreateUser>
      <UserList users={users} onRemove={onRemove} />
      <p>count: {count}</p>
    </>
  );
}

export default App;
