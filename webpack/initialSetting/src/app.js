import '@babel/polyfill'
import { sum } from "./math";
import './app.css';
import logoImage from './logo.PNG';

window.addEventListener('DOMContentLoaded',()=>{
    const el=document.querySelector('#app');
    el.innerHTML=`
        <h1> 2 + 5 = ${sum(2,5)}</h1>
        <img src=${logoImage} alt="logo"/>
    `
})