'use strict';
{
    /**
     * 배열
     * 
     */

    const empty=[];
    empty[0]=100;
    empty[3]='hello';
    empty[7]=false;

    console.log(empty);
    console.log(empty.length);

    //배열 length 명시적 변경
    const arr=[1,2,3];
    console.log(arr.length);

    arr.length=5;
    console.log(arr);

    arr.length=2;
    console.log(arr)


    //배열과 객체의 차이점
    // 배열역시 객체지만 일반객체와 차이점이 존재한다.
    //배열과 일반적인 객체는 자신의 부모인 프로토타입 객체가 서로 다르다.
    //Array.prototype , Object.prototype
    //Array의 Prototype은 Object.prototype이 된다.


    //배열의 프로퍼티 동적 생성
    //배열도 객체이므로 인덱스가 숫자인 원소 이외에도 동적으로 프로퍼티를 추가할 수 있다.
    const arr2=['zero','one','two'];
    console.log(arr2.length);

    arr2.color="red";
    arr2.name="numberArray";
    console.log(arr2.length); //length는 배열원소의 가장 큰 인덱스가 변했을 때만 변경된다.

    arr2[3]="three";
    console.log(arr2.length);


    
    //유사배열 객체
    // -> length 프로퍼티를 가진 일반객체
    // 유사배열 객체의 가장 큰 특징은 자바스크립트의 표준 배열 메서드를 사용하는게 가능하다.
    const arr3=['bar'];
    const obj={
        name:'foo',
        length:1,
    }

    arr3.push('baz');
    console.log(arr3);

    Array.prototype.push.apply(obj,['baz']);
    console.log(obj)
}