// 2020(ES11) 추가된 연산자
// 1. 옵셔널체이닝 연산자
//좌항의 값이 null, undifined인 경우 undifined반환 그렇지 않다면 우항의 값을 참조
{
    var elem=null;

    var value=elem?.value;
    console.log(value)
}
{
    var str='s';

    var length = str?.length;
    console.log(length)
}
{
    var str='';

    var length = str && str.length;
    console.log(length)
}

//null 병합 연산자 ??
// 좌항의 피연산자가 null, undifined인 경우 우항을 반환 그렇지 않으면 좌항을 반환 - 변수에 기본값을 설정할 때 유용하다.
{
    var foo = null ?? "hello";
    console.log(foo); //hello
} 
// ?? 도입 이전의 방식
{
    var foo = null || "hello";
    console.log(foo); //hello
} 