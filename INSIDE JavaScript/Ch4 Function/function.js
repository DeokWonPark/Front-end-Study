// 'use strict';
{
    /**
     * Function 생성방식
     * 생성방식에 따라 모두 같은 함수를 생성하지만 생성방식에 따라 동작이 미묘하게 차이가 난다.
     */

    //1. 함수 리터럴
    function add (x,y){
        return x+y;
    }

    //2. 함수 표현식 방식
    const add2=function(x,y){
        return x+y;
    }

    //3. Function 생성자를 통한 함수 생성
    const add3=new Function('x','y','return x+y');
    console.log(add3(1,5));



    // 함수 호이스팅
    //1. 함수 선언문 방식의 호이스팅
    console.log(sum(2,3)); //호이스팅이 발생한다.

    function sum(x,y){
        return x+y;
    }
    

    //2. 함수 표현식 방식에서는 호이스팅이 일어나지 않는다. (권장) **
    // ** 이러한 호이스팅이 발생하는 원인은 자바스크립트의 변수 생성과 초기화의 작업이 분리되서 잔행되기 떄문이다.



    // 자바스크립트에서 함수도 객체다.
    // 즉 함수도 일반객체처럼 프로퍼티를 가질 수 있다.
    function sum2(x,y){
        return x+y; // 함수의 코드부분의 내부 프로퍼티의 [[code]]에 저장된다
    }

    sum2.result=sum2(3,2);
    sum2.status='OK';

    console.log(sum2.result);
    console.log(sum2.status);



    //자바스크립트의 함수는 값으로 취급된다.
    //1. 변수나 배열의 요소, 객체의 프로퍼티에 할당 가능
    //2. 다른 함수의 인자로 전달가능
    //3. 함수의 리턴값으로 리턴가능
    //4. 동적으로 프로퍼티 생성 및 할당 가능



    //자바스크립트의 함수는 객체다 일반적인 객체에 정의된 코드를 실행하는 기능을 가지고 있는 것이다.
    // 함수의 length프로퍼티는 정의한 인자의 개수를 나타낸다

    //prototype 프로퍼티
    //prototype 프로퍼티 객체는 함수가 생성될 때 만들어지며 객체의 유일한 프로퍼티은 Constructor은 연결된 함수를 가리킨다. 즉 서로가 서로를 가리킨다 **




    // 함수의 다양한 형태
    //1. 콜백 함수 - 어떤 이벤트가 발생했거나 특정 시점에 호출되는 함수
    //2. 즉시 실행 함수 - 함수가 선언되자마자 실행하게 만든 함수 -> 최초 한번만 실행을 필요로하는 코드부분에 사용한다
    //3. 내부함수 - 함수 내부에 다시 정의된 함수
    //클로저 example
    //실행이 끝난 부모함수 스코프의 변수를 참조하는 함수
    function parent(){
        const a=100;
        return function child(){
            console.log(a);
        }
    } 

    const inner=parent();
    inner();

    // 함수를 리턴하는 함수
    // 자신을 재정의
    let self=()=>{
        console.log("a");
        return ()=>{
            console.log("b");
        }
    }

    self=self();
    self();



    //함수 호출과 this
    //argument 객체
    //자바스크립트에서는 형식에 맞게 매개변수를 넘기지 않더라도 에러가 발생하지 않는다
    // 매개변수가 인자로 전달될 때 argument 유사배열 객체가 내부로 함께 전달된다. argument객체는 인자들을 배열형태로 저장한다.
    function func(a,b){
        console.log(a,b);
    }
    
    func(); //undifined, undifined
    func(1);// 1, undifined
    func(1,2); //1,2
    func(1,2,3); //1,2
    func(1,2,3,4);
    // argument객체는 매개변수의 개수가 정확히 정해지지않은 함수를 구현하거나, 전달된 인자의 개수에 따라 다른 처리를 해야하는 경우에 유용하다.
    function Sum(){
        let result=0;

        for(let i=0;i<arguments.length;i++){
            result+=arguments[i];
        }

        return result;
    }
    console.log(Sum(1,2));
    console.log(Sum(1,2,3,4,5,6,7,8,9,10));


    //함수 호출 패턴과 this바인딩
    //함수 호출시 인자와 함께 argument 객체, this인자가 함께 전달된다.
    //자바스크립트는 함수 호출방식에 따라 this가 다르게 참조된다.

    // 1. 객체 메소드 호출 시 this바인딩 **
    // 해당 메소드를 호출한 객체로 this가 바인딩된다.
    const myObj={
        name:'foo',
        sayName:function(){
            console.log(this.name);
        }
    }

    const otherObj={
        name:'bar'
    }

    otherObj.sayName=myObj.sayName;

    myObj.sayName(); // foo -> this는 myObj
    otherObj.sayName(); // bar -> this는 otherObj


    // 2. 함수를 호출할 때 this 바인딩
    // 함수를 호출 하면 해당 함수의 내부에서 사용된 this는 전역객체에 바인딩된다.
    // 자바스크립트의 모든 전역변수들은 전역객체의 프로퍼티들이다.

    const sayFoo=function(){
        console.log(this)
    }
    const apple=sayFoo;
    apple();

    // 내부함수의 this 바인딩
    var value=100; //전역 변수 this
    console.log(this)

    const innerObj={
        value:1,
        func1:function(){
            this.value+=1;
            console.log('func1: '+this.value);  //2

            func2=function(){ //함수호출 패턴에 따라 this는 전역객체에 바인딩된다.
                this.value+=1;
                console.log('func2: '+this.value); //101

                func3=function(){ //함수호출 패턴에 따라 this는 전역객체에 바인딩된다.
                    this.value+=1;
                    console.log('func3: '+this.value); //102
                }

                func3();
            }
            func2();
        }
    };
    innerObj.func1();

    // 내부함수 this바인딩 문제
    // 1. 부모함수의 this를 다른변수에 저장해둔다

    const innerObj2={
        value:1,
        func1:function(){
            var that=this; // that
            this.value+=1;
            console.log('func1: '+this.value);  //2

            func2=function(){ 
                that.value+=1;
                console.log('func2: '+that.value); //3

                func3=function(){ 
                    that.value+=1;
                    console.log('func3: '+that.value); //4
                }

                func3();
            }
            func2();
        }
    };
    innerObj2.func1();
    //자바스크립트에서는 이러한 this바인딩 문제를 극복하기위해 this바인딩을 명시적으로 할 수 있도록 call과 apply메서드 제공
    
    // 2. ES6+ arrow function
    const innerObj3={
        value:1,
        func1:function(){
            this.value+=1;
            console.log('func1: '+this.value);  //2

            func2=()=>{ 
                this.value+=1;
                console.log('func2: '+this.value); //3

                func3=()=>{ 
                    this.value+=1;
                    console.log('func3: '+this.value); //4
                }

                func3();
            }
            func2();
        }
    };
    innerObj3.func1();



    //생성자 함수를 호출 할 때 this바인딩
    //자바스크립트는 생성자 함수의 형식이 따로 정의되어있는 것이 아니라 함수에 new 키워드를 통해서 생성자함수로 동작한다.
    //따라서 생성자함수를 구분하기 위해 생성자함수의 첫문자는 대문자로 표기하여 구분하는 것을 권장한다
    
    //생성자 함수가 동작할 때 내부적인 this는 일반적인 메서드와 함수호출방식의 this바인딩과 다르게 동작한다

    //객체를 생성하는 방식에서 생성자방식과 리터럴 방식의 차이점
    // 단순한 차이는 리터럴방식의 객체생성은 재상용이 불가능하다는 점이다.
    //example
    {
        // 리터럴 방식의 객체 생성
        const foo={
            name:'foo',
            age:35,
            gender:'man'
        }
        console.dir(foo);

        // 생성자 방식의 객체 생성
        function Person(name, age, gender){
            this.name=name;
            this.age=age;
            this.gender=gender;
        }

        const bar=new Person('bar',25,'man');
        console.dir(bar);
    }

    // 생성자 함수에 new를 붙이지 않고 호출할 경우 오류가 발생할 수 있다.
    // 그 이유는 일반함수의 호출과 생성자 함수의 호출시에 this바인딩이 다르게 동작하기 때문이다.
    // 일반함수 호출 시 this는 전역객체에 바인딩된다.
    // 생성자 함수 호출 시 this는 새로 만들어진 빈 객체에 바인딩 되기 때문이다.
    {
        function Person(name, age, gender){
            this.name=name;
            this.age=age;
            this.gender=gender;
        }

        const qux=Person('qux',20,'man'); //일반함수의 디폴트 값 undifined return
        console.log(qux);

        console.log(window.name); //전역객체에 바인딩된다.
    }

    // 이렇게 일반함수와 생성자 함수의 구분이 별도로 존재하지 않기 때문에 다음과 같은 위험성을 줄이기 위한 패턴을 사용하기도 한다.
    {
        function A(arg){
            if(!(this instanceof A)){ // this가 A의 인스턴스인지 확인 일반함수호출이라면 this는 전역객체의 인스턴스가 돤다.
                return new A(arg);
            }
            this.value=arg;
        }

        const a = new A(100);
        const b = A(10);

        console.log(a.value);
        console.log(b.value);
        console.log(window.value);
    }



    // call과 apply메서드롤 이용한 명시적인 this바인딩
    // call과 apply모두 Function.prototype객체의 메서드
    // function.apply(thisarg, argArray) thisarg - apply내부에서 사용한 this에 바인딩할 객체, argArray - 호출할 때 넘길 인자들의 배열 
    //example
    {
        function Person(name, age, gender){
            this.name=name;
            this.age=age;
            this.gender=gender;
        }

        const foo={};

        Person.apply(foo,['foo',34,'man']);
        console.dir(foo);
    }

    //call메서드의 경우 apply와 기능은 같지만 두번째 인자를 배열로 넘기는 것이 아니라 개별로 넘긴다.
    // Person.call(foo,'foo',34,'man');


    // apply를 사용한 유사배열객체에서 배열메서드 사용
    //example
    {
        function myFunc(){
            console.dir(arguments);

            const args=Array.prototype.slice.apply(arguments,[1]);
            console.log(args)
        }

        myFunc(1,2,3);
    }

    

    //함수 리턴 - 자바스크립트는 리턴값을 지정하지 않더라도 항상 리턴값을 반환한다
    //1. 일반함수나 메서드는 리턴값을 지정하지 않는 경우  undifined를 반환한다
    //2. 생성자 함수에서 리턴값을 지정하지 않는 경우 생성된 객체가 반환된다.
    // 생성자 함수에서 명시적으로 다른 객체를 리턴하는 경우 명시적인 객체가 생성된다.
    // 생성자 함수에서 명시적인 객체가 아닌 값을 리턴하는 경우 무시되고 생성되는 객체가 리턴된다.


}
