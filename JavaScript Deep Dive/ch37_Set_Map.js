/**
 * Set과 Map
 */

//Set - 중복되지 않는 유일한 값들의 집합이다.
// 배열과 유사하지만 차이가 있다
//1. 동일한 요소가 중복되지 못한다.
//2. 요소에는 순서가 없다.
//3. 인덱스로 요소에 접근하지 못한다.

// Set생성자 함수는 이터러블을 인자로 받아 set객체를 만든다. - 중복된 요소는 하나만 포함시킨다.
{
    const set1 = new Set([1,2,3,3]);
    console.log(set1); // Set(3) {1, 2, 3}

    const set2 =new Set("Hello");
    console.log(set2); //Set(4) {"H", "e", "l", "o"}
}

// 중복제거
{
    // 배열의 중복요소 제거
    const uniqArr = array => array.filter((v,i,arr) => arr.indexOf(v) === i);
    console.log(uniqArr([2,1,2,3,4,3,4])); // [2, 1, 3, 4]

    // Set을 이용한 중복제거
    const uniqSet = array => [... new Set(array)];
    console.log(uniqSet([2,1,2,3,4,3,4])) // [2, 1, 3, 4]
}


//요소순회 - Set.prototype.forEach (v,v,set) -> 첫 번째 인수와 두 번째 인수 모두 요소 값이다.
// Set은 요소간의 순서가 존재하지 않으므로 인덱스 값이 없다.
{
    const set = new Set([1,2,3]);

    set.forEach((v1,v2,set) => console.log(v1,v2,set));
    /*
        1 1 Set(3) {1, 2, 3}
        2 2 Set(3) {1, 2, 3}
        3 3 Set(3) {1, 2, 3}
    */
}

//set은 이터러블이다.
{
    const set = [1,2,3];

    console.log(Symbol.iterator in set); //true

    //for ... of
    for(const item of set){
        console.log(item); // 1 2 3
    }

    //스프레드 문법
    console.log([...set]); // [1, 2, 3]

    //디스트럭처링 할당
    const [a,...rest] = set;
    console.log(a,rest); //1 [2, 3]
}

//Set객체는 요소의 순서에 의미를 갖지 않지만 Set객체를 순회하는 순서는 요소가 추가된 순서를 따른다.




//Map - 키와 값의 쌍으로 이루어진 컬렉션이다
// 객체와 유사하지만 차이가 있다.
//1. 키로 사용가능한 값이 일반 객체는 문자열 또는 심벌 값이지만 Map은 객체를 포함한 모든 값을 키로 가질 수 있다.
//2. 이터러블이다

//Map생성자 함수는 이터러블을 인수로 전달받아 Map객체를 생성한다. - 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야한다.
{
    const map1 = new Map([['key1','value1'],['key2','value2']]);
    console.log(map1); // Map(2) {"key1" => "value1", "key2" => "value2"}

    //const map2 = new Map([1,2]); //error Uncaught TypeError: Iterator value 1 is not an entry object
}
// 중복된 키를 갖는요소를 전달하면 값이 덮어쓰여진다. - 중복된 키를 가질 수 없다

//요소 추가 - Map.prototype.set
{
    const map=new Map();
    console.log(map); //Map(0) {}

    map.set('key','value');
    console.log(map); //Map(1) {"key" => "value"}
}

//객체를 키로 사용 가능하다.
{
    const map = new Map();

    const lee = {name:'Lee'};

    map.set(lee,'Lee');
    console.log(map);
    /*
       Map(1) {{…} => "Lee"}
        [[Entries]]
        0: {Object => "Lee"}
        key: {name: "Lee"}
        value: "Lee"
        size: (...)
        __proto__: Map 
    */
}


// 요소순회 - Map.prototype.forEach (value,key,map)
{
    const map = new Map();

    const lee = {name:'Lee'};
    const mark = {name:'mark'};

    map.set(lee,'developer').set(mark,'designer');
    console.log(map); //Map(2) {{…} => "developer", {…} => "designer"}

    map.forEach((v,k,map) => console.log(v,k,map));
    /*
        developer {name: "Lee"} Map(2) {{…} => "developer", {…} => "designer"}
        designer {name: "mark"} Map(2) {{…} => "developer", {…} => "designer"}
    */
}

//Map객체는 이터러블이면서 동시에 이터레이터를 반환하는 메서드를 제공한다
//1. Map.prorotype.keys - Map객체에서 요소키를 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환
//2. Map.prorotype.values - Map객체에서 요소값을 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환
//3. Map.prorotype.entries - Map객체에서 요소키,요소값을 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환
{
    const map = new Map();

    const lee = {name:'Lee'};
    const mark = {name:'mark'};

    map.set(lee,'developer').set(mark,'designer');

    for(const key of map.keys()){
        console.log(key); // {name: "Lee"} {name: "Mark"}
    }

    for(const value of map.values()){
        console.log(value); // developer designer
    }

    for(const entries of map.entries()){
        console.log(entries); // (2) [{…}, "developer"]  [{…}, "designer"]
    }
}
//Map객체는 요소의 순서에 의미를 갖지 않지만 Map객체를 순회하는 순서는 요소가 추가된 순서를 따른다.