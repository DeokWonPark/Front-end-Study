/**
 * Promise
 */

// 자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백함수를 사용한다.
// 전통적인 콜백 패턴은 콜백 헬로 인해 가독성이 나쁘고, 비동기 처리중 발생한 에러처리가 곤란하며 여러개의 비동기를 한번에 처리하는 데도 한계가 있다.
// 따라서 ES6에서 비동기 처리를 위한 또다른 패턴으로 Promise를 도입했다.
// Promise는 전통적인 콜백 패턴이 가진 단점을 보완하고, 비동기 처리시점을 명확하게 표현 할 수 있다는 장점이 있다.


//비동기 처리를 위한 콜백패턴의 단점
//1. 콜백 헬
//Get요청
{
    const get = url => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET',url);

        xhr.send();

        xhr.onload = () => { // 네트워크 통신이 완료되면 비동기적으로 실행된다.
            if(xhr.status === 200){
                console.log(JSON.parse(xhr.response));
            }
            else{
                console.error('Error',xhr.status);
            }
        }
    }

    get('https://jsonplaceholder.typicode.com/posts/1');
    /*
        {
            userId: 1, 
            id: 1, 
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", 
            body: "quia et suscipit↵suscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto"
        }
    */
}

// onload() - 비동기 함수 에서 서버의 응답결과를 반환하거나 상위 스코프 변수에 할당하면 기대한 대로 동작하지 않는다.
{
    const get = url => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET',url);

        xhr.send();

        xhr.onload = () => { // 네트워크 통신이 완료되면 비동기적으로 실행된다.
            if(xhr.status === 200){
                return JSON.parse(xhr.response); //get함수의 반환문이 아니다.
            }
            else{
                console.error('Error',xhr.status);
            }
        }
    }

    const response = get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(response); //undefined - 기대한대로 값이 반환되지 않는다.
}
// 상위 스코프 변수에 할당
{
    let todos;
    const get = url => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET',url);

        xhr.send();

        xhr.onload = () => { // 네트워크 통신이 완료되면 비동기적으로 실행된다.
            if(xhr.status === 200){
                todos = JSON.parse(xhr.response);
            }
            else{
                console.error('Error',xhr.status);
            }
        }
    }

    get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(todos); //undefined - 기대한대로 값이 설정되지 않는다.
    // onload 이벤트 핸들러는 언제나 위의 console.log()가 종류한 후에 호출된다.
    // 이유 !!
    // get함수가 호출되면 get함수가 콜스택에 push된다
    // get함수 실행과정에서 xhr.onload에 이벤트 핸들러가 바인딩 된다.
    // get이 콜스택에서 pop되면 console.log가 콜스택에 곧바로 push된다
    // 만약 console.log호출 직전에 load이벤트가 발생했더라도 콜스택이 비어질때 까지 이벤트 핸들러는 테스크큐에 대기하게 된다.
    // 따라서 절대 이벤트 핸들러가 먼저 실행되지 못한다.
}

// 이처럼 비동기 함수는 비동기 처리 결과를 외부에 반환 할 수 없고, 상위 스코프 변수에 할당 할 수도 없다. **
// 따라서 비동기 함수의 처리 결과에 대한 후속 처리는 비동기 함수 내부에서 실행해야 한다. **
// 이때 비동기 함수를 범용적으로 사용하기 위해 비동기 후속처리로 사용할 콜백함수를 인자로 전달하는 것이 대부분이다.

