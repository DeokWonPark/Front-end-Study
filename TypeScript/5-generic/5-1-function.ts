{
    function checkNotNullBAD(arg:number | null):number {
        if(arg==null){
            throw new Error('not valid number');
        }
        return arg;
    }

    function checkNotNull<T>(arg:T | null):T {
        if(arg==null){
            throw new Error('not valid number');
        }
        return arg;
    }

    console.log(checkNotNull("ejrdnjs"));
    const boal:boolean=checkNotNull(true);
}