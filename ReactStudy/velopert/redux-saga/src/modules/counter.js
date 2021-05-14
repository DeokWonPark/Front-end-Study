import {delay,put, takeEvery, takeLatest} from 'redux-saga/effects';

// 액션타입 정의
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

//액션 생성함수
export const increase = () => ({type:INCREASE});
export const decrease = () => ({type:DECREASE});
export const increaseAsync = () => ({type:INCREASE_ASYNC});
export const decreaseAsync = () => ({type:DECREASE_ASYNC});

// saga 제너레이터 함수 정의
function * increaseSaga(){
    yield delay(1000); //1초 대기
    yield put(increase()); //특정액션 디스패치
}
function * decreaseSaga(){
    yield delay(1000); //1초 대기
    yield put(decrease()); //특정액션 디스패치
}

export function* counterSaga(){
    yield takeEvery(INCREASE_ASYNC,increaseSaga); //모든 INCREASE_ASYNC액션을 처리
    yield takeLatest(DECREASE_ASYNC,decreaseSaga); // 마지막 DECREASE_ASYNC액션만을 처리 
}

const initialState = 0;

//리듀서정의
export default function counter(state=initialState, action){
    switch(action.type){
        case INCREASE:
            return state+1;
        case DECREASE:
            return state-1;
        default:
            return state;
    }
}