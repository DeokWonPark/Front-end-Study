/**
 * String 표준 빌트인 객체
 */

//String 생성자 함수를 통한 객체생성
{
    // 생성자 함수에 인자로 문자열을 전달하며 new 키워드로 호출하면 [[StringData]]내부 슬롯에 인자를 할당한 String래퍼객체가 생성된다.
    const strObj = new String('Hello');
    console.log(strObj);
    /*
        String {"Hello"}
        0: "H"
        1: "e"
        2: "l"
        3: "l"
        4: "o"
        length: 5
        __proto__: String
        [[PrimitiveValue]]: "Hello"
    */
   // String 래퍼객체는 배열과 마찬가지로 length프로퍼티를 가지며 인덱스를 키로 긱 문자를 값으로 가지는 유사 배열 객체이면서 이터러블이다. **
   console.log(strObj[0]) // H => 인덱스로 각 문자에 접근할 수 있다.

   //문자열은 원시값으로 값 자체를 변경 할 수 없다
   strObj[0]='S';
   console.log(strObj); //Hello
}

// new연산자를 사용하지 않고 호출하면 String 인스턴스가 아닌 문자열을 반환한다.
{
    String(1) //"1"
    String(NaN) //"NaN"
}



//String 메서드
//String 메서드는 원본 String 객체를 직접 변경하는 메서드는 없다. 항상 새로운 문자열을 반환한다.
//1. String.prototype.indexOf - 대상 문자열에서 인자로 전달받은 문자열을 검색해서 첫 번째 인덱스를 반환, 없으면 -1
{
    const str = 'Hello World';
    console.log(str.indexOf('or')); // 7
}

//2. String.prototype.search - 대상 문자열에서 인자로 전달된 정규표현식과 매치하는 문자열의 인덱스 반환, 실패시 -1
{
    const str = 'Hello World';
    console.log(str.search(/o/)); // 4
}

//3. String.prototype.includes - ES6 대상 문자열에서 인자로 전달된 문자열이 포함되어 있는지 검사 true/false

//4. String.prototype.startsWith - ES6 대상 문자열에서 인자로 전달된 문자열로 시작하는지 검사 true/false
{
    const str = 'Hello World';
    console.log(str.startsWith('He')); // true
}

//5. String.prototype.endsWith - ES6 대상 문자열에서 인자로 전달된 문자열로 끝나는지 검사 true/false

//6. String.prototype.charAt = 대상 문자열에서 전달받은 인덱스의 문자를 반환 - 범위를 벗어난 경우 빈 문자열 반환

//7. String.prototype.subString(start,end) - start ~ end-1까지 문자열을 반환
// 첫 번째 인수가 두 번째 인수보다 크면 두 인수는 교환되어 동작한다.
// 인수 < 0 or NaN인 경우 0으로 취급
// 인수 > length인 경우 인수는 length로 취급된다.

//8. String.prototype.slice - subString메서드와 동일하게 동작한다. 단 음수 인수를 전달 가능하다.

//9. String.prototype.toUpperCase - 문자열을 모두 대문자로 변환하여 반환

//10. String.prototype.toLowerCase - 문자열을 모두 소문자로 변환하여 반환

//11. String.prototype.trim - 대상 문자열 앞뒤에 공백문자가 있을경우 이를 제거한 문자열을 반환한다.
{
    const str = "   foo     ";
    console.log(str.trim()); //foo
    console.log(str.trimStart()); //foo
    console.log(str.trimEnd()); //  foo
}

//12. String.prototype.repeat - ES6 인수로 전달받은 정수만큼 반복하여 연결한 문자열 반환
{
    const str = 'abc';

    console.log(str.repeat()); //''
    console.log(str.repeat(1)); //'abc'
    console.log(str.repeat(3)); //'abcabcabc'
}

//13. String.prototype.replace - 대상 문자열에서 첫 번째 인수로 전달받은 문자열 or 정규표현식을 검색하여 두 번째 인수로 치환한 문자열을 반환
{
    let str = 'Hello world world';

    str = str.replace('world','Lee');
    console.log(str); //Hello Lee world -> 첫 번째만 교체

    //특수한 교체패턴을 사용할 수 있다.
    // $&는 검색된 문자열을 의미한다. - 교체패턴의 자세한 설명은 MDN문서 참고
    console.log(str.replace('world','<strong>$&</strong>')); // Hello Lee <strong>world</strong>

    //첫 번째 인자로 정규표현식 전달
    str = "Hello Hello";
    console.log(str.replace(/hello/i,"Lee"));
}
//두 번째 인수로 치환함수를 전달할 수 있다.
// 카멜 케이스 -> 스네이크 케이스
{
    function camelToSnake(camelcase){
        return camelcase.replace(/.[A-Z]/g, match => {
            console.log(match); //oW
            return match[0]+'_'+match[1].toLowerCase();
        })
    }

    const camelCase = "helloWorld";
    console.log(camelToSnake(camelCase)); //hello_world
}

//14. String.prototype.split - 전달한 인수의 문자열 또는 정규표현식을 가지고 문자열을 나눠 배열로 반환한다.
{
    const str = "How are you doing?";

    console.log(str.split(' ')); //["How", "are", "you", "doing?"]
    console.log(str.split(/\s/)); //["How", "are", "you", "doing?"]
    console.log(str.split('')); //["H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", " ", "d", "o", "i", "n", "g", "?"]

    //역순 뒤집기
    console.log(str.split('').reverse().join(''));
}

