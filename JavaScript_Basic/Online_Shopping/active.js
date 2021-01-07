'use strict'

class cloth{
    constructor(cloth,color,size,gender){
        this.cloth=cloth;
        this.color=color;
        this.size=size;
        this.gender=gender;
    }
}
const cloths=[
    new cloth('t-shirt','pink','large','female'),
    new cloth('pants','blue','small','man'),
    new cloth('pants','yellow','large','man'),
    new cloth('skirt','yellow','large','female'),
    new cloth('t-shirt','blue','large','man'),
    new cloth('skirt','blue','large','female'),
    new cloth('t-shirt','yellow','large','man'),
    new cloth('pants','pink','small','female'),
    new cloth('t-shirt','pink','large','female'),
    new cloth('pants','blue','small','man'),
    new cloth('pants','yellow','large','man'),
    new cloth('skirt','yellow','large','female'),
    new cloth('skirt','blue','large','female'),
    new cloth('t-shirt','yellow','large','man'),
    new cloth('pants','pink','small','female'),
];
(function load_item(){

    for(let i=0;i<3;i++){

        for(let obj of cloths){
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
    }
})();

const $shirt=document.querySelector('#t-shirt');
const $shirt_item=document.querySelectorAll('.content .t-shirt');

const $pants=document.querySelector('#pants');
const $pants_item=document.querySelectorAll('.content .pants');

const $skirt=document.querySelector('#skirt');
const $skirt_item=document.querySelectorAll('.content .skirt');

const $blue=document.querySelector('#blue');
const $blue_item=document.querySelectorAll('.content .blue');

const $yellow=document.querySelector('#yellow');
const $yellow_item=document.querySelectorAll('.content .yellow');

const $pink=document.querySelector('#pink');
const $pink_item=document.querySelectorAll('.content .pink');

const $all=document.querySelectorAll('.on');

const $logo=document.querySelector('.logo');

$shirt.addEventListener('click',()=>{
    toggleElement($shirt_item);
});
$pants.addEventListener('click',()=>{
    toggleElement($pants_item);   
});
$skirt.addEventListener('click',()=>{
    toggleElement($skirt_item);   
});
$blue.addEventListener('click',()=>{
    toggleElement($blue_item);   
});
$yellow.addEventListener('click',()=>{
    toggleElement($yellow_item);   
});
$pink.addEventListener('click',()=>{
    toggleElement($pink_item);   
});
$logo.addEventListener('click',()=>{
    retoggleElement();
})

function toggleElement($item){
    [].forEach.call($all,(tok)=>{
        tok.classList.remove('on');
    });
    [].forEach.call($item,(item)=>{
        item.classList.toggle('on');
    });
}
function retoggleElement(){
    [].forEach.call($all,(tok)=>{
        tok.classList.add('on');
    });
}