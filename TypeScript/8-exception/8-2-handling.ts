class NetworkClient{
    tryConnect():void{
        throw new Error('no network');
    }
}

class UserService{
    constructor(private client:NetworkClient){}

    login(){
        this.client.tryConnect();
    }
}

class App{
    constructor(private userService:UserService){}
    run(){
        // 에러를 정확하게 처리 할 수 있는 곳에서 처리하는 것이 좋다(의미있는 곳)
        try{
            this.userService.login();
        }catch(error){
            //show dialog
        }
    }
}

const client=new NetworkClient();
const service=new UserService(client);
const app=new App(service);

app.run();