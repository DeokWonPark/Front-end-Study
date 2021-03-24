export default class Component{
    $target;
    $state;
    $props;
    constructor($target){
        this.$target=$target;
        this.setup();
        this.render();
        this.setEvent();
    }
    setup(){};
    mounted () {};
    templete(){return '';}
    render(){
        this.$target.innerHTML=this.templete();
        this.mounted();
    }
    setEvent(){}
    setState(newState){
        this.$state={...this.$state, ...newState};
        this.render();
    }
}