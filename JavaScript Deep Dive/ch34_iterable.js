/**
 * 이터러블
 */

// example 이터러블 - Well-Known Symbol인 Symbol.iterator을 키로 갖는 메서드를 가지며 호출하면 이터레이터를 반환하도록 규정되어 있다.
// 만약 일반 객체를 이터러블처럼 동작하도록 만들고 싶다면 이터레이션 프로토콜을 따르면 된다.
// Symbol.iterator를 키로 갖는 메서드를 객체에 추가하고 이터레이터를 반환하도록 구현하면 그 객체는 이터러블이 된다.
{
    // 1 ~ 5 범위의 정수로 이루어진 이터러블
    const iterable = {
        //Symbol.iterable을 구현하여 이터러블 프로토콜 준수
        [Symbol.iterator](){
            let cur = 1;
            const max = 5;

            //Symbol.iterator메서드는 next()메서드를 소유한 이터레이터를 반환
            return {
                next(){
                    return { value : cur++ , done: cur > max + 1 };
                }
            }
        }
    }

    for(const num of iterable){
        console.log(num); //1 2 3 4 5
    }
} 


//이터레이션 프로토콜 ES6 
// 순회 가능한 자료구조를 만들기 위해 미리 약속한 규칙
// ES6이전에는 순회가능한 자료구조 - 배열, 문자열, 유사배열객체, DOM 등은 통일된 규약이 존재하지 않아 나름의 방법으로 순회하였다.
// ES6부터 순회가능한 자료구조를 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 for ..of, 스프레드 문법, 배열 디스트럭처링 할당의 대상으로 사용 할 수 있도록 일원화 했다.
// 615p 그림 34-1


// 이터러블
// 이터러블 프로토콜을 준수한 객체 - Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나, 프로토타입 체인을 통해 상속받은 객체

// 이터러블 확인 함수
{
    const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';

    //배열, 문자열, Set, Map등은 이터러블이다.
    console.log(isIterable([])); //true
    console.log(isIterable('')); //true
    console.log(isIterable(new Map())); //true
    console.log(isIterable(new Set())); //true
    console.log(isIterable({})); //false
}

{
    const array = [5,2,3];

    // 배열은 Array.prototype의 Symbol.iterator메서드를 상속받는 이터러블이다.
    console.log(Symbol.iterator in array); //true

    for(const item of array){
        console.log(item); //5 2 3
    }

    //스프레드
    console.log([...array]); //[5,2,3]

    //배열 디스트럭처링 할당
    const [a,...rest] = array;
    console.log(a, rest); //5 [2,3]
}


// Symbol.iterator메서드를 직접 구현하지 않거나 상속받지 않은 일반 객체는 이터러블이 아니다
// 따라서 for of, 스프레드 문법, 배열 디스트럭처링 할당을 사용 할 수가 없다.
{
    const obj={ a:1, b:2 }; //일반객체

    console.log(Symbol.iterator in obj); //false

   // const [a,b] = obj; //Uncaught TypeError: obj is not iterable 
}


// 스프레드 프로퍼티 제안 - stage4
// 일반객체에 스프레드 문법사용을 허용한다. **
{
    const obj = { a:1, b:2 };

    console.log({...obj}); //{a: 1, b: 2}
}




// 이터레이터
// 이터러블의 Symbol.iterator메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터가 반환된다.
// 이터레이터는 next메서드를 갖는다.
{
    const arr = [5,2,3];

    //Symbol.iterator 메서드는 이터레이터를 반환한다.
    const iterator = arr[Symbol.iterator]();

    console.log('next' in iterator); //true
}
// 이터레이터의 next메서드는 이터러블의 각 요소를 순회하기 위한 포인터 역할을 한다.
// 이터러블을 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를 반환한다.
{
    const arr = [5,2,3];

    const iterator = arr[Symbol.iterator]();

    // 한단계씩 순회 결과인 이터레이터 리절트 객체
    console.log(iterator.next()); //{value: 5, done: false}
    console.log(iterator.next()); //{value: 2, done: false}
    console.log(iterator.next()); //{value: 3, done: false}
    console.log(iterator.next()); //{value: undefined, done: true}
}




// for ... of 문 - 이터러블을 순회하면서 이터러블의 요소를 변수에 할당한다.
// for(변수 선언문 of 이터러블) {...}
// for ... of 문의 내부동작
{
    const iterable = [5,2,3];

    const iterator = iterable[Symbol.iterator]();

    while(true){
        // 이터레이터 리절트 객체를 반환한다.
        const res = iterator.next();

        if(res.done) break;

        const item = res.value;
        console.log(item); // 5 2 3
    }
}




