import React, {useState} from 'react';
import './DataPicker.css';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { DatePicker } from "@material-ui/pickers";



const DataPicker =(props) => {
    return (
    <>
        <div className='title'>DayByDay</div>
        
        <div className='Typo'>
                <div className='choose'>
                        Welcome, please pick the day!
                </div>
                <Paper elevation={3}>
                        <DatePicker
                                autoOk
                                orientation="landscape"
                                variant="static"
                                openTo="date"
                                value={props.date}
                                onChange={props.changeDate}
                                disableToolbar
                        />
                </Paper>
  
        </div>
    </>
    );
};

export default DataPicker;