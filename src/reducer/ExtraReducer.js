import { DELETE_EXTRA, GET_EXTRA, GET_EXTRAS } from "../actions/types";

const initialState = {
    extras: [],
    extra: {},
    loading: true
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    switch(action.type){
        case GET_EXTRA:
            return {
                ...state,
                extra: action.payload,
                loading: false
            }
        case GET_EXTRAS:
            return {
                ...state,
                extras: action.payload,
                loading: false
            }
        case DELETE_EXTRA:
            return{
                ...state,
                extras: state.extras.filter(extra => extra.id !== action.payload)
            }
            default:
                return state;
    }
}