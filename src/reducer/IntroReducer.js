import { DELETE_INTRO, GET_INTRO, GET_INTROS } from "../actions/types";

const initialState = {
    intros: [],
    intro: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    switch(action.type){
        case GET_INTRO:
            return {
                ...state,
                intro: action.payload
            }
        case GET_INTROS:
            return {
                ...state,
                intros: action.payload
            }
        case DELETE_INTRO:
            return{
                ...state,
                intros: state.intros.filter(intro => intro.id !== action.payload)
            }
            default:
                return state;
    }
}