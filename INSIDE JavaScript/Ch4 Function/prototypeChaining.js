{
    /**
     * 프로토타입 체이닝
     * 자바스크립트는 다른 객체지향언어와 다른 프로토타입 기반의 객체지향프로그래밍을 지원한다.
     * 자바와 같은 객체지향프로그래밍에서는 클래스를 정의하고 정의한 클래스를 기반으로 객체를 생성한다.
     * 자바스크립트에서는 객체 리터럴이나, 생성자 함수를 통해서 객체를 생성한다.
     * 이렇게 생성된 객체의 부모가 프로토타입 객체이다
     * 자식 객체는 프로토타입입 객체인 부모객체의 프로퍼티 접근이나 메서드를 상속받아 호출하는 것이 가능하다.
     * 모든 객체는 자신의 부모인 프로토타입 객체를 가리키는 참조링크형태의 숨겨진 프로퍼티가 존재한다. [[Prototype]]링크
     * 
     */

    //prototype 프로퍼티와 [[Prototype]]링크 구분 example
    {
        function Person(name){
            this.name=name;
        }

        const foo=new Person('foo');

        console.dir(foo);
        console.dir(Person);
    }
    // __proto__프로퍼티는 모든 객체에 존재하는 숨겨진 프로퍼티로 객체 자신의 프로토타입 객체를 가리키는 참조 링크이다.


    //자바스크립트에서 객체는 자기자신의 프로퍼티 뿐만아니라 부모역할을 하는 프로토타입 프로퍼티도 자신의 프로퍼티처럼 접근이 가능하다.
    // 이것을 가능하게 하는 것이 프로토타입 체이닝이다

    //1. 객체 리터럴 방식으로 생성된 객체의 프로토타입 체이닝
    //example
    {
        const myObj={
            name:'foo',
            sayName:function(){
                console.log(this.name);
            }
        }

        myObj.sayName(); //foo
        console.log(myObj.hasOwnProperty('name'));
        console.log(myObj.hasOwnProperty('nickname'));
    }

    // ** 프로토타입 체이닝의 개념
    // 자바스크립트에서 특정객체의 프로퍼티나 메서드에 접근하려할 때 해당 객체에 접근하여는 프로퍼티나 메서드가 없다면 
    // [[Prototype]]링크를 따라 부모역할을 하는 프로토타입 객체의 프로퍼티를 차례대로 검색
    // 이것을 프로토타입 체이닝이라고 한다.

    //2. 생성자 함수로 생성된 객체의 프로토타입 체이닝
    // 객체리터럴 방식과 조금 다르게 체이닝이 이루어진다.
    // 자바스크립트에서 모든 객체는 자신을 생성한 생성자 함수의 prototype프로퍼티가 가리키는 객체를 자신의 Prototype객체로 삼는다.
    //example
    {
        function Person(name, age, gender){
            this.name=name;
            this.age=age;
            this.gender=gender;
        }

        const foo=new Person('foo',32,'man');

        console.log(foo.hasOwnProperty('name'));

        console.dir(foo);
    }



    //프로토타입 체이닝의 종점 - Object.prototype
    // 즉 Object.prototype에 정의된 메서드들은 모든 객체가 호출가능한 표준 메서드라고 볼 수 있다.

    //자바스크립트는 Object.prototype, String.prototype같은 표준 빌트인 프로토타입 객체에도 사용자가 직접 정의한 메서드를 추가하는 것이 가능하다
    //example
    {
        String.prototype.testMethod=function(){
            console.log('This is String.prototype.testMethod() ');
        }

        const str="this is test";
        str.testMethod();

        console.dir(String.prototype);
    }


    // 함수가 생성될 때 연결되는 prototype프로퍼티에 연결되는 프로토타입 객체에도 프로퍼티 추가 가능하다.
    //example
    {
        function Person(name){
            this.name=name;
        }

        const foo=new Person('foo');

        Person.prototype.sayHello=function(){
            console.log("hello world");
        }

        foo.sayHello();
    }


    //디폴트 프로토타입 객체는 다른 객체로 변경이 가능하다. - 이러한 특징을 이용해서 상속을 구현한다.
    // 디폴트 프로토타입 객체는 함수가 생성될 때 함께 생성
    // 함수의 prototype에 연결된다.
    //example
    {
        function Person(name){
            this.name=name;
        }
        console.log(Person.prototype.constructor);

        const foo=new Person('foo');
        console.log(foo.country); //undifined

        // Person prototype객체 변경
        Person.prototype={
            country:'korea',
        }
        console.log(Person.prototype.constructor);

        const boo=new Person('boo');
        console.log(foo.country); //undifined
        console.log(boo.country); //korea

        console.log(foo.constructor); //Person()
        console.log(boo.constructor); //Object()

    }


}