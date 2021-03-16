import React, { createContext, useContext } from 'react';

const MyContext=createContext("defaultContext");

function Child(){
    const text=useContext(MyContext);
    return <div>안녕하세요{text}</div>
}

function Parent(){
    return <Child></Child>
}

function GrandParent(){
    return <Parent></Parent>
}

const ContextSample=(props)=>{
    return <MyContext.Provider value="Good">
        <GrandParent></GrandParent>
    </MyContext.Provider>
}

export default ContextSample;