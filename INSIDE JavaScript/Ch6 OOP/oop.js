/**
 * 객체지향 프로그래밍 OOP
 */

//example - 중복의 문제
//getName(), setName()와 같은 메서드들이 객체별로 중복되어 생성된다. - 자원낭비
{
    function Person(name){
        this.name=name;

        this.getName=function(){
            return this.name;
        }

        this.setName=(name)=>{
            this.name=name;
        }
    }

    const me=new Person("foo");
    console.log(me.getName());

    me.setName('bar');
    console.log(me.getName());

    const you=new Person('you');
    const him=new Person('him');
}

//자바스크립트의 프로토타입을 활용
{
    function Person(name){
        this.name=name;

        Person.prototype.getName=function(){
            return this.name;
        }

        Person.prototype.setName=function(){
            this.name=name;
        }
    }
    const you=new Person('you');
    const him=new Person('him');

    console.log(you.getName());
    console.log(him.getName());
    
    console.dir(you);
}

{
    Function.prototype.method=function(name,func){
        this.prototype[name]=func;
    }

    function Person(name){
        this.name=name;
    }

    Person.method('setName',function(name){
        this.name=name;
    })

    Person.method('getName',function(){
        return this.name;
    })

    const you=new Person('you');
    const him=new Person('him');

    console.log(you.getName());
    console.log(him.getName());
}



// 상속
// 자바스크립트 객체 프로토타입 체인을 이용하여 상속을 구현할 수 있다.
// 상속의 구현방식은 크게 2가지 - 전통적인 클래스 기반의 상속을 흉내내는 방식, 클래스 개념없이 객체의 프로토타입으로 상속을 구현

//1. 프로토타입을 이용한 상속
function create_object(o){
    function F(){}
    F.prototype=o;
    return new F();
}
//인자로 들어온 객체를 부모로하는 자식 객체를 만들어 반환한다.
//create_object함수는 Object.create()함수로 제공되므로 구현할 필요는 없다.
//example
{
    const person={
        name:'zzoon',
        getName:function(){
            return this.name;
        },
        setName:function(name){
            this.name=name;
        }
    }

    const student=create_object(person); //person객체를 상속하여 student객체 생성
    student.setName('foo');
    console.log(student.getName());
}
//클래스에 해당하는 생성자 함수를 따로 만들지 않았다.
//단지 부모객체에 해당하는 person객체와 이 객체를 프로토타입 체인으로 참조가능한 자식 객체를 만들어서 사용했다.

// 부모의 객체를 상속받은 자식은 추가로 기능을 확장 할 수 있어야한다.
// 자바스크립트에서는 범용적으로 extend()함수를 이용해서 객체에 자신이 원하는 객체 혹은 함수를 추가시킨다.
//extend example
{
    const person={
        name:'zzoon',
        getName:function(){
            return this.name;
        },
        setName:function(name){
            this.name=name;
        }
    }

    function extend(obj,prop){
        if(!prop){
            prop=obj;
            obj=this;
        }
        for(var i in prop){
            obj[i]=prop[i];
        }
        return obj;
    }

    const student=create_object(person);

    const added={
        setAge:function(age){
            this.age=age;
        },
        getAge:function(){
            return this.age;
        }
    }

    extend(student,added);

    student.setAge(25);
    console.log(student.getAge());
}

// 2. 클래스 기반의 상속
{
    function Person(name){
        this.name=name;
    }
    
    Person.prototype.setName=function(name){
        this.name=name;
    }
    Person.prototype.getName=function(){
        return this.name;
    }

    function Student(arg){ //부모의 생성자가 실행되어야한다. 그렇지 못하면 초기화가 제대로 이루어지지 않아 문제가 발생 할 수 있다.
        Person.apply(this,arguments);
    }

    const you=new Person('you');
    Student.prototype=you;

    const me=new Student('me');
    //me.setName('me');
    console.log(me.getName());
}
// 현재 자식 클래스의 객체가 부모 클래스의 객체를 프로토타입 체인으로 직접 접근한다.
// 하지만 부모클래스의 인스턴스와 자식클래스의 인스턴스가 독립적인 필요가 있다.
// 따라서 두 클래스의 프로토타입 사이에 중개자를 하나 만들어보자

{
    function Person(name){
        this.name=name;
    }

    Function.prototype.method=function(name,func){
        this.prototype[name]=func;
    }

    Person.method("setName",function(name){
        this.name=name;
    });
    Person.method("getName",function(){
        return this.name;
    });

    function Student(arg){};

    function F(){};

    F.prototype=Person.prototype;
    Student.prototype=new F();
    Student.prototype.constructor=Student;
    Student.super=Person.prototype;

    const me=new Student();
    me.setName('zzoon');
    console.log(me.getName());
}

