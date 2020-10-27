import React, { Component } from 'react';

import DataPicker from './components/DataPicker/DataPicker';
import ToDoList from './components/ToDoList/ToDoList';
import Layout from './components/Layout/Layout';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


class App extends Component {
  state = {
    screenName: 'chooseDate',
    date: new Date(),
    tasks:(JSON.parse(localStorage.getItem('toDoItems')) || []).map((task) => 
          ({...task, date: new Date(task.date)
    }))
  }

  changeDateHandler =(newDate)=> {
    this.setState({screenName:'toDoList', date:newDate});
  }

  changeBackHandler =()=> {
    this.setState({screenName:'chooseDate'});
  }

  addTaskHandler=(task)=> {
    const copyTasks = [...this.state.tasks, task];
    this.setState({tasks:copyTasks});
    localStorage.setItem('toDoItems', JSON.stringify(copyTasks));
  }

  changeTaskHandler=(task)=> {
    const copyTasks = [...this.state.tasks];
    const index = copyTasks.findIndex((t) => t.id === task.id)
    copyTasks[index] = task;
    this.setState({tasks:copyTasks});
    localStorage.setItem('toDoItems', JSON.stringify(copyTasks));
  }

  toggleTaskHandler = (checked, task)=> {
    const copyTasks = [...this.state.tasks];
    const index = copyTasks.findIndex((t) => t.id === task.id)
    copyTasks[index] = {...task, checked: checked};
    this.setState({tasks:copyTasks});
    localStorage.setItem('toDoItems', JSON.stringify(copyTasks));
  }

  deleteItemHandler =(task)=> {
    const copyTasks = [...this.state.tasks];
    const index = copyTasks.findIndex((t) => t.id === task.id);
    copyTasks.splice(index, 1);
    this.setState({tasks:copyTasks});
    localStorage.setItem('toDoItems', JSON.stringify(copyTasks));
  }
  

  render() {
    const tasksForCurrentDate = this.state.tasks.filter((task)=> {
         let taskDate = task.date.toLocaleDateString('en-GB',
                     {day:'numeric', month:'long', year:'numeric'});
         let currentDate = this.state.date.toLocaleDateString('en-GB',
                     {day:'numeric', month:'long', year:'numeric'});
        return taskDate === currentDate;
   });

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          { this.state.screenName === 'chooseDate' ?
            <DataPicker date={this.state.date}
                        changeDate={this.changeDateHandler}
                /> 
              :  <ToDoList date={this.state.date}
                           onBack={this.changeBackHandler}
                           onTaskAdd={this.addTaskHandler}
                           tasks={tasksForCurrentDate}
                           onTaskChange={this.changeTaskHandler}
                           onToggleTask={this.toggleTaskHandler}
                           deleteItem={this.deleteItemHandler}
                           />
          }
        </MuiPickersUtilsProvider>
    );
  }
}

export default App;
