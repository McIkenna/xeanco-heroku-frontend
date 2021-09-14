import axios from "axios"
import { DELETE_EXTRA, GET_ERRORS, GET_EXTRA, GET_EXTRAS } from "./types";
import { proxy } from "../components/Constant/Proxy";

export const createExtra = (extra, history) => async dispatch => {
    try{
        await axios.post(`${proxy}/admin/extra`, extra)
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

export const getExtras = () => async dispatch => {
    const res = await axios.get(`${proxy}/api/extra/all`)
    dispatch({
        type: GET_EXTRAS,
        payload: res.data

    })
}

export const getExtra = (id, history) => async dispatch => {
    try{
        const res = await axios.get(`${proxy}/api/extra/${id}`)
        dispatch({
            type: GET_EXTRA,
            payload: res.data
        });
    }catch(error){
        history.push("/");
    }
}

export const deleteExtra = id => async dispatch => {
    if(window.confirm("Are you sure?"))
    {
        await axios.delete(`${proxy}/admin/extra/${id}`)
        dispatch({
            type: DELETE_EXTRA,
            payload: id
        })
    }
}