import { GET_FEATURE_TASK } from "../actions/types";


const initialState = {
    feature_task : {}
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action){
    switch(action.type){
        case GET_FEATURE_TASK: 
        return{
            ...state,
            feature_task: action.payload
        }
        default:
            return state
    }
}