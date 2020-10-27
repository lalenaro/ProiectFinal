import React from 'react';
import './ToDoItem.css';

import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';


const toDoItem =(props) => {
    const taskTime = props.task.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
    return (
    // className='ItemStyle'
   
        <ListItem className='itemStyle'>
        <ListItemIcon className='iconItem'>
                <Checkbox
                // defaultChecked
                // className='checkboxStyle'
                checked = {props.task.checked}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox'}}
                onChange = {(event)=> props.onToggleTask(event.target.checked, props.task)}
                />
        </ListItemIcon>
            
        <ListItemText className={props.task.checked ? 'lineThrough' : ''}
                      style={{color:props.task.color}} 
                   
                primary={<div className='itemList'><div className='span1'>{taskTime} </div>  
                           <div className='span2'>{props.task.value}</div></div>}
                onClick={() => props.changeItem(props.task)}>
        </ListItemText>

        <ListItemSecondaryAction onClick={()=> props.deleteItem(props.task)}>
                <DeleteForeverSharpIcon />
        </ListItemSecondaryAction>
        </ListItem>
  
);}

export default toDoItem;