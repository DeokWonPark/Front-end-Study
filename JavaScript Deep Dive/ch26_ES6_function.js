/**
 * ES6 함수의 추가 기능
 */

//함수의 구분
//ES6이전까지 함수는 별다른 구분없이 다양한 용도로 사용되었다 - 일반함수, 생성자 함수, 객체의 메서드 (callable이면서 constructor이다)
// 편리해 보이지만 다양한 실수를 유발 할 수 있다


//메서드 - ES6이전에는 메서드에 대한 명확한 정의가 없었다.
// 객체에 바인딩된 함수
// ES6의 메서드 축약표현으로 정의한 함수만을 메서드를 의미한다.
{
    const obj={
        x:1,

        //메서드 - non-constructor
        foo(){
            return this.x;
        },
        //일반함수
        bar:function(){
            return this.x;
        }
    }

    console.log(obj.foo()); //1
    console.log(obj.bar()); //1

    console.log(obj.foo.hasOwnProperty('prototype')); //false
    console.log(obj.bar.hasOwnProperty('prototype')); //true - constructor
}
//메서드는 자신을 바인딩한 객체를 가리키는 [[HomeObject]]내부 슬롯을 가지므로 super키워드 참조가 가능하다

// 따라서 메서드를 정의 할 때 프로퍼티 값으로 익명함수 표현식을 할당하는 ES6이전의 방식은 사용하지 않는 것이 좋다.




// Arrow Function (화살표 함수)
// 간략하게 함수 정의가 가능하다 ()=>{}
// 표현만 간략한 것이 아니라 내부 동작도 기존 함수보다 간략하다
// 콜백함수나 중첩함수에서 this가 전역객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다
{
    const multiply=(x,y) => x*y;
    console.log(multiply(2,5)); //10

    const arrow = x => x+10; // 매개변수가 한 개인 경우 ()생략가능
}

// 함수 몸체
// 함수 몸체가 하나의 문으로 구성된다면 {}를 생략가능하다
// 하나의 문이 값으로 평가되는 표현식이라면 값이 암묵적으로 반환된다.
{
    const power= x => x**2;
    console.log(power(5)) //25

    // 동일한 표현
    const powerEqual = x => { return x**2;}
    console.log(powerEqual(5)); //25
}

// 함수 몸체를 감싸는 {} 생략한 경우 함수 몸체의 문이 표현식이 아닌 문이라면 에러가 발생한다.
// 따라서 함수 몸체가 하나의 문이라도 표현식이 아닌 문이라면 {}를 생략 할 수가 없다.
// 표현식이 아닌 문은 반환 할 수 없기 때문
{
    // const arrow = x => const x = 1; //error
    const arrow = () => {const x=1;}
}

//객체 리터럴을 반환하는 경우 캨체 리터럴을 ()로 감싸 주어야한다.
{
    // 객체 리터럴을 ()로 감싸지 않으면 {}을 함수 몸체를 감싸는 {}로 잘못 해석한다.
    const create = (id,content) => ({id,content});
    console.log(create("156g58e",'JavaScript Deep Dive')); //{id: "156g58e", content: "JavaScript Deep Dive"}

    //동일한 표현
    const createEqual = (id,content) => { return {id,content};};
    console.log(createEqual("156g58e",'JavaScript Deep Dive')); //{id: "156g58e", content: "JavaScript Deep Dive"}
}

//화살표 함수도 즉시 실행 함수로 사용가능하다.
{
    const person = (name => ({
        sayHi(){ return `Hi my name is ${name}`;}
    }))("Lee");

    console.log(person.sayHi()); //Hi my name is Lee
}

// 화살표 함수도 일급 객체이므로 값으로 전달 가능하다. - 훨씬 간결하고, 가독성이 좋다.




// 화살표 함수와 일반함수의 차이
// 화살표 함수는 표현만 간결해 진 것이 아니라 일반함수의 기능을 간략화 했으며, this도 편리하게 설계되었다.
//1. 화살표 함수는 인스턴스를 생성 할 수 없는 non - constructor이다
//2. 중복된 매개변수 이름을 선언 할 수 없다.
{
    // const arrow (a,a) => a+a; //error
}
//3. 화살표 함수는 함수 자체의 this, arguments, super, new.target바인딩을 갖지 않는다.
// 따라서 화살표 함수 내부에서 참조하면 상위스코프에서 찾는다.




// 화살표 함수의 this
// 화살표 함수의 this는 일반함수와 다르게 동작한다.
// 일반함수에서 콜백함수의 this가 외부함수의 this와 달라지는 문제를 해결하기위해 의도적으로 설계된 것이다.
// 일반함수의 this문제 example
{
    class Prefixer{
        constructor(prefix){
            this.prefix=prefix;
        }

        add(arr){
            // arr의 모든 원소를 순회하며 prefix를 추가하는 함수
            return arr.map(function(item){
                // return this.prefix+ item;
                // error this가 undefined이다.
            })
        }
    }

    const prefixer=new Prefixer('-webkit-');
    console.log(prefixer.add(['toolkit','hosting']));
}

// 화살표 함수로 일반함수의 this문제 해결
// 화살표 함수는 함수 자체의 this바인딩을 갖지 않는다 - 따라서 this를 찾게 되면 스코프 체인을 통해 상위 스코프에서 찾게 된다. *** => 이를 lexical this라 한다.
{
    class Prefixer{
        constructor(prefix){
            this.prefix=prefix;
        }

        add(arr){
            // arr의 모든 원소를 순회하며 prefix를 추가하는 함수
            return arr.map((item) => {
                return this.prefix+ item;
            })
        }
    }

    const prefixer=new Prefixer('-webkit-');
    console.log(prefixer.add(['toolkit','hosting']));
}

