const myLogger = store => next => action => {
    console.log(action);
    const result = next(action); // 다음 미들웨어 또는 리듀서로 액션을 전달한다.

    // 업데이트 이후 상태를 조회
    console.log('\t', store.getState());
    return result; // 반환하는 값은 dispatch(action)의 결과물
}

export default myLogger;