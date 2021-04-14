/**
 * 7번째 데이터 타입 Symbol
 * Symbol은 ES6에서 도입된 7번째 데이터 타입으로 변경 불가능한 원시타입 값이다.
 * 다른 값과 중복되지 않는 유일한 값이다.
 * 따라서 이름 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용한다. **
 * 프로퍼티 키로 사용 할 수 있는 값은 빈 문자열을 포함한 문자열 또는 Symbol값이다.
 */

//Symbol 함수
// 심벌 값은 Symbol함수를 호출하여 생성한다.
//생성된 심벌 값은 외부로 노출되지 않아 확인 할 수 없으며, 다른 값과 절대로 중복 될 수 없는 유일한 값이다. **
{
    const mySymbol = Symbol();
    console.log(typeof mySymbol); //symbol

    console.log(mySymbol); //Symbol() -> 심벌 값은 외부로 노출되지 않아 확인할 수 없다.
} 

// Symbol()에는 인자로 문자열을 전달 할 수 있다 - 심벌 값에 대한 설명용도로만 사용하며 생성되는 값에는 전혀 영향을 미치지 않는다
// 같은 인자로 생성한 심벌값이라도 전혀 다른 심벌 값을 가지며 유일한 값이다.
{
    const mySymbol1 = Symbol("mySymbol");
    const mySymbol2 = Symbol("mySymbol");
    
    console.log(mySymbol1 === mySymbol2); //false
}

// 심벌 값도 숫자와 불리언 타입과 같이 객체처럼 접근하면 암묵적으로 래퍼객체를 생성한다.
{
    const mySymbol = Symbol("mySymbol");
    console.log(mySymbol.description); //mySymbol
    console.log(mySymbol.toString()); //Symbol(mySymbol)
}

// 심벌 값은 암묵적으로 숫자나 문자열타입으로 변환되지 않는다.
// 단 불리언 타입으로는 암묵적으로 타입 변환된다.
{
    const mySymbol = Symbol();

    // console.log(mySymbol+1) error
    console.log(!!mySymbol) //true - boolean타입으로 암묵적 변환
}


// Symbol.for / Symbol.keyFor 메서드
// Symbol.for - 인수에 전달된 문자열을 키로 사용하여 키와 심벌 값의 쌍들이 저장되어있는 전역 심벌레지스트리에서 키와 일치하는 심벌 값을 찾는다.
// 검색에 성공하면 심벌 값 반환
// 실패하면 새로운 심벌 값을 생성하여 전역 심벌 레지스트리에 저장 후 심벌값 반환
{
    const s1 = Symbol.for('mySymbol');
    const s2 = Symbol.for('mySymbol');

    console.log(s1 === s2); //true
}
// Symbol함수는 호출 될 때마다 유일무이한 값을 생성한다 - 심벌 값을 검색 할 수있는 키를 지정 할 수 없으므로 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
// Symbol.for메서드를 사용하면 전역에서 중복되지 않는 유일한 값을 만들어 전역 심벌 레지스트리를 통해 공유할 수 있다.
// Symbol.keyFor메서드를 사용하면 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.
{
    const s1 = Symbol.for('mySymbol');

    // 전역 심벌 레지스트리에 저장된 심벌값의 키를 추출
    console.log(Symbol.keyFor(s1)); //mySymbol

    // Symbol함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
    const s2 = Symbol('foo');
    console.log(Symbol.keyFor(s2)); //undefined

}



// 심벌과 상수
// 4방향 동서남북을 나타내는 상수를 정의
{
    const Direction={
        UP:1,
        Down:2,
        left:3,
        right:4,
    };

    const myDirection = Direction.UP;

    if(myDirection === Direction.UP){
        console.log('You are Going UP');
    }
}
// 위의 경우 값에는 의미가 없고 상수 이름 자체에 의미가 있다.
// 문제는 상수 값 1, 2, 3, 4가 변경될 수 있으며 중복 될 수 있다는 것이다.

// 따라서 중복이 가능한 무의미한 상수 대신 유일무이하고 의미가 있는 심벌 값을 사용
{
    const Direction={
        UP:Symbol('up'),
        Down:Symbol('down'),
        left:Symbol('left'),
        right:Symbol('right'),
    };

    const myDirection = Direction.UP;

    if(myDirection === Direction.UP){
        console.log('You are Going UP');
    }
}



// 심벌과 프로퍼티 키
// 객체의 프로퍼티 키는 빈 문자열을 포함한 모든 문자열 또는 심벌 값으로 만들 수 있다.
{
    //심벌 값은 유일한 값이므로 다른 프로퍼티 키와 충돌할 우려가 없다
    const obj = {
        [Symbol.for('mySymbol')] :1,
    }
    console.log(obj[Symbol.for('mySymbol')]); //1
}


// 심벌과 프로퍼티 은닉
//심벌 값을 프로퍼티 키로 사용하여 생성한 객체의 프로퍼티는 for ..in, Object.keys, getOwnProprtyNames메서드로는 찾을 수 없다
// 이처럼 외부에 노출할 필요가 없는 프로퍼티를 은닉할 수 있다.
{
    const obj = {
        [Symbol.for('mySymbol')] : 3,
    }

    for(let key in obj){ //출력 x
        console.log(key);
    }

    console.log(Object.keys(obj)); //[]
    console.log(Object.getOwnPropertyNames(obj)); //[]
}

//ES6에 도입된 Object.getOwnPropertySymbols메서드를 이용하면 찾을 수 있다.
{
    const obj = {
        [Symbol.for('mySymbol')] : 3,
    }

    console.log(Object.getOwnPropertySymbols(obj)); //[Symbol(mySymbol)]
    const key = Object.getOwnPropertySymbols(obj)[0];
    console.log(obj[key]); //3
}

// 심벌과 표준 빌트인 객체 확장
//일반적으로 표준 빌트인 객체에 사용자 정의 메서드를 직접 추가하는 것은 권장하지 않는다
// 개발자가 직접 추가한 메서드가 이후 표준사양으로 추가 될 메서드의 프로퍼티 키 이름과 중복 될 수도 있기 때문이다
// 중복될 가능성이 없는 심벌 값으로 키를 생성하여 추가하면 충돌 위험이 없다.
{
    Array.prototype[Symbol.for('sum')] = function(){
        return this.reduce((acc,cur) => acc+cur, 0);
    };
    const result = [1,2][Symbol.for('sum')]();
    console.log(result); //3
}

