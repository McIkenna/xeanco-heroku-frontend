import { DELETE_INTRO, GET_INTRO, GET_INTROS } from "../actions/types";

const initialState = {
    intros: [],
    intro: {},
    loading: true
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    switch(action.type){
        case GET_INTRO:
            return {
                ...state,
                intro: action.payload,
                loading: false
            }
        case GET_INTROS:
            return {
                ...state,
                intros: action.payload,
                loading: false
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