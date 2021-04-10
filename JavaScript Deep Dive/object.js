/**
 * Object
 */

//ES6에서 추가된 객체 리터럴의 확장기능
//1. 프로퍼티 축약 표현
//ES5
{
    var x=1,y=10;

    var obj={
        x:x,
        y:y
    }
    console.log(obj);
}
//ES6
{
    let x=10,y=20;

    const obj={
        x,
        y
    }
    console.log(obj)
}

//2. 메서드 축약표현
//ES5
{
    var obj={
        name:'Lee',
        sayHi:function(){
            console.log('HI'+'dasfaa');
        }
    }

    obj.sayHi();
}

//ES6
{
    const obj={
        name:'Lee',
        sayHi(){
            console.log('HI'+'dasfaa');
        }
    }
    obj.sayHi();
}


// 얕은복사와 깊은복사
// 얕은복사와 깊은 복사 모두 원본 객체와는 다른 객체이다.
// 얕은 복사는 원본 객체에 중첩되어있는 객체는 참조값을 복사하고, 깊은복사는 중첩되어있는 객체모두 복사본을 만든다.
{
    const o={
        x:{
            y:1,
        }
    }

    //얕은복사
    const sallow={...o}
    console.log(o===sallow)

    //깊은복사
    //const lodash=require('lodash');
    //const deep=lodash.cloneDeep(o);
    //console.log(o===deep)
}