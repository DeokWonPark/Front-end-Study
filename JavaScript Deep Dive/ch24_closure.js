/**
 * 클로저
 * 함수와 그함수가 선언된 렉시컬환경의 조합이다.
 */

// 자바스크립트는 렉시컬 스코프를 따르는 언어이다.
// 렉시컬 스코프 - 함수가 어디서 호출되었냐가 아니라 어디서 정의되었는지에 따라 상위 스코프가 졀정된다.
// 함수를 어디서 호출했는지는 상위스코프 결정에 영향을 미치지 않는다.

// 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장할 참조값
// 즉 상위 스코프에 대한 참조는 함수의 정의가 평가되는 시점에 함수가 정의된 환경에 의해 결정된다. - 이것이 렉시컬 스코프이다.

// 함수 자신의 내부 슬롯 [[Environment]]에 자신의 상위스코프의 참조를 저장한다.
// 함수의 정의가 평가되어 함수 객체를 생성 할 때 [[Environment]]에 저장된 참조는 현재 실행중인 실행 컨텍스트의 렉시컬 환경을 가리킨다.

// 함수 객체는 내부슬롯 [[Environment]]에 저장한 렉시컬 환경의 참조, 상위스코프를 자신이 존재하는 한 기억한다.



// 클로저와 렉시컬 환경
{
    const x=1;

    function outer(){
        const x=10;

        function inner(){
            console.log(x); 
        }

        return inner;
    }

    const innerFunc=outer(); //outer함수의 실행컨텍스트는 pop된다.
    innerFunc(); //10
} 
// 외부함수보다 중첩함수가 더 오래 유지되는 경우 중첩함수는 이미 생명주기를 다한 외부함수의 변수를 참조 할 수 있다. - 이러한 중첩함수를 클로저라고 한다.
// 중첨함수에서 생성될 당시의 상위 스코프의 참조를 가지고 있다.(외부 함수의 렉시컬 환경을 참조) - 외부함수의 실행 컨텍스트가 소멸되어도 렉시컬환경은 참조되므로 반환되지 않는다.

// 클로저 - 외부함수보다 중첨함수가 더 오래 유지되고, 상위 스코프인 외부함수의 식별자를 참조하는 경우 클로저라고 한다.
// 클로저에 의해 참조되는 상위 스코프의 변수를 자유변수라고 한다.




// 클로저의 활용
// ** 클로저는 상태를 안전하게 변경하고 유지하기 위해 사용된다. - 상태가 비의도적으로 변경되는 것을 막기위해 상태를 은닉하여 특정 함수에서만 변경을 허용하기위해 사용 **

//example - Counter
{
    let count=0;

    const increase = function(){
        return ++count;
    }

    console.log(increase());//1
    console.log(increase());//2
    console.log(increase());//3
}
// 이 코드는 잘 동작하지만 오류를 발생시킬 가능성을 내포하고있다.
// count변수는 increase함수만이 변경시킬 수 있어야한다. - 하지만 전역적으로 변수가 관리되기때문에 누구나 값에 접근하여 변경이 가능하다.

// 클로저를 통한 카운터변수 정보은닉
{
    // 즉시실행함수는 초기에 한번만 실행된다.
    const increase = (function(){

        let count=0;

        return function(){
            return ++count;
        }
    })();

    const increaseFunc=increase;
    console.log(increaseFunc()); //1
    console.log(increaseFunc()); //2
    console.log(increaseFunc()); //3
}

// 기능 추가 -감소하는 카운터
{
    const increase = (function(){

        let count=0;

        return {
            increase:function(){
                return ++count;
            },
            decrease:function(){
                return --count;
            }
        }
    })();

    const increaseFunc=increase;
    console.log(increaseFunc);
    console.log(increaseFunc.increase()); //1
    console.log(increaseFunc.increase()); //2
    console.log(increaseFunc.decrease()); //1
}


// 함수형 프로그래밍에서 클로저는 적극적으로 사용된다 - 부수효과를 최대한 억제하고, 프로그램의 안정성을 높인다.
{
    function makeCounter(predicate){
        
        let count = 0;

        return function(){
            count = predicate(count);
            return count;
        }
    }

    function increase(n){
        return ++n;
    }

    function decrease(n){
        return --n;
    }

    const increaser = makeCounter(increase);
    console.log(increaser()); //1
    console.log(increaser()); //2

    const decreaser = makeCounter(decrease);
    console.log(decreaser()); //-1
    console.log(decreaser()); //-2
}

