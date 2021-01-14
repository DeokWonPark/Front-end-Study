'use strict';
function getToken(){
    return localStorage.getItem('token');
}
async function login(event){
    event.preventDefault(); //브라우저의 기본기능을 취소
    event.stopPropagation();

    const emailElement=document.querySelector('#email');
    const passwordElement=document.querySelector('#password');

    const email=emailElement.value;
    const password=passwordElement.value;

    try{
        const res= await axios.post('https://api.marktube.tv/v1/me',{
            email,
            password,
        });
        const {token}=res.data; //const token =res.data.token
        if(token===undefined){
            return;
        }
        localStorage.setItem('token',token);
        location.assign('/');
    }catch(error){
        const data =error.response.data;
        if(data){
            const state =data.error;
            if(state==='USER_NOT_EXIST'){
                alert("사용자가 존재하지 않습니다.");
            }
            else if(state === 'PASSWORD_NOT_MATCH'){
                alert("비밀번호가 틀렸습니다.");
            }
        }
    }
}
function bindLoginButton(){
    const form=document.querySelector('#form-login');
    form.addEventListener('submit',login);
}
function main(){
    //버튼에 이벤트 연결
    bindLoginButton();

    //토큰을 체크(로그인 상태라면 페이지 전환)
    const token = getToken();
    if(token !== null){
        location.assign('/');
        return;
    }
}

document.addEventListener('DOMContentLoaded',main);