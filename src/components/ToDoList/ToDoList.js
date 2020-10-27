import React from 'react';
import './ToDoList.css';
import AddTaskDialog from './AddTaskDialog/AddTaskDialog';
import ToDoItem from './ToDoItem/ToDoItem';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';


class ToDoList extends React.Component {
    state={
        dialogIsOpen:false,
        currentTask:''
    }
    openDialogHandler = () => {
        this.setState({dialogIsOpen:true});
    }
    openChangeDialogHandler = (task) => {
        this.setState({dialogIsOpen:true, currentTask:task})
        
    }
    closeDialogHandler = () => {
        this.setState({dialogIsOpen:false, currentTask: ''});
    }
    addCloseDialogHAndler = (task) => {
        this.setState({dialogIsOpen:false});
        this.props.onTaskAdd(task);
    }
    changeDialogHAndler = (task) => {
        this.setState({dialogIsOpen:false, currentTask: ''});
        this.props.onTaskChange(task);
    }

    

    render() { 
        return (

        <div>
            <AppBar position="fixed" className='appStyle'>
                <Toolbar >
                <IconButton color="inherit" >
                        <ArrowBackIcon onClick={this.props.onBack} className='buttonStyle'> 
                        </ArrowBackIcon>     
                </IconButton>
                <Typography variant="h6">
                    {this.props.date.
                        toLocaleDateString('en-GB',
                        {day:'numeric', month:'long', year:'numeric'})}
                </Typography>
                   
                </Toolbar>
            </AppBar>
        

            <div className='listPadding'>
                {/* <div className='ToDoListClass'> */}
                <List>
                    {this.props.tasks.map((localTask, index) =>
                    <ToDoItem
                            key={index}
                            task={localTask}
                            changeItem={this.openChangeDialogHandler}
                            onToggleTask={this.props.onToggleTask}
                            deleteItem={this.props.deleteItem}/>)}
                </List>
            </div>

            <div>
                    <Fab color="primary" aria-label="add" 
                         onClick={this.openDialogHandler}
                         className='addStyle'>
                        <AddIcon />
                    </Fab>
            </div>
            
            {this.state.dialogIsOpen ? <AddTaskDialog 
                        date = {this.props.date}
                        open={this.state.dialogIsOpen}
                        onClose={this.closeDialogHandler}
                        onAdd={this.addCloseDialogHAndler}
                        onChange={this.changeDialogHAndler}
                        taskForChange={this.state.currentTask}/> : null}

            
        </div>
    );
}
}
export default ToDoList;