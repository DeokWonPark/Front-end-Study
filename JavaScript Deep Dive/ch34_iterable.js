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





/**
 * Ch35 스프레드 문법 ...
 * 하나로 뭉쳐있는 여러 값들의 집합을 펼처서 개별적인 값들의 목록을 만든다.
 * 사용가능한 대상은 이터러블에 한정
 */

{
    //뭉쳐있는 값들을 펼쳐서 목록을 만든다
    console.log(...[1,2,3]) //개별요소로 분리  1 2 3 => 값이 아니라 목록이다.
    console.log(..."Hello"); //H E L L O

    //Map, Set도 이터러블
    console.log(... new Map([['a', '1'], ['b','1']])); //  ["a", "1"] ["b", "1"]
    console.log(... new Set([1,2,3])) //1 2 3
}
//스프레드 문법의 결과는 값이 아니라 목록이다.
// 따라서 스프레드 문법의 결과는 변수에 할당할 수 없다.
{
    //const list = ...[1,2,3]; error
}

// 따라서  목록을 사용하는 문맥에서만 사용이 가능하다.
//1. 함수 호출문의 인수목록
{
    const arr = [1,2,3];

    let max = Math.max(arr);
    console.log(max) //NaN -> 배열을 전달하면 max를 구할 수 없다.

    max = Math.max(1,2,3,4,5)  //가변인자를 전달 받는 가변인자 함수다
    console.log(max); //5

    max = Math.max(...arr);
    console.log(max); //3
}

//2. 배열 리터럴의 요소목록
// concat
{
    const arr=[1,2].concat([3,4]);
    console.log(arr); //[1, 2, 3, 4]

    //spread
    const spreadArr = [...[1,2], ...[3,4]];
    console.log(spreadArr); //[1, 2, 3, 4]
}
//splice
{
    //[1,2,3,4] 생성
    const arr1=[1,4];
    const arr2=[2,3];

    Array.prototype.splice.apply(arr1, [1,0].concat(arr2));
    console.log(arr1); //[1, 2, 3, 4]

    //spread
    const spreadArr1=[1,4];
    const spreadArr2=[2,3];

    spreadArr1.splice(1,0,...spreadArr2);
    console.log(spreadArr1); //[1, 2, 3, 4]
}
// 배열 복사 slice
{
    const ori = [1,2];
    const copy = [...ori];

    console.log(ori === copy) //false
    console.log(copy) //[1, 2]
    //원본 배열의 각 요소를 얕은복사로 생성한다.
}
//이터러블, 유사배열객체 배열로 변환
//ES5에서 이터러블, 유사배열객체를 배열로 변환하려면 Function.prototype.apply/call을 사용해서 slice를 호출해야한다.
{
    //ES5
    const arrayLike = {
        0:1,
        1:2,
        2:3,
        length:3
    }

    const arr = Array.prototype.slice.call(arrayLike);
    console.log(Array.isArray(arr)); //true

    //ES6
    //const spreadArr = [...arrayLike]; //error -> 이터러블이 아니다.
    const spreadArr = Array.from(arrayLike);
    console.log(Array.isArray(spreadArr)); //true
}

//3. 객체 리터럴의 프로퍼티 목록
// 스프레드 프로퍼티 {...} -> 이터러블이 아닌 일반 객체도 사용 가능하다.
{
    // 객체 복사
    const obj = {x:1, y:2};
    const copy = {...obj};

    console.log(obj === copy) //false
    console.log(copy) //{x: 1, y: 2}

    //객체 병합
    const merged = {x:1, y:2, ...{a:3, b:4} };
    console.log(merged) //{x: 1, y: 2, a: 3, b: 4}
}

// 스프레드 프로퍼티가 제안되기 이전에는 Object.assign메서드를 사용해서 여러개의 객체를 병합하거나 특정 프로퍼티를 변경했다.
{
    const merged = Object.assign({}, {x:1,y:2},{y:10,z:20});
    console.log(merged) //{x: 1, y: 10, z: 20}

    //특정 프로퍼티 변경
    const changed = Object.assign({}, {x:1,y:2},{y:100});
    console.log(changed); //{x: 1, y: 100}

    //특정 프로퍼티 추가
    const added = Object.assign({}, {x:1,y:2},{z:100});
    console.log(added); //{x: 1, y: 2, z: 100}
}

