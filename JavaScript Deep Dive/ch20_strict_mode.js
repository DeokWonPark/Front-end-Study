/**
 * strict mode
 */

//실행결과는 무엇일까?
{
    function foo(){
        x=10; //선언되지 않은 변수 x -> error가 발생할 것으로 예상되지만, 자바스크립트엔진에 의해 암묵적으로 전역변수로 생성된다. - 암묵적 전역
    }
    foo();

    console.log(x); //10
}
// 암묵적 전역은 개발자의 의도와 상관없는 오류를 발생시키는 원인이 될 가능성이 크다.
// 개발을 하면서 이러한 실수는 언제나 발생하기 마련이다.
// 따라서 근본적으로 잠재적인 에러를 발생시키기 어려운 개발환경을 만들고 개발하는 것이 해결책이 될 수 있다.
// 이를 지원하기위해 ES5부터 strict mode가 추가 되었다.
// strict mode - 자바스크립트 언어의 문법을 조금 더 엄격하게 적용하고, 오류를 발생시킬 위험이 높은 코드에 대해서 명시적인 에러를 발생시킨다. **
//ESLint - 정적분석기능을 통해 실행전 소스코드를 스캔하여 문법적 오류 및 잠재적인 오류까지 찾아내준다.

//strict mode는 즉시실행함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.


//strict mode가 발생시키는 에러
//1. 암묵적 전역 - 선언하지 않은 변수 참조
//2. delete로 변수, 매개변수, 함수 삭제하면 error
//3. functhin(x,x) - 중복된 매개변수 이름 사용
//4. with문 사용 - 전달된 객체를 스코프체인에 추가  - error - 가독성을 해친다


//strict mode적용에 의한 변화
//1. 일반함수의 this - 생성자 함수가 아닌 일반함수의 this에 전역객체가 아닌 undefined가 바인딩된다. **
{
    (function(){
        'use strict';

        function foo(){
            console.log(this) //undefined
        }
        foo();

        function Foo(){
            console.log(this) //Foo - 생성자 함수가 생성 할 객체에 바인딩
        }
        new Foo();
    })();
}

//2. arguments객체 - 매개변수에 전달된 인수를 재할당해도  arguments객체에 반영되지 않는다.
{
    (function(){
        'use strict';

        function foo(a){
            a=15;
            console.log(arguments); //{0:2 length:1}
        }
        foo(2);
    })();
}