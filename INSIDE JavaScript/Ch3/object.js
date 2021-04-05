'use strict'
{
    /**
     * 객체 생성방식
     * 1. new Object()
     * 2. 객체 리터럴 방식 이용
     * 3. 생성자 함수 이용
     */

    //객체 프로퍼티 삭제 delete
    const foo={
        name: "foo",
        nickname: "bear foo",
    }

    console.log(foo.nickname);
    delete foo.nickname;  //객체 프로퍼티 삭제
    console.log(foo.nickname);
    //delete foo // -> 객체 자체를 삭제하지는 못한다.


    //객체 비교
    // == 와  === 의 차이는 값의 타입까지 비교한다는 차이다.
    const a=100;
    const b=100;

    const objA={value:100};
    const objB={value:100};
    const objC=objB;

    console.log(a==b); // 기본타입의 경우 값을 비교한다.
    console.log(objA==objB); // 참초타입의 경우 참조를 비교한다. -> false
    console.log(objB==objC); // -> true



    // ** 프로토타입
    // 자바스크립트의 모든 객체는 자신의 부모역할을 하는 객체와 연결되어있다.
    // 이러한 부모객체를 프로토타입 객체라고 한다.
    console.log(foo.toString()); // foo객체에는 toString()라는 메소드가 정의되어 있지 않다. 그럼에도 사용이 가능한 이유는 foo객체의 프로토타입에 정의 되어 있기 때문이다.
    console.dir(foo); //모든 객체는 자신의 프로토타입을 가리키는 __proto__라는 숨겨진 프로퍼티를 가진다.
    // 즉 foo객체는 자신의 부모객체를 __proto__라는 내부 프로퍼티로 연결하고 있는 것이다.
}