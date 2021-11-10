import React, {Component} from 'react';
import VerticalLayout from './components/VerticalLayout/';
import NonAuthLayout from './components/NonAuthLayout'
import allStores from './containers';
import {Provider, Subscribe} from 'unstated';
import {userRoutes, authRoutes} from './routes/allRoutes';
import Authmiddleware from './routes/middleware/Authmiddleware'
import './assests/scss/app.scss';
import { Switch, BrowserRouter as Router,Route } from "react-router-dom";
import {connect} from 'react-redux'



class App extends Component  {

  constructor(props) {
		super(props);
		this.layoutStore = allStores[0];
		this.userStore = allStores[1];
	}

  appScreen = () => {
    const getLayout = () => {
      let layoutCls = VerticalLayout;
      return layoutCls;
    }

    const Layout = getLayout();
    const NonAuthmiddleware = ({
      component: Component,
      layout: Layout
    }) => (
      <Route
        render={props => {
          return (
            <Layout>
              <Component {...props}/>
            </Layout>
          )
        }}
      />
    );
    return(
      <React.Fragment>
        <Router>
          <Switch>
            {authRoutes.map((route, idx) => (
              <NonAuthmiddleware
                path={route.path}
                component={route.component}
                key={idx}
                layout={NonAuthLayout}
                />
            ))}
            {userRoutes.map((route, idx) => (
              <Authmiddleware
              path={route.path}
              component={route.component}
              key={idx}
              layout={Layout}
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
    )

  }


 render(){
  return (
    <Provider inject={allStores}>
				<Subscribe to={[this.layoutStore]}>
					{layoutStore => (
						this.appScreen(layoutStore)
					)}
				</Subscribe>
			</Provider>
  );}
};

const mapStateToProps = state => {
  return{
    layout: state.Layout
  }
}

export default connect(mapStateToProps, null)(App);
