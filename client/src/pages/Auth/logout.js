import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../store/auth/login/actions';

const Logout = (props) => {

    useEffect(() => {
      props.logoutUser(props.history);
      localStorage.removeItem("token")
      localStorage.removeItem("total")
      props.history.push("/login");
    });

    return (
      <></>
    );
}

export default withRouter(
    connect(
        null,
        { logoutUser }
    )(Logout)
);
