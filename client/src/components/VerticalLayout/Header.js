import React, {useState, useEffect} from 'react';

import {Link} from 'react-router-dom'

import {connect} from 'react-redux'

import logoDark from '../../assests/images/images.png'
import Food from '../../assests/images/food.jpg'

import LanguageDopdown from '../TopbarDropdown/LanguageDropdown'

import NotificationDropdown from '../TopbarDropdown/NotificationDropdown';

import ProfileMenu from '../TopbarDropdown/ProfileMenu'

import {showRightSidebarAction,toggleLeftmenu,changeSidebarType} from '../../store/actions'
import stateWrapper from "../../containers/provider";


const Header = (props) => {


    const [state, setState] = useState("");
    //const[order, setOrder] = useState("")
    const isMobile =  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    function tToggle(){
        props.toggleLeftmenu(!props.leftMenu);
        if(props.leftSideBarType === 'default'){
            props.changeSidebarType("condensed", isMobile)
        } else if(props.leftSideBarType === "condensed"){
            props.changeSidebarType("default", isMobile)
        }
    }

    const searchHandler = (e) => {
        e.preventDefault();

        setState("")
        if (state === "") return;
    }

    useEffect(() => {

        props.orderStore.fetchOrder();


    }, [props.orderStore])

    let orderData = props.orderStore.state.sessionData.orders;


    return (
        <React.Fragment>
            <header>
                <div id="page-topbar">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <Link to="/" className="navbar-brand-box">

                                <div className="logo logo-light">
                                <span className="logo-sm">
                                <img src={Food} alt="" height="70" width="70" />
                                </span>
                                <span className="logo-lg">
                                <img src={Food} alt="" height="40"  />
                                S-Food
                                </span>
                                </div>
                            </Link>
                            <button type="button" onClick={() => {tToggle()}} className=" btn btn-sm px-1 font-size-16 header-item waves-effect" id="vertical-menu-btn">
                                <i className="fa fa-fw fa-bars"></i>
                            </button>
                            <Link to="/">
                                <span className="logo-show">
                                <img src={Food} alt="" height="50" width="50" />
                                </span>
                            </Link>

                        </div>
                        <form className="search">
                            <input
                                type="text"
                                value={state}
                                onChange={(event) => setState(event.target.value)}
                                placeholder="Search Food..."
                                className="search-input"
                            />
                            <span onClick={searchHandler}>
                                <Link
                                to={`/popular/${state.toLowerCase()}`}
                                className="search-icon"
                                style={state === "" ? { pointerEvents: "none" } : null}
                                >
                                    <i className="fas fa-search text-warning"></i>
                                </Link>
                            </span>
                        </form>
                        <div className="d-flex">

                          <div className="headercart">
                              <span className="cartno">{orderData && orderData.reduce((sum, c) =>
                                                sum + c.quantity, 0)}</span>
                              <div className="square">
                              <Link to="/cart" className="linkcart">
                              <i className="fas fa-shopping-cart fa-2x text-warning"></i>
                              </Link>
                              </div>


                        </div>


                            {/*<NotificationDropdown/>*/}
                            <ProfileMenu/>

                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const { layoutType,showRightSidebar,leftMenu,leftSideBarType } = state.Layout;
  return { layoutType,showRightSidebar,leftMenu,leftSideBarType };
}

export default connect(mapStateToProps, {showRightSidebarAction,toggleLeftmenu,changeSidebarType})(stateWrapper(Header))