// 비동기 후속처리 callback
{
    const get = (url,successCallback, failCallback) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET',url);

        xhr.send();

        xhr.onload = () => { // 네트워크 통신이 완료되면 비동기적으로 실행된다.
            if(xhr.status === 200){
                successCallback(JSON.parse(xhr.response));
            }
            else{
                failCallback('Error',xhr.status);
            }
        }
    }

    get('https://jsonplaceholder.typicode.com/posts/1',console.log, console.error); // 성공, 실패 각각의 콜백함수를 전달한다.
    /*
        {
            userId: 1, 
            id: 1, 
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit", 
            body: "quia et suscipit↵suscipit recusandae consequuntur …strum rerum est autem sunt rem eveniet architecto"
        }
    */
}
// 이처럼 콜백함수를 통해 비동기 처리 결과에 대한 후속처리를 수행하는 비동기 함수가 비동기 처리결과를 가지고 또 다시 비동기 함수를 호출해야한다면 
// 콜백 함수 호출이 중첩되어 복잡도가 높아지는 현상이 발생한다. => 이를 콜백 헬이라고 한다.
{
    const get = (url,successCallback) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET',url);

        xhr.send();

        xhr.onload = () => { // 네트워크 통신이 완료되면 비동기적으로 실행된다.
            if(xhr.status === 200){
                successCallback(JSON.parse(xhr.response));
            }
            else{
                console.error('Error',xhr.status);
            }
        }
    }

    const url = "https://jsonplaceholder.typicode.com";

    // 콜백 중첩으로 만들어진 콜백 헬
    // id가 1인 post의 userId를 취득
    get(`${url}/posts/1`,({userId}) =>{
        console.log(userId); //1

        //post의 userId를 가지고 user정보를 취득
        get(`${url}/users/${userId}`, userInfo => {
            console.log(userInfo); // {id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", address: {…}, …}
        })
    })

}


//2. 에러처리의 한계 - 비동기 처리를 위한 콜백패턴의 문제중 가장 심각한 것은 에러처리가 곤란하다는 것이다.
{
    try{
        //setTimeout(() => {throw new Error('Error')},1000);
    }catch(e){
        // 에러를 캐치하지 못한다.
        console.error(e);
    }
}
// 에러는 호출자 방향으로 전파된다 - 콜스택 아래에 있는 실행 컨텍스트 
// 하지만 setTimeout함수의 콜백함수의 호출자는 setTimeout이 아니다.
// 따라서 문제가 발생한다.



// 지금까지 콜백 패턴의 문제는 콜벡 헬과 에러처리가 곤란하다는 문제가 있었다 
// 따라서 이를 극복하기 위해 ES6 Promise가 등장하였다.

// Promise 생성 - 호스트 객체가 아닌 ECMAScript에 정의된 표준 빌트인 객체이다.
// Promise생성자 함수는 비동기 처리를 수행 할 콜백함수를 전달 받는데 , 이 콜백함수는 resolve와 reject함수를 인수로 전달 받는다.
{
    const promise = new Promise((resolve, reject) => {
        // Promise함수의 콜백함수 내부에서 비동기 처리를 수행한다.
        if(true){
            //success
            resolve('result');
        }
        else{
            reject('fail');
        }
    })
}

// 비동기 처리가 성공하면 resolve함수를 호출하고, 실패하면 reject함수를 호출한다.
// Promise GET
{
    const promiseGet = (url) =>{
        return new Promise((resolve,reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET',url);

            xhr.send();

            xhr.onload = () => {
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.response));
                }
                else{
                    reject(new Error(chr.status));
                }
            }
        })
    }

    promiseGet("https://jsonplaceholder.typicode.com/posts/1");
}

// Promise는 현재 비동기 처리가 어떻게 진행되고 있는지를 나타내는 상태 정보를 갖는다.
// pending - 비동기 처리가 아직 수행되지 않은 상태
// fulfilled - 비동기 처리가 수행된 상태(성공) - resolve 함수 호출
// rejected - 비동기 처리가 수행된 상태(실패) -reject 함수 호출


// Promise 후속처리 메서드 - 프로미스의 비동기 처리 상태가 변화하면 이에 따른 후속처리를 해주어야한다.
// then, catch, finally
// 프로미스의 비동기 처리 상태가 변화하면 상태에 맞게 후속처리 메서드가 선택적으로 호출된다.
// 이때 후속처리 메서드의 콜백함수에 프로미스 처리 결과 인수가 전달된다.
// 모든 후속처리 메서드는 프로미스를 반환하며, 비동기로 동작한다.

//1. Promise.prototype.then **
// 두 개의 콜백함수를 인수로 전달받는다. 
// 하나는 프로미스가 fulfilled상태로 성공했을 때 호출되는 콜백함수, 두번째는 rejected상태로 실패했을 때 호출되는 콜백함수
{
    //fulfilled
    new Promise((resolve, reject) => resolve('filfilled'))
    .then(v => console.log(v), e => console.error(e)); //fulfilled

    //rejected
    new Promise((_,reject) => reject(new Error('rejected')))
    .then(v => console.log(v), e => console.error(e)); //Error : rejected
} 
// then 메서드는 언제나 promise를 반환한다
// then 메서드의 콜백함수가 프로미스를 반환하지 않는다면 암묵적으로 resolve 또는 reject하여 프로미스를 생성해 반환한다.

