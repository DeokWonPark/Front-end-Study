'use strict'

function loadItems(){
    return fetch('./data/cloths.json')
        .then((response)=>response.json())
        .then((json) => json.cloths);
}
function create_item(obj){
    const $content=document.querySelector('.content');
    const $li=document.createElement("li");
    const $img=document.createElement("div");
    const $p=document.createElement("p");
        
    $li.setAttribute("class",`${obj.cloth} ${obj.color} on`);
        
    $p.innerHTML=`${obj.gender} , ${obj.size} size`;
    $li.appendChild($img);
    $li.appendChild($p);

    $content.appendChild($li);
}
function load_item(cloths){

    for(let i=0;i<3;i++){

        for(let obj of cloths){
            create_item(obj);
        }
    }
}

function setEventListeners(){
    const $nav=document.querySelector('.nav');

    const $all=document.querySelectorAll('.on');
    const $logo=document.querySelector('.logo');
    $nav.addEventListener('click',(event)=>{
        onButtonClick(event,$all)
    });
    
    $logo.addEventListener('click',()=>{
        retoggleElement($all);
    });
}

function onButtonClick(event,$all){
    const dataset=event.target.dataset;
    const value=dataset.value;

    if(value==null){
        return;
    }
    const $nav_item=document.querySelectorAll(`.${value}`);
    toggleElement($nav_item,$all);
}
function toggleElement($item,$all){
    [].forEach.call($all,(tok)=>{
        tok.classList.remove('on');
    });
    [].forEach.call($item,(item)=>{
        item.classList.toggle('on');
    });
}
function retoggleElement($all){
    [].forEach.call($all,(tok)=>{
        tok.classList.add('on');
    });
}
(async function main(){
    const cloths=await loadItems();
    load_item(cloths);
    setEventListeners();
})();
