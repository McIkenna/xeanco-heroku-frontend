import { DELETE_ABOUT, GET_ABOUT, GET_ABOUTS } from "../actions/types";

const initialState = {
    abouts: [],
    about: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    switch(action.type){
        case GET_ABOUT:
            return {
                ...state,
                about: action.payload
            }
        case GET_ABOUTS:
            return {
                ...state,
                abouts: action.payload
            }
        case DELETE_ABOUT:
            return{
                ...state,
                abouts: state.abouts.filter(about => about.id !== action.payload)
            }
            default:
                return state;
    }
}