// 이터러블과 유사 배열 객체
// 유사 배열 객체는 이터러블이 아닌 일반 객체다 즉 Symbol.iterator메서드가 없기 때문에 for ... of로 순회 할 수 없다.
// 단 arguments, NodeList, HTMLCollection은 유사 배열 객체이면서 이터러블이다
// Array.from 메서드를 사용해서 유사 배열 객체를 간단하게 배열로 변환 가능하다.
{
    const arrayLike = {
        0:1,
        1:5,
        2:9,
        length:3
    };

    const arr = Array.from(arrayLike);
    console.log(arr) //[1,5,9]
}




// 사용자 정의 이터러블 구현
// 피보나치 수열을 구현한 사용자 정의 이터러블
{
    const fibonacci = {
        [Symbol.iterator](){
            let [pre,cur]=[0,1];
            const max=10; //수열의 최댓값

            return {
                next(){
                    [pre,cur] = [cur, cur+pre];
                    return {value:cur, done: cur >= max};
                }
            }
        }
    }

    //이터러블인 fibonacci 객체를 순회할 때마다 next메서드가 호출된다
    for(const num of fibonacci){
        console.log(num); // 1 2 3 5 8
    }

    //스프레드 문법
    const arr = [...fibonacci];
    console.log(arr); // [1, 2, 3, 5, 8]

    //디스트럭처링 할당
    const [first,second,...rest] = fibonacci;
    console.log(first,second,rest); //1 2 [3, 5, 8]
}




// 이터러블을 생성하는 함수
// 앞에서 작성한 피보나치 이터러블의 문제점 - max를 밖에서 지정하지 못한다. - 고정된 값의 max
{
    const fibonacciFunc = function(max){
        let [pre,cur]=[0,1];

        return {
            [Symbol.iterator](){
                return {
                    next(){
                        [pre,cur] = [cur, pre+cur];
                        return {value:cur, done:cur >= max};
                    }
                }
            }
        }
    }

    for(const num of fibonacciFunc(20)){
        console.log(num); //1 2 3 5 8 13
    }
}



// 이터러블이면서 이터레이터인 객체를 생성하는 함수
// fibonacciFunc는 이터러블을 반환한다. 만약 이터레이터를 생성하려면 이터러블의 Symbol.iterator메서드를 호출해야한다.
{
    const fibonacciFunc = function(max){
        let [pre,cur]=[0,1];

        return {
            [Symbol.iterator](){
                return {
                    next(){
                        [pre,cur] = [cur, pre+cur];
                        return {value:cur, done:cur >= max};
                    }
                }
            }
        }
    }

    const iterable = fibonacciFunc(10);
    const iterator = iterable[Symbol.iterator]();

    console.log(iterator.next()); //{value: 1, done: false}
}
//이터러블이면서 이터레이터인 객체를 생성하면 이터레이터를 따로 만들지 않아도 된다
{
    const fibonacciFunc = function(max){
        let [pre,cur]=[0,1];

        return {
            [Symbol.iterator]() {return this;},
            next(){
                [pre,cur] = [cur, pre+cur];
                return {value:cur, done:cur >= max};
            }
        }
    }

    let iter = fibonacciFunc(20);
    for(const num of iter){
        console.log(num); //1 2 3 5 8 13
    }

    iter = fibonacciFunc(20);

    console.log(iter.next()); //{value: 1, done: false}
}




// 무한 이터러블과 지연 평가
// 무한 이터러블을 생성하는 함수  - 무한 수열
{
    const fibonacciFunc = function(){
        let [pre,cur]=[0,1];

        return {
            [Symbol.iterator]() {return this;},
            next(){
                [pre,cur] = [cur, pre+cur];
                return {value:cur}; //무한을 구현해야 하므로 done 생략
            }
        }
    }

    //fibonacciFunc 무한 이터러블
    for(const num of fibonacciFunc()){
        if(num > 10000) break;
        console.log(num); //1 2 3 5 8 ... 4181 6765
    }

}
// 배열이나 문자열등은 모든 데이터를 메모리에 미리 확보한 다음 데이터를 공급한다.
// 하지만 이터러블은 지연평가를 통해 데이터를 생산한다.
// 지연평가란 데이터가 필요한 시점 이전 까지는 미리 데이터를 생성하지 않다가 필요한 시점에 데이터를 생성하는 기법이다.
// for ... of경우 이터러블을 순회 할 때 내부에서  next()를 호출 하는데 그때 데이터가 생성된다 ***
// 즉 데이터가 필요 할때 데이터를 생성한다.
//지연평가를 사용하면 불필요한 데이터를 미리 생성하지 않고 필요한 데이터를 필요한 순간에 생성하므로 빠른 실행 속도를 기대, 불필요한 메모리를 소비하지않으며, 무한도 표현이 가능하다. ***