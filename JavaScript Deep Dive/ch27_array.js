/**
 * Array
 * 여러개의 값을 순차적으로 나열한 자료구조
 */

//배열은 배열 리터럴, Array 생성자 함수, Array.of, Array.from메서드로 생성 할 수 있다.
// 배열의 생성자 함수는 Array - 프로토타입 객체는 Array.prototype - 배열을 위한 빌트인 메서드를 제공한다.
{
    const arr=[1,2,3];

    console.log(arr.constructor === Array); //true
    console.log(Object.getPrototypeOf(arr) === Array.prototype); //true
} 

//일반 객체와 배열의 차이점은 length 프로퍼티가 존재한다는 점이다.



// 자바스크립트의 배열은 배열이 아니다 ???
// 자료구조에서 말하는 배열은 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조를 말한다.
// 즉 배열의 요소는 하나의 데이터 타입으로 통일되어 있으며 연속적으로 인접해 있다. 

//자바스크립트의 배열은 자료구조에서 말하는 일반적인 의미의 배열과는 다르다
// 각 원소들이 동일한 크기를 갖지 않아도 되며, 연속적이지 않을 수도 있다.
// 배열요소가 연속적으로 이어져있지 않은 배열을 "희소배열"이라 한다.
//따라서 자바스크립트의 배열은 일반적인 배열의 동작을 흉내낸 특수한 객체다.
{
    console.log(Object.getOwnPropertyDescriptors([1,2,3]));
    /*
        0: {value: 1, writable: true, enumerable: true, configurable: true}
        1: {value: 2, writable: true, enumerable: true, configurable: true}
        2: {value: 3, writable: true, enumerable: true, configurable: true}
        length: {value: 3, writable: true, enumerable: false, configurable: false}
        __proto__: Object
    */
   // 이처럼 자바스크립트의 배열은 인덱스를 나타내는 문자열을 프로퍼티 키로 가지며, length프로퍼티를 갖는 특수한 객체다.
}

// 일반적인 배열과 자바스크립트의 배열 장단점 정리
//1. 일반적인 배열은 인덱스로 요소에 빠르게 접근할 수 있다. 하지만 큭정 요소를 검색하거나, 삽입, 삭제하는데 비효율적이다.

//2. 자바스크립트 배열은 해시 테이블로 구현된 객체이므로 인덱스로 요소에 접근하는경우 일반적인 배열보다 느리다.
// 하지만 특정 요소를 검색하거나, 삽입,삭제하는데 일반적인 배열보다 빠르다.

// 인덱스로 배열요소에 접근하는 것이 일반적인 배열보다 느리기 때문에 모던 자바스크립트 엔진에서는 좀 더 배열처럼 동작하도록 최적화 되어있다.
// 따라서 일반 객체에 접근하는 시간보다 배열에 접근하는 시간이 2배가까이 빠르다.
/*{
    const arr=[];
    console.time('Array Performance Test');

    for(let i=0;i<100000000;i++){
        arr[i]=i;
    }
    console.timeEnd('Array Performance Test'); // Array Performance Test: 838.385009765625 ms

    const obj={};
    console.time('Object Performance Test');

    for(let i=0;i<100000000;i++){
        obj[i]=i;
    }
    console.timeEnd('Object Performance Test'); // Object Performance Test: 1473.993896484375 ms
}*/



// length프로퍼티와 희소배열
//length 프로퍼티는 빈 배열이 아닐경우 가장 큰 인덱스 +1이다
//배열의 요소가 연속적으로 위치하지 않고 일부가 비어있는 배열을 희소배열이라한다.
{
    const sparse=[,2,,4];

    //희소배열의 length프로퍼티 값은 배열 요수의 개수와 일치하지 않는다.
    console.log(sparse.length); //4
    console.log(sparse); //[empty, 2, empty, 4]

    console.log(Object.getOwnPropertyDescriptors(sparse));
    /*
        1: {value: 2, writable: true, enumerable: true, configurable: true}
        3: {value: 4, writable: true, enumerable: true, configurable: true}
        length: {value: 4, writable: true, enumerable: false, configurable: false}
        __proto__: Object
    */
}
//희소배열은 사용하지 않는 것이 좋다
// 희소배열은 연속적인 값의 집합이라는 배열의 개념과도 맞지 않으며, 성능에도 좋지않은 영향을 준다.



