import { DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCTS } from "../actions/types";


const initialState = {
    products: [],
    product: {},
    loading: true
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    switch(action.type){
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case DELETE_PRODUCT:
            return{
                ...state,
                products: state.products.filter(product => product.productIdentifier !== action.payload)
            }
            default:
                return state;
    }
}