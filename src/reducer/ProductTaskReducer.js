import {} from "../actions/ProductActions"
import { DELETE_PRODUCT_TASK, GET_ALL_PRODUCT_TASKS, GET_PRODUCT_TASK, GET_PRODUCT_TASKS } from "../actions/types"

const initialState = {
    product_tasks: [],
    product_task: {},
    all_products_tasks: [],
    loading: true
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    switch(action.type){
        case GET_PRODUCT_TASK:
            return {
                ...state,
                product_task: action.payload,
                loading: false
            }
        case GET_PRODUCT_TASKS:
            return {
                ...state,
                product_tasks: action.payload,
                loading: false
            }
        case GET_ALL_PRODUCT_TASKS:
            return {
                ...state,
                all_products_tasks: action.payload,
                loading: false
            }
        case DELETE_PRODUCT_TASK:
            return{
                ...state,
                product_tasks: state.product_tasks.filter(product_task => product_task.productSequence !== action.payload)
            }
            default:
                return state;
    }
}