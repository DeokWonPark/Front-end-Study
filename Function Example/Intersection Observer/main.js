const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry =>{
        const classname=entry.target.dataset.value;
        if(entry.isIntersecting){
            document.querySelector(`.${classname}`).style.backgroundColor="rgb(65, 167, 61)";
        }
        else{
            document.querySelector(`.${classname}`).style.backgroundColor="rgb(149, 61, 167)";
        }

    })
});

Array.from(document.querySelectorAll('.box')).map((box) =>{
    io.observe(box);
})