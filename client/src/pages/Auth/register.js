import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Container, Col, Row, Card, CardBody, Alert} from 'reactstrap';
import Profile from '../../assests/images/Nigerian-jollof.jpeg'
import logo from "../../assests/images/images.png";
import stateWrapper from "../../containers/provider";
import {postUserLogin, apiError} from '../../store/auth/login/actions'
import {connect} from 'react-redux'


const Register = (props) => {

    function handleValidSubmit(event, values) {
      event.preventDefault();
      props.userStore.register(values, props);
    }

    return (
        <React.Fragment>
            <div className="home-btn d-none d-sm-block">
              <Link to="/" className="text-dark">
                <i className="fas fa-home h2"></i>
              </Link>
            </div>
            <div className="account-pages my-2 pt-sm-2 register">
                <Container>
                  <Row className="justify-content-center">
                    <Col md={8} lg={6} xl={5}>
                      <Card className="overflow-hidden">
                        <div className="bg-soft-primary">
                          <Row>
                            <Col className="col-12" style={{backgroundImage:` URL(${Profile})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                              <div className="text-light p-4 ">
                                <h5 className="text-light">Welcome Back!</h5>
                                <p>Sign in</p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <CardBody className="pt-0">
                          <div>
                            <Link to="/">
                              <div className="avatar-md profile-user-wid mb-4">
                                <span className="avatar-title rounded-circle bg-light">
                                  <img src={logo} alt="" className="rounded" height="34"/>
                                </span>
                              </div>
                            </Link>
                          </div>
                            <div className="p-2 pt-sm-1">
                              <AvForm className="form-horizontal"
                                onValidSubmit={(e, v) => {
                                  handleValidSubmit(e, v);
                                }}>
                                {props.error && props.error ? (
                                  <Alert color="danger">{props.error}</Alert>
                                ) : null}
                                <div className="form-group">
                                  <AvField
                                    name="firstname"
                                    label="First Name"
                                    value=""
                                    className="form-control"
                                    placeholder="Enter First Name"
                                    type="name"
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <AvField
                                    name="lastname"
                                    label="Last Name"
                                    value=""
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                    type="name"
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <AvField
                                    name="email"
                                    label="Email"
                                    value=""
                                    className="form-control"
                                    placeholder="Enter email"
                                    type="email"
                                    required
                                  />
                                </div>
                                <div className="form-group">
                                  <AvField
                                    name="password"
                                    label="Password"
                                    value=""
                                    type="password"
                                    required
                                    placeholder="Enter Password"
                                  />
                                </div>
                                <div className="form-group">
                                  <AvField
                                    name="password2"
                                    label="Confirm Password"
                                    value=""
                                    type="password"
                                    required
                                    placeholder="Enter Password"
                                    validate={{match: {value: 'password'}}}
                                  />
                                </div>
                                <div className="mt-3">
                                  <button
                                    className="btn btn-warning btn-block waves-effect waves-light"
                                    type="submit"
                                  >
                                    Register
                                  </button>
                                </div>
                              </AvForm>
                            </div>
                        </CardBody>
                      </Card>
                      <div className="mt-2 text-center">
                        <p>
                          Already have an account? {" "}
                          <Link to="/login" className="font-weight-medium text-warning">
                            {" "}
                            Sign In{" "}
                          </Link>{" "}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
const mapStatetoProps = (state) => {
    const { error } = state.Login;
    return { error };
  };
export default withRouter(
    connect(mapStatetoProps, { postUserLogin, apiError })(stateWrapper(Register))
  );
