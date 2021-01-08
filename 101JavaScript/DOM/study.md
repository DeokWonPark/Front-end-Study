성능을 보장하기 위한 랜더링 과정
Critical Rendering Path
 [ Dom -> cssom -> RenderTree ]  =>   [ layout -> paint -> composition ]
성능을 높이기 위해서 불필요한 태그의 사용을 줄여야한다.
또한, layout단계가 자주 발생한다면 성능악화를 일으키기 때문에 CSS Triggers의 속성들을 잘 따져가면서 작성해야한다.