// 증감이 연동되는 카운터
{
    function makeCounter(){
        
        let count = 0;

        return function(predicate){
            count = predicate(count);
            return count;
        }
    }

    function increase(n){
        return ++n;
    }

    function decrease(n){
        return --n;
    }

    const counter = makeCounter();
    console.log(counter(increase)); //1
    console.log(counter(increase)); //2
    console.log(counter(decrease)); //1
}



// 캡슐화와 정보은닉
// 캡슐화는 객체의 상태를 나타내는 프로퍼티와 동작을 나타내는 메서드를 하나로 묶는 것
// 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도하는데 이것을 정보은닉이라고 한다.
// 정보은닉 - 외부에 공개 할 필요가 없는 구현의 일부를 감추어 적절하지 않은 접근을 방지해 정보를 보호한다. - 객체간의 결합도를 낮추는 효과가있다.

//자바스크립트는 접근지정자를 제공하지 않는다. - 따라서 기본적으로 외부에 공개되어있다.(public)
{
    function Person(name, age){
        this.name=name; //public
        let _age=age; //private

        this.sayHi=function(){
            console.log(`Hello ${this.name} I am ${_age} years old`);
        }
    }

    const me = new Person('foo',25);
    me.sayHi(); //Hello foo I am 25 years old
    console.log(me.name) //foo
    console.log(me._age) //undefined -> private
}

// 메서드 공유
{
    const Person=(function(){
        let _age;

        function Person(name,age){
            this.name=name;
            _age=age;
        }

        Person.prototype.sayHi=function(){
            console.log(`Hello ${this.name} I am ${_age} years old`);
        }

        return Person; //생성자 반환
    })();

    const me = new Person('foo',25);
    me.sayHi(); //Hello foo I am 25 years old
    console.log(me.name) //foo
    console.log(me._age) //undefined -> private
}
// 이와 같은 패턴을 사용하면 접근제어자가 없는 자바스크립트에서 정보은닉이 가능한 것 처럼 보인다
// 위 코드의 문제점 - Person 생성자의 인스턴스를 여러개 생성할 경우 값이 유지되지 못한다.
{
    const Person=(function(){
        let _age;

        function Person(name,age){
            this.name=name;
            _age=age;
        }

        Person.prototype.sayHi=function(){
            console.log(`Hello ${this.name} I am ${_age} years old`);
        }

        return Person; //생성자 반환
    })();

    const me = new Person('foo',25);
    me.sayHi(); //Hello foo I am 25 years old
    console.log(me.name) //foo
    console.log(me._age) //undefined -> private

    const you = new Person('bar',30);
    you.sayHi(); //Hello bar I am 30 years old

    //문제
    me.sayHi(); //Hello foo I am 30 years old
}
// 이처럼 자바스크립트는 완전한 정보은닉을 제공하지 못한다.




// 클로저를 사용할 때 자주 발생하는 실수
{
    var funcs=[];

    for(var i=0;i<3;i++){
        funcs[i]=function(){return i;}
    }

    for(var j=0;j<3;j++){
        console.log(funcs[j]()); // 3 3 3 - 호출하는 시점에 전역변수 var i는 값이 3이다.
    }
}

// 클로저를 통한 해결
{
    var funcs=[];

    for(var i=0;i<3;i++){
        funcs[i]=(function(id){
            return function() {return id};
        })(i);
    }

    for(var j=0;j<3;j++){
        console.log(funcs[j]()); // 0 1 2 
    }
}

//let 키워드를 통한 해결
{
    var funcs=[];

    for(let i=0;i<3;i++){ //for문의 코드 블록이 반복될 때 마다 for문의 코드블록의 새로운 렉시컬 환경이 생성된다
        funcs[i]=function(){return i;}
    }

    for(var j=0;j<3;j++){
        console.log(funcs[j]());
    }
}

//함수형 프로그래밍 방식의 해결
{
    const funcs=Array.from(new Array(3),(_,i) => () => i); // [f,f,f]
    funcs.forEach((value) => console.log(value()));
}