//2. Promise.prototype.catch
// 한 개의 콜백함수를 인자로 전달받으며, 프로미스가 rejected상태인 경우에만 호출된다.
{
    new Promise((_, reject) => reject(new Error('rejected')))
    .catch(e => console.error(e)); //Error : rejected
}
// then과 마친가지로 언제나 프로미스를 반환한다.

//3. Promise.prototype.finally
// 한 개의 콜백함수를 전달받으며 fulfilled, rejected상태에 관계없이 무조건 한번 호출된다.
// 프로미스 상태에 관계없이 공통적으로 처리해야 할 내용이 있을 때 유용하다.
// then과 마친가지로 언제나 프로미스를 반환한다.
{
    new Promise((resolve) => resolve())
    .finally(() => console.log('finally'));
}

// Promise GET 후속처리
{
    const promiseGet = (url) =>{
        return new Promise((resolve,reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET',url);

            xhr.send();

            xhr.onload = () => {
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.response));
                }
                else{
                    reject(new Error(chr.status));
                }
            }
        })
    }

    promiseGet("https://jsonplaceholder.typicode.com/posts/1")
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => console.log('Bye'));
}





// Promise의 에러처리
// 비동기 처리를 위한 콜백 패턴에서 에러처리가 곤란하다는 문제가 존재했다.
// Promise는 문제없이 에러처리가 가능하다.
{
    const promiseGet = (url) =>{
        return new Promise((resolve,reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET',url);

            xhr.send();

            xhr.onload = () => {
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.response));
                }
                else{
                    reject(new Error(chr.status));
                }
            }
        })
    }

    promiseGet("https://jsonplaceholder.typicode.com/posts/1") 
    .then(res => console.xxx(res))
    .catch(err => console.error(`catch Error ${err}`)) // catch Error TypeError: console.xxx is not a function
}
// then으로 두번째 인수에서 에러를 잡는것보다 catch사용을 권장한다.
// 위의 경우 then()에 두개의 콜백 함수를 전달 했다면 then 내부에서 발생한 에러를 캐치하지 못한다. *
// 뿐만아니라 catch를 사용하는 것이 가독성이 훨씬 좋다.





// Promise 체이닝
// 콜백 패턴의 콜백 헬을 프로미스 체이닝을 통해 구현

// 기존의 콜백 헬
{
    const get = (url,successCallback) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET',url);

        xhr.send();

        xhr.onload = () => { // 네트워크 통신이 완료되면 비동기적으로 실행된다.
            if(xhr.status === 200){
                successCallback(JSON.parse(xhr.response));
            }
            else{
                console.error('Error',xhr.status);
            }
        }
    }

    const url = "https://jsonplaceholder.typicode.com";

    // 콜백 중첩으로 만들어진 콜백 헬
    // id가 1인 post의 userId를 취득
    get(`${url}/posts/1`,({userId}) =>{
        console.log(userId); //1

        //post의 userId를 가지고 user정보를 취득
        get(`${url}/users/${userId}`, userInfo => {
            console.log('콜백 패턴',userInfo); // {id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", address: {…}, …}
        })
    })

}

// 프로미스 체이닝을 통한 개선 *
{
    const promiseGet = (url) =>{
        return new Promise((resolve,reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET',url);

            xhr.send();

            xhr.onload = () => {
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.response));
                }
                else{
                    reject(new Error(chr.status));
                }
            }
        })
    }

    const url = "https://jsonplaceholder.typicode.com";

    promiseGet(`${url}/posts/1`) 
    .then(({userId}) => promiseGet(`${url}/users/${userId}`))
    .then(userInfo => console.log(`Promise 체이닝:`, userInfo)) // {id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", address: {…}, …}
    .catch(err => console.error(`catch Error ${err}`));
}
// then, catch, finally 후속처리 메서드는 언제나 프로미스를 반환하기 때문에 연속적으로 호출이 가능하다 - 이를 프로미스 체이닝이라고 한다.

// async/await을 통해서 마치 동기방식 처럼 코딩이 가능하다
{
    const promiseGet = (url) =>{
        return new Promise((resolve,reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET',url);

            xhr.send();

            xhr.onload = () => {
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.response));
                }
                else{
                    reject(new Error(chr.status));
                }
            }
        })
    }

    const url = "https://jsonplaceholder.typicode.com";

    (async () => {
        const {userId} = await promiseGet(`${url}/posts/1`);

        const userInfo = await promiseGet(`${url}/users/${userId}`);

        console.log('async/await',userInfo);  // {id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", address: {…}, …}
    })();
}




