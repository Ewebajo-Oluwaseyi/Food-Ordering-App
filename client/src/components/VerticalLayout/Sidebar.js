import React from 'react';

import {connect} from 'react-redux';
import SimpleBar from 'simplebar-react'


import {withRouter} from 'react-router-dom';

import SidebarContent from './SidebarContent'

const Sidebar = (props)=> {

    return (
        <React.Fragment>
            <div className="vertical-menu">
                <data>
                <SidebarContent/>
                </data>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return{
      layout: state.Layout
    }
  }

export default connect(mapStateToProps,{})(withRouter(Sidebar))
