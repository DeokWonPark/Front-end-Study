/**
 * 실행 컨텍스트
 * 실행컨텍스트를 이해하면 다음과 같은 원리를 이해 할 수 있다.
 * 1. 스코프 기반으로 식별자와 식별자에 바인딩된 값을 관리하는 방법
 * 2. 호이스팅이 발생하는 이유
 * 3. 클로저 동작 방식
 * 4. 이벤트 헨들러와 비동기 처리방식
 */

// 소스코드 평가와 실행
// 모든 소스코드는 실행에 앞서 평가가 진행된다.
//평가과정에서 실행컨텍스트를 생성하고 변수, 함수 등의 선언문만 먼저 실행하여 생성된 변수, 함수의 식별자를 실행 컨텍스트의 스코프에 등록한다. 
// 이후 소스코드가 실행된다


//코드가 실행되려면 스코프, 식별자, 코드 실행순서 등의 관리가 필요하다 - 실행 컨텍스트
// 실행 컨텍스트는 소스코드를 실행하는데 필요한 환경을 제공하고 코드의 실제 실행결과를 관리하는 영역
// 실행 컨텍스트는 식별자를 등록하고 관리하는 스코프와 코드 실행순서를 관리하는 메커니즘

// 실행 컨텍스트 스택을 이용하여 코드의 실행순서를 관리한다.

//렉시컬 환경 - 식별자, 식별자와 바인딩되는 값, 상위 스코프에 대한 참조를 기록하는 자료구조
//스코프를 구분하여 식별자를 등록하고 관리


// 전역객체도 Object.prototype를 상속받는다.
{
    window.toString(); //Object.prototype.toString()
}



//example - 어떻게 실행 컨텍스트가 생성되고, 코드 실행결과가 관리되고, 어떻게 식별자를 검색하는지 확인
{
    var x=1;
    const y=2;

    function foo(a){
        var x=3;
        const y=4;

        function bar(b){
            const z = 5;
            console.log(a+b+x+y+z);
        }
        bar(10);
    }
    foo(20);
}
// 전역객체생성 -> 전역코드평가 -> 전역코드실행



// 함수의 실행컨텍스트가 소멸되었다고 함수의 렉시컬환경까지 즉시 소멸되는 것은 아니다 **
// 누군가에 의해 참조되고 있는 상태라면 소멸되지 않는다.
// 렉시컬 환경이 더 이상 참조되지 않을때 가비지 컬렉터에 의해 소멸된다.

