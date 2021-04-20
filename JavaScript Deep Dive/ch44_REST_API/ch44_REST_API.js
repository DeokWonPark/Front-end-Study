/**
 * REST API *
 * 발표당시 웹이 HTTP를 제대로 사용하지 못하고 있는 상황을 보고 HTTP의 장점을 최대한 활용할 수 있는 아키텍처로 REST를 소개하였다
 * 이것은 HTTP프로토콜을 의도에 맞게 디자인 하도록 유도하고있다.
 * REST의 기본원칙을 성실히 지킨 서비스 디자인을 RESTful 이라고 표현한다.
 * REST는 HTTP를 기반으로 클라이언트가 리소스에 접근하는 방식을 규정한 아키텍처이다 ***
 * REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미한다. ***
 */


//REST API구성
//1. 자원 - URI
//2. 행위 - HTTP Method
//3. 표현 - 주고받을 데이터(페이로드)


//REST API 설계원칙 - URI는 리소스를 표현하는데 집중, 행위에 대한 정의는 HTTP요청 메서드를 통해 하는 것
//1. URI는 리소스를 표현해야한다. (식별할 수 있는 이름은 동사보다 명사를 사용)
//bad
// GET /getTodos/1
//GET /todos/show/1

//good
//GET /todos/1


//2. 리소스에 대한 행위는 HTTP요청 메서드로 표현한다.
// HTTP요청 메서드는 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법이다.
// 주로 5가지 메서드로 CRUD를 구현한다.(GET, POST, PUT, PATCH, DELETE)




// JSON Server를 이용한 REST API실습
// JSON Server - json파일을 사용하여 가상 REST API서버를 구축 할 수 있는 툴

