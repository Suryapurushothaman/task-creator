import {
  ADD_NEW_TASK, UPDATE_TASK, DELETE_TASK
} from "../actions/actionTypes";

const initialState = { tasks: [] };

function reducers(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case ADD_NEW_TASK:
      return { ...state, tasks: [payload, ...state.tasks] };

    case UPDATE_TASK:
      const updatedTasks = [...state.tasks]
      updatedTasks[payload.id] = payload.data
      return { ...state, tasks: updatedTasks };

    case DELETE_TASK:
      const newTasks = [...state.tasks]
      newTasks.splice(payload, 1)
      return { ...state, tasks: newTasks };

    default:
      return state;
  }
};

export default reducers;