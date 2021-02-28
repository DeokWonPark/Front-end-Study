{
    type CoffeeCup={
        shots:number,
        hasMilk:boolean,
    }

    const BEANS_GRAMM_PERSHOT:number=7;

    let coffeeBeans:number=0;
    function makeCoffee(shots:number):CoffeeCup{
        if(coffeeBeans<BEANS_GRAMM_PERSHOT*shots){
            throw new Error("Not Enough coffee beans");
        }
        coffeeBeans-=BEANS_GRAMM_PERSHOT*shots;
        return {
            shots,
            hasMilk:false,
        };
    }

    coffeeBeans+=BEANS_GRAMM_PERSHOT*3;
    const coffee=makeCoffee(2);
    console.log(coffee)
}