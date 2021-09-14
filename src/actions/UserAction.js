import axios from "axios"
import { GET_USERS, GET_USER, DELETE_USER, GET_ERRORS, SET_CURRENT_USER } from "./types";
import { proxy } from "../components/Constant/Proxy";
import JwtToken from "../components/Security/JwtToken";
import jwt_decode from "jwt-decode"

export const createUser = (newUser, history) => async dispatch => {
    try{
        await axios.post(`${proxy}/admin/register`, newUser)
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

export const login = LoginRequest => async dispatch => {
    try{
        const res = await axios.post(`${proxy}/api/login`, LoginRequest);

        const{jwt} = res.data;

        localStorage.setItem("jwtToken", jwt)

        JwtToken(jwt)

       const decoded = jwt_decode(jwt);

       dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
       })

    }catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })

    }
}


export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    JwtToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    })
}