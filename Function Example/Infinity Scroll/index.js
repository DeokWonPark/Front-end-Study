//Javascript
let count = 0;

const throttling = () => {
    let throttleCheck;

    return {
        throttle(callback, milliseconds){
            if(!throttleCheck){
                throttleCheck = setTimeout(() => {
                    callback(...arguments);
                    throttleCheck = false;
                }, milliseconds);
            }
        }
    };
}

const Throttle=throttling();
window.addEventListener('scroll',()=>{
    Throttle.throttle(()=>{
        console.log("dsadsadsadasdsa")
        //window height + window scrollY 값이 document height보다 클 경우,
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            //실행할 로직 (콘텐츠 추가)
            count++;
            const addContent=document.createElement('div');
            addContent.classList.add('block');
            addContent.innerHTML=`<p>${count}번째로 추가된 콘텐츠</p>`
            //article에 추가되는 콘텐츠를 append
            const $article=document.querySelector('article');
            $article.append(addContent);
        }
    },300)
})