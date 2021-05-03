import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Forms from '../../elements/Forms';
import {getDateObject} from '../../elements/DatePicker/dateUtils'

import './taskmenu.scss'

export const TaskMenu = ({ data, setUpdatedTask, setDeleteTask }) => {

    const [showForms, setShowForms] = useState(false)
    const handleSubmit = (data, id) => {
        console.log(data, id,'handleSubmit')
        setUpdatedTask(data, id)
        setShowForms(false)
    }
    const handleCancel = () => {
        setShowForms(false)
    }
    const handleDelete = (id) => {
        setShowForms(false)
        setDeleteTask(id)
    }
    return (
        <>
            {!showForms && <div className='taskmenu--wrapper'>
                <div className='taskmenu--description'>
                    <span className='taskmenu--task'>
                        {data['task_msg']}
                    </span>
                    <span className='taskmenu--date'>
                        {getDateObject(data['task_date']).format("MM/DD/YYYY")}
                    </span>
                </div>
                <div className='taskmenu--actions'>
                    <button className='taskmenu--btn-edit' onClick={() => { setShowForms(true) }}><EditIcon/></button>
                    <button><NotificationsActiveIcon/></button>
                    <button><DoneIcon/></button>
                </div>
            </div>}
            {showForms && <Forms data={data} handleSubmit={handleSubmit} isNewTask={false} handleDelete={handleDelete} handleCancel={handleCancel}/>}
        </>
    )
}