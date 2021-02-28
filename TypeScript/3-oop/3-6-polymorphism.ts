{   
    type CoffeeCup={
        shots:number,
        hasMilk:boolean,
        hasSuger?:boolean,
    }

    interface CoffeeMaker{
        makeCoffee(shots:number):CoffeeCup;
    }

    class CoffeeMachine implements CoffeeMaker{
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
        //Class내부에서만 사용되는 함수들은 private으로 설정해서 추상화
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

        protected extract(shots:number):CoffeeCup{
            console.log(`Pulling ${shots} shots...`);
            return {
                shots,
                hasMilk:false,
            };
        }
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

        makeCoffee(shots:number):CoffeeCup{
            const coffee=super.makeCoffee(shots);
            this.mixMilk();
            return {
                ...coffee,
                hasMilk:true,
            }
        }
    }

   class SweetCoffeeMaker extends CoffeeMachine{
        makeCoffee(shots:number):CoffeeCup{
            const coffee=super.makeCoffee(shots);
            return {
                ...coffee,
                hasSuger:true,
            };
        }
   }

    const machines:CoffeeMaker[]=[
        new CoffeeMachine(16),
        new LatteMachine(16,'sss'),
        new SweetCoffeeMaker(16),
    ];

    machines.forEach(machine =>{
        console.log(`-----------------`);
        machine.makeCoffee(1);
    })
}