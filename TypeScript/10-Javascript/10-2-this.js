/**
 * js에서 this는 호출한 사람, 문맥에 따라서 달라질 수 있다.
 */

console.log(this); //window

class Counter{
    count=0;
    increase=function(){
        console.log(this);
    }
}
const count=new Counter();
count.increase();

// const caller=count.increase;
const caller=count.increase.bind(count); //this를 잃어버리지 않게 묶어줌 or Counter의 함수 정의시 Arrow Func로 정의
caller();

class Bob{};
const bob=new Bob();
bob.run=count.increase;
bob.run();