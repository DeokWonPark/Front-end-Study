/**
 * 정규표현식 - 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식언어이다.
 * 형식언어 - 특정한 법칙들에 따라 적절하게 구성된 문자열의 집합
 * ** 정규표현식은 문자열을 대상으로 패턴 매칭 기능을 제공한다. - 특정 패턴과 일치하는 문자열을 검색하거나 추출 또는 치환 할 수 있는 기능 **
 */

//example - 휴대폰번호 매칭
// [숫자3 - 숫자4 - 숫자4] 패턴
{
    const telFalse = '010-1234-567팔';
    const telTrue = '010-1564-4556';

    //정규표현식
    const regExp = /^\d{3}-\d{4}-\d{4}$/;

    console.log(regExp.test(telFalse)); //false 
    console.log(regExp.test(telTrue)); //true 
}
//정규표현식은 주석이나, 공백을 허용하지 않고 가독성이 좋지 못하다는 단점이 존재한다.



// 정규표현식 생성
// 정규표현식 리터럴사용, RegExp생성자 함수 사용
// 정규표현식 리터럴 - /(시작기호) regExp(패턴) /(종료기호)i(플레그) - 패턴과 플레그로 구성된다.
{
    const target = "Is this all there is?";

    //패턴 : is
    //플레그 : i => 대소문자를 구별하지 않고 검색한다.
    const regExp= /is/i;

    //패턴 매칭 결과
    console.log(regExp.test(target)); //true 
}

// 생성자 함수
{
    const target = "Is this all there is?";

    //패턴 : is
    //플레그 : i => 대소문자를 구별하지 않고 검색한다.
    const regExp= new RegExp(/is/i);

    //패턴 매칭 결과
    console.log(regExp.test(target)); //true 
}



// RegExp 메서드
//1. RegExp.prototype.exec - 잔달받은 문자열에 대해 패턴을 검색하여 매칭결과를 배열로 반환, 없는경우 null
{
    const target = "Is this all there is?";
    const regExp= /is/;

    //패턴 매칭 결과
    console.log(regExp.exec(target)); //["is", index: 5, input: "Is this all there is?", groups: undefined]
    // g 옵션을 지정해도 첫 번째 결과 하나만 반환
}

//2. RegExp.prototype.test - 전달받은 문자열에 대해 패턴을 검색하여 매칭결과를 boolean값으로 반환

//3. String.prototype.match - 대상 문자열과 인자로받은 정규표현식을 매칭하여 결과를 배열로 반환 
{
    const target = "Is this all there is?";
    let regExp= /is/;

    console.log(target.match(regExp)); //["is", index: 5, input: "Is this all there is?", groups: undefined]

    regExp= /is/g; // g => 모든 매칭결과를 반환
    console.log(target.match(regExp)); // ["is", "is"]
}



// 플래그
//1. i (ignore case) => 대소문자를 구별하지 않고 패턴을 검색
//2. g (global) => 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.
//3. m (multi line) => 문자열의 행이 바뀌더라도 패턴 검색을 계속한다.

//순서와 상관없이 하나이상의 플래그 동시 설정 가능
{
    const target = "Is this all there is?";

    console.log(target.match(/is/)); //["is", index: 5, input: "Is this all there is?", groups: undefined]

    console.log(target.match(/is/i)); //["Is", index: 0, input: "Is this all there is?", groups: undefined]

    console.log(target.match(/is/g)); //["is", "is"]

    console.log(target.match(/is/ig)); //["Is", "is", "is"]
}



// 패턴
//1. 문자열 검색 - 플래그 예제와 동일

//2. 임의의 문자열 검색
// .은 문자 한 개를 의미 -어떤 문자건 상관없다.
{
    const target = "Is this all there is?";

    //임의의 3자리 문자열을 대소문자 구별하여 전역 검색한다.
    const regExp = /.../g;

    console.log(target.match(regExp)); //["Is ", "thi", "s a", "ll ", "the", "re ", "is?"]
}

//3. 반복 검색
// 앞선 패턴이 {m,n} 최소 m번 최대 n번 반복되는 문자열
{
    const target = "A AA B BB Aa Bb AAA";

    // 'A'가 최소 1번 최대 2번 반복되는 문자열을 전역 검색한다.
    const regExp = /A{1,2}/g;

    console.log(target.match(regExp));
}

//{n} 패턴이 n번 반복되는 문자열
{
    const target = "A AA B BB Aa Bb AAA ACC";

    // 'C'가 2번 반복되는 문자열을 전역 검색한다.
    const regExp = /AC{2}/g;

    console.log(target.match(regExp)); //["ACC"]
}

//{n,} 패턴이 최소 n번 반복되는 문자열
{
    const target = "A AA B BB Aa Bb AAA";

    // 'A'가 최소 2번 반복되는 문자열을 전역 검색한다.
    const regExp = /A{2,}/g;

    console.log(target.match(regExp)); //["AA", "AAA"]
}

// + 앞선 패턴이 최소 한 번이상 반복되는 문자열 {1,}와 같다
{
    const target = "A AA B BB Aa Bb AAA";

    // 'A'가 최소 1번이상 반복되는 문자열을 전역 검색한다.
    const regExp = /A+/g;

    console.log(target.match(regExp)); //["A", "AA", "A", "AAA"]
}

// ? 앞선 패턴이 최대 한 번 반복되는 문자열 {0,1}과 동일
{
    const target = "color colour";

    const regExp = /colou?r/g;

    console.log(target.match(regExp)); //["color", "colour"]
}


