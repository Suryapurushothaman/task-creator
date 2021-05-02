import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Forms from '../../elements/Forms';
import { TaskMenu } from '../TaskMenu'
import {TODAY} from '../../elements/DatePicker/dateUtils'
import { getAuthToken, setNewTask,setUpdatedTask,setDeleteTask,getUserId } from '../../redux/actions'
import './taskbar.scss'
const TaskBar = (props) => {
    const { getAuthToken,getUserId, setNewTask, tasks,setUpdatedTask,setDeleteTask } = props
    const [showForms, setShowForms] = useState(false)
    useEffect(() => {
        const data = { email: 'smithchery1@yahoo.com', password: '12345678' }
        getAuthToken(data)
        getUserId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleSubmit = (data) => {
        setNewTask(data)
        setShowForms(false)
    }
    const handleCancel = () => {
        setShowForms(false)
    }
    const defaultData = {
        assigned_user: 'Dinesh',
        task_date: TODAY,
        task_time: '',
        is_completed: '',
        time_zone: '',
        task_msg: 'Follow up'
    }
    return (
        <div className='taskbar'>
            <div className='taskbar--header'>
                <span className='taskbar--label'>Tasks {tasks.length}</span>
                <button className='taskbar--add-task' onClick={() => { setShowForms(true) }}><AddBoxIcon /></button>
            </div>
            {showForms && <Forms handleSubmit={handleSubmit} handleCancel={handleCancel} data={defaultData} formsID='' />}
            {tasks.map((t, id) => {
                return <TaskMenu key={id} data={t} taskId={id} setUpdatedTask={setUpdatedTask} setDeleteTask={setDeleteTask}/>
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return { ...state.data }
}
const mapDispatchToProps = {
    getAuthToken, 
    setNewTask,
    setUpdatedTask,
    setDeleteTask,
    getUserId
  }
export default connect(mapStateToProps, mapDispatchToProps)(TaskBar)