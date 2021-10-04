import { DELETE_CLIENT, GET_CLIENT, GET_CLIENTS } from "../actions/types";

const initialState = {
    clients: [],
    client: {},
    loading: true
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    switch(action.type){
        case GET_CLIENT:
            return {
                ...state,
                client: action.payload,
                loading: false
            }
        case GET_CLIENTS:
            return {
                ...state,
                clients: action.payload,
                loading: false
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