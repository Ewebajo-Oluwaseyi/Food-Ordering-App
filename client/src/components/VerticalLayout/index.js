import React, {Component} from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import { withRouter } from "react-router-dom";

import {connect} from 'react-redux'
import {changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth} from '../../store/actions'
import Food from '../../assests/images/food.jpg'

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)


        };
        this.toggleMenuCallback = this.toggleMenuCallback.bind(this);
      }

      componentDidMount(){
        if (this.props.isPreloader === false) {
          document.getElementById('preloader').style.display = "block";
          document.getElementById('status').style.display = "block";

          setTimeout(function () {
              document.getElementById('preloader').style.display = "none";
              document.getElementById('status').style.display = 'none'
          }, 2000)
      }
       else {
          document.getElementById('preloader').style.display = "none";
          document.getElementById('status').style.display = 'none'
       }


        if (this.props.leftSideBarTheme) {
          this.props.changeSidebarTheme(this.props.leftSideBarTheme);
        }

        if (this.props.layoutWidth) {
          this.props.changeLayoutWidth(this.props.layoutWidth);
        }

        if (this.props.leftSideBarType) {
          this.props.changeSidebarType(this.props.leftSideBarType);
        }
        if (this.props.topbarTheme) {
          this.props.changeTopbarTheme(this.props.topbarTheme);
        }

        document.title = "S-FoodApp";
        window.scrollTo(0, 0);
      }

      capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
      };



      toggleMenuCallback = () => {
        if(this.props.leftSideBarType === "default"){
          this.props.changeSidebarType("condensed", this.state.isMobile);
        } else if(this.props.leftSideBarType === "condensed"){
          this.props.changeSidebarType("default", this.state.isMobile)}
      }

      render(){
        return (
            <React.Fragment>
               <div id="preloader">
                    <div id="status">
                      <img src={Food} alt="" height="70" width="70" />
                    </div>
                </div>
                <div className="layout-wrapper">
                    <Header toggleMennuCallback={this.toggleMennuCallback}/>
                    <Sidebar theme={this.props.leftSideBarTheme}
                    type={this.props.leftSideBarType}
                    isMobile={this.state.isMobile}/>
                    <div className="main-content">
                    {this.props.children}
                    </div>
                    <Footer/>
                </div>
            </React.Fragment>
        )
}
}


const mapStatetoProps = state => {
  return{
    ...state.Layout
  }
}
export default connect(mapStatetoProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeTopbarTheme,
  changeLayoutWidth
})(withRouter(Layout));
