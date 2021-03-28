document.addEventListener("DOMContentLoaded", function() {
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
    
    const lazyload=()=> {
      Throttle.throttle(()=>{
        console.log('scroll');
        const lazyloadImages = document.querySelectorAll('.lazy');
        let lazyloadThrottleTimeout;
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    

        lazyloadThrottleTimeout = setTimeout(function() {
            const scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
                if(img.offsetTop < (window.innerHeight + scrollTop)) {
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
                }
            });
            if(lazyloadImages.length == 0) { 
              console.log("00")
              document.removeEventListener("scroll", lazyload);
              window.addEventListener('load',lazyload);
              window.removeEventListener("resize", lazyload);
              window.removeEventListener("orientationChange", lazyload);
            }
        }, 3000);
      },200)

    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener('load',()=>lazyload('.lazy'));
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  });