/**
 * Number - 표준 빌트인 객체
 * 원시타입인 숫자를 다룰 때 유용한 프로퍼티와 메서드를 제공한다.
 */

//Number 생성자 함수
{
    const numObj = new Number();
    console.log(numObj); //Number {0} [[PrimitiveValue]]:0 - Number내부 슬롯에 0을 할당
}

//new 없이 Number()호출 - 인스턴스가 아닌 숫자 반환
{
    console.log(Number('10.5')) //10.5
}


//Number 프로퍼티
//1. Number.EPSILON - 엄청나게 작은 수 - 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용된다.
//2. Number.MAX_VALUE - 자바스크립트에서 표현 가능한 가장 큰 양수
//3. Number.MIN_VALUE - 자바스크립트에서 표현 가능한 가장 작은 양수
//4. Number.MAX_SAFE_INTEGER - 자바스크립트에서 안전하게 표현 가능한 가장 큰 정수
//5. Number.MIN_SAFE_INTEGER - 자바스크립트에서 안전하게 표현 가능한 가장 작은 정수
//6. Number.POSITIVE_INFINITY - 양의 무한대를 나타내는 숫자값
//7. Number.NEGATIVE_INFINITY - 음의 무한대를 나타내는 숫자값
//8. Number.NaN


// Number 메서드
//1. Number.isFinite - 전달된 인수가 무한대라면 false반환, 숫자가 아닌 인수는 무조건 false
//2. Number.isInteger - 전달된 인수가 정수인지 확인  - 타입변환 수행 x
//3. Number.isNaN - 전달된 인수가 NaN인지 확인  - 타입변환 수행 x
//4. Number.isSafeInteger - ES6 전달된 인수가 [ -(253-1) ~ 253-1 ]사이의 정수값인지 확인  - 타입변환 수행 x
//5. Number.prototype.toExponential - 숫자를 지수표기법으로 변환한 문자열을 반환
//6. Number.prototype.toFixed - 숫자를 반올림하여 문자열로 반환 (인자로 소숫점이하 자리수 지정)
//7. Number.prototype.toString() - 숫자를 문자열로 변환하여 반환 (인자로 진법을 지정 - 기본값 10진수) **
console.log((16).toString(2)); //10000 - 이진수로 변환