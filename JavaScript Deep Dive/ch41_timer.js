/**
 * 타이머
 */

// 호출 스케줄링
// 함수를 즉시 실행 시키지 않고 함수 실행을 예약하려면 setTimeout, setInterval과 같은 타이머 함수를 사용한다.
// 타이머 함수는 전역객체가 아닌 브라우저, Node.js에서 모두 제공하는 호스트 객체이다.
// 자바스크립트 엔진은 싱글스레드로 동작하여 간 하나의 실행 컨택스트 스택을 가지므로 두 가지 이상의 테스크를 종시에 실행 불가능하다. *****
// 이런 이유로 타이머 함수는 비동기 방식으로 동작한다.


// 타이머 함수
//1. setTimeout(callback, time, param...)
// time - 시간은 정확히 지정한 시간이 만료되면 함수가 실행되는 것이 아니다. - 테스크큐에 콜백함수를 등록허는 시간을 맞추는 것이다.
// param... - 첫 번째 인자 콜백함수에 들어갈 인자
{
    setTimeout(name => console.log(`Hi ${name}`),1000,"Lee");
}

//2. setInterval() - 인자는 setTimeout과 동일
{
    let count = 1;

    const timeoutId = setInterval(() => {
        console.log(count);

        if(count++ >= 5){
            clearInterval(timeoutId);
        }
    },1000);
}



// 디바운스와 스로틀 **
// scroll, resize, input, mousemove같은 이벤트는 짧은 시간 간격으로 연속해서 발생한다.
// 이러한 이벤트에 바인딩한 이벤트 핸들러는 과도하게 호출되어 성능에 문제를 일으킬 수 있다.
// 디바운스와 스로틀은 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화 해서 과도한 핸들러의 호출을 방지하는 프로그래밍 기법이다.
{
    const $Btn = document.querySelector('.Btn');
    const $normal = document.querySelector('.normal');
    const $debounce = document.querySelector('.debounce');
    const $throttle = document.querySelector('.throttle');

    const debounce = (callback, delay) => {
        let timerId;
        return event => {
            if(timerId) clearTimeout(timerId);
            timerId = setTimeout(callback,delay,event);
        }
    }

    const throttle = (callback, delay) => {
        let timerId;
        return event => {
            if(timerId) return;
            timerId = setTimeout(() => {
                callback(event);
                timerId = null;
            },delay,event);
        }
    }

    $Btn.addEventListener('click', () => {
        $normal.textContent = +$normal.textContent + 1;
    })

    $Btn.addEventListener('click', debounce(() => {
        $debounce.textContent = +$debounce.textContent + 1;
    },500));

    $Btn.addEventListener('click', throttle(() => {
        $throttle.textContent = +$throttle.textContent + 1;
    },500));
}

//디바운스 - 짧은 시간 간격으로 이벤트가 연속해서 발생하면 이벤트 핸들러를 호출하지 않다가 일정시간이 경과한 이후 이벤트 핸들러가 한번만 호출돠도록 한다.
// 짧은 시간 간격으로 들어오는 이벤트를 그룹화하여 마지막에 한번만 처리하는 방식
// 사용자 input이벤트의 경우  - 만약 사용자 입력마다 Ajax통신이 발생한다면 서버에 부담을 준다
// 따라서 사용자의 입력이 완료되었을 때 한 번만 Ajax요청을 하는 것이 바람직 하다.
//resize이벤트 처리, input요소의 입력값으로 ajax처리하여 자동완성, 버튼클릭 중복방지 등에 다양하게 적용된다.
// 위에 구현한 함수는 간략하게 구현하여 완전하지 못하다. 따라서 실무에서는 Underscore의 debounce함수나, Lodash의 debounce함수 사용을 권장한다.


// 스로틀 - 짧은 시간 간격으로 이벤트가 연속해서 발생해도 일정시간간격에 맞게 최대 한번만 호출되도록 한다.
// 스크롤이벤트 처럼 짧은 시간간격으로 과도하게 많은 이벤트가 발생하는 경우 스로틀 함수로 그룹화하여 일정시간간격에 맞게 이벤트 핸들러가 호출 되도록 한다.
// 위에 구현한 함수는 간략하게 구현하여 완전하지 못하다. 따라서 실무에서는 Underscore의 throttle함수나, Lodash의 throttle함수 사용을 권장한다.