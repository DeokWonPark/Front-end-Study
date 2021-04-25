/**
 * Class
 */

// 자바스크립트는 프로토타입 기반의 객체지향 언어다
// 프로토타입 언어는 클래스가 필요없는 객체지향언어다
// 클래스 없이도 객체지향 상속을 구현 가능하다.
{
    const Person=(function(){

        function Person(name){
            this.name=name;
        }

        Person.prototype.sayHi=function(){
            console.log(`Hello ${this.name}`);
        }

        return Person; //생성자 반환
    })();

    const me = new Person('foo',25);
    me.sayHi(); //Hello foo 
}

// ES6부터 도입된 클래스가 기존의 프로토타입 기반 객체지향 모델을 폐지하고 새롭게 클래스 기반 객체지향 모델을 제공하는 것은 아니다.
// 사실 클래스는 함수이며, 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 문법적 설탕이라고 볼 수 있다.

// 클래스와 생성자 함수 모두 프로토타입 기반의 인스턴스를 생성하지만 정확하게 동일하게 동작하지는 않는다
// 클래스는 생성자 함수보다 엄격하며 추가적인 기능을 제공한다.

// 클래스와 생성자 함수의 차이
//1. 클래스는 new 연산자 없이 호출하면 에러가 발생한다.
//2. 클래스는 상속을 지원하는 extends와 super키워드를 제공한다.
//3. 클래스는 호이스팅이 발생하지 않는 것처럼 동작한다.
//4. 클래스 내의 모든 코드에는 암묵적으로 strict mode가 동작하며 헤제 할 수 없다.
//5. 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트 [[Enumerable]]값이 false다 -> 열거되지 않는다.



// 클래스 정의 - 생성자 함수와 마찬가지로 파스칼 케이스 네이밍을 권장
{
    class Person{} //클래스 선언문
}


// 클래스는 함수도 따라서 값 처럼 사용 할 수 있는 일급 객체이다.


// 클래스 몸체에는 0개 이상의 메서드만 정의 할 수 있다.
// 클래스 몸체에 정의 할 수 있는 메서드는 constructor, 프로토타입 메서드, 정적 메서드 세가지이다.
{
    class Person{
        //생성자
        constructor(name){
            //인스턴스 생성 및 초기화
            this.name=name;
        }

        //프로토타입 메서드
        sayHi(){
            console.log(`Hi ${this.name}`);
        }

        //정적 메서드
        static sayHello(){
            console.log(`Hello ${this.name}`);
        }
    }

    //인스턴스 생성
    const me=new Person('deokwon');

    //인스턴스의 프로퍼티 참조
    console.log(me.name);
    
    //프로토타입 메서드 호출
    me.sayHi();

    //정적 메서드 호출
    Person.sayHello();
}



//클래스 호이스팅
// 클래스는 함수로 평가된다.
{
    class Person{}
    console.log(`class-type: `,typeof Person);
}
// 런타임 이전에 소스코드가 평가되어 함수 객체와 프로토타입 객체가 쌍으로 생성된다.
// 단. 클래스는 정의 이전에 참조가 불가능하다.
{
     // console.log(Person); // Uncaught ReferenceError: Cannot access 'Person' before initialization
    class Person{}
}
// 이와 같이 클래스는 호이스팅이 발생하지 않는 것 처럼 보인다.

// 하지만 호이스팅이 발생한다
{
    const Person='';
    {
        // 호이스팅이 발생하지 않는다면 ''이 출력되어야한다
        //console.log(Person); //Uncaught ReferenceError: Cannot access 'Person' before initialization

        class Person{}
    }
}
// var, let, const, function, class 키워드를 사용하여 선언된 모든 식별자는 호이스팅된다. 모든 선언문은 런타임 이전에 먼저 살행되기 때문이다. **



// 인스턴스 생성
// 클래스는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성한다.
{
    class Person{}
    const me=new Person();
    console.log(me); // Person{}
}


//메서드 - 클래스 몸체에는 0개 이상의 메서드만 선언할 수 있다
//1. constructor - 인스턴스를 생성하고, 초기화하기 위한 특수한 메서드
// constructor내부의 this는 클래스가 생성한 인스턴스를 가리킨다.
// constructor메서드는 클래스에 오직 1개만 존재 할 수 있다, 생략 가능하다
// constructor메서드는 반환문을 갖지 않아야 한다.
// 암묵적으로 생성한 객체 this를 반환한다 - 생성자 함수의 반환방식과 동일