// 화살표 함수가 중첩되어 있다면 상위 화살표 함수에도 this바인딩이 없으므로 스코프 체인 상에서 가장 가까운 화살표 함수가 아닌 함수에서 this를 참조한다


//화살표 함수가 전역 함수라면 this는 전역객체를 가리킨다 - 상위 스코프가 전역객체이므로

// 프로퍼티에 할당한 화살표 함수도 스코프 체인 상에서 가장 가까운 함수중 화살표 함수가 아닌 함수의 this를 참조
{
    const counter={
        num:1,
        increase:()=> ++this.num, //this는 전역객체에 바인딩된다.
    }
    console.log(counter.increase()); //NaN
}

//화살표 함수는 this자체를 가지지 않기 때문에 Function.prototype.apply/call/bind를 사용해도 내부의 this를 교체 불가능
{
    window.x=1;

    const nomal = function(){ return this.x; };
    const arrow = () => this.x;

    console.log(nomal.call({x:10})); //10
    console.log(arrow.call({x:10})); //1 - 언제나 상위 스코프의 this바인딩을 참조한다.
}

//메서드를 화살표 함수로 정의하는 것은 피해야 한다.
{
    //Bad
    const person={
        name:"lee",
        sayHi:() => `Hi ${this.name}` //this가 전역객체에 바인딩된다.
    }

    console.log(person.sayHi()); // `Hi `
    // 메서드를 정의 할 때는 메서드 축약표현을 써라
}
{
    //Good
    const person={
        name:"lee",
        sayHi(){
            return `Hi ${this.name}`;
        }
    }
    console.log(person.sayHi()); // `Hi lee`
}

// 프로토타입 객체의 프로퍼티에 화살표 함수를 할당하는 경우에도 동일한 문제 발생
{
    //Bad
    function Person(name){
        this.name=name;
    }

    Person.prototype.sayHi= () => console.log(`Hi ${this.name}`); //Hi -> this 전역객체에 바인딩된다.

    const person =new Person('foo');
    person.sayHi();
}
// 메서드 축약표현으로 할당 할 수 없기 때문에 일반함수로 할당한다.
{
    //Good
    function Person(name){
        this.name=name;
    }

    Person.prototype.sayHi= function(){
        console.log(`Hi ${this.name}`); //Hi foo
    }

    const person =new Person('foo');
    person.sayHi();
}



//super - 화살표 함수는 함수 자체의 super바인딩을 갖지 않는다. - super를 참조하면 상위 스코프에서 찾는다.
// super는 [[HomeObject]] 내부슬롯을 갖는 메서드 축약표현에서만 사용가능하다.
// 화살표 함수는 super바인딩을 갖지 않으므로 참조해도 에러가 발생하지 않고 상위 스코프 체인에서 찾게된다.


//arguments - 마찬가지로 함수 자체의 arguments 바인딩을 갖지 않는다
//따라서 스코프 체인을 통해 상위 스코프에서 찾는다.
{
    (function(){
        const foo = () => console.log(arguments); //{0:1, 1:2} 상위 즉시실행함수의 arguments
        foo(3,4); 
    })(1,2);
}

//arguments객체는 가변인자 함수를 구현 할 때 유용하다
// 하지만 화살표 함수는 자신에게 전달된 arguments를 알지 못한다
//따라서 화살표 함수로 가변인자함수를 구현할 때는 Rest파라미터를 사용해야한다.


//Rest 파라미터 - 매개변수의 이름앞에 ...을 붙여 정의한 매개변수 => 함수에 전달된 인수들을 배열 형태로 전달받는다
{
    function foo(...rest){
        console.log(rest);
    }

    foo(1,2,3,4,5,6,7,8,9); //[1,2,3,4,5,6,7,8,9]
}
// Rest파라미터는 일반 매개변수와 함께 사용이 가능하다
// Rest 파라미터는 매개변수의 마지막에 정의해야한다. - 나머지 배열
{
    function foo(param, ...rest){
        console.log(param);
        console.log(rest);
    }
    foo(1,2,3,4,5,6); // 1, [2,3,4,5,6]
}
// Rest파라미터는 단 1개만 정의가능하다.

//Rest파라미터는 length프로퍼티에 영향을 주지 않는다.
{
    function foo(...rest){}
    console.log(foo.length); //0
    function bar(a,b,...rest){}
    console.log(bar.length); //2
}


//Rest파라미터와 arguments객체의 차이
// arguments객체는 유사배열객체로 배열 메서드를 사용하려면 Function.prototype.apply과 같이 배열로 변환해서 사용해야했다
// 하지만 Rest파라미터는 배열이기 때문에 번거로움을 피할 수 있다.



// 매개변수 기본 값
// 매개변수를 인수 개수만큼 전달하지 않아도 에러가 발생하지 않는다. - 전달되지 않은 매개변수 값은 undefined이다.
// ES6의 도입된 매개변수 기본값을 활용하면 인수 체크를 간소화 할 수 있다.
{
    function sum(x=0,y=0){
        return x+y;
    }

    console.log(sum(3,4)); //7
}
{
    function logName(name="Lee"){
        console.log(name);
    }

    logName(); //Lee
    logName(undefined); //Lee
    logName(null); //null
    // 매개변수 기본 값은 정의되지 않거나 undefined인 경우에만 동작한다.
}