// 프로미스 정적 메서드
// Promise는 주로 생성자 함수로 사용되지만 함수도 객체이므로 메서드를 가질 수 있다
// Promise는 5가지 정적 메서드를 제공한다.

//1. Promise.resolve, Promise.reject
// 이미 존재하는 값을 래핑하여 프로미스를 생성하기 위해 사용한다.
// Promise.resolve - 인수로 전달받은 값을 resolve하는 프로미스를 생성한다.
{
    const resolvePromise = Promise.resolve([1,2,3]);
    resolvePromise.then(console.log); //[1, 2, 3]
}

// Promise.reject - 인수로 전달받은 값을 reject 프로미스를 생성한다.
{
    const resolvePromise = Promise.reject(new Error('Error!'));
    resolvePromise.catch(console.log); //Error: Error!
}

//2. Promise.all - 여러 개의 비동기 처리를 모두 병렬처리할 때 사용한다.
// 순차적인 비동기 처리
{
    const requestData1 = () => {
        return new Promise((resolve,reject) => {
            setTimeout(() => resolve(1),3000);
        })
    }
    const requestData2 = () => {
        return new Promise((resolve,reject) => {
            setTimeout(() => resolve(2),2000);
        })
    }
    const requestData3 = () => {
        return new Promise((resolve,reject) => {
            setTimeout(() => resolve(3),1000);
        })
    }

    // 세 개의 비동기 처리를 순차적으로 처리
    const res=[];

    requestData1()
    .then(data => {
        res.push(data);
        return requestData2();
    })
    .then(data => {
        res.push(data);
        return requestData3();
    })
    .then(data => {
        res.push(data);
        console.log(res); //[1, 2, 3] 총 6초 이상이 소요된다.
        // 세 개의 비동기 처리가 의존적이지 않기 때문에 순차적으로 처리할 필요가 없다.
        // 병렬적으로 처리가 가능하다. - Promise.all
    })
    .catch(console.error);


    // 세 개의 비동기 처리를 병렬적으로 처리
    Promise.all([requestData1(), requestData2(), requestData3()]) //이터러블을 인수로 전달 받는다.
    .then(console.log) //[1, 2, 3] 약 3초의 시간이 소요된다.
    .catch(console.error);

    // Promise.all은 이터러블을 인수로 전달받는다
    // 전달 받은 프로미스가 모두 fulfilled상태가 되면 모든 처리 결과를 배열에 저장하여 새로운 프로미스를 반환한다.
    // 처리순서가 보장된다.
    // ** Promise.all메서드는 인수로 전달받은 프로미스 중 하나라도 reject상태가 되면 나머지를 기다리지 않고 즉시 종료한다. **
    Promise.all([
        new Promise((_,reject) => setTimeout(() => reject(new Error('Error 1 ')),3000)),
        new Promise((_,reject) => setTimeout(() => reject(new Error('Error 2 ')),2000)),
        new Promise((_,reject) => setTimeout(() => reject(new Error('Error 3 ')),1000)),
    ])
    .then(console.log)
    .catch(console.error); //Error: Error 3 - 세 번째 프로미스에서 에러가 발생한 즉시 종료된다


    // Promise.all 메서드는 인수로 전달받은 이터러블의 요소가 프로미스가 아닌 경우 Promise.resolve를 통해 프로미스로 래핑한다
    Promise.all([
        4, // -> Promise.resolve(4)
        5, // -> Promise.resolve(5)
        6  // -> Promise.resolve(6)
    ])
    .then(console.log) //[4, 5, 6]
    .catch(console.error);
}

// Promise.all - 깃허브 아이디로 깃허브 사용자 이름을 취득하는 3개의 비동기 처리를 모두 병렬로 처리하는 예제
{
    const promiseGet = url => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET',url);
            xhr.send();

            xhr.onload = () => {
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.response));
                }
                else{
                    reject(new Error(xhr.status));
                }
            }
        })
    }

    const githubIds = ['jeresig','ahejlsberg','ungmo2'];

    Promise.all(githubIds.map((id) => promiseGet(`https://api.github.com/users/${id}`)))
    .then(users => users.map(user => user.name))
    .then(console.log) //["John Resig", "Anders Hejlsberg", "Ungmo Lee"]
    .catch(console.error);
}