//2. 프로토타입 메서드

//3. 정적 메서드 - 인스턴스를 생성하지 않아도 호출 할 수 있는 메서드 (static 키워드)
// 클래스에 바인딩된 메서드가 된다.
// 인스턴스로 호출 불가 - 프로토타입 체인상 존재하지 않는다.
// 정적메서드는 클래스를 하나의 네임스페이스로 사용하여 모아놓으면 함수들을 구조화 할 수 있다.
// 에플리케이션 전역에서 사용할 함수를 메서드로 구조화할때 유용하다.




//클래스의 인스턴스 생성과정
// new연산자와 함께 클래스를 호출하면 클래스의 내부 메서드 [[Construct]]가 호출된다
//1. 인스턴스 생성과 this바인딩
//2. 인스턴스 초기화 - this에 바인딩 되어있는 인스턴스에 프로퍼티를 추가, 초기화
//3. 인스턴스 반환 - 클래스의 모든 처리가 끝나면 인스턴스가 바인딩된 this반환



//프로퍼티
//1. 인스턴스 프로퍼티 - 인스턴스 프로퍼티는 constructor 내부에 정의해야한다.
{
    class Person{
        constructor(name){
            //인스턴스 프로퍼티
            this.name=name; //public
        }
    }
}

//2. 접근자 프로퍼티 - 자체적으로 값을 갖지 않고 다른데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티
// 인스턴스 프로퍼티가 아닌 프로토타입의 프로퍼티가 된다.
{
    class Person{
        constructor(firstName,lastName){
            this.firstName=firstName;
            this.lastName=lastName;
        }

        get fullName(){
            return `${this.firstName} ${this.lastName}`;
        }

        set fullName(fullname){
            [this.firstName,this.lastName]=fullname.split(" ");
        }
    }

    const me=new Person('park','deokwon');
    console.log(`${me.firstName} ${me.lastName}`); //park deokwon

    me.fullName='hong gildong';
    console.log(me); //Person {firstName: "hong", lastName: "gildong"}
    console.log(me.fullName); //hong gildong

    console.log(Object.getOwnPropertyDescriptor(Person.prototype,'fullName')); //{enumerable: false, configurable: true, get: ƒ, set: ƒ}
}




//클래스 필드 정의 제안
//클래스 필드란? - 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어
// 자바스크립트에서 클래스 필드를 정의할 수 있는 클래스 필드 정의 제안은 ECMAScript정식 표준사양으로 승급되지 않았다. - 최신 브라우저에서는 미리 사용가능
// 메서드만 정의 가능한 클래스 몸체에 프로퍼티 정의
{
    class Person{
        name='Lee';
        //this.name='' X - this는 constructor나 메서드 내에서만 사용이 가능하다.
        age; // 클래스 필드에 초기값을 할당하지 않으면 undefined를 갖는다.
        getName=function(){ //함수는 일급객체이므로 함수를 클래스 필드에 할당가능하다.
            return this.name; //여기서 this는 생성할 객체가 바인딩된다.
        }
        // 클래스 필드에 함수를 할당하면 인스턴스 프로퍼티로 추가되므로 권장하지 않는다.

        constructor(){
            console.log(this.name); //클래스 필드를 참조하는 경우 this를 반드시 사용해야한다.
            console.log(this.age);  //undefined
        }
    }

    const me=new Person();
    console.log(me.name);
}



//private 필드 정의 제안
//자바스크립트는 캡슐화를 완전하게 지원하지 않는다.
//인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 접근이 가능하다(public)
//클래스 필드도 기본적으로 public하다

// 현재 priavte필드를 정의 할 수 있는 새로운 표준사양이 제안되어있다. - stage3
// private선두에 #을 붙여준다, private를 참조 할 때도 #을 붙여주어야 한다.
{
    class Person{
        //private field
        #name='';

        constructor(name){
            //private field 참조
            this.#name=name;
        }
    }

    const me=new Person('Lee');
    //private field 외부에서 참조 불가능하다. - 클래스 내부에서만 참조 가능 (접근자 프로퍼티를 통해서 간접적으로 접근해야한다.)
    //console.log(me.#name);  // Uncaught SyntaxError: Private field '#name' must be declared in an enclosing class
}

// 접근자 프로퍼티를 활용한 private field 간접접근
{
    class Person{
        //private field
        #name='';

        constructor(name){
            //private field 참조
            this.#name=name;
        }

        get name(){
            return this.#name;
        }
    }

    const me=new Person('Lee');
    console.log(me.name);
}
// private field는 반드시 클래스 몸체에서 정의 해야한다. - constructor에서 정의하면 에러가 발생한다.


