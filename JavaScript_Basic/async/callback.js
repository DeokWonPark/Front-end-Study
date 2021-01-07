'use strict';

//synchronous and asyncronous
//JavaScript is synchronous
//asyncronous 비동기 코드가 언제 실행될지 알 수 없다.
console.log(1);
console.log(2);
setTimeout(function(){
    console.log(50);
},2000);
console.log(3);

//synchronous Callback
function printImmdiately(print){
    print();
}
printImmdiately(()=> console.log("hello"));

//asynchronous Callback
function printWithDelay(print,timeout){
    setTimeout(print,timeout);
}
printWithDelay(()=>console.log('async callback'),3000);

//Callback Hell!! example(콜백지옥)
//서버에서 사용자의 데이터를 받아오는 클래스를 작성
class UserStorage{
    loginUser(id,password,onSuccess,onError){
        setTimeout(()=>{
            if((id==='ellie' && password==='dream') || (id==='corder' && password==='academy')){
                onSuccess(id);
            }
            else{
                onError(new Error('Not Found'));
            }
        },2000);
    }

    getRoles(user, onSuccess, onError){
        setTimeout(()=>{
            if(user==='ellie'){
                onSuccess({name:'ellie', role:'admin'});
            }
            else{
                onError(new Error('no access'));
            }
        },1000);
    }
}
console.clear();

const userstorage=new UserStorage();
const id=prompt('enter your id');
const password=prompt('enter your password');
userstorage.loginUser(id,password,
    (user)=>{
        userstorage.getRoles(user,
        (UserData)=>{
            alert(`name: ${UserData.name} , role:${UserData.role}`);
        },
        (error)=>console.log('error'))
    },
    (error)=> console.log('Error'));
// 콜백체인의 문제점
// 가독성 저하
// 디버깅하기에 어렵다.
// 유지보수가 어렵다.
