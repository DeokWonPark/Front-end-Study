import '@babel/polyfill'
import { sum } from "./math";
import './app.css';
import logoImage from './logo.PNG';

window.addEventListener('DOMContentLoaded',()=>{
    const el=document.querySelector('#app');
    el.innerHTML=`
        <h1> 3 + 6 = ${sum(3,6)}</h1>
        <img src=${logoImage} alt="logo"/>
    `
})