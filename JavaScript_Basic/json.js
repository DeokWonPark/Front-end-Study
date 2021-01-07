//Json

//1. Object to Json
//stringify(obj)
let json=JSON.stringify(true);
console.log(json);

json=JSON.stringify(['ejrdnjs','ejrrns']);
console.log(json);

const rabbit={
    name:'tori',
    color:'white',
    size:null,
    birthDate:new Date(),
    jump:()=>{
        console.log(`${this.name} can jump!`);
    },
};
json=JSON.stringify(rabbit);
console.log(json); //함수는 제외된다. , Symbol도 제외된다.

json=JSON.stringify(rabbit,["name","color"]); //원하는 요소만 세밀한 조정(array)
console.log(json);

json=JSON.stringify(rabbit, (key,value)=>{
    //console.log(`key:${key}, value:${value}`);
    return key==='name'?'ellie':value;
}); //원하는 요소만 세밀한 조정(Callback)
console.log(json); 


//2. Json to Object
//parse(json)
json=JSON.stringify(rabbit);
const obj=JSON.parse(json);
console.log(obj);
rabbit.jump();
//obj.jump(); 
//함수없다. 객체를 json으로 변환 할때 함수는 제외된다.
console.log(rabbit.birthDate.getDate());
//console.log(obj.birthDate.getDate()); 
//변환된 obj의 birthDate속성은 단순한 String이기때문에 api를 사용할 수가 없다.

//따라서 세밀한 조정이 필요하다.
const obj2=JSON.parse(json,(key,value)=>{
    //console.log(`key:${key}, value:${value}`);
    return key==='birthDate'?new Date():value;
});
console.log(obj2);
console.log(obj2.birthDate.getDate());