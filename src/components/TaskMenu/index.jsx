import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Forms from '../../elements/Forms';

import './taskmenu.scss'

export const TaskMenu = ({ data, taskId, setUpdatedTask, setDeleteTask }) => {

    const [showForms, setShowForms] = useState(false)
    const handleSubmit = (data, id) => {
        setUpdatedTask(data, id)
        setShowForms(false)
    }
    const handleCancel = () => {
        setShowForms(false)
    }
    const handleDelete = (id) => {
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
                        {data['task_date']}
                    </span>
                </div>
                <div className='taskmenu--actions'>
                    <button className='taskmenu--btn-edit' onClick={() => { setShowForms(true) }}><EditIcon/></button>
                    <button><NotificationsActiveIcon/></button>
                    <button><DoneIcon/></button>
                </div>
            </div>}
            {showForms && <Forms data={data} handleSubmit={handleSubmit} formsID={taskId} handleDelete={handleDelete} handleCancel={handleCancel}/>}
        </>
    )
}