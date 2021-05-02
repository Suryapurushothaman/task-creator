import {
  ADD_NEW_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from "./actionTypes";

import { getAccessTokenService, getUserIdService, addNewTaskService, updateTaskService, deleteTaskService } from "../services";

const BaseUrl = 'https://stage.api.sloovi.com';

export const getAuthToken = (data) => async () => {

  getAccessTokenService(`${BaseUrl}/login`, data)
    .then(res => {
      sessionStorage.setItem('access_token', JSON.stringify(res))
    })
    .catch(err => console.error(err));
};

export const getUserId = () => async () => {
  getUserIdService(`${BaseUrl}/user`)
    .then(res => {
      sessionStorage.setItem('user_id', JSON.stringify(res))
    })
    .catch(err => console.error(err));
};

export const setNewTask = (data) => async (dispatch) => {
  addNewTaskService(`${BaseUrl}/task/lead_58be137bfde045e7a0c8d107783c4598`, data)
    .then(() => {
      dispatch({
        type: ADD_NEW_TASK,
        payload: data,
      })
    })
    .catch(err => console.error(err));
};

export const setUpdatedTask = (data, id) => async (dispatch) => {
  updateTaskService(`${BaseUrl}/task/lead_58be137bfde045e7a0c8d107783c4598/${id}`, data)
    .then(() => {
      dispatch({
        type: UPDATE_TASK,
        payload: { data, id },
      })// JSON data parsed by `data.json()` call
    })
    .catch(err => console.error(err));
};

export const setDeleteTask = (id) => async (dispatch) => {
  deleteTaskService(`${BaseUrl}/task/lead_58be137bfde045e7a0c8d107783c4598/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_TASK,
        payload: id,
      })// JSON data parsed by `data.json()` call
    })
    .catch(err => console.error(err));
};

