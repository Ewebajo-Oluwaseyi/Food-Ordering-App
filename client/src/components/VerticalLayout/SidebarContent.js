import React, {useEffect} from 'react';

import {Link} from 'react-router-dom'
import { withRouter } from "react-router-dom";
import MetisMenu from 'metismenujs'
import stateWrapper from "../../containers/provider";

const SidebarContent = (props) => {

    useEffect(() => {

        props.orderStore.fetchOrder();

        //eslint-disable-next-line
    }, [])
    let orderData = props.orderStore.state.sessionData.orders;
    /*useEffect(() => {
        var pathName = props.location.pathname

    const initMenu = () => {
        new MetisMenu("#side-menu");
        var matchingMenuItem = null;
        var ul = document.getElementById("side-menu")
        var items = ul.getElementsByTagName("a")

        for(var i = 0; i < items.length; ++i){
            if(pathName === items[1].pathname){
                matchingMenuItem = items[i];
                break;
            }
            if(matchingMenuItem){
                activeParentDropdown(matchingMenuItem)
            }
        };
    }; initMenu();
    }, []);

    function activeParentDropdown(item){
        item.classList.add("active");

    }*/

    return(
    <React.Fragment>
        <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
                <li className="menu-title">Menu</li>

                <li>
                    <Link to="/popular/jollof" className="waves-effect">
                    <i className="bx bx-food-menu"></i>
                        <span>Order</span>
                    </Link>
                </li>
                <li>
                    <Link to="/cart" className="waves-effect">
                    <div className="sidebarcartno">{orderData && orderData.reduce((sum, c) =>
                                                sum + c.quantity, 0)}</div>
                        <i className="bx bxs-cart"></i>
                        <span>Cart</span>
                    </Link>
                </li>
                <li>
                    <Link to="/profile" className="waves-effect">
                    <i className="bx bxs-user-detail"></i>
                        <span>Profile</span>
                    </Link>
                </li>
                <li>
                    <Link to="/payment" className="waves-effect">
                    <i className="bx bx-money"></i>
                        <span>Payment</span>
                    </Link>
                </li>
            </ul>
        </div>
    </React.Fragment>
    )
}

export default withRouter(stateWrapper(SidebarContent));