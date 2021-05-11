/**
 * 프로토타입
 * 자바스크립트는 프로토타입기반 객체지향언어
 * ES6에서 클래스가 도입되었다 - 기존 프로토타입 기반 패턴의 문법적 설탕
 */

//상속과 프로토타입
//상속 - 어떤 객체의 프로퍼티, 메서드를 다른 객체가 상속받아 그대로 사용
// 자바스크립트는 프로토타입 기반으로 상속을 구현하여 불필요한 중복을 제거한다.
{
    function Circle(radius){
        this.radius=radius;

        this.getArea=function(){
            return Math.PI * this.radius ** 2;
        }
    }

    const C1=new Circle(5);
    const C2=new Circle(10);

    // 공통으로 사용되는 메서드가 중복적으로 생성된다.
    console.log(C1.getArea === C2.getArea); //false
} 
// 프로토타입 기반 상속을 통해서 중복을 제거
{
    function Circle(radius){
        this.radius=radius;
    }

    Circle.prototype.getArea=function(){
        return Math.PI * this.radius ** 2;
    }

    const C1=new Circle(5);
    const C2=new Circle(10);

    // 공통으로 사용되는 메서드를 공유
    console.log(C1.getArea === C2.getArea); //true
}


//프로토타입 객체
// 객체 리터럴로 생성된 객체의 프로토타입 객체는 Object.prototype
// 생성자 함수에 의해 생성된 객체의 프로토타입은 생성자 함수의 prototype프로퍼티가 가리키는 객체


//__proto__ 접근자 프로퍼티 - 간접적으로 [[Prototype]]내부슬롯에 접근이 가능한 접근자 프로퍼티
{
    const obj={};
    const parent={x:1};

    //getter
    console.log(obj.__proto__);

    //setter
    obj.__proto__=parent;
    console.log(obj.x) // 1
}

//코드에서 __proto__프로퍼티를 직접적으로 사용하는 것은 좋지 않다.
// 직접상속을 통해서 Object.prototype를 상속받지 않는 객체를 생성 할 수 있기 때문에 __proto__가 없는 객체가 있다.
{
    const obj=Object.create(null); //obj는 프로토타입의 종점. 따라서 Object.__proto__를 상속 받을 수 없다.
    console.log(obj.__proto__);

    //권장
    console.log(Object.getPrototypeOf(obj));
}
// 권장하는 프로토타입 사용
{
    const obj={};
    const parent={x:1};

    console.log(Object.getPrototypeOf(obj)); //obj.__proto__
    
    Object.setPrototypeOf(obj,parent);
    console.log(obj.x) //1
}



// 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입
{
    const obj=new Object();
    console.log(obj.constructor===Object); //true

    function Person(name){
        this.name=name;
    }
    const person=new Person('foo');
    console.log(person.constructor===Person); //true
}

// 객체 리터럴이 평가 될 때 추상연산  OridinaryObjectCreate를 호출하여 빈 객체를 생성하고 프로퍼티를 추가
// 객체리터럴의 객체 생성은 Object 생성자로 객체를 생성하는 방식과 세부내용은 다르다. 따라서 객체리터럴에 의한 객체 생성은 Object생성자 함수가 생성한 객체가 아니다.
// 리터럴 표기법에 의해 생성된 객체도 상속을 위해서 프로토타입이 필요하다.
// - 따라서 가상적인 생성자 함수를 갖는다.


// 생성자 함수가 생성되는 시점에 프로토타입 객체도 함께 생성된다  - 생성자 함수와 프로토타입 객체는 언제나 쌍으로 존재한다.

// 사용자 정의 생성자 함수와 프로토타입 생성시점
{
    console.log(Person.prototype); //함수객체가 정의되어 생성되는 시점에 프로토타입 객체도 함께 생성된다.
    function Person(){
        this.name='foo';
    }
}


//객체 생성방식
//1. 객체 리터럴
//2. Object생성자 함수
//3. 생성자 함수
//4. Object.create()
//5. Class

//객체 생성과정
// 1. OrdinaryObjectCreate는 빈객체를 생성
// 2. 전달받은 인수를 가지고 빈객체의 프로퍼티를 추가한다.
// 3. 전달받은 프로타토입 객체를 __proto__에 할당



//프로토타입 체인
// 자바스크립트는 객체의 프로퍼티에 접근하려 할 때 해당 객체에 접근 하려는 프로퍼티가 없다면 자신의 부모 역할을 하는 프로퍼티를 순차적으로 검색한다.
// 이를 프로토타입 체인이라고 한다.
//Object.prototype가 프로토타입 체인의 종점 - 최종적으로 Object.prototype에서도 검색할 수 없다면 undefined를 반환한다.

// 식별자는 스코프체인에서 검색한다.




// 오버라이딩과 프로퍼티 섀도잉
{
    function Person(name){
        this.name=name
    }

    Person.prototype.sayHello=function(){
        console.log(`Hi ${this.name}`);
    }

    const me=new Person('Lee');
    me.sayHello(); //Hi Lee

    //  오버라이딩
    me.sayHello=function(){
        console.log(`Hello ${this.name}`); 
    }
    me.sayHello(); //Hello Lee
    //이렇게 상속관계에 의해 프로토타입 객체의 sayHello가 가려지는 현상을 프로퍼티 섀도잉이라고 한다.
}



// 직접상속
//1. Object.create에 의한 직접상속
{
    const myApp={x:10};

    let obj=Object.create(myApp,{ //프로토타입을 지정하여 직접 상속하는 객체를 생성
        y:{value:1}
    });

    console.log(Object.getPrototypeOf(obj) === myApp); //true
    console.log(obj);
}
// 장점
//1. 프로토타입을 직접 지정하여 객체를 생성 할 수 있다.
//2. 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

// Object.prototype메서드를 객체에서 직접적으로 호출하는 것은 권장 x - Object.property.method.call() 간접적으로 호출하는 것을 권장한다.

//2. 객체 리터럴 내부에서 __proto__에 의한 직접상속 - 훨씬 깔끔하고 간편하다
{   
    const myApp={x:10};
    
    const obj={
        y:30,

        __proto__:myApp,
    }

    console.log(obj);
    console.log(Object.getPrototypeOf(obj) === myApp); //true
}



// 정적 프로퍼티 , 정적 메서드 - 생성자 함수도 객체이므로 프로퍼티를 가질수 있다.
// 생성자 함수의 객체로 생성한 인스턴스로는 접근이 불가능하다. - 프로토타입 체인에 없다.
{
    function Person(name){
        this.name=name;
    }

    //프로토타입 메서드
    Person.prototype.sayHello=function(){
        console.log('hello');
    }

    //정적 프로퍼티
    Person.staticProp='static property';

    //정적 메서드
    Person.create=function(){
        console.log(`static method`);
    }

    Person.create();

    const me=new Person('me');
   // me.create(); x-인스턴스로 접근 x
}


//for .. in메서드는 상속받은 프로퍼티 까지 모두 순회한다. - Object.prototype메서드들이 순회되지 않는 이유는 [[Enumerable]]가 false이기때문이다 - 열거 불가
// 프로퍼티를 열거할 때 순서를 보장하지 않는다.'

// 자기자신의 고유한 프로퍼티 만을 열거하기 위해서는 Object.keys/values/entries 사용을 권장한다.
// Object.keys() - 열거가능한 키를 배열로 반환
// Object.values() - 열거가능한 값를 배열로 반환
// Object.entries() - 열거가능한 키와 값의 쌍의 배열을 배열로 반환