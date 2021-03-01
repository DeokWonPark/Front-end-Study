{
    interface stack{
        readonly size:number;
        push(value:string):void;
        pop():string;
    }
    
    type node={
        value:string,
        next:node | null,
    };

    class Stack implements stack{
        private header:node;
        private _size=0;
    
        get size():number{
            return this._size;
        }
    
        push(value:string):void{
            const newNode:node={
                value:value,
                next:null,
            }
    
            if(!this.header){
                this.header=newNode;
            }
            else{
                newNode.next=this.header;
                this.header=newNode;
            }
            this._size++;
        }
    
        pop():string{
            if(this.size<=0){
                throw new Error("Stack is empty");
            }
    
            const result=this.header.value;
            if(this.header.next){
                this.header=this.header.next;
            }
            this._size--;
            console.log(result);
            return result;
        }
    }

    const sk=new Stack();
    sk.push("park");
    sk.push("deok");
    sk.push("won");
    sk.pop();
    sk.pop();
    sk.pop();
    //sk.pop();
    console.log(sk)
}