{
    /**
     * Type Aliases -> 새로운 타입을 내가 정의해서 사용 할 수 있다.
     */
    type Text=string;
    const name:Text="ejrdnjs";

    type Student={
        name:string,
        age:number,
    };

    const student:Student={
        name:"ejrdnjs",
        age:25,
    };

    /**
     * String Literal Types
     */
    type Name='ejrdnjs';
    const names:Name='ejrdnjs';

}