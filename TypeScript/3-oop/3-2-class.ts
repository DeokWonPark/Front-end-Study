{   type CoffeeCup={
        shots:number,
        hasMilk:boolean,
    }

    class CoffeeMachine{
        static BEANS_GRAMM_PERSHOT:number=7;
        coffeeBeans:number=0;

        constructor(coffeeBeans:number){
            this.coffeeBeans=coffeeBeans;
        }

        makeCoffee(shots:number):CoffeeCup {
            if(this.coffeeBeans<CoffeeMachine.BEANS_GRAMM_PERSHOT*shots){
                throw new Error("Not Enough coffee beans");
            }
            this.coffeeBeans-=CoffeeMachine.BEANS_GRAMM_PERSHOT*shots;
            return {
                shots,
                hasMilk:false,
            };
        }
    }

    const myCoffeeMachine=new CoffeeMachine(30);
    const americano=myCoffeeMachine.makeCoffee(1);
    console.log(americano)
}