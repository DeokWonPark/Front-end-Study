{
   /**
    * [ Javascript ]
    * Primitive Type: number, string boolean bigint, symbol, null, undefined
    * Object Type: func , array .....
    */

    // number
    const num:number=10 //only number

    //String
    const srt:string="hello";

    //boolean
    const boal:boolean=false;

    //undefined - 값이 있는지 없는지 아무것도 결정되지 않은 타입
    let name:undefined; // X
    let age:number | undefined // | - OR
    age=undefined;
    age=1;

    function find():number | undefined{
        return 1; //or undefined
    }

    //null - 정확하게 비어있음을 알려주는 타입
    let person:null | string;
    person=null;
    person="hello";


    //unknown - 어떤 종류의 데이터가 담길지 알 수가 없는 (권장x)
    let notSure:unknown=0;
    notSure="sad";
    notSure=false;

    //any - 어떤 것이든 담길 수 있는 타입 (권장x)
    let anything:any=0;
    anything="hello";

    // void
    function print():void{
        console.log("hello");
        return;
    }

    //never - 리턴되지 않는 함수
    function throwError(message:string):never{
        //message -> server(log)
        throw new Error(message);
    }
    
    //object (권장x)
    let obj:object;
    function acceptSomeObject(obj:object){

    }
    acceptSomeObject({name:"ellie"})
}