//3. Promise.race - Promise.all과 같이 이터러블을 인자로 받는다
// Promise.all처럼 모든 프로미스들이 fulfilled가 되기를 기다리는 것이 아니라 가장 먼저 fulfilled상태가 되는 프로미스의 처리 결과를 resolve하는 프로미스를 반환한다.
{
    Promise.race([
        new Promise((resolve) => setTimeout(() => resolve(1),3000)),
        new Promise((resolve) => setTimeout(() => resolve(2),2000)),
        new Promise((resolve) => setTimeout(() => resolve(3),1000)),
    ])
    .then(console.log) // 3
    .catch(console.error); 
}
// ** Promise.race메서드는 인수로 전달받은 프로미스 중 하나라도 reject상태가 되면 즉시 종료한다.


//4. Promise.allsettled - 프로미스 이터러블을 인수로 전달받는다
// 전달된 모든 프로미스가 settled상태가 되면 처리 결과를 배열로 반환한다.
{
    Promise.allSettled([
        new Promise((resolve) => setTimeout(() => resolve(2),2000)),
        new Promise((_,reject) => setTimeout(() => reject(new Error('Error! ')),1000)),
    ])
    .then(console.log);
    /*
        0: {status: "fulfilled", value: 2}
        1: {status: "rejected", reason: Error: Error! at http://127.0.0.1:5500/ch45_promise.js:567:59}
        length: 2
    */
}






// 마이크로태스크 큐
{
    setTimeout(() => console.log(1),0);

    Promise.resolve()
    .then(() => console.log(2))
    .then(() => console.log(3));
    // 2 - 3 - 1
    // 프로미스 후속처리 메서드의 콜백함수는 마이크로태스크 큐에 저장된다
    // 마이크로태스크 큐는 태스크큐보다 우선순위가 높다
    // 즉 이벤트루프는 콜스택이 비면 마이크로태스크 큐의 작업을 모두 수행하고 마이크로태스크 큐가 비게되면 그제서야 태스크큐의 작업을 수행한다. *****
}





// fetch
// XMLHttpReauest 객체와 마찬가지로 HTTP요청 전송 기능을 제공하는 WEB API다
// XMLHttpReauest보다 사용법이 간단하고 프로미스를 지원하기 때문에 비동기 처리를 위한 콜백패턴의 단점에서 자유롭다
// 인자로는 1. HTTP요청을 전송할 URL과 2. HTTP요청 메서드, 요청 헤더, 페이로드 등을 설정한 객체를 전달한다.
// HTTP응답을 나타내는 Response객체를 래핑한 Promise객체를 반환한다.
{
    //GET
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => console.log(response)); // Response {type: "cors", url: "https://jsonplaceholder.typicode.com/todos/1", redirected: false, status: 200, ok: true, …}

    // Response.prototype.json - Response객체에서 HTTP응답 몸체(response body)를 취득하여 역직렬화한다.
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    // json은 역직렬화하여 값이 반환된다
    .then(json => console.log(json))  // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
}

//example
{
    const request = {
        get(url){
            return fetch(url);
        },

        post(url, payload){
            return fetch(url,{
                method:'POST',
                headers:{'content-Type': 'application/json'},
                body:JSON.stringify(payload) //직렬화 해서 전송해야함
            });
        },

        patch(url, payload){
            return fetch(url,{
                method:'PATCH',
                headers:{'content-Type': 'application/json'},
                body:JSON.stringify(payload)
            });
        },

        delete(url){
            return fetch(url,{method:'DELETE'});
        },
    }

    // GET 요청
    request.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.json())
    .then(todos => console.log(todos))
    .catch(err => console.error(err));

    // POST 요청
    request.post('https://jsonplaceholder.typicode.com/todos',{
        userId:1,
        title:'HTML',
        complete:true
    })
    .then(res => res.json())
    .then(todos => console.log(todos))
    .catch(err => console.error(err));

    // PATCH 요청
    request.patch('https://jsonplaceholder.typicode.com/todos/1',{
        complete:false
    })
    .then(res => res.json())
    .then(todos => console.log(todos))
    .catch(err => console.error(err));

    //DELETE 요청
    request.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.json())
    .then(todos => console.log(todos))
    .catch(err => console.error(err));
}