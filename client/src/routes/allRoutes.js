import React from 'react'
import Profile from '../pages/Profile/Profile';
import Cart from '../pages/Cart/index';
import Order from '../pages/Order/order'
import Login from '../pages/Auth/login';
import Logout from '../pages/Auth/logout'
import Register from '../pages/Auth/register'
import Payment from '../pages/Payment/Payment'
import {Redirect} from 'react-router-dom'

const userRoutes = [
    {path: "/profile", component: Profile},
    {path: "/cart", component: Cart},
    {path: "/popular/jollof", component: Order},
    {path: "/popular/:food", component: Order},
    {path: "/popular/viewall/:food", component: Order},
    {path: "/payment", component: Payment},

    { path: "/", exact: true, component: () => <Redirect to="/popular/jollof" /> }
]

const authRoutes = [
    {path: "/login", component: Login},
    {path: "/register", component: Register},
    {path: "/logout", component: Logout}

]

export {userRoutes, authRoutes}