// // 5. Callback Hell => Promise 수정
// class UserStorage{
//     loginuser=(id,password)=>
//         new Promise((resolve,reject)=>{
//             setTimeout(()=>{
//                 if((id==='ellie' && password==='dream') || (id==='corder' && password==='academy')){
//                     resolve(id);
//                 }
//                 else{
//                     reject(new Error());
//                 }
//             },2000);
//         });

//     // loginUser(id,password,onSuccess,onError){
//     //     setTimeout(()=>{
//     //         if((id==='ellie' && password==='dream') || (id==='corder' && password==='academy')){
//     //             onSuccess(id);
//     //         }
//     //         else{
//     //             onError(new Error('Not Found'));
//     //         }
//     //     },2000);
//     // }
//     getroles=(user)=>{
//         new Promise((resolve,reject)=>{
//             setTimeout(()=>{
//                 if(user==='ellie'){
//                     resolve({name:'ellie', role:'admin'});
//                 }
//                 else{
//                     reject(new Error('no access'));
//                 }
//             },1000);
//         });
//     }

//     // getRoles(user, onSuccess, onError){
//     //     setTimeout(()=>{
//     //         if(user==='ellie'){
//     //             onSuccess({name:'ellie', role:'admin'});
//     //         }
//     //         else{
//     //             onError(new Error('no access'));
//     //         }
//     //     },1000);
//     // }
// }

// const userstorage=new UserStorage();
// const id=prompt('enter your id');
// const password=prompt('enter your password');
// userstorage.loginuser(id,password)
//     .then((id)=>userstorage.getroles(id))
//     .then((userData)=> alert(userData))
//     .catch((error)=>console.log(error));



// class UserStorage{
//     loginUser(id,password){
//         return new Promise((resolve,reject)=>{
//             setTimeout(()=>{
//                 if((id==='ellie' && password==='dream') || (id==='corder' && password==='academy')){
//                     resolve(id);
//                 }
//                 else{
//                     reject(new Error('Not Found'));
//                 }
//             },2000);
//         });
//     }

//     getRoles(user){
//         return new Promise((resolve,reject)=>{
//             setTimeout(()=>{
//                 if(user==='ellie'){
//                     resolve({name:'ellie', role:'admin'});
//                 }
//                 else{
//                     reject(new Error('no access'));
//                 }
//             },1000);
//         });
//     }
// }
// console.clear();

// const userstorage=new UserStorage();
// const id=prompt('enter your id');
// const password=prompt('enter your password');
// userstorage.loginUser(id,password)
//     .then((id)=>userstorage.getRoles(id))
//     .then((userData)=> alert(`${userData.name} ${userData.role}`))
//     .catch((error)=> console.log(error));

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
console.clear();

const userstorage=new UserStorage();
const id=prompt('enter your id');
const password=prompt('enter your password');
userstorage.loginUser(id,password)
    .then((id)=> userstorage.getRoles(id))
    .then((user)=>alert(`${user.name} ${user.role}`))
    .catch(console.log);
    