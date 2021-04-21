/**
 * 에러처리
 * 에러가 발생하지 않는 코드를 작성하는 것은 거의 불가능한 일이다.
 * 적절한 처리가 필요하다
 */

// 에러에 대처하지 않고 방치하면 프로그램은 강제 종료된다.
{
    console.log('[start]'); 
    //foo(); //Uncaught ReferenceError: foo is not defined
    console.log('[end]'); // -> 에러에 의해 강제 종료되어 실행되지 않는다.
}

// try ... catch문을 사용해 에러에 적절하게 대응하면 프로그램이 강제 종료되지 않고 계속 실행가능하다.
{
    console.log('[start]'); 
    try{
        foo();
    }catch(err){
        console.error(err); // ReferenceError: foo is not defined
    }
    console.log('[end]'); 
}


// 에러처리방법
// 기본적으로 에러처리는 2가지 방법을 사용한다. 
//1. 예외적인 상황이 발생하면 반환하는 값을 옵셔널체이닝 연산자 혹은 단축평가를 통해 확인하여 처리
//2. 예외처리 코드를 미리 등록해 두고 에러가 발생하면 에러처리 코드로 점프



//throw 문
//Error 생성자 함수로 에러 객체를 생성한다고 해서 에러가 발생하는 것은 아니다 - 에러 객체 생성과 에러 발생은 의미가 다르다.
{
    try{
        // 에러 객체를 생성한다고 해서 에러가 발생하는 것은 아니다
        new Error('make error');
    }catch(err){
        console.error(err);
    }
}

{
    try{
        // 에러 객체를 생성한다고 해서 에러가 발생하는 것은 아니다
        throw new Error('throw error');
    }catch(err){
        console.error(err); //Error: throw error
    }
}


//에러의 전파
// 에러는 호출자 방향으로 전파된다 - 콜 스택의 아래로 전파
{
    function foo(){
        throw new Error('throw error');
    }
    function bar(){
        foo();
    }
    function baz(){
        bar();
    }

    try{
        baz();
    }catch(err){
        console.error(err); //Error: throw error   foo -> bar -> baz -> global
    }
}
// throw된 에러를 적절히 캐치하여 대응하면 프로그램을 강제 종료 시키지 않고 코드의 실행흐름을 복구할 수 있다.