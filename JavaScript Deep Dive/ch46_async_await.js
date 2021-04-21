/**
 * 제너레이터와 async/await
 */


// 제너레이터 ES6에 도입
// 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수

// 제너레이터와 일반함수의 차이
//1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
// 일반함수는 호출하면 제어권이 호출된 함수에게 넘어가고 함수 코드를 일괄 실행한다. - 즉 호출자는 함수를 호출한 이후 실행을 제어할 수 없다.
// 반면 제너레이터는 함수 실행을 호출자가 제어 할 수 있다. - 실행을 중지 시키거나 재개할 수 있다.

//2. 제너레이터는 함수의 상태를 호출자와 주고받을 수 있다.
// 일반함수는 매개변수를 통해 외부에서 값을 주입 받고 함수코드를 일괄 실행하여 값을 반환한다. - 실행동안에는 외부와 값을 주고 받을 수 없다.
// 제너레이터 함수는 호출자와 양방향으로 데이터를 주고 받을 수 있다.

//3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
// 일반함수를 호출하면 함수 코드를 실행하고 값을 반환한다.
// 제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 이터러블이면서, 이터레이터인 제너레이터 객체를 반환한다.




// 제너레이터 함수의 정의 - function*키워드로 선언, 하나이상의 yield표현식을 포함한다.
{
    //제너레이터 함수 선언문
    function* genDecFunc(){
        yield 1;
    }

    //제너레이터 함수 표현식
    const genExpFunc = function* (){
        yield 1;
    }

    //제너레이터 메서드
    const obj = {
        * genObjMethod(){
            yield 1;
        }
    }

    //제너레이터 클래스 메서드
    class MyClass{
        * genClsMethod(){
            yield 1;
        }
    }

    // 제너레이터는 화살표 함수로 정의할 수 없다
    // 제너레이터 함수는 new 연산자와 함께 생성자 함수로 호출 할 수 없다.
}



// 제너레이터 객체
// 제너레이터 함수를 호출 하면 일반 함수처럼 함수 코드블럭을 실행하는 것이 아니라 제너레이터 객체를 생성해 반환한다.
// 제너레이터 객체는 이터러블이면서 동시에 이터레이터이다.
{
    function* genFunc(){
        yield 1;
        yield 2;
        yield 3;
    }

    // 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
    const generator = genFunc();

    console.log(Symbol.iterator in generator); //true
    console.log('next' in generator); //true
}

{
    function* genFunc(){
        try{
            yield 1;
            yield 2;
            yield 3;
        }catch(e){
            console.error(e);
        }
    }

    const generator = genFunc();

    //next메서드를 호출하면 yield표현식 까지 코드 블록을 실행하고 yield값을 value값으로 갖는 이터레이터 리절트 객체를 반환한다.
    console.log(generator.next()); //{value: 1, done: false}
    console.log(generator.next()); //{value: 2, done: false}
    console.log(generator.next()); //{value: 3, done: false}
    console.log(generator.next()); //{value: 4, done: true}
}

{
    function* genFunc(){
        try{
            yield 1;
            yield 2;
            yield 3;
        }catch(e){
            console.error(e);
        }
    }

    const generator = genFunc();

    //return 메서드를 호출하면 인수로 전달 받은 값을 value값으로 done는 true로 이터레이터 리절트 객체를 반환한다.
    console.log(generator.next()); //{value: 1, done: false}
    console.log(generator.return('END !')); //{value: "END !", done: true}
}

{
    function* genFunc(){
        try{
            yield 1;
            yield 2;
            yield 3;
        }catch(e){
            console.error(e);
        }
    }

    const generator = genFunc();

    //throw 메서드를 호출하면 인수로 전달 받은 에러를 발생시키고 value를 undefined값으로 갖는 이터레이터 리절트 객체를 반환한다.
    console.log(generator.next()); //{value: 1, done: false}
    console.log(generator.throw('Error !')); //Error !  {value: undefined, done: true}
}




// 제너레이터 일시 중지와 재개
// 제너레이터는 yield 키워드와 next 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있다.
// yield키워드는 제너레이터 함수의 실행을 일시중지시키거나 yield키워드 뒤에오는 표현식의 평가결과를 제네레이터 함수 호출자에게 반환한다.
// 리절트 객체의 value에는 yield값이 할당되고 done에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 boolean값이 할당된다
// 제너레이터 next 메서드에는 인수를 전달할 수 있다.
{
    function* genFunc(){
        // 첫 next() yield 1까지 실행된다.
        // x에는 값이 할당되지 않고 두번째 next()에 전달된 인수로 값이 할당된다.
        const x = yield 1;

        //y에 yield값의 평가가 할당되는 것이 아니라 세번째 next()인수로 전달된 값이 할당된다.
        //두번쨰 next는 yield(x+10)까지 실행된다
        const y = yield(x+10);

        // 세번째 next의 value에 return 값이 할당된다
        // 일반적으로 제너레이터의 반환값은 의미가 없다.
        // 따라서 제너레이터에서는 값을 반환 할 필요가 없다.
        return x+y;
    }

    const generator = genFunc();

    let res = generator.next();
    console.log(res); //{value: 1, done: false}

    res = generator.next(10);
    console.log(res); //{value: 20, done: false}

    res = generator.next(20);
    console.log(res); //{value: 30, done: true}

}
// 이처럼 제너레이터 함수는 next와 yield표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다.
// next를 통해 yield까지 실행시켜 yield값을 가져올 수 있고
// next메서드에 인수를 전달해서 함수에 값을 전달 할 수 있다
// 이러한 제너레이터의 특성을 활용하면 비동기 처리를 동기처리처럼 구현 할 수 있다.