//static 필드 정의 제안
// 클래스에서 정적 필드 정의 - stage3
{
    class myMath{
        //static public field
        static PI = 22 / 7;

        //static private field
        static #num = 10;

        //static 메서드
        static increment(){
            return ++myMath.#num;
        }
    }

    console.log(myMath.PI);
    console.log(myMath.increment());
}




//상속에 의한 클래스 확장
//클래스 상속과 생성자 함수 상속
// 클래스 상속은 프로토타입 기반 상속과는 다른 개념이다.
//프로토타입 기반 상속은 프로토타입 체인을 통해 다른 객체의 자산을 상속받는개념
// 클래스 상속은 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의하는 것 ** - 자신만의 고유한 속성을 추가하여 확장
// 상속에 의한 클래스 확장은 코드 재사용 관점에서 매우 유용하다.
{
    class Animal{
        constructor(age,weight){
            this.age=age;
            this.weight=weight;
        }

        eat(){
            return 'eat';
        }

        move(){
            return 'move';
        }
    }

    //상속을 통해 확장한 Bird 클래스
    class Bird extends Animal{
        fly(){
            return 'fly';
        }
    }

    const bird=new Bird(1,5);

    console.log(bird); //Bird {age: 1, weight: 5}
    console.log(bird instanceof Bird); //true
    console.log(bird instanceof Animal); //true

    console.log(bird.eat());
    console.log(bird.move());
    console.log(bird.fly());
}

// 클래스의 인스턴스만 프로토타입 체인을 가지는 것이 아니라 클래스도 상위 클래스와 하위 클래스 간의 프로토타입 체인을 가진다.
// 따라서 프로토타입 메서드 뿐만 아니라 정적메서드도 상속이 가능하다.


//동적상속 - extends키워드는 클래스뿐만 아니라 생성자 함수를 상속받아 클래스를 확장 할 수도 있다.([[Construct]] 내부 메서드를 갖는 함수 모두 가능)
{
    //생성자 함수
    function Base(a){
        this.a=a;
    }

    //생성자 함수를 상속 받는 서브 클래스
    class Derived extends Base{}

    const derived=new Derived(5);
    console.log(derived.a); //5
}


// 서브클래스의 constructor
// 클래스에서 constructor을 생략하면 비어있는 constructor가 암묵적으로 정의된다.
// 서브클래스에서 constructor를 생략하면 constructor(...args) { super(...args); }가 정의된다. - super은 수퍼클래스의 constructor를 호출
{
    class Base {
        constructor(a){
            console.log(`super ${a}`);
        };
    }

    class Derived extends Base{
        constructor(...args){
            super(...args);
        }
    }

    const derived=new Derived(15);
    console.log(derived);
}



//super키워드
// 함수처럼 호출할 수도 있고, this와 같이 식별자 처럼 참조 할 수 있다.
//super() - 수퍼클래스의 constructor호출
//super.부모메서드() - 수퍼클래스의 메서드를 호출
//example
{
    class Base{
        constructor(a,b){
            this.a=a;
            this.b=b;
        }
    }

    class Derived extends Base{
        constructor(a,b,c){
            super(a,b);
            this.c=c;
        }
    }

    const derived=new Derived(1,2,3);
    console.log(derived); // Derived {a: 1, b: 2, c: 3}
}
// super()를 호출 할 때 주의 사항
//1. 서브 클래스의 constructor를 생략하지 않는 경우 반드시 super()를 호출해야한다.
//2. 서브 클래스의 constructor에서 super()을 호출하기 전에 this를 찹조 할 수 없다.
//3. super()은 반드시 서브클래스의 constructor에서만 호출해야한다.

