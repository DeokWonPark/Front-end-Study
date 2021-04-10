/**
 * 함수와 일급객체
 */

// 일급객체 ?
//1. 무명의 리터럴 형태로 런타임에 생성이 가능하다.
//2. 변수나 자료구조에 저장이 가능하다.
//3. 함수의 매개변수에 전달 할 수 있다.
//4. 함수의 반환 값으로 사용 가능하다.

// 자바스크립트의 함수는 입급객체의 조건을 모두 만족한다.


// 함수 객체의 프로퍼티
{
    function square(){
        return 3;
    }

    console.log(Object.getOwnPropertyDescriptors(square));
    /*{length: {…}, name: {…}, arguments: {…}, caller: {…}, prototype: {…}}
    arguments: {value: null, writable: false, enumerable: false, configurable: false}
    caller: {value: null, writable: false, enumerable: false, configurable: false}
    length: {value: 0, writable: false, enumerable: false, configurable: true}
    name: {value: "square", writable: false, enumerable: false, configurable: true}
    prototype: {value: {…}, writable: true, enumerable: false, configurable: false} */
}

//argument객체 - 함수 호출 시 전달된 인수들을 프로퍼티로 가지고있는 객체
// length프로퍼티를 가진 유사배열객체이다.
//배열 메서드를 사용하려면 Function.prototype.apply/call.bind를 사용해야하는 번거로움이 있다
{
    function sum(){
        const arr=Array.prototype.slice.call(arguments);
        return arr.reduce((a,b) => a+b );
    }

    console.log(sum(3,6,8));
}
// 이러한 유사배열객체의 간접호출 방식의 번거로움을 없애기 위해 ES6에서 Rest파라미터 도입
{
    function sum(...arg){
        console.log(arg); //array
        return arg.reduce((a,b) => a+b );
    }

    console.log(sum(3,6,8));
}

//length 포로퍼티
// function의 length는 정의한 매개변수의 개수, arguments의 length는 들어온 인자의 개수이기 때문에 서로 달라질 수 있다.

//prototype 프로퍼티 - 생성자 함수로 호출 가능한 함수 Constructor함수만이 가지는 프로퍼티다.
// 생성할 인스턴스의 프로토타입 객체를 가리킨다.
