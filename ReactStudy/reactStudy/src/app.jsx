import { useRef, useState } from 'react';
import './app.css';
import CreateUser from './components/createUser';
import Hello from './components/hello';
import Input from './components/input';
import UserList from './components/userList';
import Wrapper from './components/wrapper';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...
     
    const temp={
      id:nextId.current,
      username:username,
      email:email,
    }
     
    setUsers([...users,temp]);

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onRemove=(id)=>{
    const temp=users.filter((user)=>{
      return user.id!==id;
    });
    setUsers(temp);
  }

  return <>
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
  </>;
}

export default App;
