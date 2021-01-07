'use strict'
//Promise 자바스크립트에서 제공하는 비동기를 간편하게 처리할 수있도록 도와주는 객체
//promise is JavaScript object for async operation.
//promise 2가지 포인트
// 1. state(상태) 프로세스가 기능수행 중인지, 완료되었는지 (pending -> fulfilled or rejected(error))
// 2. Producer와 Consumer의 차이점을 이해 (서비스 제공자와 소비자의 차이를 이해)

// 1. Producer
// promise가 만들어졌을 때 콜백함수로 전달한 executor가 바로 실행된다는 점을 주의! 
const promise=new Promise((resolve,reject)=>{
    //doing some having work (network, read files)
    console.log("doing somethings...");
    setTimeout(()=>{
        //resolve('ellie');
        reject(new Error('no network'));
    },2000)
});

// 2. Consumers: then, catch, finally
//promise가 정상적으로 잘 수행 된다면 값을 받아온다(resolve 값)
promise
.then((value)=>{
    console.log(value);
})
.catch((error)=>{
    console.log(error); //실패했을때 실행
})
.finally(()=>{
    console.log('finally'); //성공하던 실패하던 실행되는 함수
})

// 3. Promise Chaining
const fetchNumber =new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1);
    },1000);
})

fetchNumber
.then((num)=>num*2)
.then((num)=>num*3)
.then((num)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(num-1);
        },1000)
    })
})
.then((num)=> console.log(num));

//4. Error Handling
const getHen=()=>
    new Promise((resolve,reject)=>{
        setTimeout(()=>resolve('chiken'),1000);
    });
const getEgg=(hen)=>
    new Promise((resolve,reject)=>{
        setTimeout(()=> reject(`error ${hen} => egg`),1000);
    });
const cook=(egg)=>
    new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(`${egg} => frie`),1000);
    });

getHen()
    .then((hen)=>getEgg(hen))// => .then(getEgg) 로 생략 가능 1개의 인자만 받아서 전달하는 경우
    .catch((error)=> {
        return 'bread';
    })
    .then((egg)=>cook(egg))
    .then((meal)=>console.log(meal))
    .catch(console.log);
