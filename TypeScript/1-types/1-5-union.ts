{
    /**
     *  Union Types: OR - Ts에서 활용도가 굉장히 높다.
     */
    // 모든 가능한 경우 중 하나만 담고 싶은 경우 사용한다.
     type Direction = 'left' | 'right' | 'up' | 'down';
     function move(direction:Direction){
        console.log(direction);
     }
     move('right');

     type TileSize= 8 | 16 | 32;
     const tile:TileSize=16;

     //function: Login -> success, fail (union활용)
     type SuccessState={
         response:{
             body:string;
         };
     };
     type FailState={
         reson:string;
     }
     type LoginState=SuccessState | FailState
     function login(id:string, password:string):LoginState{
         return {
             response:{
                 body:"login",
             }
         }
     }

     // printLoginState(state)
     // success -> 성공 메시지 + body
     // fail -> 실패이유

     function printLoginState(state:LoginState){
        if('response' in state){
            console.log(`축하합니다.${state.response.body}`);
        }
        else{
            console.log(`로그인 실패.${state.reson}`);
        }
     }
     const state:SuccessState={
         response:{
             body:"Success",
         }
     };
     printLoginState(state);
}