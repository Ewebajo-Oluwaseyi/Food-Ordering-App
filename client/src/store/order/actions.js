import axios from "axios";
import { 
    ORDER_LIST_FAIL, 
    ORDER_LIST_REQUEST, 
    ORDER_LIST_SUCCESS
} 
from "./actionType";
import setAuthToken from '../../containers/utils/setAuthToken'

export const fetchOrder = () => async (dispatch) => {
       
    try {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        dispatch({ type: ORDER_LIST_REQUEST});

        const res = await axios.get('/api/order');
        let order = JSON.stringify(res.data)
        

        dispatch({ type: ORDER_LIST_SUCCESS, payload: JSON.parse(order)})
    } catch (error) {

        dispatch({ type: ORDER_LIST_FAIL, payload: error.message})
    }
            
            


  
 }
