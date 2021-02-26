{
    //function: Login -> success, fail (union활용)
    type SuccessState={
        result:"success", // 공통적인
        response:{
            body:string;
        };
    };
    type FailState={
        result:"fail", //공통적인
        reson:string;
    }
    type LoginState=SuccessState | FailState
    function login(id:string, password:string):LoginState{
        return {
            result:'success',
            response:{
                body:"login",
            }
        }
    }

    // printLoginState(state)
    // success -> 성공 메시지 + body
    // fail -> 실패이유

    function printLoginState(state:LoginState){
       if(state.result==="success"){
           console.log(`축하합니다.${state.response.body}`);
       }
       else{
           console.log(`로그인 실패.${state.reson}`);
       }
    }
    const state:SuccessState={
        result:"success",
        response:{
            body:"Success",
        }
    };
    printLoginState(state)
}