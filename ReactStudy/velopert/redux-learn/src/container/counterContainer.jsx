import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Counter from "../components/counter";
import { increase, decrease, setDiff } from "../modules/counter";

const CounterContainer = (props) => {
  // useSelector 는 리덕스 스토어의 상태를 조회하는 Hook
  // 가져온 상태가 변경되지 않으면 리랜더링되지 않는다.
  const { number, diff } = useSelector((state) => state.counter);

  //useDispatch 는 리덕스 스토어의 내장함수 dispatch를 사용할 수 있게 해주는 Hook
  const dispatch = useDispatch();

  // 각 액션들을 디스패치 하는 함수
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
};

export default CounterContainer;
