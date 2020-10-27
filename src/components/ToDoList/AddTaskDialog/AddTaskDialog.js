import React from 'react';
import './AddTaskDialog.css';

import {v4 as uuidv4} from 'uuid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {KeyboardTimePicker} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import { purple } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import { TextRotationAngledownTwoTone } from '@material-ui/icons';

const TealRadio = withStyles({
  root: {
    color: teal[800],
    '&$checked': {
      color: teal[900],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const PurpleRadio = withStyles({
  root: {
    color:purple[700],
    '&$checked': {
      color: purple[800],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[700],
    '&$checked': {
      color: red[800],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);


class AddTaskDialog extends React.Component {
constructor(props) {
    super(props);
    console.log(props);
    this.state = {
        selectedDate: props.taskForChange ? props.taskForChange.date : props.date,
        value: props.taskForChange ? props.taskForChange.value : '',
        color: props.taskForChange ? props.taskForChange.color : ''
      }
}
  
 handleDateChange=(newDate) => {
    this.setState({selectedDate:newDate});
 }

 handleInputChange=(event) => {
     this.setState({value:event.target.value});
 }
 handleAddClick=()=> {
     const newTask = {
        id: uuidv4(),
        date: this.state.selectedDate,
        value: this.state.value,
        checked: false,
        color:this.state.color
    };
    this.props.onAdd(newTask);
 }

 handleChangeClick=()=> {
    const updatedTask = {
       ...this.props.taskForChange,
       date: this.state.selectedDate,
       value: this.state.value,
       color:this.state.color
   };
   this.props.onChange(updatedTask);
}

handleColorChange=(event) => {
  this.setState({
    color: event.target.value
  })
};

  render() {
   return(
      <Dialog open={this.props.open} onClose={this.props.onClose} 
              aria-labelledby="form-dialog-title">
        { this.props.taskForChange ?
        <DialogTitle id="form-dialog-title">Change Task</DialogTitle> :
         <DialogTitle id="form-dialog-title">Add Task</DialogTitle> }
        <DialogContent>
            <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time:"
                color="primary"
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time'}}
            />
             <TextField
                id="standard-full-width"
                label="Add Task"
                fullWidth
                margin="normal"
                value={this.state.value}
                onChange={this.handleInputChange}
                inputProps={{
                  style: {color: this.state.color}
                }}
                
        />
        <div className='RadioButtons'>
                <TealRadio
                  checked={this.state.color === "teal"}
                  onChange={this.handleColorChange}
                  value="teal"
                  inputProps={{ 'aria-label': 'A' }}
                />
                <PurpleRadio
                  checked={this.state.color === "purple"}
                  onChange={this.handleColorChange}
                  value="purple"
                  inputProps={{ 'aria-label': 'B' }}
                />
                <RedRadio
                  checked={this.state.color === "red"}
                  onChange={this.handleColorChange}
                  value="red"
                  inputProps={{ 'aria-label': 'C' }}
                />
        </div>
        </DialogContent>

        <DialogActions>
           { this.props.taskForChange ?
            <Button onClick={this.handleChangeClick} color="primary">
            Change
          </Button> :
          <Button onClick={this.handleAddClick} color="primary">
            Add
          </Button>}
          <Button onClick={this.props.onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

  );
}
}

export default AddTaskDialog;