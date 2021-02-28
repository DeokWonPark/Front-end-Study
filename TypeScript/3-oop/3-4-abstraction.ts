{   
    type CoffeeCup={
        shots:number,
        hasMilk:boolean,
    }

    interface CoffeeMaker{
        makeCoffee(shots:number):CoffeeCup;
    }

    interface CommercialCoffeeMaker{
        makeCoffee(shots:number):CoffeeCup;
        addCoffeeBeans(beans:number):void;
        clean():void;
    }

    class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker{
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
        private grindBeans(shots:number){
            console.log(`grinding beans for ${shots}`);
            if(this.coffeeBeans<CoffeeMachine.BEANS_GRAMM_PERSHOT*shots){
                throw new Error("Not Enough coffee beans");
            }
            this.coffeeBeans-=CoffeeMachine.BEANS_GRAMM_PERSHOT*shots;
        }

        private preheat(){
            console.log("heating Up ...");
        }

        private extract(shots:number):CoffeeCup{
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

    // const myCoffeeMachine=new CoffeeMachine(20);
    // myCoffeeMachine.addCoffeeBeans(10);
    // myCoffeeMachine.makeCoffee(2);

    // const myCoffeeMachine2:CommercialCoffeeMaker=new CoffeeMachine(20);
    // myCoffeeMachine2.addCoffeeBeans(10);
    // myCoffeeMachine2.makeCoffee(2);
    // myCoffeeMachine2.clean();

    class AmateurUser{
        constructor(private macine:CoffeeMaker){}
        makeCoffee(){
            const coffee=this.macine.makeCoffee(1);
            console.log(coffee);
        }
    }

    class ProBarista{
        constructor(private macine:CommercialCoffeeMaker){}
        makeCoffee(){
            const coffee=this.macine.makeCoffee(1);
            console.log(coffee);
            this.macine.addCoffeeBeans(20);
            this.macine.clean();
        }
    }

    const maker=new CoffeeMachine(20);
    const amateur=new AmateurUser(maker);
    const pro=new ProBarista(maker);

    amateur.makeCoffee();

    pro.makeCoffee();
}