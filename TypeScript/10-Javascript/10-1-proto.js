/**
 * 상속을 위해 사용
 */

const a={};
console.log(a);
const b=[];
console.log(b);

function CoffeeMachine(beans){
    this.beans=beans;
    //Instance member level
    // this.makeCoffee=()=>{
    //     console.log('making');
    // }
}

// Prototype Member level
CoffeeMachine.prototype.makeCoffee=()=>{
    console.log('making');
}


const machine=new CoffeeMachine(10);
console.log(machine);



function LatteMachine(milk){
    this.milk=milk;
}
LatteMachine.prototype=Object.create(CoffeeMachine.prototype);
const latteM=new LatteMachine(128);
console.log(latteM)
