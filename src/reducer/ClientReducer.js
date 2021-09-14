import { DELETE_CLIENT, GET_CLIENT, GET_CLIENTS } from "../actions/types";

const initialState = {
    clients: [],
    client: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    switch(action.type){
        case GET_CLIENT:
            return {
                ...state,
                client: action.payload
            }
        case GET_CLIENTS:
            return {
                ...state,
                clients: action.payload
            }
        case DELETE_CLIENT:
            return{
                ...state,
                clients: state.clients.filter(client => client.id !== action.payload)
            }
            default:
                return state;
    }
}