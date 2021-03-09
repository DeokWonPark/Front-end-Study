/**
 * 제네릭 조건을 줄수있는 방법
 */

interface Employee{
    pay():void;
}

class FullTimeEmployee implements Employee{
    pay(){
        console.log('full Time Job');
    }

    workFullTime(){

    }
}

class PartTimeEmployee implements Employee{
    pay(){
        console.log('Part Time Job');
    }

    workParkTime(){

    }
}

// 세부적인 타입을 인자로 받아서 추상적은 타입으로 리턴하면 좋지않다
function payBAD(employee:Employee):Employee {
    employee.pay();
    return employee;
}

// 제네릭 조건
function pay<E extends Employee>(employee:E):E {
    employee.pay();
    return employee;
}

const ellie= new FullTimeEmployee();
const bob=new PartTimeEmployee();
ellie.workFullTime();
bob.workParkTime();

const ellieAfterPay=pay(ellie);
const bobAfterPay=pay(bob);

///
const obj={
    name:'ellie',
    age:20,
}
const obj2={
    animal:'🐱‍👤',
}

function getValue<T, K extends keyof T>(object:T, key:K):T[K] {
    return object[key];
}

console.log(getValue(obj,'name')); //ellie
console.log(getValue(obj2,'animal')); //dog

