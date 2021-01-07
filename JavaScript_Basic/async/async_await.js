
'use strict'
//async & await
//promise를 조금 더 간결하고, 간편하고, 동기적으로 실행되는 것 처럼 보이게 하는 것(깔끔하게)
//promise 체이닝을 간편하게 동기적인것 처럼 작성가능
//무조건 promise가 나쁘다는 것이 아니다. promise를 사용해야하는 경우도 존재한다. case by case

// 1. async
async function fetchUser(){ //사용자 데이터를 백엔드에서 가져오는 함수
    // do network request in 10 secs..
    return 'ellie';
}
//[async를 쓰면 코드 블럭이 자동으로 Promise로 바뀐다 !!!!!]

const user=fetchUser().then(console.log);
console.log(user);

// 2. await
//async 함수 안에서만 사용이 가능하다.
function delay(ms){
    return new Promise((resolve)=>setTimeout(resolve,ms));
}

async function getApple(){
    await delay(3000);
    return 'apple';
}

async function getBanana(){
    await delay(1000);
    return 'banana';
}

/* 콜 백 지 옥 */
function pickFruits(){
    return getApple()
        .then((apple)=>{
            return getBanana().then(banana => `${apple} + ${banana}`);
        });
}

/*--------------*/
async function pickFruit(){
    const applePromise=getApple();
    const bananaPromise=getBanana();
    const apple=await applePromise;
    const banana= await bananaPromise;
    return `${apple} + ${banana}`;
}
pickFruit().then(console.log);
//위와 같이 병렬적으로 처리하면 코드가 지저분하다
//useful Promise APIs
function pickAllFruits(){
    return Promise.all([getApple(),getBanana()]).then(fruits => fruits.join(' + '));
}
pickAllFruits().then(console.log);

//먼저 처리되는 첫번째 과일만 받아오고 싶다.
function pickOnlyOne(){
    return Promise.race([getBanana(),getApple()]);
}
pickOnlyOne().then(console.log);