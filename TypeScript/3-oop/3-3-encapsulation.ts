{   
    type CoffeeCup={
        shots:number,
        hasMilk:boolean,
    }

    class CoffeeMachine{
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

    const myCoffeeMachine=new CoffeeMachine(0);
    myCoffeeMachine.addCoffeeBeans(10);
    console.log(myCoffeeMachine)
    const americano=myCoffeeMachine.makeCoffee(1);
    console.log(americano)


    class User{
        get fullName():string{
            return `${this.firstName} ${this.lastName}`;
        }

        private internalAge=4;
        get age():number{
            return this.internalAge;
        }

        set age(num:number){
            if(num<0){
                //유효성 검사
            }
            this.internalAge=num;
        }

        constructor(private firstName:string, private lastName:string){

        }
    }

    const user=new User('Steve','Jobs');
    console.log(user.fullName);
    user.age=4;
}
//geter seter 한번 더 보자