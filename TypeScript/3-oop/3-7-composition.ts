{  

    /**
     * Composition - 코드의 재사용성을 높여준다.
     * 상속의 레벨을 낮추고 외부에서 dependency injection
     */


    
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

        constructor(
            private coffeeBeans:number,
            private sugar:SugarProvider,
            private milk:MilkFrother){}

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
            const coffee=this.extract(shots);
            return this.milk.makeMilk(this.sugar.addSugar(coffee));
        }
    }

    /**
     * CoffeeMachine Class 상속
     */

     interface MilkFrother{
        makeMilk(cup:CoffeeCup):CoffeeCup;
     }
     interface SugarProvider{
        addSugar(cup:CoffeeCup):CoffeeCup;
     }

     // 싸구려 우유 거품기
    class CheapMilkSteamer implements MilkFrother{
        private steamMilk(){
            console.log('Steaming some milk...');
        }

        makeMilk(cup:CoffeeCup):CoffeeCup{
            this.steamMilk();
            return{
                ...cup,
                hasMilk:true,
            };
        }
    }

    // 고급 거품기
    class FancyMilkSteamer implements MilkFrother{
        private steamMilk(){
            console.log('Fancy Steaming some milk...');
        }

        makeMilk(cup:CoffeeCup):CoffeeCup{
            this.steamMilk();
            return{
                ...cup,
                hasMilk:true,
            };
        }
    }

    // 차가운 거품기
    class ColdMilkSteamer implements MilkFrother{
        private steamMilk(){
            console.log('Cold Steaming some milk...');
        }

        makeMilk(cup:CoffeeCup):CoffeeCup{
            this.steamMilk();
            return{
                ...cup,
                hasMilk:true,
            };
        }
    }
    //No Milk
    class NoMilk implements MilkFrother{
        makeMilk(cup:CoffeeCup):CoffeeCup{
            return cup;
        }
    }

    // 설탕 제조기 - 사탕
    class CandySugerMaker implements SugarProvider{
        private getSugar(){
            console.log('Getting some sugar from candy');
            return true;
        }

        addSugar(cup:CoffeeCup):CoffeeCup{
            const sugar=this.getSugar();
            return{
                ...cup,
                hasSuger:sugar,
            };
        }
    }

    // 설탕 제조기 - jar
    class JarSugerMaker implements SugarProvider{
        private getSugar(){
            console.log('Getting some sugar from jar');
            return true;
        }

        addSugar(cup:CoffeeCup):CoffeeCup{
            const sugar=this.getSugar();
            return{
                ...cup,
                hasSuger:sugar,
            };
        }
    }
    //NoSugar
    class NoSugar implements SugarProvider{
        addSugar(cup:CoffeeCup):CoffeeCup{
            return cup;
        }
    }



   //
    const cheapMilkMaker=new CheapMilkSteamer();
    const fancyMilkMaker=new FancyMilkSteamer();
    const noMilk=new NoMilk();

    const candySuger=new CandySugerMaker();
    const sugar=new JarSugerMaker();
    const noSuagr=new NoSugar();

    //
    // const sweetMachine=new SweetCoffeeMaker(12,candySuger);
    // const latteMachine=new LatteMachine(12,'ss',cheapMilkMaker);
    // const sweetlatteMachine=new SweetCaffeLatteMachine(12,candySuger,cheapMilkMaker);

    // const n_sweetMachine=new SweetCoffeeMaker(12,sugar);
    // const n_latteMachine=new LatteMachine(12,'ss',fancyMilkMaker);
    // const n_sweetlatteMachine=new SweetCaffeLatteMachine(12,sugar,fancyMilkMaker);

    const myCoffeeMachine=new CoffeeMachine(12,noSuagr,noMilk);
    myCoffeeMachine.makeCoffee(1);
}