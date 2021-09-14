import axios from "axios"
import { DELETE_CLIENT, GET_CLIENT, GET_CLIENTS, GET_ERRORS } from "./types";
import { proxy } from "../components/Constant/Proxy";

export const createClient = (client, history) => async dispatch => {
    try{
        await axios.post(`${proxy}/admin/client`, client)
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

export const getClients = () => async dispatch => {
    const res = await axios.get(`${proxy}/api/client/all`)
    dispatch({
        type: GET_CLIENTS,
        payload: res.data

    })
}

export const getClient = (id, history) => async dispatch => {
    try{
        const res = await axios.get(`${proxy}/api/client/${id}`)
        dispatch({
            type: GET_CLIENT,
            payload: res.data
        });
    }catch(error){
        history.push("/");
    }
}

export const deleteClient = id => async dispatch => {
    if(window.confirm("Are you sure?"))
    {
        await axios.delete(`${proxy}/admin/client/${id}`)
        dispatch({
            type: DELETE_CLIENT,
            payload: id
        })
    }
}

