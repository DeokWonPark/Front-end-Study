import { createStore } from "redux";

// 한 애플리케이션에는 하나의 스토어만을 가져야한다.

// 상태값 정의
const initialState = {
  counter: 0,
  text: "",
  list: [],
};

// 액션타입 정의
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

// 액션 생성함수 정의
function increase() {
  return {
    type: INCREASE,
  };
}

const decrease = () => {
  return {
    type: DECREASE,
  };
};

const changeText = (text) => {
  return {
    type: CHANGE_TEXT,
    text,
  };
};
const addToList = (item) => {
  return {
    type: ADD_TO_LIST,
    item,
  };
};

// 리듀서 정의
function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREASE":
      return {
        ...state,
        counter: state.counter + 1,
      };
    case "DECREASE":
      return {
        ...state,
        counter: state.counter - 1,
      };
    case "CHANGE_TEXT":
      return {
        ...state,
        text: action.text,
      };
    case "ADD_TO_LIST":
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(reducer);

console.log(store.getState()); // store안에 들어있는 상태를 조회

// 스토어 안에 상태가 변경될 때마다 호출되는 함수 정의  - subscribe안에 전달되어 dispatch로 상태가 변경되면 실행된다.
const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubscribe = store.subscribe(listener); // 구독을 해제하고싶을때는 unsubscribe()를 호출하면 된다.

// 액션디스패치
store.dispatch(increase()); // 스토어 내장함수 디스패치
store.dispatch(decrease());
store.dispatch(changeText("안녕하세요"));
store.dispatch(addToList({ id: 1, text: "Wow" }));
