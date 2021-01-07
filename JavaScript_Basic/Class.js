'use strict'

// 1. Class declarations
class Person{
    //생성자 
    constructor(name,age){
        //fields
        this.name=name;
        this.age=age;
    }

    //methods
    speak(){
        console.log(`${this.name}: hello!`);
    }
}

const ejrdnjs=new Person("ejrdnjs",20);
console.log(typeof ejrdnjs);
console.log(ejrdnjs);
ejrdnjs.speak();

// 2. Getter and Setters
class User{
    constructor(firstName, lastName,age){
        this.firstName=firstName;
        this.lastName=lastName;
        this.age=age;
    }
}
// 이렇게 할 경우 사용자가 age를 원하지 않는 값으로 설정할 수 있다 ->이것을 방지하기 위해 우리는 Getter와 Setter를 사용한다.
const user1=new User('Steve','Job',-1);
console.log(user1.age);

class User2{
    constructor(firstName, lastName,age){
        this.firstName=firstName;
        this.lastName=lastName;
        this.age=age;
    }
    //Getter
    get age(){
        return this.age_;
    }
    //Setter
    set age(value){
        if(value<0){
            throw Error('age can not be negative')
        }
        this.age_=value;
    }
}
console.log("sdadasd")
const user2=new User2('Steve','Job',10);
console.log(user2.age);

// 3. 상속과 다형성
class Shape{
    constructor(width,height,color){
        this.width=width;
        this.height=height;
        this.color=color;
    }

    draw(){
        console.log(`drawing ${this.color} color of`);
    }
    getArea(){
        return this.width*this.height;
    }
}

class Rectangle extends Shape{}
class Triangle extends Shape{
    //오버라이딩
    getArea(){
        return this.width*this.height/2;
    }
    draw(){
        super.draw();
        console.log("overrding")
    }
}

const ret=new Rectangle(20,20,'Blue');
ret.draw();
console.log(ret.getArea());

const tri=new Triangle(20,20,'red');
tri.draw();
console.log(tri.getArea());

// 4. Class checking :instanceOf
console.log(ret instanceof Rectangle);
console.log(tri instanceof Rectangle);
console.log(tri instanceof Triangle);
console.log(tri instanceof Shape);
console.log(tri instanceof Object);