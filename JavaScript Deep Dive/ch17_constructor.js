/**
 * 생성자 함수에 의한 객체 생성
 */

// 객체 리터럴 방식으로 객체를 생성하는 것은 간편하지만 구조가 유사한 객체를 여러개 생성해야하는경우 매번 객체를 정의해야한다는 단점이 존재한다.
// 생성자 함수에 의한 객체 생성방식은 객체를 생성하기위한 함수를 정의하여 클래스 처럼 동일한 구조의 객체 여러개 생성
{
    function Circle(radius){
        this.radius=radius;
        this.getDiameter=function(){
            return 2* this.radius;
        }
    }

    const C1=new Circle(5);
    console.log(C1.getDiameter()); //10

    const a= C1.getDiameter;
    console.log(a()); //NaN

    const C2=new Circle(10);
    console.log(C2.getDiameter()); //20
}

// this바인딩 **
// 바인딩이란 식별자와 값을 연결하는 과정을 의미한다.
// 따라서 this바인딩이란 this와 this가 가리킬 객체를 바인딩하는 것이다.
// this는 함수 호출 방식에 의해 동적으로 결정된다.
// 일반함수 호출 - 전역객체에 바인딩
// 메서드 호출 - 호출한 객체에 바인딩
// 생성자 함수로 호출 - 생성자 함수가 생성할 객체에 바인딩
{
    function foo(){
        console.log(this);
    }

    foo(); //window

    const obj={foo};
    obj.foo(); //obj

    const inst=new foo(); //inst
}


// 자바스크립트에서는 일반 함수와 생성자함수의 구분이 존재하지 않는다.
// 생성자 함수를 new 키워드 없이 일반함수로 사용한다면
{
    function Circle(radius){
        this.radius=radius;
        this.getDiameter=function(){
            return 2* this.radius;
        }
    }

    const C3=Circle(15);
    console.log(C3); //undefined - 일반함수의 default return

    console.log(radius); //Circle 함수의 this는 전역객체에 바인딩된다.
}


// 함수의 내부 메서드 [[Call]], [[Construct]]
// 함수도 객체이다. 함수는 객체이지만 일반객체와는 다르다. 함수는 호출이 가능하다.
// 따라서 함수로서 동작하기 위한 내부 슬롯과 내부 메서드를 추가적으로 가지고있다. [[Call]], [[Construct]]

// 함수가 일반 함수로 호출되면 [[Call]]이 호출되고, 생성자 함수로 호출되면 [[Construct]]가 호출된다.
// 모든 함수가 호출가능한 callable객체이지만, 모든함수가 생성자인 Constructor인것은 아니다.
// 함수 객체는 callable이면서 Constructor이거나 callable이면서 non-constructor이다.

//constructor와 non-constructor 구분
// constructor함수 : 함수 선언문, 함수 표현식, 클래스(클래스도 함수임)
// non-constructor함수 : Arrow function, 메서드(ES6의 메서드 축약)
// 주의 할것은 ECMAScript사양에서 메서드로 인정하는 범위는 일반적인 메서드 정의의 범위보다 좁다. (ES6의 메서드 축약표현만 허용)
{
    //일반함수 정의
    function a(){} // 함수 선언문
    const b=function(){} //함수 표현식
    const c={
        func:function(){} // !! 프로퍼티에 일반함수로 정의된 것은 메서드로 정의되지 않는다. 
    }

    //constructor (일반함수)
    new a();
    new b();
    new c.func();

    //Arrow function
    const arrow=()=>{};

    // 메서드
    const d={
        func(){} 
    }

    // non-constructor
    // new arrow(); - error
    // new d.func(); - error
}
// 함수 정의방식에 따라 constructor non-constructor 구분


//일반함수와 생성자 함수에는 형식적인 차이가 없다.
// new 키워드를 사용하여 함수를 호출하면 [[Call]]이 호출되는 것이 아니라 [[Constructor]]이 호출된다.



// new.target - 생성자 함수가 new연산자 없이 일반 함수로 동작하는 것을 방지하기 위해 ES6에서는 new.target를 지원한다.
// 생성자 함수로 호출되었을 경우 new.target값은 함수 자신을 가리킨다. 반면에 일반함수로 호출되었을 경우 값은 undefined
{
    function Circle(radius){
        if(!new.target){ //일반함수로 호출 되었을 경우
            return new Circle(radius);
        }

        // 함수 정의 ...
        this.radius=radius;
    }

    const C1=Circle(15);
    console.log(C1);
}
// 구형 브라우저에서 new.target을 사용 할 수 없는 경우 - 스코프세이프 생성자 패턴사용
{
    function Circle(radius){
        if(!(this instanceof Circle)){
            return new Circle(radius);
        }

        // 함수 정의 ...
        this.radius=radius;
    }

    const C1=Circle(15);
    console.log(C1);
}

