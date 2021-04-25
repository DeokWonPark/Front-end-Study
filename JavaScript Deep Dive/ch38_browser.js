/**
 * 브라우저 랜더링 과정
 * 브라우저 환경을 고려할 때 더 효율적인 클라이언트 사이드 자바스크립트 프로그래밍이 가능해진다.
 */

//브라우저 랜더링 과정 **
//1. 브라우저는 HTML,CSS,JS,Imgae등 필요한 리소스파일을 서버에 요청하고 응답을 받는다.
//2. 서버로 부터 받은 HTML파일을 파싱하여 DOM을 만들고, CSS파일을 파싱하여 CSSOM을 만든다 - 이를 결합하여 랜더 트리를 생성한다.
//3. 브라우저의 자바스크립트 엔진은 서버로 부터 받은 자바스크립트를 파싱하여 AST를 생성하고 바이트코드로 변환하여 실행한다
// 이때 DOM API를 통해 DOM이나 CSSOM이 변경될 수 있다. 변경된 DOM,CSSOM은 다시 랜더 트리로 결합된다.
//4. 랜더 트리를 기반으로 HTML요소의 레이아웃을 계산하고 화면에 그린다.


//HTTP - 웹에서 브라우저와 서버가 통신하기위한 프로토콜(규약)
// HTTP1.1 과 HTTP2.0의 차이
// HTTP1.1은 커넥션당 하나의 요청과 응답만을 처리가 가능하다. - HTML내의 리소스 처리를 개별적으로 처리해야한다.
// HTTP.2.0은 커넥션당 다수의 요청과 응답이 가능하다 - HTTP1.1에 비해 페이지 로드 속도가 약 50% 빠르다고 알려져있다.


//HTML 파싱과 DOM생성
// 서버의 HTML파일이 브라우저의 요청에 의해 응답된다
// 브라우저는 서버가 응답한 HTML파일을 2진수 바이트형태로 응답받는다.
// 바이트 형태의 HTML문서는 지정된 인코딩방식(UTF-8)을 기준으로 문자열로 변환된다.
// 문자열로 변환된 HTML문서를 읽어 문법적의미를 갖는 토큰으로 분해한다.
// 각 토큰들을 객체로 변환하여 노드들을 생성한다.
// HTML요소간의 부자 관계를 반영하여 트리 구조로 구성한다 
// 이렇게 노드들을 트리 구조로 구성한 것을 DOM이라고 한다.
// 즉 DOM은 HTML문서를 파싱한 결과물이다.
// DOM은 문서의 구조 정보 뿐만아니라 HTML요소와 스타일 등을 변경할 수 있는 프로그래밍 인터페이스로서 DOM API를 제공한다.


// CSS파싱과 CSSOM생성
// 렌더링 엔진은 HTML을 처음부터 한 줄씩 파싱하여 DOM을 생성해 나간다.
// DOM생성중 CSS를 로드하는 link나 style태그를 만나면 DOM생성을 일시 중지하고 CSS파일을 서버에 요청하여 HTML과 동일한 파싱과정(바이트 - 문자 - 토큰 - 노드 - CSSOM)을 거쳐 CSSOM을 생성한다.
// CSS파싱을 완료하면 다시 이어서 DOM을 생성해 나간다.
// CSSOM은 CSS의 상속을 반영하여 생성


// 랜더 트리 생성
// DOM과 CSSOM은 렌더링을 위해 렌더트리로 결합된다
// 랜더트리는 브라우저 화면에 랜더링되지 않는 노드, CSS에 의해 표시되지 않는 노드들은 포함되지 않는다 - 즉 브라우저 화면에 랜더링 되는 노드만으로 구성된다.
// 완성된 랜더 트리는 이후에 Layout작업과 paint작업을 진행한다.
// 렌더 트리의 요소에 변화가 생겼을 때 layout계산과 리페인팅 작업이 재차 실행될 수 있다.
// 변화가 생기는 경우
// 뷰포트 크기변경, 자바스크립트에 의한 노드 추가 및 제거, HTML요소의 크기변경
// 이러한 레이아웃 계산과 리페인팅 작업은 비용이 많이 드는 작업이다 따라서 빈번하게 발생하지 않도록 주의가 필요하다.


//자바스크립트의 파싱과 실행
// DOM생성 중 script태그를 만나면 일시 중지하고 서버로부터 JavaScript코드를 받아온다.
// 자바스크립트 코드를 파싱하기위해 브라우저엔진은 자바스크립트 엔진에 제어권을 넘긴다.
// 자바스크립트 엔진은 자바스크립트 코드를 파싱하여 CPU가 이해가능한 저수준의 언어로 변환하고 실행한다.
// 자바스크립트 엔진 - V8, SpiderMonkey, JavaScriptCore ...
// 자바스크립트 -> 토크나이징 -> 파싱(AST생성) -> 바이트코드로 변환 -> 실행



// script태그의 async/defer
// 자바스크립트 파싱에 의한 DOM생성 중단 문제를 해결하기 위한 어트리뷰트
// HTML파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다.

// 676p 그림 38-15참고
//1. async - HTML파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다.
// 자바스크립트의 파싱과 실행은 자바스크립트 파일로드가 완료되는 직후에 진행된다. - 이때 HTML파싱은 중단된다.
// 어러개의 script태그 지정시에 순서가 보장되지 않고 로드가 완료되는 순으로 실행된다.

//2. defer - HTML파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다.
// 자바스크립트의 파싱과 실행은 HTML파싱이 완료된 직후 실행된다.
// DOM생성이 완료되고 실행되어야 할 자바스크립트에 유용하다.