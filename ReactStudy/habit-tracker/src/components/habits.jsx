import React, { Component } from 'react';
import Habit from './habit';
import HabitAddForm from './habit_add_form';

class Habits extends Component {

    render() {
        console.log('habits')
        return (
            <div className="habits">
                <HabitAddForm onItemAdd={this.props.onItemAdd}/>
                <ul>
                    {this.props.habits.map((habit) =><Habit 
                        key={habit.id} 
                        habit={habit} 
                        onIncrement={this.props.onIncrement}
                        onDecrement={this.props.onDecrement}
                        onDelete={this.props.onDelete}
                    >
                    </Habit>)}
                </ul>
                <button className="habits-reset" onClick={this.props.onReset}>Reset All</button>
            </div>
        );
    }
}

export default Habits;