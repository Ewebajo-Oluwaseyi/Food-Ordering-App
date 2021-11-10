import React from 'react';

import {Route, Redirect, withRouter} from 'react-router-dom'

const Authmiddleware = ({
    component: Component,
    layout: Layout
}) => (
    <Route  render={props => localStorage.getItem("token") ? (
        <Layout>
        <Component {...props}/>
        </Layout>
    ) : (
        <Redirect to='/login'/>
    )} />
)


export default withRouter(Authmiddleware);