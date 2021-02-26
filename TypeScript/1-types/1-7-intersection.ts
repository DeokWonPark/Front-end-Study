{
    /**
     * union 과 반대되는 성격 /InterSection : &(and) - 다양한 타입들을 하나로 묶어서 사용 할 수 있다.
     */

     type Student={
         name:string,
         score:number,
     }

     type Worker={
         empolyeeId:string,
         work:()=>void,
     }

     function internWork(person:Student & Worker){
        console.log(person.name,person.empolyeeId,person.work());
     }

     internWork({
         name:"ejrdnjs",
         score:24,
         empolyeeId:"he",
         work:()=>{},
     })
}