//배열 생성
//1. 배열 리터럴 []
//2. Array 생성자 함수
{
    const arr1=new Array(10);
    console.log(arr1); //(10) [empty × 10]

    const arr2=new Array(1,2,3);
    console.log(arr2); //[1,2,3]

    // Array는 new와 함께 호출하지 않아도 내부에서 new.target을 확인하기 때문에 생성자 함수로 동작한다.
    const arr3=Array(5,6);
    console.log(arr3) //[5,6]
}

//3. Array.of - 전달된 인수가 1개더라도 인수를 요소로 갖는 배열을 갖는다.
{
    const arr1=Array.of(10);
    console.log(arr1); //[10]
}

//4. Array.from - 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 뱐환하여 반환한다. **
{
    // 유사 배열 객체를 배열로 변환
    const arr1=Array.from({length:2,0:5,1:8});
    console.log(arr1); //[5,8]

    // 이터러블을 변환하여 배열을 생성 - 문자열은 이터러블이다.
    const arr2=Array.from("Hello");
    console.log(arr2); //["H", "e", "l", "l", "o"]

    // 콜백함수 반환 값으로 배열 생성
    const arr3=Array.from({length:3},(_,i) => i);
    console.log(arr3) //[0,1,2]
} 




// 자바스크립트에서 배열을 다룰때 유용한 메서드
// 배열 메서드는 결과물을 반환하는 방식이 2가지이다.
// 원본 배열을 직접 변경하는 방식, 원본은 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드

//1. Array.isArray - Array 생성자 함수의 정적 메서드 
// 메서드에 전달된 인자가 배열이면 true, 아니면 false반환
Array.isArray([]) //true

//2. Arrat.prototype.indexOf - 원본배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환한다.
// 인수로 전달된 요소가 여러개 존재한다면 검색된 첫 번째 인덱스를 반환
// 존재하지 않는다면 -1반환

//3. Array.prototype.push - 원본배열의 마지막에 요소추가하고 변경된 배열의 length반환
// 원본배열을 직접 수정하는 부수효과가 존재하기 때문에 ES6의 스프레드 문법을 사용하는 것이 좋다
{
    const arr=[1,2];

    const newArr = [...arr,3];
    console.log(newArr); //[1,2,3]
}

//4. Array.prototype.pop - 원본배열에서 마지막 요소 제거 후 반환, 빈 배열이라면 undefined반환

//5. Array.prototype.unshift - 인자로 전달받은 모든 요소를 원본배열에 추가 후 length반환 - 마찬가지로 부수효과가 있어 스프레드 연산자 추천

//6. Array.prototype.shift - 원본배열의 첫 번째 요소를 제거 후 제거한 요소 반환, 원본이 빈 배열이라면 undefined반환

//7. Array.prototype.concat - 인수로 전달된 값들을 원본배열의 마지막 요소로 추가한 새로운 배열을 반환

//8. Array.prototype.splice - 원본배열의 중간에 요소를 추가하거나 제거하는 경우 사용 - 원본배열 직접 수정, 제거한 요소가 반환된다.
// 매개변수 (start,deleteCount?,items?)
//start 값이 음수이면 배열의 끝에서 부터 인덱스 지정 -1은 마지막 요소

//9. Array.prototype.slice - 배열에서 인수로 전달된 범위의 배열요소를 복사하여 새로운 배열을 반환한다.
//매개변수 (start,end)
{
    const arr=[1,2,3];
    arr.slice(0,2) //[1,2] - start ~ end이전까지
}
//복사된 배열은 앝은복사 - 중첩된 객체요소는 참조값을 복사한다.

//10. Array.prototype.join - 원본배열의 모든요소를 문자열로 변환하여 인자로 들어온 구분자로 연결하여 반환한다.
{
    const arr=[1,2,3,4];

    //기본 구분자는 콤마다.
    let join=arr.join();
    console.log(join); //1,2,3,4

    join=arr.join(':');
    console.log(join);//1:2:3:4
}

//11. Array.prototype.reverse - 원본배열의 순서를 반대로 뒤집는다 - 원본배열이 변경된다.

//12. Array.prototype.fill - 인수로 전달받은 값으로 배열의 모든 요소를 채운다.
{
    const arr = new Array(3).fill(0);
    console.log(arr); //[0,0,0]

    const arr2 = Array.from({length:5},(_,i) => i*10);
    console.log(arr2); //[0,10,20,30,40] 생성하는 배열에 원하는 요소로 채울 수 있다.
}

