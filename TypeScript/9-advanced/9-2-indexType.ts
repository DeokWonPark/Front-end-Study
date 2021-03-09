{
    type Animal={
        name:string;
        age:number;
        gender:'male' | 'female';
    }

    type Name=Animal['name']; //string
    const test:Name="dsa";

    type Gender=Animal['gender']; //'male' | 'female'

    type Keys=  keyof Animal; // name | age | gender


    type Person={
        name:string;
        gender:Animal['gender'];
    }

    
}