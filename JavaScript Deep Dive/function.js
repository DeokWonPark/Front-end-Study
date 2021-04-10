//scope
{
    function foo(){
        console.log('global');
    }

    function bar(){
        function foo(){
            console.log('local');
        }
        foo();
    }
    bar();
}