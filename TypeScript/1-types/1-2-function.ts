{
    /*//JavaScript
    function jsAdd(num1, num2){
        return num1+num2;
    }

    //TypeScript *
    function tsAdd(num1:number, num2:number):number{
        return num1+num2;
    }

    //JavaScript
    function jsFetchNum(id){
        //Code...
        return new Promise((resolve,reject)=>{
            resolve(100);
        });
    }

    //TypeScript *
    function tsFetchNum(id:string):Promise<number>{
        //Code...
        return new Promise((resolve,reject)=>{
            resolve(100);
        });
    }*/

    //JavaScript => TypeScript
    //1. Optional parameter
    function printName(firstName:string , lastName?:string){
        console.log(firstName);
        console.log(lastName); 
    }
    printName("Park","DeokWon");
    printName("Park");

    //Default parameter
    function printMessage(message:string="hello"){
        console.log(message);
    }
    printMessage();

    //Rest parameter
    function addNumbers(...num: number[]):number{
        return num.reduce((a,b)=>{
            console.log(a,b)
            return a+b;
        });
    }
    console.log(addNumbers(1,2,3));
}