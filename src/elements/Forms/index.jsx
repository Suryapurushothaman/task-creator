import { useState,useEffect } from 'react'
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DatePicker from '../DatePicker'
import DropDown from '../DropDown'
import {toSeconds,secondsToHHMM,timeGenerator} from '../../utility/timeUtils'
import './forms.scss'

const Forms = ({ handleSubmit,handleCancel, data = {}, isNewTask=true, handleDelete = () => { } }) => {
    console.log(data,"@@@ Forms")
    const {task_time,assigned_user,task_date,is_completed,time_zone,task_msg} = data
    const [formdata, setFormData] = useState({task_time,assigned_user,task_date,is_completed,time_zone,task_msg})

    const users = ['User1','User2','User3']

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
                    <DropDown values={timeGenerator()} handleSelectionCallback={handleTimeCallback} defaultValue={secondsToHHMM(data['task_time'])}/>
                </div>
            </div>
            <div className='forms--assign-user'>
                <label className='forms--label'>Assign User</label>
                <span className='forms--dropdown-icon'><ArrowDropDownIcon /></span>
                <DropDown values={users} handleSelectionCallback={handleUserCallback} defaultValue={data['assigned_user']}/>
            </div>
            <div className='forms--button-group'>
                <button type='button' className='forms--btn-cancel' onClick={()=>{handleCancel()}}>
                    cancel
            </button>
                <button type='button' className='forms--btn-submit' onClick={() => { handleSubmit(formdata,data.id) }}>
                    Submit
            </button>
            </div>
            {!isNewTask  && <button type='button' className='forms--btn-delete' onClick={() => { handleDelete(data.id) }}><DeleteIcon/></button>}
        </form>
    )
}
export default Forms
