/**
 * 클로저
 */

//클로저의 개념
//example
{
    function outerfunc(){
        const x=10;
        const innerfunc=function(){ //클로저
            console.log(x); //x=자유변수
        }
        return innerfunc;
    }

    const inner=outerfunc();
    inner(); //outerFunc의 실행 컨텍스트가 사라진 이후에 innerFunc의 실행 컨텍스트가 생성되는 것이다.
}
//outerFunc의 실행 컨텍스트는 사라졌지만 변수객체는 그대로 남아있고, innerFunc의 스코프체인으로 참조되고있다.
// 이것이 클로저
// 다시 정리하면 외부함수의 실행 컨텍스트는 사라졌지만 내부함수에서 외부함수 변수객체의 스코프체인을 가지고있다.
// 이미 생명주기를 마감한 외부함수의 변수를 참조하는 함수 = 클로저
//이러한 특성을 바탕으로 자바스크립트를 이용한 함수형 프로그래밍이 가능하다.

//example
{
    function outer(x,y){
        const local=8;
        function inner(innerArg){
           console.log((x+y)/(innerArg+local));
        }
        return inner;
    }

    const exam=outer(2,4);
    exam(2);
}
//outer()의 실행이 종료되었지만 여전히 inner의 [[scope]]에 참조되므로 가비지 컬렉션의 대상에서 제외된다.

// 클로저에서 접근 하는 변수의 대부분은 스코프체인의 첫번째 변수객체가 아닌 뒤쪽에있는 변수객체를 참조한다.
// 이것은 성능을 저하시키는 원인이 될 수 도있다.
// 따라서 클로저를 영리하게 사용하는 지혜가 필요하다.


//클로저의 활용
//앞서 언급한 것과 같이 클러저는 성능적인부분, 자원적인 부분에서 약간의 손해를 볼 수 있다.
// 따라서 무차별적으로 사용해서는 안된다.

//example 1 -> ???이해가 안감
{
    function HelloFunc(func){
        this.greeting="hello";
    }

    HelloFunc.prototype.call=function(func){
        func? func(this.greeting) : this.func(this.greeting);
    }

    const userFunc=function(greeting){
        console.log(greeting);
    }

    const objHello=new HelloFunc();
    objHello.func=userFunc;
    objHello.call();

    // 개선
    function saySomething(obj,methodName,name){
        return (function(greeting){
            return obj[methodName](greeting,name);
        })
    }

    function newObj(obj,name){
        obj.func = saySomething(this,"who",name); 
    }

    newObj.prototype.who = function(greeting,name){
        console.log(greeting + " " + (name || "everyone"));
    }

    var obj1=new newObj(objHello,'zzon');
    objHello.call()
}


// 함수의 캡슐화
// I am xxx I live in xxx I'am xx years old라는 문장을 출력하는 함수인데 xxx는 사용자로부터 받아온다.
//1. 단순한 해결 - 문제점 : buffer배열이 전역에 노출되어있다. - 다른 코드와 충돌가능성이 있음
{
    const buffer=[
        'I am ',
        '',
        ' I live in ',
        '',
        ' I am ',
        '',
        ' years old',
    ];

    function getCompletedStr(name, city, age){
        buffer[1]=name;
        buffer[3]=city;
        buffer[5]=age;

        return buffer.join('');
    }

    const str=getCompletedStr('foo','seoul',25);
    console.log(str)
}

// 2. 클로저를 활용하여 buffer을 추가적인 스코프에 넣어 사용
{
   const getCompletedStr = (function(){
    const buffer=[ //자유변수
        'I am ',
        '',
        ' I live in ',
        '',
        ' I am ',
        '',
        ' years old',
    ];

    return (function(name,city,age){ //클로저
        buffer[1]=name;
        buffer[3]=city;
        buffer[5]=age;

        return buffer.join('');
    })
   })();

   const str=getCompletedStr('foo','new York',26);
   console.log(str)
}



//setTimeout()에 지정되는 함수의 사용자 정의 **
//setTimeout으로 자신의 코드를 호출하고 싶다면 첫번째 인자로 해당함수의 객체 참조를 넘겨주면 되지만,
// 이것으로는 실제 실행될 때 함수에 인자를 줄 수 없다.
{
    function callLater(obj,a,b){
        return (function(){
            obj['sum']= a+b;
            console.log(obj['sum']);
        })
    }

    const sumObj={
        sum:0
    }

    const func=callLater(sumObj,1,2);
    setTimeout(func,500);
}


// 클로저를 활용 할 때 주의사항
//1. 클로저의 프로퍼티 값이 쓰기 가능하므로 여러 번 호출로 변할 수 있음에 유의해야한다.
{
    function outer(argNum){
        let num=argNum;
        return function(x){
            num+=x;
            console.log('num: '+num);
        }
    }

    const exam=outer(40);
    exam(5);
    exam(50);
}

//2. 하나의 클로저가 여러 함수객체의 스코프체인에 들어가 있는 경우도 있다.
{
    function func(){
        let x=1;
        return{
            func1: function(){console.log(++x);},
            func2: function(){console.log(-x);}
        }
    }

    const exam=func();
    exam.func1();
    exam.func2();
}

//3. 루프안에서 클로저 사용시 주의!
{
    function countSeconds(time){
        for(var i=1;i<=time;i++){
            setTimeout(function(){
                console.log(i); //4 4 4
            },i*1000)
        }
    }
    countSeconds(3);
}

// 루프 i값의 복사본을 넘겨준다.
{
    function countSeconds(time){
        for(var i=1;i<=time;i++){
            (function(currentI){
                setTimeout(function(){
                    console.log(currentI); //1 2 3
                },currentI*1000)
            })(i);
        }
    }
    countSeconds(3);
}

//let을 사용한 해결
{
    function countSeconds(time){
        for(let i=1;i<=time;i++){
            setTimeout(function(){
                console.log(i); //4 4 4
            },i*1000)
        }
    }
    countSeconds(3);
}