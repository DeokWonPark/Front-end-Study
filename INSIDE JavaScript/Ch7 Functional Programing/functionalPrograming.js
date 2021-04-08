/**
 * 함수형 프로그래밍
 */

//부수효과 없이 안정적이고 예측 가능한 프로그램을 작성하는 것이 목표
// 함수형 프로그래밍 특징 4가지
//1. 순수함수 - 함수에서 외부의 상태값을 참조하거나 변경하는 것은 순수함수라고 할 수 없다.
//외부의 영향을 전혀 받지 않도록 작성해야한다.
{
    function add(x,y){
        return x+y;
    }
    add(3,4);
}

//2. 불변성을 유지해야한다.
//side effect를 발생시키지 않는다. - 멀티스레딩 환경에서도 안정적으로 동작 할 수 있다.
{
    const person = Object.freeze({name:'foo', age:20});

    function increaseAge(person){
        return Object.freeze({...person,age:person.age+1});
    }

    console.log(person.age);
    console.log(increaseAge(person).age)
}

//3. if, for, switch와 같은 experssions사용 x
{
    let numbers=[1,2,3];
    function multiply(numbers,multiplier){
        return numbers.map(num => num*multiplier);
    }
}

// 4. 일급함수의 특징을 가져야한다.
//함수를 변수에 할당하거나, 함수를 반환, 인자로 전달


//자바스크립트에서 함수형 프로그래밍 - 자바스크립트의 클로저, 일급 객체로서의 함수를 이용
//example - 암호화
{
    var f1=function(input){
        var result;
        // 암호화 작업 수행
        result=1;
        return result;
    }

    var f2=function(input){
        var result;
        // 암호화 작업 수행
        result=2;
        return result;
    }

    var f3=function(input){
        var result;
        // 암호화 작업 수행
        result=3;
        return result;
    }

    var get_encrypted=function(func){
        var str= 'zzoon';
        return function(){
            return func.call(null,str);
        }
    }

    var encrypted_value=get_encrypted(f1)();
    console.log(encrypted_value);
    var encrypted_value=get_encrypted(f2)();
    console.log(encrypted_value);
    var encrypted_value=get_encrypted(f3)();
    console.log(encrypted_value);
}





// 간단한 수학적인 문제를 함수형 프로그래밍 방식으로 작성

//1. 배열의 각 원소 총합 구하기
//대부분의 일반적인 구현방식 - 명령형 프로그래밍 방식
{
    const arr=[1,2,3,4,5];

    function sum(arr){
        let len = arr.length;
        let sum=0;

        for(let i=0;i<len;i++){
            sum+=arr[i];
        }
        return sum;
    }

    console.log(sum(arr));
}

// 함수형 프로그래밍 방식
// 기존 프로그래밍보다 한단계 더 높은 모듈화를 이룰 수 있다.
{
    function reduce(func, arr, memo){

        let accum=memo;

        arr.map((item) => accum=func(accum,item));

        return accum;
    }

    const arr=[1,2,3,4,5];

    const sum=(x,y)=>{
        return x+y;
    }

    console.log(reduce(sum,arr,0));
}

// 피보나치 수열
{
    const fibo = function(){
        const cache={'0':0, '1':1};
        const func=function(n){
            let result;
            if(typeof(cache[n]) === 'number'){
                result=cache[n];
            }
            else{
                result=cache[n]=func(n-1)+func(n-2);
            }
            return result;
        }
        return func;
    }();

    console.log(fibo(10));
}


//자바스크립트에서 함수형 프로그래밍을 활용한 주요함수
// 함수형 프로그래밍에서는 특정 데이터를 여러 함수에 적용시키는 방식으로 작업을 수행한다.

// 커링 - 특정 함수에서 정의된 인자의 일부를 넣어 고정시키고, 나머지를 인자로 받는 새로운 함수를 만드는 것
//example
{
    function calculate(a,b,c){
        return a*b+c;
    }

    function curry(func){
        let arg = Array.prototype.slice.call(arguments,1); //고정시킬 첫번째 인자

        return function(){
            return func.apply(null,arg.concat(Array.prototype.slice.call(arguments)));
        }
    }

    const new_func1=curry(calculate,1);
    console.log(new_func1(2,5));  // 1*2+5=7
}
