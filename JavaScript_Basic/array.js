'use strict';

//Array
// 1. 배열선언
const arr1=new Array();
const arr2=[1,2];

// Loop Array
//for of
for(let value of arr2){
    console.log(value);
}

//forEach
arr2.forEach(function(value,index,arr){
    console.log(arr[index]);
    console.log(value);
    console.log(arr);
})
//==
arr2.forEach((value,index,arr)=>{
    console.log(arr[index]);
    console.log(value);
    console.log(arr);
});

// 2. 배열 삽입, 삭제, 복사
//push back_insert
arr2.push(3);
console.log(arr2);
//pop back_remove
arr2.pop();
console.log(arr2);

//unshift: front_insert
arr2.unshift(0);
console.log(arr2);
//shift : front_remove
arr2.shift();
console.log(arr2);
// TIP !! shift,unshift는 pop,push에 비해서 매우 느리다!

//splice: 지정된 index에서 배열의 원소를 제거
arr2.push(3,4,5,6);
console.log(arr2);

arr2.splice(1,1);
console.log(arr2);

arr2.splice(1,1,10,11); //지우고 나서 삽입
console.log(arr2);

//combine Array
arr1.push("hello","world");
const new_arr=arr2.concat(arr1);
console.log(new_arr);

//Searching
//find the index
console.log(new_arr.indexOf("hello")); //동일한 데이터가 존재하면 첫번째 원소 선택
console.log(new_arr.lastIndexOf("hello")); //동일한 데이터가 존재하면 마지막 원소 선택
console.log(new_arr.includes("hello"));
