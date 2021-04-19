/**
 * DOM - HTML문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API,즉 프로퍼티와 메서드를 제공하는 트리 자료구조이다.
 */


 // DOM은 노드 객체의 계층적인 구조로 구성된다.
 //노드객체의 종류
 //1. document node - DOM트리의 최상위에 존재하는 루트노드로서 documment객체를 가리킨다.
 //document객체는 HTML문서 전체를 가리키는 객체로 전역객체 window의 document프로퍼티에 바인딩 되어있다.
 //document 객체는 DOM트리의 루트노드이므로 DOM트리의 노드들에 접근하기위한 진입점 역할을 한다.





 //HTMLCollection과 NodeList
 // DOM API가 여러개의 결과 값을 반환하기 위한 DOM컬렉션 객체 - 이터러블이면서 유사배열객체이다.
 // 상태변화를 실시간으로 반영하는 live객체다

 //1. HTMLCollection - live DOM 컬렉션 객체
 // getElementByTagName, getElementByClassName메서드가 반환한다.
 // 실시간으로 변경되기 때문에 부작용이 있다

 //2. NodeList - 실시간으로 노드 객체의 상태 변경을 반영하지 않는다.
 // querySelectorAll메서드가 반환한다.
 // childNodes 프로퍼티가 반환하는 NodeList객체는 HTMLCollection과 같이 실시간으로 상태변경을 반영하는 live객체이므로 주의가 필요하다.

 //따라서 노드 객체의 상태 변경과 상관없이 안전하게 DOM컬렉션을 사용하려면 HTMLCollection이나 NodeList객체를 배열로 변환하여 사용하는 것을 권장한다.**
 //스프레드 문법이나, Array.from으로 간단하게 배열로 변환이 가능하다.




 //노드 탐색 - 부모, 자식, 형재노드를 옮겨다니며 탐색

 //자식노드 탐색
 //1. Node.prototype.childNodes - 자식노드를 모두 탐색하여 NodeList에 담아 반환 -> 요소노드 뿐만아니라 텍스트 노드도 포함된다
 //2. Element.prototype.children - 자식 노드 중 요소노드만 담아 HTMLCollection반환
 //3. Node.prototype.firstChild - 첫 번째 자식노드를 반환 -> 텍스트노드이거나 요소노드이다.
 //4. Node.prototype.lastChild - 마지막 자식노드를 반환 -> 텍스트노드이거나 요소노드이다.
 //5. Element.prototype.firstElementChild - 첫 번째 자식 요소노드를 반환
 //6. Element.prototype.lastElementChild - 마지막 자식 요소노드를 반환
 //7. Node.prototype.hasChildNodes - 자식노드의 존재 유무에 따라 tuue/false반환 (텍스트 노드를 포함하여 자식 확인)
 // 자식노드 중 텍스트 노드가 아닌 요소가 존재하는지 확인하고 싶다면 children.length 또는 childElementCount프로퍼티를 사용


 // 부모노드 탐색
 // Node.prototype.parentNode프로퍼티를 사용 - 부모노드가 텍스트노드인 경우는 없다.


 //형제노드 탐색 - 부모노드가 같은 형제노드 탐색
 //1. Node.prototype.previousSibling - 자신의 이전 형제노드를 탐색 -> 텍스트노드 또는 요소노드
 //2. Node.prototype.nextSibling - 자신의 다음 형제노드를 탐색 -> 텍스트노드 또는 요소노드
 //3. Element.prototype.previousElementSibling - 자신의 이전 형제노드를 탐색 -> 요소노드만 반환
 //3. Element.prototype.nextElementSibling - 자신의 다음 형제노드를 탐색 -> 요소노드만 반환


 



 //노드 정보 취득
//1. Node.prototype.nodeType - 노드 타입을 나타내는 상수를 반환
// Node.ELEMENT_NODE = 1
// Node.TEXT_NODE = 3
// Node.DOCUMENT_NODE = 9

//2. Node.prototype.NodeName - 노드의 이름을 문자열로 반환한다.
// 요소노드 - 대문자 문자열로 반환 UL, LI
// 텍스트노드 - #text
// 문서노드 - #document





// 노드의 텍스트 조작
//1. Node.prototype.nodeValue
// 텍스트노드의 값을 읽고 변경이 가능하다.
// 요소노드나 문서노드를 참조하면 null을 반환한다.

//2. Node.prototype.textContent
// 선택한 요소노드의 텍스트, 모든 자손노드의 텍스트를 모두 취득하거나 변경한다.
// textContent프로퍼티에 문자열을 할당하면 요소노드의 모든 자식노드가 할당한 문자열로 변경된다
// 할당한 문자열에 HTML태그가 포함되더라도 일반 문자열로 인식한다.
// innerText와 유사한 동작을 하지만 innerText는 CSS에 순종적이라는 단점과 느리다는 단점으로 사용하지 않는 것을 권장한다.




// DOM조작 - 새로운 노드를 생성하여 DOM에 추가하거나 기존노드를 변경하는 것을 의미한다.
// DOM에 새로운 노드가 추가되거나 삭제되면 리플로우와 리페인트가 발생하는 원인이 된다.