//super참조
{
    class Base{
        constructor(name){
            this.name=name;
        }

        sayHi(){
            return `Base Hi ${this.name}`;
        }
    }

    class Derived extends Base{
        sayHi(){
            return `${super.sayHi()} how are you doing`;
        }
    }

    const derived=new Derived('foo');
    console.log(derived.sayHi());
}
//super참조가 동작하기 위해서는 super를 참조하고있는 메서드가 바인딩되어있는 객체(Derived.prototype)의 포로토타입(Base.prototype)을 찾을 수 있어야한다.
//이를 위해 메서드는 내부슬롯[[HomeObject]]를 가지며, 자신을 바인딩하고있는 객체를 가리킨다. (Derived.prototype)
// ES6 메서드 축약표현으로 정의된 함수만이 [[HomeObject]]를 갖는다.
//ex
//satHi메서드의 [[HomeObject]]는 Derived.prototype이고, 이를 통해서 포로토타입인 Base.prototype이 super참조로 결정된다
{
    const foo={
        // foo는 메서드 축약표현으로 정의한 메스드이므로 [[HomeObject]]를 가진다.
        foo(){},
        // bar는 메서드 축약표현으로 정의한 메스드가 아니므로 [[HomeObject]]를 가지지 않는다.
        bar:function(){}
    }
}
// [[HomeObject]]를 갖는 메서드만이 super참조를 할 수 있다.
// 객체 리터럴에서도 super참조 가능하다 - 메서드 축약표현 정의시
{
    const base = {
        name:'Lee',
        sayHi(){
            return `Hi ${this.name}`;
        },
    }

    const derived={
        __proto__:base,
        // [[HomeObject]]를 가진다
        sayHi(){
            return `${super.sayHi()} how are you doing`;
        }
    }

    console.log(derived.sayHi());
}



// 상속 클래스의 인스턴스 생성과정
// 상속관계에 있는 두 클래스가 어떻게 협력하며 인스턴스를 생성하는지 이해
//example - Rectangle 상속한 ColorRectangle클래스 정의
{
    // super class
    class Rectangle{
        constructor(width,height){
            this.width=width;
            this.height=height;
        }

        getArea(){
            return this.width*this.height;
        }

        toString(){
            return `width : ${this.width} , height : ${this.height}`;
        }
    }

    //sub class
    class ColorRectangle extends Rectangle{
        constructor(width,height,color){
            super(width,height);
            this.color=color;
        }

        //오버라이딩
        toString(){
            return super.toString()+ `, color : ${this.color}`;
        }
    }

    const color=new ColorRectangle(2,4,'blue');
    console.log(color); //ColorRectangle {width: 2, height: 4, color: "blue"}

    console.log(color.getArea()); //8
    console.log(color.toString()); //width : 2 , height : 4, color : blue
}
// 생성과정
//1. 서브클래스의 super()호출
// 상속받지 않는 클래스의 생성은 암묵적으로 빈 객체를 만들고, this를 바인딩하여 프로퍼티를 추가하여 반환하는 형태이다.
// 반면 서브 클래스는 자신이 직접 인스턴스를 생성하지 않고, 수퍼클래스에게 인스턴스 생성을 위임한다. - super()을 호출해야하는 이유

//2. 수퍼클래스의 인스턴스 생성과 this바인딩
//인스턴스는 수퍼클래스가 생성하지만 new.target은 서브클래스를 가리키고 서브클래스가 생성한 것으로 처리된다.

//3. 수퍼클래스의 인스턴스 초기화

//4. 서브클래스 constructor복귀와 this바인딩
// super호출이 종료되고, 서브클래스의 construcotr로 돌아온다
// 이때 super가 반환한 인스턴스가 this에 바인딩된다
// 따라서 서브클래스는 별도의 인스턴스를 생성하지 않고 super가 반환한 인스턴스를 this에 바인딩하여 그대로 사용한다
// 이처럼 super()가 호출되지 않으면 인스턴스가 생성되지 않으며, this바인딩도 할 수가 없다

//5. 서브클래스 인스턴스 초기화

//6. 인스턴스 반환 - 인스턴스가 바인딩된 this가 암묵적으로 반환된다.



// 표준 빌트인 생성자 함수 확장
// extends키워드로 상속박을 수 있는 것은 클래스 뿐만 아니라 [[Construct]]내부 슬롯을 가진 함수도 가능하다
// Array,String,Number같은 표준 빌트인 객체도 확장 가능하다
{
    class MyArray extends Array{

        // 중복된 배열요소를 제거하고 반환한다. [1,1,2,3] => [1,2,3]
        uniq(){
            return this.filter((v,i,arr) => arr.indexOf(v) === i);
        }

        // 모든 배열 요소의 평균을 반환한다.
        average(){
            return this.reduce((pre,cur) => pre+cur ,0) / this.length;
        }
    }

    const myArray=new MyArray(1,1,2,3);
    console.log(myArray); //MyArray(4) [1, 1, 2, 3]

    console.log(myArray.uniq()); //MyArray(4) [1, 2, 3]
    console.log(myArray.average()); //1.75
}