//4. OR 검색
// /A|B/ => A 또는 B
{
    const target = 'A AA B BB Aa Bb';

    // A또는 B를 전역 검색한다.
    const regExp=/A|B/g;

    console.log(target.match(regExp)); //["A", "A", "A", "B", "B", "B", "A", "B"]
}

// +와 | 함께 사용
{
    const target = 'A AA B BB Aa Bb';

    // A또는 B가 한 번이상 반복되는 문자열을 전역 검색한다.
    const regExp=/A+|B+/g;

    console.log(target.match(regExp)); //["A", "AA", "B", "BB", "A", "B"]
}
// 동일한 표현 []내의 문자는 OR로 동작한다.
{
    const target = 'A AA B BB Aa Bb AB AAB';

    // A또는 B가 한 번이상 반복되는 문자열을 전역 검색한다.
    const regExp=/[AB]+/g;

    console.log(target.match(regExp)); //["A", "AA", "B", "BB", "A", "B", "AB", "AAB"]
}

// 범위를 지정하려면 []내에 -를 사용한다.
{
    const target = 'A AA BB ZZ Aa Bb';

    // A ~ Z가 한 번이상 반복되는 문자열을 전역검색
    const regExp=/[A-Z]+/g;

    console.log(target.match(regExp)); //["A", "AA", "BB", "ZZ", "A", "B"]
}

// 대소문자를 구별하지 않고 알파벳을 검색하는 방법
{
    const target = 'A AA BB ZZ Aa 12';

    const regExp=/[A-Za-z]+/g;

    console.log(target.match(regExp)); //["A", "AA", "BB", "ZZ", "Aa"]
}

//숫자를 검색하는 방법
{
    const target = "AA BB 12,345";

    const regExp = /[0-9]+/g;

    console.log(target.match(regExp)); // ["12", "345"]
}

//숫자를 검색하는 방법 ,포함
{
    const target = "AA BB 12,345";

    const regExp = /[0-9,]+/g;

    console.log(target.match(regExp)); // ["12,345"]
}

// 동일한 표현 \d는 숫자를 의미 , \D는 반대 즉 숫자가 아닌 문자를 의미
{
    const target = "AA BB 12,345";

    let regExp = /[\d,]+/g;

    console.log(target.match(regExp)); // ["12,345"]

    regExp = /[\D,]+/g;

    console.log(target.match(regExp)); //["AA BB ", ","]
}

// \w은 알파벳, 숫자, 언더스코어를 의미 즉 \w는 [A-Za-z0-9_]와 같다, \W는 \w와 반대로 동작한다.
{
    const target = 'Aa Bb 12,345 _$%&';

    let regExp = /[\w,]+/g;
    console.log(target.match(regExp)); //["Aa", "Bb", "12,345", "_"]

    regExp = /[\W,]+/g;
    console.log(target.match(regExp)); //[" ", " ", ",", " ", "$%&"]
}


//5. NOT 검색
//[...]내의 ^는 not과 같다 /d는 [0-9]와 같고, /D는 [^0-9]와 같다.
{
    const target = "AA BB 12,345";

    let regExp = /[^0-9]+/g;

    console.log(target.match(regExp)); // ["AA BB ", ","]
}

//6. 시작 위치로 검색
// [...]밖의 ^은 문자열의 시작을 의미한다.
{
    const target = 'https://www.youtube.com/';

    const regExp = /^https/;
    console.log(regExp.test(target)) //true
}

//7. 마지막 위치로 검색
// $은 문자열의 마지막을 의미한다.
{
    const target = 'https://www.youtube.com';

    const regExp = /com$/;
    console.log(regExp.test(target)) //true
}



// 자주사용하는 정규표현식
//1. 특정단어로 시작하는지 검사
// http:// 또는 https://로 시작하는지 검사
{
    const url = 'https://www.youtube.com';
    const regExp = /^https?:\/\//;
    console.log(regExp.test(url)); //true
}

//2. 특정 단어로 끝나는지 검사
// 검색 대상이 html로 끝나는지 검사
{
    const file = "index.html";
    const regExp = /html$/;
    console.log(regExp.test(file)); //true
}

//3. 숫자로만 이루어진 문자열인지 검사
{
    const num = "12345";
    const regExp = /^\d+$/;
    console.log(regExp.test(num)); //true
}

//4. 하나이상의 공백으로 시작하는지 검사
// \s는 여러가지 공백 문자를 의미한다. [\t \r \n \v \f]
{
    const target = " Hi";
    const regExp = /^[\s]+/;
    console.log(regExp.test(target)); //true
}

//5. 아이디로 사용가능한지 검사
// 검색 대상 문자열이 알파벳 대소문자 또는 숫자로 시작하고 끝나고 4 ~ 10자리 인지 검사
{
    const id = 'abc123';
    const regExp = /^[A-Za-z0-9]{4,10}$/;
    console.log(regExp.test(id)); //true
}

//6. 메일주소 형식에 맞는지 검사
// *는 0번이상 반복을 의미한다. , + -> 1번이상 반복
{
    const email = "ejrdnjs8@gmail.com";
    const regExp = /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*\.[a-zA-Z]{2,3}$/;
    console.log(regExp.test(email)); //true
}

//7. 특수문자 포함여부 검사
{
    let target = "abc#123";
    const regExp = /[^a-zA-Z0-9]/gi;
    console.log(regExp.test(target)); //true

    //특수문자 제거
    target = target.replace(regExp,'');
    console.log(target) //abc123
}
