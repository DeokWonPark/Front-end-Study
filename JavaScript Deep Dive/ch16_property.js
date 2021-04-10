/**
 * 프로퍼티 어티리뷰트
 */

//프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
// 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동정의한다.
// - 프로퍼티 상태란  프로퍼티의 값, 갱신가능여부, 열거가능여부, 재정의 가능여부
//프로퍼티 어트리뷰트에 직접 접근 할 수 없지만, 간접적으로 접근 가능하다.
{
    const person = {
        name:'Lee'
    };

    // 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터를 반환한다.
    console.log(Object.getOwnPropertyDescriptor(person,'name')); // {value: "Lee", writable: true, enumerable: true, configurable: true}

    person.age=15;
    console.log(Object.getOwnPropertyDescriptors(person));
}


// 데이터 프로퍼티와 접근자 프로퍼티
// 프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분할 수 있다.
// 데이터 프로퍼티 - 키와 값으로 구성된 일반적인 프로퍼티이다.
// 접근자 프로퍼티 - 자체적으로 값을 가지지 않고 다른 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 프로퍼티로 구성된 프로퍼티 getter setter
{
    const person={
        firstName:'park',
        lastName:'deokwon',

        //getter - 접근자 프로퍼티
        get fullName(){
            return `${this.firstName} ${this.lastName}`;
        },

        //setter - 접근자 프로퍼티
        set fullName(name){
            //배열 디스트럭처링 할당
            [this.firstName,this.lastName]=name.split(" ");
        }
    }

    console.log(`데이터 프로퍼티 값: ${person.firstName} ${person.lastName}`);

    //setter
    person.fullName="kim deo";
    console.log(person) //{firstName: "kim", lastName: "deo"}

    //getter
    console.log(person.fullName);

    let descriptor=Object.getOwnPropertyDescriptor(person,'firstName');
    console.log(descriptor); //{value: "kim", writable: true, enumerable: true, configurable: true}

    descriptor=Object.getOwnPropertyDescriptor(person,'fullName');
    console.log(descriptor); //{enumerable: true, configurable: true, get: ƒ, set: ƒ}
}

//프로토타입 - 어떤 객체의 상위 객체(부모)역할을 하는 객체다.
// 프로토타입은 하위 객체에게 자신의 프로퍼티와 메서드를 상속한다.
// 따라서 자식은 프로토타입 객체의 프로퍼티나 메서드를 자신의 것인 마냥 사용이 가능하다.
// 프로토타입은 단뱡향 연결리스트형태로 연결되어있는 상속구조


// 프로퍼티 정의 - 프로퍼티 어트리뷰트 정의
// Object.defineProperty()
{
    const person={};

    //데이터 프로퍼티 정의
    Object.defineProperty(person,'firstName',{
        value:'park',
        writable:true,
        enumerable:true,
        configurable:true,
    });

    Object.defineProperty(person,'lastName',{
        value:"deokwon",
    });

    let descriptor=Object.getOwnPropertyDescriptor(person,'firstName');
    console.log(descriptor); //{value: "park", writable: true, enumerable: true, configurable: true}

    descriptor=Object.getOwnPropertyDescriptor(person,'lastName');
    console.log(descriptor); //{value: "deokwon", writable: false, enumerable: false, configurable: false} - 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본


    //[[Enumerable]] 값이 false인경우 열거되지 않는다.
    console.log(Object.keys(person)); //['firstName']

    //[[Writable]] 값이 false인경우 값이 변경되지 않는다.
    person.lastName='deo';
    console.log(person.lastName); //deokwon

    //[[Configurable]] 값이 false인 경우 해당 프로퍼티를 삭제 할 수 없다.
    delete person.lastName;
    console.log(person.lastName); //deokwon

    //[[Configurable]] 값이 false인 경우 해당 프로퍼티를 재정의 할 수 없다.
    //Object.defineProperty(person,'lastName',{value:"deokwon"}); //error cannot redefine property


    //접근자 프로퍼티 정의
    Object.defineProperty(person,'fullName',{
        //getter
        get(){
            return `${this.firstName} ${this.lastName}`;
        },

        //setter
        set(name){
            [this.firstName,this.lastName]=name.split(" ");
        },

        enumerable:true,
        configurable:true,
    });

    descriptor=Object.getOwnPropertyDescriptor(person,'fullName');
    console.log(descriptor); // {enumerable: true, configurable: true, get: ƒ, set: ƒ}

    person.fullName='Kim deo';
    console.log(person.fullName);

    // Object.defineProperties() - 여러 프로퍼티 한번에 정의 p.228
}


//객체 변경 방지
// 객체는 변경 가능한 값이므로 재할당 없이 값을 변경할 수 있다
// 객체 확장 금지 - Object.preventExtensions()
// 객체 밀봉 - Object.seal()
// 객체 동결 - Object.freeze()

//1. 객체 확장 금지 - Object.preventExtensions() - 프로퍼티의 추가를 금지
{
    const person={name:'foo'};

    // 객체 확장 가능여부 확인
    console.log(Object.isExtensible(person)) //true

    Object.preventExtensions(person);
    console.log(Object.isExtensible(person)) //false

    person.age=10;
    console.log(person) //프로퍼티 추가 무시, strict mode에서는 에러 발생

    //프로퍼티 정의에 의한 추가도 무시된다. Object.defineProoerty()
}

//2. 객체 밀봉 - Object.seal()
// 밀봉된 객체는 객체의 값 읽기와 쓰기만 가능
{
    const person={name:'fpo'};

    console.log(Object.isSealed(person)); //객체 밀봉여부 확인

    Object.seal(person);
    console.log(Object.isSealed(person)); //객체 밀봉여부 확인 true
    console.log(Object.getOwnPropertyDescriptors(person)); //name: {value: "fpo", writable: true, enumerable: true, configurable: false}

    //프로퍼티 값 읽기와 갱신만 가능
}

//3. 객체 동결 - Object.freeze()
{
    const person={name:'fpo'};

    console.log(Object.isFrozen(person));
    Object.freeze(person); // 객체 프로퍼티 값을 읽는 것만 가능하다. - 프로퍼티 추가, 삭제, 변경, 어트리뷰트 재정의 금지
    console.log(Object.isFrozen(person));
    console.log(Object.getOwnPropertyDescriptors(person)); //name: {value: "fpo", writable: false, enumerable: true, configurable: false}
}


// 지금까지 객체 변경 방지는 얕은 변경방지로 중첩된 객체에 대해서는 동결이 불가능하다.
{
    const person={
        name:'foo',
        address:{
            city:'seoul',
        }
    }

    //얕은 동결
    Object.freeze(person);

    console.log(Object.isFrozen(person)); //true
    // 중첩객체 까지 동결하지 못한다.
    console.log(Object.isFrozen(person.address)); //false

    person.address.city='busan';
    console.log(person.address.city); //'busan'

    // 따라서 중첩된 객체까지 동결을 해주기 위해서 모든 프로퍼티에 대해서 재귀적으로 Object.freeze()를 호출해주어야 한다.
    function deepFreeze(target){
        if(target && typeof target ==='object' && !Object.isFrozen(target)){
            Object.freeze(target);
            Object.keys(target).forEach(key => deepFreeze(target[key]));
        }
        return target;
    }

    const animal={
        name:'dog',
        address:{
            city:'seoul',
        }
    }

    deepFreeze(animal);

    console.log(Object.isFrozen(animal)); //true
    // 중첩 객체까지 동결
    console.log(Object.isFrozen(animal.address)); //true

    animal.address.city='gumi';
    console.log(animal.address.city); //seoul
}