import {
  GET_ALL_TASK,ADD_NEW_TASK, UPDATE_TASK, DELETE_TASK
} from "../actions/actionTypes";

const initialState = { tasks: [] };

function reducers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case GET_ALL_TASK:
      return { ...state, tasks: [...payload] };
    case ADD_NEW_TASK:
      return { ...state, tasks: [payload, ...state.tasks] };

    case UPDATE_TASK:
      const updatedTasks = state.tasks.map( tsk => {return tsk.id === payload.id ? payload : tsk})
      return { ...state, tasks: updatedTasks };

    case DELETE_TASK:

      return { ...state, tasks: state.tasks.filter(tsk=> tsk.id !== payload ) };

    default:
      return state;
  }
};

export default reducers;