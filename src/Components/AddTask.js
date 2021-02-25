import React from 'react'
import { useState } from "react";
const AddTask = ({ onAdd }) => {

    const [taskName, setTaskName] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    //Form Submit

    const formSubmit = (e) => {
        e.preventDefault();

        if(!taskName) {
            alert('Please enter a task name');
            return
        }
        onAdd ({taskName, day, reminder})
        setTaskName('');
        setDay('');
        setReminder(false);
    }

    return (
        <form className='add-form' onSubmit={formSubmit}>
            <div className='form-control'>
                <label>Task Name</label>
                <input type="text" 
                value={taskName}
                 onChange={(e) => setTaskName(e.target.value)}
                 placeholder="Add Task name"/>
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type="text"
                value={day} onChange={(e) => setDay(e.target.value)}
                 placeholder="Add Day & Time"/>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type="checkbox"
                checked={reminder} value={reminder}
                onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>
            <input type="submit" className="btn btn-block" value="Save Task"/>
        </form>
    )
}

export default AddTask
