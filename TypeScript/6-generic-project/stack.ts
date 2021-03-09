{
    interface stack<T>{
        readonly size:number;
        push(value:T):void;
        pop():T;
    }
    
    type node<T>={
        value:T,
        next:node<T> | null,
    };

    class Stack<T> implements stack<T>{
        private header:node<T>;
        private _size=0;
    
        get size():number{
            return this._size;
        }
    
        push(value:T):void{
            const newNode:node<T>={
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
    
        pop():T{
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

    const sk=new Stack<number>();
    sk.push(3);
    sk.push(2);
    sk.push(1);
    sk.pop();
    sk.pop();
    sk.pop();
    //sk.pop();
    console.log(sk)
}