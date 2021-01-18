import React, { memo } from 'react';

const HabitAddForm = memo((props) => {
    const inputRef=React.createRef();
    const handleItemAdd=(event)=>{
        // const $text=document.querySelector('.add-input');
        // this.props.onItemAdd($text.value);
        event.preventDefault();
        props.onItemAdd(inputRef.current.value);
        inputRef.current.value="";
    }
    return <>
            <form className="add-form" onSubmit={handleItemAdd}>
                <input ref={inputRef} type="text" className="add-input" placeholder="Habit"/>
                <button className="add-button">Add</button>
            </form>
        </>
});

export default HabitAddForm;