//13. Array.prototype.includes - ES7 배열요소에 특정 요소가 포함되어있는지 확인하여 true/false반환

//14. Array.prototype.flat - ES10 인수로 전달된 깊이만큼 배열을 평탄화한다.
{
    let arr= [1,[2,[3,[4]]]].flat(); //[1,2,[3,[4]]]
    console.log(arr);

    arr=[1,[2,[3,[4]]]].flat(Infinity);
    console.log(arr); //[1,2,3,4]
}




//배열 고차 함수 - 함수를 인자로 전달 받거나 함수를 반환하는 함수
// 외부 상태의 변경이나, 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에 기반을 두고있다. - 부수효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이려는 노력

//1. Array.prototype.sort - 원본배열을 직접 변경하며 정렬된 배열을 반환한다. defalut 오름차순 정렬
{
    //숫자 정렬
    const arr=[40,100,1,5,2,25,10];

    arr.sort();
    //의도와 다르게 정렬이 이루어진다.
    //배열요소를 일시적으로 문자열로 변환하여 정렬하기 때문이다.
    console.log(arr); //[1,10,100,2,25,40,5]

    //따라서 숫자를 정렬 할때는 비교함수를 인자로 넘겨주어야 한다.
    arr.sort((a,b) => a-b );
    console.log(arr);
}

//객체를 요소로 가지는 배열의 정렬
{
    const todos = [
        {id:4, content:'JavaScript'},
        {id:1, content:'HTML'},
        {id:2, content:'CSS'},
    ];

    //비교함수 정의
    function compare(key){
        return (a,b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0)); 
    }

    //id를 기준으로 오름차순 정렬
    todos.sort(compare('id'));
    console.log(todos);
    /*
        0: {id: 1, content: "HTML"}
        1: {id: 2, content: "CSS"}
        2: {id: 4, content: "JavaScript"}
        length: 3
        __proto__: Array(0)

    */

    // contents를 기준으로 오름차순 정렬
    todos.sort(compare('content'));
    console.log(todos);
    /*
        0: {id: 2, content: "CSS"}
        1: {id: 1, content: "HTML"}
        2: {id: 4, content: "JavaScript"}
        length: 3
        __proto__: Array(0)

    */
}
// 자바스크립트의 정렬 알고리즘은 quick sort에서 ES10부터 timsort로 변경되었다.


//2. Array.prototype.forEach - for문을 대체할 수 있는 고차함수
// 조건문이나, 반복문은 프로그램 로직의 흐름을 이해하기 어렵게 만든다.
{
    //for
    const arr=[1,2,3];
    const pows=[];

    for(let i=0;i<arr.length;i++){
        pows[i] = arr[i] ** 2;
    }

    console.log(pows); //[1,4,9]
}
{
    //forEach
    const arr=[1,2,3];
    const pows=[];
    arr.forEach(item => pows.push(item ** 2));
    console.log(pows) //[1,4,9]
}
{
    //Array.from
    const arr=[1,2,3];
    const pows=Array.from(arr,(v) => v ** 2 );
    console.log(pows) //[1,4,9]
}

// forEach 두번째 인수로 콜백함수 내부에서 this로 사용할 객체를 전달할 수 있다.
{
    class Numbers{
        numberArray = [];

        multiply(arr){
            arr.forEach(function(item){
                this.numberArray.push(item ** 2);
            },this);
        }
    }

    const num=new Numbers();
    num.multiply([1,2,3]);
    console.log(num.numberArray); //[1,4,9]
}
// arrow function로 this 바인딩 해결가능
{
    class Numbers{
        numberArray = [];

        multiply(arr){
            arr.forEach((item) => this.numberArray.push(item ** 2));
        }
    }

    const num=new Numbers();
    num.multiply([1,2,3]);
    console.log(num.numberArray); //[1,4,9]
}

// forEach메서드의 polyfill
// polyfill 은 최신 기능 사양을 제공하지 않는 브라우저에 누락된 최신기능을 구현하여 추가하는 것
{
    //forEach polyfill
    if(!Array.prototype.forEach){
        Array.prototype.forEach=function(callback, thisArg){
            //첫번째 인자가 함수가 아니면 error발생
            if(typeof callback !== 'function'){
                throw new TypeError(callback + 'is not a function');
            }

            //this로 사용할 두번째 인자를 전달받지 못하면 전역객체 사용
            thisArg = thisArg || window;

            for(var i=0;i<this.length;i++){
                callback(thisArg,this[i],i,this);
            }
        }
    }
}

