//Objects
//Object={ key:value };

function print(Person){
    console.log(Person.name);
    console.log(Person.age);
}

const ejrdnjs={
    name:"ejrdnjs",
    age:"25"
};
console.log(typeof ejrdnjs);
print(ejrdnjs);

// Object 생성방법
const obj1={}; //'objext literal' syntax
const obj2=new Object(); //'objext constructor' syntax

//동적으로 객체의 프로퍼티를 추가 삭제 가능(유지보수가 어려워 질 수 있다.)
ejrdnjs.hasJob=true;
console.log(ejrdnjs);

delete ejrdnjs.hasJob;
console.log(ejrdnjs);

// 2. Computed properties
//객체 접근
console.log(ejrdnjs.name);
console.log(ejrdnjs['name']); //Computed propertie는 동적으로 객체에 대한 키를 지정할 때 사용한다.

//ex)
function printValue(obj,key){
    console.log(obj.key);//x
    console.log(obj[key]);//o
}

printValue(ejrdnjs,'name');

// 3. Constructor Function
function Person(name,age){
    //this={}
    this.name=name;
    this.age=age;
    //return this
} 

const person=new Person('ejrdnjs',25);
console.log(person);

// 4. in operator: 객체안에 해당하는 키가 있는지 확인
console.log('name' in person); //true

// 5. for..in vs for..of
//for in 객체의 키를 순차적으로 접근
for(key in ejrdnjs){
    console.log(key);
    console.log(ejrdnjs[key]);
}

//for of 배열의 원소를 순차적으로 접근
const arr=[1,2,3,4,5];
for(value of arr){
    console.log(value);
}

//6. Cloning
const u1={ name:'ejrdnjs', age:25};
const u2=u1;
u2.name='ejrrns';
console.log(u2);

//복제를 하기위한 방법?
//old way
const u3={};
for(key in u1){
    u3[key]=u1[key];
}
console.log(u3);

//new Way
 const u4={};
 Object.assign(u4,u1);
 console.log(u4);

 //Other example
 const fruit1={ color:'red'};
 const fruit2={ color:'blue', size:'big'};
 const mixed=Object.assign({},fruit1,fruit2); //뒤에나오는 것일수록 값이 덮여 쓰여진다.
 console.log(mixed.color);
 console.log(mixed.size);

 // 7. 프로토타입을 이용한 객체확장
 //prototype 상속
 function Person(){}
Person.prototype.hello=function(){
    console.log('hello');
}

function Korean(region){
    this.region=region;
    this.where=function(region){
        console.log('where',this.region);
    };
}

Korean.prototype=Person.prototype; //Person의 prototype 상속
const k=new Korean('Seoul');
k.where();
k.hello();

console.log(k);
console.log(k instanceof Person);
console.log(k instanceof Object);
console.log(k instanceof Korean);

//표준 내장 객체
//Array ...