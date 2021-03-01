{   
    type CoffeeCup={
        shots:number,
        hasMilk:boolean,
        hasSuger?:boolean,
    }

    interface CoffeeMaker{
        makeCoffee(shots:number):CoffeeCup;
    }

    abstract class CoffeeMachine implements CoffeeMaker{ //abstract
        private static BEANS_GRAMM_PERSHOT:number=7;
        private coffeeBeans:number=0;

        constructor(coffeeBeans:number){
            this.coffeeBeans=coffeeBeans;
        }

        addCoffeeBeans(beans:number){
            if(beans<0){
                throw new Error('value for beans should be greater than 0');
            }
            this.coffeeBeans+=beans;
        }

        clean(){
            console.log('cleaning the machine ....')
        }

        protected grindBeans(shots:number){
            console.log(`grinding beans for ${shots}`);
            if(this.coffeeBeans<CoffeeMachine.BEANS_GRAMM_PERSHOT*shots){
                throw new Error("Not Enough coffee beans");
            }
            this.coffeeBeans-=CoffeeMachine.BEANS_GRAMM_PERSHOT*shots;
        }

        protected preheat(){
            console.log("heating Up ...");
        }

        protected abstract extract(shots:number):CoffeeCup; //abstract

        makeCoffee(shots:number):CoffeeCup {
            this.grindBeans(shots);
            this.preheat();
            return this.extract(shots);
        }
    }

    /**
     * CoffeeMachine Class 상속
     */

    class LatteMachine extends CoffeeMachine{

        constructor(beans:number, private serialNumber:string){
            super(beans);
        }
        private mixMilk(){
            console.log('mixing Milk');
        }

        protected extract(shots:number):CoffeeCup{
            this.mixMilk;
            return {
                shots,
                hasMilk:true,
            }
        }
    }

   class SweetCoffeeMaker extends CoffeeMachine{
        protected extract(shots:number):CoffeeCup{
            return{
                shots,
                hasMilk:false,
                hasSuger:true,
            }
        }
   }

    const machines:CoffeeMaker[]=[
        new LatteMachine(16,'sss'),
        new SweetCoffeeMaker(16),
    ];

    machines.forEach(machine =>{
        console.log(`-----------------`);
        machine.makeCoffee(1);
    })
}