//forEach메서드는 break,continue문을 사용 할 수 없다.

//forEach, map, filter, reduce 메서드는 희소배열의 경우 존재하지 않는 요소는 순회 대상에서 제외된다.
{
    const arr=[1,,3]; //희소배열

    for(let i=0;i<arr.length;i++){
        console.log(arr[i]); //1, undefined, 3
    }

    arr.forEach(item => console.log(item)); //1, 3

}

//forEach 메서드의 반환값은 언제나 undefined이다.



//3. Array.prototype.map - 배열의 모든요소를 순회하며 콜백함수를 실행하고 콜백함수의 반환값으로 구성된 배열을 반환한다.  - 원본배열은 변경되지 않는다.
{
    const numbers = [1,4,9];

    const roots=numbers.map(item => Math.sqrt(item));

    console.log(roots); //[1,2,3]
}
// forEach와 map의 차이는 반환값이다 - forEach는 항상 undefined를 반환하고, map는 콜백함수를 실행한 반환값들을 가지고 배열을 만들어 반환한다.
// forEach와 마찬가지로 map에서도 두번째 인수로 콜백함수 내부에서 this로 사용할 객체를 전달할 수 있다.


//4. Array.prototype.filter - 자신을 호출한 배열요소를 순회하면서 전달받은 콜백함수를 반복 실행한다. 콜백함수의 실행결과가 true인 요소만 모아서 새로운 배열을 반환한다.
// 원본배열은 변경되지 않는다.
{
    const arr=[1,2,3,4,5];

    const odd = arr.filter(item => item % 2); //배열에서 홀수 요소만 필터링한다.
    console.log(odd); //[1,3,5]
}

//5. Array.prototype.reduce
//자신을 호출한 배열요소를 순회하며 전달받은 콜백함수를 반복호출한다.
//콜백함수의 반환값을 다음 콜백함수의 첫 번째 인자로 전달해서 최종적으로 하나의 결과값을 만들어낸다.
{
    // 1 ~ 4까지 누적하는 함수
    const sum = [1, 2, 3, 4].reduce((accumulator,currentValue,index,array) => accumulator + currentValue , 0); //두번째 인자 0은 초기값
    console.log(sum); //10
}
// reduce함수는 자신을 호출한 배열의 모든요소를 순회하며 하나의 결과값을 구해야하는 경우 사용하면 좋다

//reduce 메서드를 호출할 때는 언제나 초기값을 전달해 주는 것이 안전하다.
{
    //객체의 특정 프로퍼티를 합산하는 경우
    const products = [
        {id:1, price:100},
        {id:2, price:200},
        {id:3, price:300},
    ]

    const priceSum = products.reduce((acc,cur) => acc.price + cur.price); // 첫 번째 원소부터 acc가 시작되므로 p546 그림 27-12
    console.log(priceSum); //NaN

    const priceSuminit = products.reduce((acc,cur) => acc + cur.price , 0);
    console.log(priceSuminit); //600
}

//6. Array.prototype.some - 자신을 호출한 배열 요소를 순회하며 전달된 콜백함수를 실행 - 콜백함수 결과가 단 한번이라도 참이면 true반환 그렇지 않으면 false반환
// 호출한 배열이 빈 배열 이라면 false반환
{
    let flag= [5,10,15].some(item => item > 10);
    console.log(flag); //true;

    flag= [5,10,15].some(item => item < 5);
    console.log(flag); //false;
}

//7. Array.prototype.every - 자신을 호출한 배열 요소를 순회하며 전달된 콜백함수를 실행 - 콜백함수 결과가 전부 참이면 true반환 그렇지 않으면 false반환
// 호출한 배열이 빈 배열 이라면 true반환

//8. Array.prototype.find - 자신을 호출한 배열 요소를 순회하며 전달된 콜백함수를 실행 - 반환값이 true인 첫 번째 요소를 반환 , 없으면 undefined반환

//9. Array.prototype.findIndex - 자신을 호출한 배열 요소를 순회하며 전달된 콜백함수를 실행 - 반환값이 true인 첫 번째 요소의 인덱스를 반환 , 없으면 -1반환

//10. Array.prototype.flatMap - ES10 map과 flat메서드를 순차적으로 실행하는 효과