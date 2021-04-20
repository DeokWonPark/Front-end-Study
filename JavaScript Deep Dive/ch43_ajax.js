/**
 * Ajax - 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹 페이지를 동적으로 갱신하는 프로그래밍 방식
 * 브라우저가 제공하는 Web API인 XMLHttpRequest 객체를 기반으로 동작한다.
 * 서버로부터 웹 페이지 변경에 필요한 데이터만 비동기적으로 요청하여 전송받아 변경할 필요가 있는 부분만 랜더링
 */

// JSON(JavaScript Object Notation) - 클라이언트와 서버간의 HTTP통신을 위한 텍스트 데이터 포맷 - 언어에 종속적이지 않아 대부분의 프로그래밍 언어에서 사용이 가능하다.
// 객체 리터럴과 유사하게 키와 값으로 구성된 순수한 텍스트이다.

// JSON.stringify - 객체를 JSOM포맷의 문자열로 변환
// 클라이언트에서 서버로 객체를 전송하려면 객체를 문자열화 해야한다. - 이를 직렬화라고 한다.
{
    const obj = {
        name:"Lee",
        age:20,
        alive:true,
        hobby:['traveling', 'tennis']
    };

    // 객체 => JSON
    const json = JSON.stringify(obj);
    console.log(typeof json, json); //string {"name":"Lee","age":20,"alive":true,"hobby":["traveling","tennis"]}

    // 객체를 JSON포맷의 문자열로 변환하면서 들여쓰기
    const prettyJson = JSON.stringify(obj,null,2);
    console.log(prettyJson);
    /*
        {
            "name": "Lee",
            "age": 20,
            "alive": true,
            "hobby": [
              "traveling",
              "tennis"
            ]
        }
    */


    //replacer 함수 - 값 필터링
    function filter(key,value){
        return typeof value === 'number'? undefined : value;
    }

    const filterJson = JSON.stringify(obj,filter,2);
    console.log(filterJson);
    /*
        {
            "name": "Lee",
            "alive": true,
            "hobby": [
              "traveling",
              "tennis"
            ]
        }
    */
}
// 배열도 JSON포맷의 문자열로 변환이 가능하다.
{
    const todos = [
        {id:1, content:"HTML", completed:true},
        {id:2, content:"CSS", completed:true},
        {id:3, content:"JavaScript", completed:false},
    ]

    const json = JSON.stringify(todos,null,2);
    console.log(json);
    /*
        [
            {
              "id": 1,
              "content": "HTML",
              "completed": true
            },
            {
              "id": 2,
              "content": "CSS",
              "completed": true
            },
            {
              "id": 3,
              "content": "JavaScript",
              "completed": false
            }
        ]
    */
}


// JSON.parse - JSON포맷의 문자열을 객체로 변환한다 (역 직렬화)




// XMLHttpRequest - 자바스크립트를 사용하여 HTTP요청을 전송하기 위한 WEB API객체
{
    const xhr = new XMLHttpRequest(); 
}

// HTTP요청 전송
//1. XMLHttpRequest.prototype.open메서드로 HTTP요청을 초기화
//2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader메서드로 특정 HTTP요청의 헤더 값을 설정
//3. XMLHttpRequest.prototype.send메서드로 HTTP 요청을 전송
{
    const xhr = new XMLHttpRequest();

    //HTTP요청 초기화
    xhr.open('GET','/users');

    //HTTP 요청 헤더 설정
    // 클라이언트가 서버로 전송할 데이터의 MIME타입 지정: json
    xhr.setRequestHeader('content-type','application/json');

    //HTTP요청 전송
    //xhr.send();
}

//XMLHttpRequest.prototype.open(method, url, async?)
// method - GET, POST, DELETE, PUT, PATCH => 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법이다.
// url - 요청을 전송 할 URL
// async - 비동기 처리 방식유무, 기본적으로 true(비동기)

//XMLHttpRequest.prototype.send - open메서드로 초기화된 HTTP요청을 서버에 전송
// 서버에 전송되는 데이터는 GET, POST 요청 방식에 따라 차이가 있다.
// GET - 서버로 전송 할 데이터를 url의 일부인 쿼리 스트링에 담아 전송한다.
// POST - 서버로 전송 할 데이터를(페이로드) 요청 몸체(request body)에 담아 전송한다.
{
    const xhr = new XMLHttpRequest(); 
    //request body에 페이로드 담는다 - 페이로드가 객체인 경우 반드시 직렬화를 거쳐 전송해야한다.
    //xhr.send(JSON.stringify({id:1, content:"HTML", completed:true})); //GET 요청방식인 경우 페이로드는 무시되어 null값으로 설정된다.
}

//XMLHttpRequest.prototype.setRequestHeader - 특정 HTTP요청의 헤더를 설정한다.
// 자주사용하는 요청 헤더
//1. Content-type - request body에 담아 전송 할 데이터의 MIME타입의 정보를 표현
//2. Accept - 서버로 부터 응답받을 데이터의 MIME타입을 지정
{
    const xhr = new XMLHttpRequest();

    //HTTP요청 초기화
    xhr.open('POST','/users');

    //HTTP 요청 헤더 설정
    // 클라이언트가 서버로 전송할 데이터의 MIME타입 지정: json
    xhr.setRequestHeader('content-type','application/json');

    // 서버가 응답할 데이터의 MIME타입 지정 : json
    xhr.setRequestHeader('accept', 'application/json');

    //HTTP요청 전송
    //xhr.send(JSON.stringify({id:1, content:"HTML", completed:true}));
}


// HTTP응답 처리
// 서버가 전송한 응답을 처리하려면 XMLHttpRequest객체가 발생시키는 이벤트를 캐치해야한다.
// HTTP요청의 현재 상태를 나타내는 readyState프로퍼티 값이 변경된 경우 발생하는 readystatechange이벤트를 캐치하여 HTTP응답을 처리할 수 있다.
// Fake REST API를 사용하여 서버와 통신하는 예제
{
    const xhr = new XMLHttpRequest();

    //Fake API
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

    xhr.send();

    // HTTP요청의 현재 상태를 나타내는 readyState프로퍼티가 변경 될 때마다 발생하는 이벤트
    xhr.onreadystatechange = () =>{
        //readyState값이 4(XMLHttpRequset.DONE)가 아니면 서버응답이 완료되지 않은 상태
        if(xhr.readyState !== XMLHttpRequest.DONE) return;

        if(xhr.status === 200){
            //success
            console.log(JSON.parse(xhr.response)); // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
        }
        else{
            //error
            console.error(`Error`, xhr.status, xhr.statusText);
        }
    }
}

{
    const xhr = new XMLHttpRequest();

    //Fake API
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

    xhr.send();

    // load이벤트는 HTTP요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
        if(xhr.status === 200){
            //success
            console.log(JSON.parse(xhr.response)); // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
        }
        else{
            //error
            console.error(`Error`, xhr.status, xhr.statusText);
        }
    }
    
}