//제너레이터의 활용
//1. 이터러블의 구현
// 제너레이터 함수를 이용하면 이터레이션 프로토콜을 준수해 이터러블을 생성하는 방식보다 더 간단하게 이터러블을 구현 할 수 있다.
//example - 무한 피보나치
{
    // 무한 이터러블을 생성하는 함수
    const infiniteFibonacci = (function (){
        let [pre,cur] = [0,1];

        return {
            [Symbol.iterator]() {return this;},
            next(){
                [pre,cur] = [cur, cur+pre];
                return {value:cur};
            }
        }
    })();

    for(const num of infiniteFibonacci){
        if(num > 10000) break;
        console.log(num);
    }
}
// 제너레이터 활용 - 무한피보나치
{
    const infiniteFibonacci = (function* (){
        let [pre,cur] = [0,1];

        while(true){
            [pre,cur] = [cur,pre+cur];
            yield cur;
        }
    })();

    for(const num of infiniteFibonacci){
        if(num > 10000) break;
        console.log(num);
    }
}

//2. 비동기처리 
// 제너레이터 함수는 함수 호출자와 상태를 주고 받을 수 있다.
// 이러한 특성을 이용해서 프로미스를 사용한 비동기 처리를 동기처리 처럼 구현 할 수 있다.
// 후속처리 메서드 then, catch, finally없이 비동기 처리결과 반환









// async / await
// 제너레이터를 사용해서 비동기 처리 코드를 동기 처리처럼 구현하면 코드가 무척 장황해지고, 가독성이 나쁘다
// ES8에서는 제너레이터보다 간단하게 비동기 처리를 동기 처리처럼 구현 할 수있는 async/ await가 도입되었다

// async/await은 프로미스를 기반으로 동작한다.
// 프로미스의 후속처리 메서드 없이 마치 동기 처럼 프로미스가 처리 결과를 반환하도록 구현 가능하다.
{
    async function fetchTodo(){
        const url = 'https://jsonplaceholder.typicode.com/todos/1';

        const response = await fetch(url);
        const todo = await response.json();
        console.log(todo); // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
    }

    fetchTodo();
}

//async 함수 - 언제나 Promise를 반환한다.
// 명시적으로 프로미스를 반환하지 않더라도 암묵적으로 resolve하는 프로미스를 반환
// await키워드는 반드시 async함수 내부에서 사용해야한다.
{
    async function foo(n){
        return n;
    }

    foo(1).then(v => console.log(v)); //1
}
// 클래스의 Constructor은 async메서드가 될 수 없다. - Constructor는 인스턴스를 반환해야하지만 async메서드는 프로미스를 반환해야한다.


//await 키워드 - 프로미스가 settled상태가 될 때 까지 대기하다가 settled상태가 되면 프로미스가 resolve한 처리결과를 반환한다.
// 반드시 promise앞에서 사용해야한다.
// await 키워드는 다음 실행을 일시 중지 시켰다가 프로미스가 settled상태가 되면 다시 재개한다
{
    async function foo(){
        const a = await new Promise((resolve) => setTimeout(() => resolve(1),3000));
        const b = await new Promise((resolve) => setTimeout(() => resolve(2),2000));
        const c = await new Promise((resolve) => setTimeout(() => resolve(3),1000));

        console.log([a,b,c]);
    }
    foo(); //약 6초정도 소요됨 - 순차적으로 처리하기 때문
}

// Promise.all을 통한 개선
{
    async function foo(){
        const res = await Promise.all([
            new Promise((resolve) => setTimeout(() => resolve(4),3000)),
            new Promise((resolve) => setTimeout(() => resolve(5),2000)),
            new Promise((resolve) => setTimeout(() => resolve(6),1000))
        ])

        console.log(res);
    }
    foo(); //약 3초정도 소요됨
}



// 에러처리
{
    const foo = async () => {
        try{
            const wrongUrl = 'https://wrong.url';

            const response = await fetch(wrongUrl);
            const data = await response.json();
            console.log(data);
        }catch(err){
            console.error(err) // TypeError: Failed to fetch
        }
    }

    foo();
}
// async함수 내에서 catch문을 사용해서 에러처리를 하지 않으면 async함수는 발생한 에러를 reject하는 Promise를 반환한다.
{
    const foo = async () => {
        const wrongUrl = 'https://wrong.url';

        const response = await fetch(wrongUrl);
        const data = await response.json();
        return data;
    }

    foo()
    .then(console.log)
    .catch(console.error); //TypeError: Failed to fetch
}