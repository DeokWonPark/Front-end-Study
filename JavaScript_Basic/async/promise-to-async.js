class UserStorage{
    loginUser(id,password){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if((id==='ellie' && password==='dream') || (id==='corder' && password==='academy')){
                    resolve(id);
                }
                else{
                    reject(new Error('Not Found'));
                }
            },2000);
        });
    }

    getRoles(user){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(user==='ellie'){
                    resolve({name:'ellie', role:'admin'});
                }
                else{
                    reject(new Error('no access'));
                }
            },1000);
        });
    }
}


async function login(){
    const userstorage=new UserStorage();
    const id=prompt('enter your id');
    const password=prompt('enter your password');
    try{
        const id_=await userstorage.loginUser(id,password);
        const user=await userstorage.getRoles(id_);
        alert(`name: ${user.name} + role: ${user.role}`);
    }catch(error){
        console.log(error);
    }
}
login();