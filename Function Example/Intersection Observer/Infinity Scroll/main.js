const count=12;
let idx=0;

const loadItems=()=>{
    const fragment = document.createDocumentFragment();

    Array(idx+count).fill(0).map((V,K) => {
        const item=document.createElement('p');

        item.classList.add('item');
        item.textContent = `${idx+K}`;

        fragment.appendChild(item);
    })

    document.querySelector('#items').appendChild(fragment);
    idx+=count;
}

const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        }

        loadItems();
    })
})

io.observe(document.querySelector('#sentinel'));

loadItems();