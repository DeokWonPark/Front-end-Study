import React, { PureComponent } from 'react';

class Nav extends PureComponent {
    habit_count(){
        const count=this.props.habits.filter((habit)=>habit.count>0);
        return count.length;
    }
    render() {
        console.log("nav")
        return <header className="navbar">
            <i className="fas fa-leaf navbar-logo"></i>
            <span>Habit Tracker</span>
            <span className="navbar-count">{this.habit_count()}</span>
        </header>
    }
}

export default Nav;