// 스프레드 프로퍼티
{
    const merged = {...{x:1,y:2},...{y:10,z:20}}
    console.log(merged) //{x: 1, y: 10, z: 20}

    //특정 프로퍼티 변경
    const changed = {...{x:1,y:2},y:100};
    console.log(changed); //{x: 1, y: 100}

    //특정 프로퍼티 추가
    const added = {...{x:1,y:2},z:100};
    console.log(added); //{x: 1, y: 2, z: 100}
}






/**
 * ch 36 디스트럭처링 할당
 * 구조화된 배열같은 이터러블이나 객체를 비구조화하여 1개이상의 변수에 할당하는 것
 * 배열 또는 객체리터럴에서 필요한 값만 추출하여 변수에 할당할 때 유용하다
 */


// 배열 디스트럭처링 할당
//ES5
{
    var arr =[1,2,3];

    var one = arr[0];
    var two = arr[1];
    var three = arr[2];

    console.log(one,two,three);
}

//ES6 - 배열 디스트럭처링 할당의 대상은 이터러블이여야 하며, 할당 기준은 배열의 인덱스이다.
{
    const arr = [1,2,3];

    const [one,two,three] = arr;
    console.log(one,two,three); //1 2 3

    // 할당기준은 인덱스이다.
    const [a,b]=[1,2];
    console.log(a,b) //1 2

    const [c,d]=[1];
    console.log(c,d) //1 undefined

    const [e,f]=[1,2,3];
    console.log(e,f) //1 2

    const [g,,h]=[1,2,3];
    console.log(g,h) //1 3
}

// 배열 디스트럭처링 할당은 배열과 같은 이터러블에서 필요한 값만 추출 하여 변수에 할당 하고 싶을 때 유용하다.
// example - URL을 파싱하여 protocal, host, path프로퍼티를 갖는 객체 생성
{
    function parseURL(url = ''){
        const parsedURL = url.match(/^(\w+):\/\/([^/]+)\/(.*)$/);
        console.log(parsedURL);
        /*
            ["https://developer.mozilla.org/ko/docs/Web/JavaScript", 
            "https", 
            "developer.mozilla.org", 
            ko/docs/Web/JavaScript", 
            index: 0, 
            input: "https://developer.mozilla.org/ko/docs/Web/JavaScript", groups: undefined]
        */

        if(!parsedURL) return{};

        // 배열 디스트럭처링 할당을 사용하여 이터러블에서 필요한 요소만 추출
        const [,protocal, host, path] = parsedURL;
        return {protocal, host, path};
    }

    const parsedURL = parseURL('https://developer.mozilla.org/ko/docs/Web/JavaScript');
    console.log(parsedURL); // {protocal: "https", host: "developer.mozilla.org", path: "ko/docs/Web/JavaScript"}
}


// 객체 디스트럭처링 할당
// ES5
{
    var user = {firstName: 'Ungmo', lastName: 'Lee'};

    var firstName = user.firstName;
    var lastName = user.lastName;

    console.log(firstName,lastName); //Ungmo Lee
}
//ES6 객체 디스트럭처링 할당
//객체의 각 프로퍼티를 객체로 추출하여 1개 이상의 변수에 할당한다.
// 객체 디스트럭처링 할당의 대상은 객체여야하며, 할당 기준은 프로퍼티 키다. => 즉 순서는 의미가 없으며 선언된 변수이름과 프로퍼티 키가 일치하면된다.
{
    const user = { firstName:'Ungmo', lastName:'Lee'};
    const {firstName, lastName} = user;
    console.log(firstName,lastName); //Ungmo Lee
}

//객체 디스트럭처링 할당은 객체에서 프로퍼티 키로 필요한 프로퍼티 값만 추출하여 할당할 때 유용하다.
{
    const str = 'Hello';
    const {length} = str;
    console.log(length); //5

    const todo = {id:1, content:'HTML', complete:true};
    const {id} = todo;
    console.log(id); //1
}

// 매개변수에서도 디스트럭처링 할당가능
{
    function printTodo({content, complete}){
        console.log(`할일 ${content}은 ${complete?'완료':'비완료'}상태 입니다.`);
    }
    const todo = {id:1, content:'HTML', complete:true};
    printTodo(todo);
}

// 배열 디스트럭처링과 객체 디스트럭처링 혼용
{
    const todos = [
        {id:1, content:'HTML', complete:true},
        {id:2, content:'CSS', complete:true},
        {id:3, content:'JavaScript', complete:false}
    ]

    const [,{id}] = todos;
    console.log(id); //2
}

//중첩 객체
{
    const user = {
        name:'Lee',
        address:{
            zipCode:'02156',
            city:'Seoul'
        }
    }

    const {address:{city}} = user;
    console.log(city); //Seoul
}