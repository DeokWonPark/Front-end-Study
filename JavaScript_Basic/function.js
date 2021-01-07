//1. Function
//function name (parameter){ logic return;}
//naming important!!
//1개의 함수는 1개의 기능만을 수행


//2. call-by-value, call-by reference
//(1)primitive type -> call-by-value
//(2)Object type -> call-by-reference

//3. Default parameter (added in ES6)
function showmsg(message,from='unknown'){
    console.log(`${message} by ${from}`);
}
showmsg('hi');

//4. Rest Parameter (added in ES6)
function printAll(...args){
    for(let i=0;i<args.length;i++){
        console.log(args[i]);
    }

    for(const j of args){
        console.log(j);
    }
    args.forEach((arg)=> console.log(arg));
}
printAll("hello","world","!!!");

// 5. 현업 팁 Early return, early exit를 해라
//bad case
function upgradeUser(user){
    if(user.point > 10){
        //logic...
    }
}
//good case
function upgradeUser(user){
    if(user.point <= 10){
        return;
    }
    //logic...
}

//First-class function
//(1) 함수는 다른변수에 할당이 가능하다.
//(2) 함수는 다른함수의 파라미터로 전달이 가능하다.
//(3) 함수는 다른함수의 리턴값으로 사용이 가능하다.

// 6. Function Expression
const print = function (){  //anonymous functuon
    console.log('print')
};
print();
const t_print=print;
t_print();
//named function 은 호이스팅이 된다.

// 7. Callback Function
function rendomQuiz(answer,printYes,printNo){
    if(answer==="love you"){
        printYes();
    }
    else{
        printNo();
    }
}

// 8. Arrow function - 함수를 매우 간결하게 만들어준다.
const simplePrint = function(){
    console.log("원본");
};

const simplePrint_ = () => console.log("Arrow Function");
const add=(a,b)=> a+b;

// 9. IIFE: 즉시실행함수
(function hello(){
    console.log("IIFE");
})();

// 10. 생성자 함수를 이용해서 객체를 만드는 방법
function Person(name ,age){
    this.name=name;
    this.age=age;
}
const p=new Person('Mark',37);
console.log(p,p.age,p.name)