import { combineReducers } from 'redux';
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({ // 리덕스 모듈이 두개 따라서 리듀서도 두개 - 하나의 루트 리듀서로 병합하여 사용
    counter,
    todos
});

export default rootReducer;