import { useCallback, useReducer } from "react";

function reducer(state,action){
    switch(action.type){
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.name]:action.value,
            }
        case "RESET_INPUT":
            return action.initialstate;
        default:
            return state;
    }
}

function useInputs(initialForm){
    const [form,dispatch]=useReducer(reducer,initialForm);

    //onChange
    const onChange=useCallback((e)=>{
        const {name,value}=e.target;
        dispatch({
            type:"CHANGE_INPUT",
            name,
            value,
        })
    },[])

    //Reset
    const reset=useCallback(()=>{
        dispatch({
            type:"RESET_INPUT",
            initialstate:initialForm,
        })
    },[initialForm]);

    return [form,onChange,reset];
}

export default useInputs;