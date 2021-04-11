/**
 * this
 * 메서드는 자신이 속한 객체의 프로퍼티에 참조 할 수 있어야한다.
 * 그렇기 위해서는 자신이 속한 객체를 가리키는 식별자를 참조 할 수 있어야한다,
 */

//객체 리터럴 방식으로 생성한 객체의 경우 메서드 내부에서 자신이 속한 객체를 참조 할 수 있다.
{
    const circle={
        radius:5,

        getArea(){
            return 2*circle.radius; //자신이 속한 객체를 재귀적으로 참조하는 방식은 바람직하지 않다.
        }
    }

    console.log(circle.getArea()); //10
}


//생성자 함수의 객체 생성
// 생성자 내부에서 자신이 생성할 인스턴스를 참조 할 수 있어야한다.
// 하지만 인스턴스 생선전에 생성자 함수가 먼저 정의가 완료 되어 있어야 한다.
// 따라서 생성자 함수에서 생성할 인스턴스의 식별자를 알 수가 없다. - 이를 위해 this라는 특수한 실별자를 제공한다.

// ** this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기참조변수이다. 
// 함수를 호출하면 arguments객체와 this가 암묵적으로 전달된다.
// this가 가리키는 값은 즉 this바인딩은 **함수호출방식에 의해 동적으로 결정된다

// this바인딩 **
// 바인딩이란 식별자와 값을 연결하는 과정을 의미한다.
// 따라서 this바인딩이란 this와 this가 가리킬 객체를 바인딩하는 것이다.
// this는 함수 호출 방식에 의해 동적으로 결정된다.
// 일반함수 호출 - 전역객체에 바인딩 -strict mode에서는 undefined
// 메서드 호출 - 호출한 객체에 바인딩
// 생성자 함수로 호출 - 생성자 함수가 생성할 객체에 바인딩


//객체 리터럴
{
    const circle={
        radius:5,

        getArea(){
            return 2*this.radius; 
        }
    }

    console.log(circle.getArea()); //10 - 호출한 객체에 this 바인딩된다
}

//생성자 함수
{
    function Circle(radius){
        this.radius=radius;
    }

    Circle.prototype.getArea=function(){
        return 2 * this.radius;
    }

    const circle=new Circle(15);
    console.log(circle.getArea());
}

// 클래스 기반의 언어 java, c++같은 언어에서는 this가 언제나 클래스가 생성하는 인스턴스에 바인딩된다.
// 자바스크립트의 this는 함수가 호출하는 방식에 따라 this 바인딩이 동적으로 결정된다.

{
    console.log(this); //전역에서 this는 window객체

    function square(number){
        console.log(this); // 일반함수 내부에서 this는 window객체
    }
    square();

    const person={
        name:'kee',
        getName(){
            console.log(this); //메서드의 this는 호출한 객체에 바인딩된다. {name: "kee", getName: ƒ}
            return this.name;
        }
    };

    person.getName();

    function Person(name){
        this.name=name;

        console.log(this); // 생성할 인스턴스에 바인딩된다. Person {name: "me"}
    }
    const me=new Person('me');
}
//this는 객체의 프로퍼티나, 메서드를 참조하기위한 자기참조변수이다.
// 따라서 객체의 메서드, 생성자 함수에서만 의미가 있다.
// 일반함수에서는 의미가 없다. - strict mode에서는 undefined



// 함수 호출 방식과 this바인딩
// this바인딩은 함수를 어떻게 호출했는지에 따라 동적으로 결정된다.
// 함수 호출 방식
//1. 일반 함수 호출
//2. 생성자 함수 호출
//3. 메서드 호출
//4. Function.prototype.apply/call/bind에 의한 간접 호출

{

    function foo(){
        console.dir(this);
    }

    //4. Function.prototype.apply/call/bind에 의한 간접 호출
    const bar={name:'bar'}

    foo.call(bar); // bar
    foo.apply(bar); // bar
    foo.bind(bar)(); // bar
}


// 메서드 내부에서 중첩된 함수 내부의 this에는 전역객체가 바인딩 된다.
{
    var value=1;

    const obj={
        value:100,
        foo(){
            console.log(`foo this `,this); //obj
            console.log(`foo this value `,this.value); //100

            function bar(){
                console.log(`bar this `,this); //window
                console.log(`bar this value `,this.value); //1
            }
            bar();

            setTimeout(function(){
                console.log(`callback this `,this); //window
                console.log(`callback this value `,this.value); //1
            },1000)
        }
    }

    obj.foo();
}
//일반함수로 호출된 모든 함수 내부의 this는 전역객체가 바인딩된다.
// 메서드 내에 정의한 중첨 함수나, 메서드에 전달한 콜백함수의 this가 전역객체에 바인딩되는 것은 문제가 있다. - 헬퍼함수의 역할을 수행하기 어렵게 만든다.

//메서드 내의 중첨함수, 콜백함수의 this를 메서드의 this바인딩과 일치시키기 위한 방법
// 1. that으로 메서드의 this값 복사
{
    var value=1;
    const obj={
        value:100,
        foo(){
            const that = this;
            
            setTimeout(function(){
                console.log(`callback this `,that); //obj
                console.log(`callback this value `,that.value); //100
            },1500);
        }
    }
    obj.foo();
}

//2. Function.prototype.bind()
{
    var value=1;
    const obj={
        value:200,
        foo(){
            
            setTimeout(function(){
                console.log(`callback this `,this); //obj
                console.log(`callback this value `,this.value); //200
            }.bind(this),1500);
        }
    }
    obj.foo();
}

//3. Arrow Function
{
    var value=1;
    const obj={
        value:300,
        foo(){
            
            setTimeout(()=>{
                console.log(`callback this `,this); //obj
                console.log(`callback this value `,this.value); //300
            },1500);
        }
    }
    obj.foo();
}



// Function.prototype.bind
// call과 apply와 달리 함수를 호출하지 않고 this로 사용할 객체만 전달한다.
{
    function getThisBinding(){
        return this;
    }

    const arg={x:10};

    console.log(getThisBinding.bind(arg));
    console.log(getThisBinding.bind(arg)());
}
