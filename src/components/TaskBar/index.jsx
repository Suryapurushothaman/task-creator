import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Forms from '../../elements/Forms';
import { TaskMenu } from '../TaskMenu'
import {TODAY,INITIAL_TIME} from '../../elements/DatePicker/dateUtils'
import {toSeconds} from '../../utility/timeUtils'
import { getAuthToken,getAllTask, setNewTask,setUpdatedTask,setDeleteTask,getUserId } from '../../redux/actions'
import './taskbar.scss'
const TaskBar = (props) => {
    const { getAuthToken,getUserId,getAllTask, setNewTask, tasks,setUpdatedTask,setDeleteTask } = props
    const [showForms, setShowForms] = useState(false)
    useEffect(() => {
        const data = { email: 'spicebluetest2@gmail.com', password: '12345678' }
        getAuthToken(data)
        getUserId()
        getAllTask()
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
        assigned_user: 'USER',
        task_date: TODAY,
        task_time: toSeconds(INITIAL_TIME),
        is_completed: 0,
        time_zone: Math.abs(new Date().getTimezoneOffset()*60),
        task_msg: 'Follow up',
    }
    return (
        <div className='taskbar'>
            <div className='taskbar--header'>
                <span className='taskbar--label'>Tasks {tasks.length}</span>
                <button className='taskbar--add-task' onClick={() => { setShowForms(true) }}><AddBoxIcon /></button>
            </div>
            {showForms && <Forms handleSubmit={handleSubmit} handleCancel={handleCancel} data={defaultData} isNewTask={true} />}
            {tasks.map((t, id) => {
                return <TaskMenu key={id} data={t} setUpdatedTask={setUpdatedTask} setDeleteTask={setDeleteTask}/>
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
    getUserId,
    getAllTask
  }
export default connect(mapStateToProps, mapDispatchToProps)(TaskBar)