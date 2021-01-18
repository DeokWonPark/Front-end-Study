import React, { Component } from 'react';
import './app.css';
import Habits from './components/habits';
import Nav from './components/nav';

class App extends Component{
  state={
    habits:[
      {id:1, name:'Reading',count:0},
      {id:2, name:'Running',count:0},
      {id:3, name:'Coding',count:0},
    ],
    id_:5,
  }
  handleIncrement=(habit)=>{
    // const habits=[...this.state.habits]; //...은 spread operator 배열안의 모든 원소를 복사해 오는 연산자
    // const index=habits.indexOf(habit);
    // habits[index].count++;
    const habits=this.state.habits.map((item)=>{
      if(item.id===habit.id){
        return {...habit,count:habit.count+1};
      }
      return item;
    })
    this.setState({habits}) // this.setState({habits:habits})와 동일
  }

  handleDecrement=(habit)=>{
    // const habits=[...this.state.habits];
    // const index=habits.indexOf(habit);
    // if(habits[index].count===0){
    //     return;
    // }
    // habits[index].count--;
    const habits=this.state.habits.map((item)=>{
      if(item.id===habit.id){
        if(item.count>0){
          return {...habit,count:habit.count-1}
        }
        return item;
      } 
      return item;
    })
    this.setState({habits:habits}); 
  }

  handleDelete=(habit)=>{
    const habits=[...this.state.habits];
    const index=habits.indexOf(habit);
    habits.splice(index,1);
    this.setState({habits});
  }

  handleItemAdd=(text)=>{
    // console.log(`onAdd ${text}`);
    // const item={id:this.state.id_, name:text, count:0};
    // this.setState({id_:this.state.id_+1});

    // const habits=[...this.state.habits];
    // habits.push(item);
    // this.setState({habits});
    const habits=[...this.state.habits,{id:Date.now(),name:text,count:0}];
    this.setState({habits});
  }

  handleResetAll=()=>{
    const habits=this.state.habits.map((item)=>{
      if(item.count>0){
        return {...item,count:0}
      }
      return item;
    });
    this.setState({habits});
  }

  render(){
    console.log("app")
    return (
      <>

      <Nav habits={this.state.habits}></Nav>
      <Habits 
      habits={this.state.habits}
      onIncrement={this.handleIncrement}
      onDecrement={this.handleDecrement}
      onDelete={this.handleDelete}
      onItemAdd={this.handleItemAdd}
      onReset={this.handleResetAll}
      />

      </>
    );
  }
} 

export default App;
