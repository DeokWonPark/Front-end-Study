/**
 * Event
 * 브라우저는 처리해야할 특정 사건이 발생하면 이벤트를 발생시킨다.
 * 이벤트 핸들러 콜백함수를 등록하고 이벤트가 발생했을 때 브라우저가 실행시키도록 이벤트 핸들러의 호출을 위임시킨다.
 *  이벤트와 이벤트가 발생했을 때 이벤트 핸들러를 실행하는 것을 통해 사용자와 상호작용하는 프로그래밍을 이벤트 드리븐 프로그래밍이라고 한다.
 */



// 이벤트 타입
//1. 마우스 이벤트
//2. 키보드 이벤트
//3. 포커스 이벤트
//4. 폼 이벤트
//5. 값 변경 이벤트 - input, change
//6. DOMContentLoaded - HTML문서의 파싱이 완료되어 DOM생성을 완료 했을 때
//7. 뷰 이벤트 - resize, scroll
//8. 리소스 이벤트 - load : DOMContentLoaded이벤트가 발생한 이후 모든 리소스 파일이 로딩 완료가 된 시점에 발생




// 이벤트 헨들러 등록 방식
//1. 이벤트 핸들러 어트리뷰트 방식 - 이벤트에 대응하는 이벤트 핸들러 어트리뷰트가 있다.
// 함수 참조문이 아닌 함수 호출문으로 할당한다. - 암묵적으로 함수의 정의 몸체로 변환된다
// 함수 호출문을 할당하는 이유는 이벤트 헨들러에 인자를 전달하기 위함이다

//2. 이벤트 핸들러 프로퍼티 방식
{
    const $Btn = document.querySelector('.Btn');

    $Btn.onclick = function(){
        console.log("hello");
    }
    $Btn.onclick = function(){
        console.log("world");
    }

    $Btn.onclick=null //remove
}
// 이벤트 핸들러 프로퍼티 하나당 하나의 이벤트 핸들러만 바인딩 할 수 있다는 단점이 있다.

//3. addEventListener - 하나이상의 이벤트 헨들러 등록이 가능하다.
// 등록된 순서대로 호출된다
// removeEventListener - addEventListener에 전달한 인수와 완전히 동일해야 이벤트 헨들러가 제거된다.
{
    const $Btn = document.querySelector('.Btn');

    const handleClick = () => console.log("addClick");

    $Btn.addEventListener('click',handleClick);
    $Btn.removeEventListener('click',handleClick,true); // 제거 x
    $Btn.removeEventListener('click',handleClick); //제거
}



//이벤트 객체 - 이벤트가 발생하면 이벤트에 관한 다양한 정보를 담고있는 이벤트 객체가 생성된다.
// 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인자로 전달된다.

// 이벤트 객체의 공통 프로퍼티
// type - 이벤트 타입
// target - 이벤트를 발생시킨 DOM요소
// currentTarget - 이벤트 핸들러가 바인딩된 요소
// eventPhase - 이벤트 전파 단계 0:이벤트 없음, 1:캡처링단계, 2:타킷단계 3:버블링 단계
// bubbles - 이벤트를 버블링으로 전파하는지 여부
// cancelable - preventDefault를 호출하여 기본동작을 취소 할 수 있는지 여부
// defaultPrevented - preventDefault를 호출하여 이벤트를 취소 했는지 여부
// isTrusted - 사용자 행위에 의해 발생한 이벤트인지 여부



//이벤트 전파 - DOM요소 노드에서 발생한 이벤트는 DOM트리를 통해 전파된다.
// 이벤트 전파는 전파되는 방향에 따라 3단계로 구분된다.
//1. 캡처링 단계 - 이벤트가 상위 요소에서 하위 요소 방향으로 전파
//2. 이벤트가 이벤트 타겟에 도달
//3. 버블링 단계 - 이벤트가 하위요소에서 상위요소 방향으로 전파

// 이벤트 핸들러 어트리뷰트/프로퍼티 방식으로 등록한 핸들러는 타깃 단계와 버블링 단계의 이벤트만 캐치가 가능하다.
// addEventListener방식으로 등록한 핸들러는 타깃 단계, 캡처링, 버블링단계도 캐치가 가능하다. - 캡처링 단계의 이벤트를 캐치하려면 3번째 인수로 true를 전달해야 한다.




// 이벤트 위임 - 여러 개의 하위 DOM요소에 이벤트 핸들러를 각각 등록하는 대신 상위요소 하나에 이벤트 핸들러를 등록하는방식




// 이벤트 핸들러 내부의 this

//1. 이벤트 핸들러 어트리뷰트 방식 - 핸들러 함수 내부에서 this는 전역객체를 가리킨다.
// 단 이벤트 핸들러를 호출 할 때 인자로 전달한 this는 이벤트를 바인딩한 DOM요소를 가리킨다.

//2. 이벤트 핸들러 프로퍼티 방식과, addEventListener
// this는 이벤트를 바인딩한 DOM요소를 가리킨다.
// 중요!! 책 790p 참고**






// 커스텀 이벤트 - 이벤트 생성자 함수를 호출해서 개발자의 의도로 생성된 이벤트
{
    const keyboardEvent = new KeyboardEvent('keyup');
    console.log(keyboardEvent.type); //keyup

    const customEvent = new CustomEvent('foo');
    console.log(customEvent.type); //foo
    // 생성된 커스텀 이벤트는 버블링X, preventDefault로 취소 불가하다
    console.log(customEvent.bubbles); //false
    console.log(customEvent.cancelable) //false


    //명시적으로 전달
    const MouseClick = new MouseEvent('click',{
        bubbles:true,
        cancelable:true,
        clientX:50,
        clientY:100,
    });
    console.log(MouseClick.bubbles); //true
    console.log(MouseClick.cancelable) //true
}

// 커스텀 이벤트 디스패치 - dispatchEvent메서드로 생성된 디스패치 이벤트를 발생시킨다.
{
    const $Btn = document.querySelector('.Btn');

    $Btn.addEventListener('click',(e) => console.log(e));

    //커스텀 이벤트 생성
    const custonEvent = new MouseEvent('click');

    // 커스텀 이벤트 디스패치
    $Btn.dispatchEvent(custonEvent);
}
// 기존의 이벤트 타입이 아닌 임의의 이벤트타입을 커스텀 이벤트 객체로 만든 경우 반드시 addEcentListener방식으로 핸들러를 등록해야한다.