//1. Element.prototype.innerHTML - HTML마크업을 취득하거나, 변경한다.
// HTML마크업이 파싱되어 요소의 자식노드로 DOM에 반영된다.
// 사용자로 부터 입력받은 데이터를 그대로 innerHTML프로퍼티에 할당하는 것은 크로스 사이트 스크립팅(XSS) 공격에 취약하다
// 입력한 프로퍼티를 통해서 자바스크립트 악성코드를 실행시킨다.
// HTML 새니티제이션 - 입력박은 데이터에 의해 XSS공격을 방지하기위해 잠재적 위험을 내포한 HTML마크업을 살균
{
    //DOMPurify.sanitize(`<img src='x' onerror='alert(document.cookie)'/>`)
}
// innerHTML은 새로운 요소를 추가하는 경우에도 기존노드를 포함하여 모든 자식 노드를 새롭게 그리므로 효율적이지 못하다.

//2. Element.prototype.insertAdjacentHTML(position, DOMString) - 기존의 요소를 제거하지 않으면서 삽입할 위치를 지정해 새로운 요소를 삽입한다.
// position - (beforebegin, afterbegin, beforeend, afterend) - 720p 그림 39-18
// HTML마크업 문자열을 파싱하므로 동일하게 XSS에 취약하다.

//3. 노드 생성과 추가 - DOM은 노드를 직접 생성/삽입/삭제/치환하는 메서드를 제공
// 생성 - Document.prototype.createElement(tagName) - tagName의 요소노드를 생성하여 반환
// 텍스트노드 생성 Document.prototype.createTextNode(text)
// 



// ** 복수의 노드 생성과 추가
//1. 반복문을 돌며 여러 번 추가 - 매번 리플로우와 리페인트가 발생하게되어 반복횟수만큼 리플로우와 리페인트가 발생한다.
{
    const $fruits = document.querySelector('#fruits');

    ['apple', 'banana', 'orange'].forEach(item => {
        const $li = document.createElement('li');
        $li.textContent=item;
        $fruits.appendChild($li); //매번 리플로우와 리페인트가 발생
    })
}

//2. div컨테이너를 만들고 한번에 append - 불필요한 컨테이너 태그가 생성된다.
{
    const $fruits = document.querySelector('#fruits');

    const $div = document.createElement('div');

    ['apple', 'banana', 'orange'].forEach(item => {
        const $li = document.createElement('li');
        $li.textContent=item;
        $div.appendChild($li);
    })
    $fruits.appendChild($div);
}

//3. DocumentFragment노드 - 부모노드가 없어 기존 DOM과 별도로 존재한다.
// DocumentFragment노드를 DOM에 추가하면 자신은 제거되고 자신의 자식노드만 DOM에 추가된다.
//1번의 리플로우, 리페인트
// 불필요한 태그 생성 X
{
    const $fruits = document.querySelector('#fruits');

    const $fragment = document.createDocumentFragment();

    ['apple', 'banana', 'orange'].forEach(item => {
        const $li = document.createElement('li');
        $li.textContent=item;
        $fragment.appendChild($li);
    })
    $fruits.appendChild($fragment);
}



// 노드이동 - 현재 DOM에 추가된 노드를 appendChild, insertBefore로 DOM에 다시 추가하면 DOM이 제거되어 이동한다.
// 노드 복사 - Node.prototype.cloneNode([deep:true | false]) - deep속성은 자손노드들을 포함 시킬지 여부를 결정
// 노드 교체 - Node.prototype.replaceChild(newChild, oldChild) - 자신을 호출한 노드의 자식을 다른노드로 교체
// 노드 삭제 - Node.prototype.removeChild(child)





// 어트리뷰트 - HTML문서가 파싱될 때 HTML요소의 어트리뷰트는 노드로 변환되어 요소노드와 연결된다
// Element.prototype.attributes - HTML요소의 어트리뷰트 취득
{
    const {attributes} = document.getElementById('user');
    console.log(attributes); //NamedNodeMap {0: type, 1: id, 2: value, type: type, id: id, value: value, length: 3}

    // 어트리뷰트 값 취득
    console.log(attributes.id.value); //user
    console.log(attributes.value.value); //ungmo
    console.log(attributes.type.value); //text
}
//어트리뷰트 값 취득 , 변경
{
    const $input = document.getElementById('user');

    const $inputValue = $input.getAttribute('value');
    console.log($inputValue); //ungmo

    $input.setAttribute('value','Heal the World');
}
// hasAttribute - 존재유무확인, removeAttribute - 어트리뷰트 제거


// DOM 프로퍼티 - 사용중 변경되는 HTML상태를 저장한다.
// 어트리뷰트는 HTML요소의 초기값을 가지고있다.
// 이렇게 요소노드는 어트리뷰트로 초기상태, DOM프로퍼티로 변경된 현재상태 두개를 관리하고있다. **
// 사용자 입력에 의한 상태변화와 관계있는 DOM프로퍼티만 최신 상태를 유지한다.
{
    const $input = document.getElementById('user');
    console.log($input.value);
    $input.addEventListener('input',()=>{
        console.log($input.value); //사용자의 입력으로 변경되는 값 출력 - 변경되어있는 최신상태
        console.log($input.getAttribute('value')); //고정된 초기값
    })
}


//data어트리뷰트와 dataset프로퍼티 - HTML요소에 정의한 사용자 정의 어트리뷰트와 자바스크립트 간 데이터 교환이 가능하다.
// data어트리뷰트 data- 접두사를 붙여 사용
{
    const users = [... document.querySelector('.users').children];

    //data-user-id 취득
    const user = users.find(user => user.dataset.userId === '7621'); //케밥케이스 -> 카멜케이스
     //data-role 취득
    console.log(user.dataset.role); //admin

    user.dataset.role = 'subscriber';
    console.log(user.dataset.role); //subscriber
}
