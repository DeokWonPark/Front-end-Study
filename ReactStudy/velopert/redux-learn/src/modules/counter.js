// 액션타입 생성 - 접두사를 추가하여 다른 모듈과 중복되는 것을 방지한다.
const SET_DIFF = "counter/SET_DIFF";
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 액션 생성함수
export const setDiff = (diff) => {
    return {
        type:SET_DIFF,
        diff,
    }
}
export const increase = () => {
    return {
        type:INCREASE
    }
}
export const decrease = () => {
    return {
        type:DECREASE
    }
}

// 초기상태 선언
const initialState = {
    number:0,
    diff:1,
}


// Reducer 선언
export default function counter(state = initialState, action){
    switch(action.type){
        case SET_DIFF:
            return {
                ...state,
                diff:action.diff,
            }
        case INCREASE:
            return {
                ...state,
                number:state.number+state.diff,
            }
        case DECREASE:
            return {
                ...state,
                number:state.number-state.diff,
            }
        default:
            return state;
    }
}

