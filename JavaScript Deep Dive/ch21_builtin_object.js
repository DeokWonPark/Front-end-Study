/**
 * 빌트인 객체
 */

//자바스크립트 객체의 분류
//1. 표준 빌트인 객체 - ECMAScript 사양에 정의된 객체
// 자바스크립트 실행환경에 관계없이 언제나 사용가능 - 전역객체의 프로퍼티로 제공된다.

//2. 호스트 객체 - 자바스크립트 실행환경에서 추가로 제공하는 객체
// DOM,BOM,Canvas,Featch와 같은 Web APIs

//3. 사용자 정의 객체



//원시값과 래퍼객체
// - 문자열이나, 숫자, boolean 등의 원시값이 있는데 문자열이나 숫자등 객체를 생성하는 Number,String,Boolean 표준 빌트인 생성자 함수가 존재하는 이유는 ??
{
    const str="Hello";

    // 원시 타입 문자열이 프로퍼티와 메서드를 가진 객체 처럼 동작한다 !
    //- 자바스크립트 엔진이 일시적으로 원시값을 연관된 객체로 변환해주기 때문이다.
    console.log(str.length);
    console.log(str.toUpperCase());
}
// 이처럼 원시값에 대해서 객체처럼 사용하면 생성되는 임시 객체를 래퍼객체라고 한다. **

// 래퍼 객체의 처리가 종료되면 다시 원시값으로 되돌리고, 래퍼객체는 가비지 컬렉션의 대상이된다.

//문자열, 숫자, 불리언, 심벌 이외의 numm,undefined는 래퍼객체를 생성하지 않는다.



//전역객체 - 코드가 실행되기 이전 자바스크립트 엔진에 의해 가장 먼저 생성되는 특수한 객체
//전역객체는 표준 빌트인 객체와 환경에따른 호스트객체(Web APIs), var키워드로 선언한 전역변수, 전역함수를 프로퍼티로 갖는다.
{
    var foo=1;
    console.log(window.foo); //1

    var baz=function(){
        return 3;
    }
    console.log(window.baz());
}
// ** let이나,const 키워드로 선언한 전역변수는 전역객체의 프로퍼티가 아니다. - 보이지 않는 개념적인 블록내에 존재하게 된다.
{
    let fooz=10;
    console.log(window.fooz); //undefined
}

// 브라우저 환경의 모든 자바스크립트 코드는 하나의 전역객체를 공유한다.



// 전역객체의 몇가지 프로퍼티와 메서드
//1. 빌트인 전역프로퍼티
//Infinity, NaN, undefined

//2. 빌트인 전역함수

//eval() - 안씀
{
    // 자바스크립트 코드를 문자열 혈태로 받는다.
    // 표현식이라면 런타임에 값을 반환
    // 문이라면 런타임에 실행

    eval('1+2;');
    eval('var x=10;');
    console.log(x); //10
}

//isFinite - 무한대검사, isNaN
//parseFloat, parseInt

//encodeURI, decodeURI - 완전한 URI를 문자열로 전달받아 이스케이프처리를 위해 인코딩한다.
//인코딩 - URI문자들을 이스케이프처리 하는 것
//이스케이프 처리 - 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자셋으로 변환 하는 것
// URI표준에 따르면 URL은 아스키 문자셋으로만 구성되어야하며, 한글을 포함한 대부분의 외국어를 포함 할 수 없다.
{
    const uri='https://example.com?name=박덕원&job=programmer&teacher';
    const enc=encodeURI(uri);
    const dec=decodeURI(enc);
    console.log(`ori: ${uri}`);
    console.log(`encoded: ${enc}`);
    console.log(`decoded: ${dec}`)
}
//encodeURIComponent, decodeURIComponent -  URI 구성요소를 문자열로 전달받아 이스케이프처리를 위해 인코딩한다.
// 쿼리스트링의 일부로 간주하여 &,=,?까지 인코딩한다.


//전역변수는 delete로 삭제하지 못한다.