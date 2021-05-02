import { useState } from 'react'
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DatePicker from '../DatePicker'
import DropDown from '../DropDown'
import './forms.scss'

const Forms = ({ handleSubmit,handleCancel, data = {}, formsID, handleDelete = () => { } }) => {
    const [formdata, setFormData] = useState(data)
    const users = ['Ram', 'Dinesh', 'Kumar']

    const timeGenerator = (startTime = 0, interval = 30) => {
        var x = interval; //minutes interval
        var times = []; // time array
        var tt = startTime; // start time
        var ap = ['AM', 'PM']; // AM-PM

        //loop to increment the time and push results in array
        for (var i = 0; tt < 24 * 60; i++) {
            var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
            var mm = (tt % 60); // getting minutes of the hour in 0-55 format
            times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
            tt = tt + x;
        }

        return times;
    }
    const toSeconds = (t) => {
        const isPM = t.indexOf('PM');
        const time = isPM > -1 ? t.replace('PM', '') : t.replace('AM', '')
        let timeArr = time.split(':')
        timeArr[0] = timeArr[0] * 60 * 60;
        timeArr[1] = timeArr[1] * 60
        let seconds = timeArr[0] + timeArr[1]
        if (isPM > -1) {
            seconds = seconds + (12 * 60 * 60)
        }
        return seconds

    }
    const handleTimeCallback = (time) => {
        setFormData({ ...formdata, task_time: toSeconds(time) })
    }
    const handleUserCallback = (user) => {
        setFormData({ ...formdata, assigned_user: user })
    }
    const handleDateCallback = (date) => {
        setFormData({ ...formdata, task_date: date })
    }
    const handleDescription = (e) => {
        setFormData({ ...formdata, task_msg: e.target.value })
    }
    return (
        <form className='forms'>
            <div className='forms--description'>
                <label className='forms--label'>Task Description</label>
                <input type='text' id='task-description' placeholder={data['task_msg'] || ''} onBlur={handleDescription} />
            </div>
            <div className='forms--date-time'>
                <div>
                    <label className='forms--label'>Date</label>
                    <DatePicker handleDateCallback={handleDateCallback} initialDate={data['task_date']} />
                </div>
                <div>
                    <label className='forms--label'>Time</label>
                    <span className="forms--timepicker-icon">
                        <AccessAlarmsIcon />
                    </span>
                    <DropDown values={timeGenerator()} handleSelectionCallback={handleTimeCallback} defaultValue='Time'/>
                </div>
            </div>
            <div className='forms--assign-user'>
                <label className='forms--label'>Assign User <span className='forms--dropdown-icon'><ArrowDropDownIcon /></span></label>
                <DropDown values={users} handleSelectionCallback={handleUserCallback} defaultValue={data['assigned_user']}/>
            </div>
            <div className='forms--button-group'>
                <button type='button' className='forms--btn-cancel' onClick={()=>{handleCancel()}}>
                    cancel
            </button>
                <button type='button' className='forms--btn-submit' onClick={() => { handleSubmit(formdata, formsID) }}>
                    Submit
            </button>
            </div>
            {formsID !== '' && <button type='button' className='forms--btn-delete' onClick={() => { handleDelete(formsID) }}><DeleteIcon/></button>}
        </form>
    )
}
export default Forms
