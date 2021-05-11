// 액션타입정의
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 생성함수 정의
export const increase = () => ({type:INCREASE});
export const decrease = () => ({type:DECREASE});

//thunk 함수
export const increaseAsync = () => (dispatch) => {
    setTimeout(() => dispatch(increase()),1000);
}
export const decreaseAsync = () => (dispatch) => {
    setTimeout(() => dispatch(decrease()),1000);
}

// 초기값 정의
const initialState = 0;

// 리듀서 생성
export default function counter(state = initialState, action){
    switch(action.type){
        case INCREASE:
            return state+1;
        case DECREASE:
            return state-1;
        default:
            return state;
    }
}