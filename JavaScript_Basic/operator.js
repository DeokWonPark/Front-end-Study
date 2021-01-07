// 1. String Concatenation
const a="Hello";
console.log(`'${a} world'`);

//2. Equality
const Stringfive="5";
const Numberfive=5;

// loose equality
console.log(Stringfive==Numberfive);
console.log(Stringfive!=Numberfive);

// Srtict equality
console.log(Stringfive===Numberfive);
console.log(Stringfive!==Numberfive);

//object equality by reference
const obj1={name:"ejrdnjs"};
const obj2={nemw:"ejrdnjs"};
const obj3=obj1;

console.log(obj1==obj2);
console.log(obj1===obj2);
console.log(obj1===obj3);