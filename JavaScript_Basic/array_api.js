  // Q1. make a string out of an array
  {
    const fruits = ['apple', 'banana', 'orange'];
    console.log(fruits.join(' '));
  }
  
  // Q2. make an array out of a string
  {
    const fruits = '🍎, 🥝, 🍌, 🍒';
    console.log(fruits.split(','))
  }
  
  // Q3. make this array look like this: [5, 4, 3, 2, 1]
  {
    const array = [1, 2, 3, 4, 5];
    //console.log(array.sort((a,b)=> b-a ));
    console.log(array.reverse());
  }
  
  // Q4. make new array without the first two elements
  {
    const array = [1, 2, 3, 4, 5];
    //console.log(array.splice(2));
    console.log(array.slice(2,array.length));
  }
  
  class Student {
    constructor(name, age, enrolled, score) {
      this.name = name;
      this.age = age;
      this.enrolled = enrolled;
      this.score = score;
    }
  }
  const students = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88),
  ];
  
  // Q5. find a student with the score 90
  {
      console.log(students.find((student)=> student.score===90));
  }
  
  // Q6. make an array of enrolled students
  {
    console.log(students.filter((value)=> value.enrolled===true));
  }
  
  // Q7. make an array containing only the students' scores
  // result should be: [45, 80, 90, 66, 88]
  {
      console.log(students.map((students)=>students=students.score));
  }
  
  // Q8. check if there is a student with the score lower than 50
  {
      console.log(students.some((student)=>student.score<50)); //한개의 조건만 만족
      console.log(!students.every((student)=>student.score>=50)); //모든 조건이 만족 true
  }
  
  // Q9. compute students' average score
  {
      console.log(students.reduce((prev,cur)=>{
        //   console.log("-------")
        //   console.log(prev);
        //   console.log(cur);
          return cur.score+prev;
      },0)/students.length);
  }
  
  // Q10. make a string containing all the scores
  // result should be: '45, 80, 90, 66, 88'
  {
      console.log(students.map((student)=>student=student.score).join(', '));
      console.log(students
                    .map((student)=>student=student.score)
                    .filter((score)=>score>=50)
                    .join(', '));
  }
  
  // Bonus! do Q10 sorted in ascending order
  // result should be: '45, 66, 80, 88, 90'
  {
      console.log(students
                .map((student)=>student=student.score)
                .sort()
                .join(', '));
  }