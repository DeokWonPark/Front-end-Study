// 액션타입 생성
const ADD_TODO = "/todos/ADD_TODO";
const TOGGLE_TODO = "/todos/TOGGLE_TODO";

// 액션생성함수
let nextId = 1; // todo데이터에서 사용 할 고유한 id값
export const addTodo = (text) => {
    return {
        type:ADD_TODO,
        todo:{
            id:nextId++,
            text,
            done:false,
        }
    }   
}
export const toggleTodo = (id) => {
    return {
        type:TOGGLE_TODO,
        id
    }   
}

// 초기상태 정의
const initialState = [
    {
        id:1,
        text:"예시",
        done:false
    },
]

export default function todos(state = initialState, action){
    switch(action.type){
        case ADD_TODO:
            return state.concat(action.todo);
        case TOGGLE_TODO:
            return state.map(todo => todo.id === action.id ? {...todo, done:!todo.done}:todo)
        default:
            return state;
    }
}