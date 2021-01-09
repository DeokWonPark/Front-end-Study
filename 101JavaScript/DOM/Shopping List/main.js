'use strict'

const $btn=document.querySelector('.btn');
const $contents=document.querySelector('.contents');

$btn.addEventListener('click',()=>{
    const $input_text=document.querySelector('#input');
    if($input_text.value===""){
        block($input_text);
        return;
    }
    onAdd($input_text);
});

addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        const $input_text=document.querySelector('#input');
        if($input_text.value===""){
            block($input_text);
            return;
        }
        onAdd($input_text);
    }
});

$contents.addEventListener('click',(event)=>{
    if(event.target.tagName=="I"){
        event.target.parentElement.remove();
    }
});

function block($input_text){
    $input_text.style.border="2px solid red";
    $input_text.style.animation=`block 300ms infinite alternate`;
    setTimeout(()=>{
        $input_text.style.border="none";
        $input_text.style.animation="none";
    },500);
}
function onAdd($input_text){
    const $new_li=document.createElement('li');
    $new_li.innerHTML=`<p>${$input_text.value}</p><i class="fas fa-trash-alt trash"></i>`;
    $contents.appendChild($new_li);
    //새로 추가된 아이템으로 스크롤링
    $new_li.scrollIntoView({block:'center'});
    $input_text.value="";
    $input_text.focus();
}

// 'use strict'

// const $btn=document.querySelector('.btn');
// const $contents=document.querySelector('.contents');
// let index=0;

// $btn.addEventListener('click',()=>{
//     const $input_text=document.querySelector('#input');
//     if($input_text.value===""){
//         block($input_text);
//         return;
//     }
//     onAdd($input_text);
// });

// addEventListener('keydown',(event)=>{
//     if(event.key==='Enter'){
//         const $input_text=document.querySelector('#input');
//         if($input_text.value===""){
//             block($input_text);
//             return;
//         }
//         onAdd($input_text);
//     }
// });

// $contents.addEventListener('click',(event)=>{
//     const key=event.target.dataset.key;
//     if(key==null){
//         return;
//     }
//     const $trash=document.querySelector(`.trash${key}`).parentElement;
//     $trash.remove();
// });

// function block($input_text){
//     $input_text.style.border="2px solid red";
//     $input_text.style.animation=`block 300ms infinite alternate`;
//     setTimeout(()=>{
//         $input_text.style.border="none";
//         $input_text.style.animation="none";
//     },500);
// }
// function onAdd($input_text){
//     const $new_li=document.createElement('li');
//     $new_li.innerHTML=`<p>${$input_text.value}</p><i class="fas fa-trash-alt trash${index}" data-key="${index++}"></i>`;
//     $contents.appendChild($new_li);
//     //새로 추가된 아이템으로 스크롤링
//     $new_li.scrollIntoView({block:'center'});
//     $input_text.value="";
//     $input_text.focus();
// }