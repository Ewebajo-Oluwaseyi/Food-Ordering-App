import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// users
import user1 from "../../assests/images/users/avatar-1.jpg";

import stateWrapper from "../../containers/provider";

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);


  useEffect(() => {
    props.userStore.fetchUser();


  }, [props.userStore]);
  let userData = props.userStore.state.sessionData.user;

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <i className="bx bx-user font-size-24 rounded-circle header-profile-user"></i>
          <span className="d-none d-xl-inline-block ml-2 mr-1">{userData && userData.name}</span>

        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle mr-1"></i>
            Profile{" "}
          </DropdownItem>
          <div className="dropdown-divider"></div>
          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
            <span>Logout</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};


export default stateWrapper(withRouter(
  (ProfileMenu)
));
