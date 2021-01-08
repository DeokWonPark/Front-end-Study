'use strict'
const $target=document.querySelector('.target');
const $target_msg=document.querySelector('.cordinates');
const $line=document.querySelector('.line');
const $line_bottom=document.querySelector('.line_bottom');

/* 성능을 개선한 event */
document.addEventListener('mousemove',(event)=>{
    $target.style.transform=`translate(${event.pageX-60}px,${event.pageY-60}px)`;

    $target_msg.textContent=`${event.pageX}px, ${event.pageY}px`;
    $target_msg.style.transform=`translate(100px,-50px)`;

    $line.style.transform=`translate(${event.pageX}px,0)`;
    $line_bottom.style.transform=`translate(0,${event.pageY}px)`;
});

// document.addEventListener('mousemove',(event)=>{
//     $target.style.top=`${event.pageY-60}px`;
//     $target.style.left=`${event.pageX-60}px`;

//     $target_msg.textContent=`${event.pageX}px, ${event.pageY}px`
//     $target_msg.style.top=`${event.pageY+25}px`;
//     $target_msg.style.left=`${event.pageX+30}px`;

//     $line.style.width=`${event.pageX}px`;
//     $line_bottom.style.height=`${event.pageY}px`;
// });