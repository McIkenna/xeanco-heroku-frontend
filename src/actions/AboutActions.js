import axios from "axios"
import { DELETE_ABOUT, GET_ABOUT, GET_ABOUTS, GET_ERRORS} from "./types";
import { proxy } from "../components/Constant/Proxy";

export const createAbout = (about, history) => async dispatch => {
    try{
        await axios.post(`${proxy}/admin/about`, about)
        history.push("/about")
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

export const getAbouts = () => async dispatch => {
    const res = await axios.get(`${proxy}/api/about/all`)
    dispatch({
        type: GET_ABOUTS,
        payload: res.data

    })
}

export const getAbout = (id, history) => async dispatch => {
    try{
        const res = await axios.get(`${proxy}/api/about/${id}`)
        dispatch({
            type: GET_ABOUT,
            payload: res.data
        });
    }catch(error){
        history.push("/");
    }
}

export const deleteAbout = id => async dispatch => {
    if(window.confirm("Are you sure?"))
    {
        await axios.delete(`${proxy}/admin/about/${id}`)
        dispatch({
            type: DELETE_ABOUT,
            payload: id
        })
    }
}


