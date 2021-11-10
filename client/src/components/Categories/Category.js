import React from 'react';
import {NavLink} from 'react-router-dom'

const Category = (props) => {

    return (
        <NavLink
            to={props.path}
            className=""
            activeClassName=""
        >
            {props.children}
        </NavLink>
    )
}


export default Category;