// 함수 생성자를 이용해서 상속하는 방식이나, 객체 리터럴을 이용해서 상속하는 방식은 프로토타입 체인을 이용하는 원리는 같다.


//캠슐화
//캡슐화란 기본적으로 관련된 여러가지 정보를 하나의 틀 안에 담는 것을 의미한다.
//멤버변수, 메서드가 서로 관련된 정보가 되고 클래스가 이것을 하나로 담는 큰 틀이라고 할 수 있다.
//중요한 것은 정보은닉
// 타 언어에서는 접근지정자를 통해서 외부로 노출시킬지를 결정
//자바스크립트에서는 접근지정자가 없다. 그렇다고해서 정보은닉이 불가능한 것은 아니다
//정보은닉 example
{
    const Person=function(arg){
        var name=arg?arg:'zzoon'; //var로 선언된 멤버변수 외부에서 접근 불가능

        this.getName=function(){
            return name;
        }
        this.setName=function(arg){
            name=arg;
        }
        // public 메서드가 클로저 역할을 하면서 name에 접근이 가능하다.
    }

    const me=new Person('me');
    console.log(me.getName()); //me
    me.setName('foo');
    console.log(me.getName()); //foo
    console.log(me.name); //undifined
}
//코드 깔끔하게 개선 - 모듈패턴
{
    const Person=function(arg){
        var name=arg?arg:'zzoon'; 
        return{
            getName:function(){
                return name;
            },
            setName:function(arg){
                name=arg;
            }
        }
    }

    const me=new Person('me');
    console.log(me.getName()); //me
    me.setName('foo');
    console.log(me.getName()); //foo
    console.log(me.name); //undifined
    console.dir(me) //Person 함수의 프로토타입에 접근 불가(객체로 반환할 경우)
}
// 클로저로 접근하는 멤버가 객체나 배열이라면 참조를 반환한다는 것을 주의
//example
{
    const ArrCreate=function(arg){
        var arr=[1,2,3];
        return {
            getArr:function(){
                return arr; //var arr에 대한 참조
            }
        }
    }

    const obj=new ArrCreate();
    const arr=obj.getArr();
    arr.push(5);
    console.log(obj.getArr()); //[1,2,3,5]
}
//프로그래머는 객체를 반환하는 경우 신중해야한다.
//보통의 경우 객체의 주요정보를 담아서 반환하는 방법을 많이 사용한다.
// 꼭 객체가 반환되어야하는 경우 깊은 복사본을 만들어서 반환하는 방법을 사용한다.

//객체를 반환하는 경우 반환받은 객체는 Person함수의 프로토타입에 접근이 불가능하다.
// 프로토타입을 이요한 상속을 구현하기가 용이하지않다.
//example
{
    const Person=function(arg){
        var name=arg?arg:"zzoon";

        var Func=function(){}
        Func.prototype={
            getName:function(){
                return name;
            },
            setName:function(arg){
                name=arg;
            }
        }

        return Func;
    }

    const me=new Person('foo');
    console.dir(me);
}



//객체지향 프로그래밍 응용예제

//1. 클래스 기능을 가진 subClass 함수
// 3가지를 활용해서 구현
// - 함수의 프로토타입 체인
// - extend() 함수
// - 인스턴스를 생성할 때 생성자 호출 _init
{
    function subClass(obj){

        var parent=this===window?Function:this;
        var F=function(){};

        //1. 자식 클래스 생성
        var child = function(){
            var _parent = child.parent;

            //2. 생성자 호출
            if(_parent && _parent !==Function){
                _parent.apply(this,arguments);
            }

            if(child.prototype._init){
                child.prototype._init.apply(this,arguments);
            }
        }

        //3. 프로토타입 체인을 활용한 상속구현
        F.prototype=parent.prototype;
        child.prototype=new F();
        child.prototype.constructor=child;
        child.parent = parent;
        child.subClass = arguments.callee;

        //4. obj를 통해 들어온 변수 및 메서드를 자식 클래스에 추가하여 확장
        for(var i in obj){
            if(obj.hasOwnProperty(i)){
                child.prototype[i]=obj[i];
            }
        }

        //5. 자식함수 객체 반환
        return child;
    }

    var person_obj={
        _init:function() {
            console.log('person init');
        },
        getName:function(){
            return this._name;
        },
        setName:function(name){
            this._name=name;
        }
    }

    var student_obj = {
        _init : function(){
            console.log("student init");
        },
        getName: function(){
            return `Student Name ${this._name}`;
        }
    }

    var Person = subClass(person_obj);
    var person = new Person();
    person.setName('person');
    console.log(person.getName());

    var Student=Person.subClass(student_obj);
    var student=new Student();
    student.setName('student');
    console.log(student.getName());

    console.log(Person.toString())
}