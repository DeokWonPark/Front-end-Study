import React, { memo, useState } from 'react';

const Input = memo((props) => {
    const [inputValue,setValue]=useState({
        name:"",
        nickname:"",
    });

    const{name,nickname}=inputValue;

    const handleChange=(e)=>{
        const {name, value}=e.target;
        const temp={
            ...inputValue,
            [name]:value,
        }
        setValue(temp);
    }
    const handleReset=()=>{
        const temp={
            name:"",
            nickname:"",
        }
        setValue(temp);
    }
    return <div>
        <input name="name" type="text" onChange={handleChange} placeholder="name" value={name}/>
        <input name="nickname" type="text" onChange={handleChange} placeholder="Nickname" value={nickname}/>
        <button onClick={handleReset}>초기화</button>
        <div>
            <p>name:{name} nickname:{nickname}</p>
        </div>
    </div>
})

export default Input;