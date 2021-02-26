{
    /**
     * Type Assertion 추천x
     */

     function JsStrFunc():any{
         return "hello";
     }

     const result=JsStrFunc();
     (result as string).length;
     console.log((result as string).length);
     console.log((<string>result).length);   

     const button=document.querySelector('class')!;  //100% 확신이 있다면 사용

}