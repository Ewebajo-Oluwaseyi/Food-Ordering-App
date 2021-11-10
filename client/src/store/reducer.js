import {combineReducers} from 'redux';

import Layout from "./layout/reducer";

import Login from "./auth/login/reducer";
import Order from './order/reducer'


const rootReducer = combineReducers({
    Layout,
    Login,
    Order
});

export default rootReducer