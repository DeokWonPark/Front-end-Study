{
    // Array
    const fruits:string[]=["apple","tomato"];
    const score:Array<number>=[1,2,3];
    function printArray(fruits: readonly string[]){
        //readonly값 변경 불가능
    }

    //Tuple - 서로 다른 타입의 데이터를 담을 수 있다. (권장x) -> interface, type alias, class로 대체해서 사용하는 것이 좋다.
    let student:[string,number];
    student=['name',123];
    student[0] //name
    student[1] //123
    const [name,age]=student;
}