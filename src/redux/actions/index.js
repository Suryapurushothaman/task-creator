import {
  GET_ALL_TASK,
  ADD_NEW_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from "./actionTypes";

import { getAccessTokenService, getUserIdService, getAllTaskService, addNewTaskService, updateTaskService, deleteTaskService } from "../services";

const BaseUrl = 'https://stage.api.sloovi.com';

export const getAuthToken = (data) => async () => {

  getAccessTokenService(`${BaseUrl}/login`, data)
    .then(res => {
      sessionStorage.setItem('access_token', res.results.token)
    })
    .catch(err => console.error(err));
};

export const getUserId = () => async (data) => {
  getUserIdService(`${BaseUrl}/user`, data)
    .then(res => {
      sessionStorage.setItem('user_id', res.results.id)
      sessionStorage.setItem('user_name', res.results.first)
    })
    .catch(err => console.error(err));
};

export const getAllTask = (credentials) => async (dispatch) => {
  getAccessTokenService(`${BaseUrl}/login`, credentials)
    .then(res => {
      sessionStorage.setItem('access_token', res.results.token)
      getUserIdService(`${BaseUrl}/user`, res.results.token)
        .then((res) => {
          sessionStorage.setItem('user_id', res.results.id)
          sessionStorage.setItem('user_name', res.results.first)
          getAllTaskService(`${BaseUrl}/task/lead_04412ba1d622466cab1f0ad941fcf303`,sessionStorage.getItem('access_token'))
            .then((res) => {
              dispatch({
                type: GET_ALL_TASK,
                payload: res.results,
              })
            })
        })
    })
    .catch(err => console.error(err));
};
export const setNewTask = (data) => async (dispatch) => {
  addNewTaskService(`${BaseUrl}/task/lead_04412ba1d622466cab1f0ad941fcf303`, data,sessionStorage.getItem('access_token'))
    .then((res) => {
      dispatch({
        type: ADD_NEW_TASK,
        payload: res.results,
      })
    })
    .catch(err => console.error(err));
};

export const setUpdatedTask = (data, id) => async (dispatch) => {
  updateTaskService(`${BaseUrl}/task/lead_04412ba1d622466cab1f0ad941fcf303/${id}`, data,sessionStorage.getItem('access_token'))
    .then((res) => {
      dispatch({
        type: UPDATE_TASK,
        payload: res.results,
      })// JSON data parsed by `data.json()` call
    })
    .catch(err => console.error(err));
};

export const setDeleteTask = (id) => async (dispatch) => {
  deleteTaskService(`${BaseUrl}/task/lead_04412ba1d622466cab1f0ad941fcf303/${id}`,sessionStorage.getItem('access_token'))
    .then(() => {
      dispatch({
        type: DELETE_TASK,
        payload: id,
      })// JSON data parsed by `data.json()` call
    })
    .catch(err => console.error(err));
};

