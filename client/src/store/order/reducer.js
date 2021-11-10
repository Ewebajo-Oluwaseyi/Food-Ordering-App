import { 
    ORDER_LIST_FAIL, 
    ORDER_LIST_REQUEST, 
    ORDER_LIST_SUCCESS
} 
from './actionType'

const initialState = {
    orders: null,
    loading: false,
    error: null,
}

function Order(state = initialState, action){
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return{
                loading: true,
            }
        case ORDER_LIST_SUCCESS:
            return{
                loading: false,
                orders: action.payload
                }
        case ORDER_LIST_FAIL: 
            return{
                loading: false,
                orders: action.payload
                }

        default:
            return {...state}
    }
}

export default Order