import axios from 'axios';
import { GET_FEATURE, GET_FEATURES, DELETE_FEATURE, GET_ERRORS, GET_FEATURE_TASK } from './types';

import { proxy } from '../components/Constant/Proxy';

export const createFeature = (feature, history) => async dispatch => {
    try{
        await axios.post(`${proxy}/admin/feature`, feature)
        history.push("/")
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getFeatures = () => async dispatch => {
    const res = await axios.get(`${proxy}/api/feature/all`)
    dispatch({
        type: GET_FEATURES,
        payload: res.data

    })
}

export const getFeature = (featureId, history) => async dispatch => {
    try{
        const res = await axios.get(`${proxy}/api/feature/${featureId}`)
        dispatch({
            type: GET_FEATURE,
            payload: res.data
        });
    }catch(error){
        history.push("/");
    }
}

export const updateFeature = (feature, history) => async dispatch => {
    try{
        await axios.put(`${proxy}/admin/feature`, feature)
        history.push("/")
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const deleteFeature = id => async dispatch => {
    if(window.confirm("Are you sure?"))
    {
        await axios.delete(`${proxy}/admin/feature/${id}`)
        dispatch({
            type: DELETE_FEATURE,
            payload: id
        })

    }
}

export const getFeatureTask = (featureTaskId, history) => async dispatch => {
    try{
        const res = await axios.get(`${proxy}/api/task/${featureTaskId}`)
        dispatch({
            type: GET_FEATURE_TASK,
            payload: res.data
        });
    }catch(error){
        history.push("/");
    }
}