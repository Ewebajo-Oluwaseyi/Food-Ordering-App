import React, {useState} from "react";
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import { Link, withRouter } from 'react-router-dom';
import {Container, Col, Row, Card, CardBody, Alert} from 'reactstrap';
import Profile from '../../assests/images/Nigerian-jollof.jpeg'
import logo from "../../assests/images/images.png";
import stateWrapper from "../../containers/provider";
import {loginUser, apiError} from '../../store/auth/login/actions'
import {connect} from 'react-redux'
import {FIELD_IS_REQUIRED_ERROR_TEXT, ENTER_VALID_EMAIL_ERROR_TEXT} from '../../helpers/utility/Validate.message';
import {validateEmailAddresss} from '../../helpers/utility/fieldValidator';
import {EMAIL_REGEX} from '../../helpers/utility/regexes'

const Login = (props) => {
    const [state, setState] = useState({
      isLoading: false,
      status:"",
    })

    async function handleValidSubmit(event, values) {
      setState({
        isLoading: true,
      });
      event.preventDefault();
      const res = await props.userStore.signIn(values, props);
      if (!res) {
        setState({
          isLoading: false,
          status: "Failed",
        });
      }
      else if (res === 'Invalid Credentails') {
        setState({
          isLoading: false,
          status: "Invalid Credentails",
        });
        setTimeout(function(){
          setState({...state,  status: ""})
        }, 2000)
      }
      else {
        setState({
          isLoading: false,
        });
      }
    }

    const validateEmailField = (value, callback) => {
      if (value === "" || value === null) {
        callback(FIELD_IS_REQUIRED_ERROR_TEXT)
      }
      if (!validateEmailAddresss(value)) {
        callback(ENTER_VALID_EMAIL_ERROR_TEXT)
      }
      callback();
    }

    return (
        <React.Fragment>
          <div className="home-btn d-none d-sm-block">
            <Link to="/" className="text-dark">
              <i className="fas fa-home h2"></i>
            </Link>
          </div>
          <div className="my-4 pt-2 px-sm-4 login">
            <Container>
              <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                  <Card className="overflow-hidden">
                    <div className="bg-soft-primary">
                      <Row>
                        <Col className="col-12" style={{backgroundImage:` URL(${Profile})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                          <div className="text-light p-4 fs-3">
                            <h5 className="text-light">Welcome Back!</h5>
                              <p>Sign in</p>
                          </div>
                        </Col>
                     </Row>
                    </div>
                    <CardBody className="pt-0">
                      <div>
                        <Link to="/">
                          <div className="avatar-md profile-user-wid">
                            <span className="avatar-title rounded-circle bg-light">
                              <img src={logo} alt="" className="rounded" height="34"/>
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="p-2">
                      <AvForm className="form-horizontal"
                        onValidSubmit={(e, v) => {
                          handleValidSubmit(e, v);
                        }}>
                        {state.status === 'Invalid Credentails' ? (
                          <Alert color="warning">{state.status}</Alert>
                        ) : null}
                        <div className="form-group">
                          <AvField
                            name="email"
                            label="Email"
                            value=""
                            className="form-control mt-2 fs-4"
                            placeholder="Enter email"
                            type="email"
                            errorMessage={ENTER_VALID_EMAIL_ERROR_TEXT}
                            validate={{
                              required: {value: true},
                              pattern: {value: EMAIL_REGEX},
                              email: {validateEmailField}
                            }}
                            required
                          />
                        </div>
                        <div className="form-group mt-3">
                          <AvField
                            name="password"
                            label="Password"
                            value=""
                            type="password"
                            required
                            placeholder="Enter Password"
                            className="form-control mt-2 fs-4"
                            errorMessage= {ENTER_VALID_EMAIL_ERROR_TEXT}
                           />
                        </div>
                        <div className="mt-5">
                          {!state.isLoading &&
                            <button
                              className="btn btn-warning btn-block waves-effect waves-light"
                              type="submit"
                            >
                              Log In
                            </button>
                          }
                          {state.isLoading &&
                             <div
                                className="spinner-grow text-warning m-1"
                                role="status"
                              >
                              </div>
                          }
                        </div>
                        <div className="mt-4 text-center">
                          <Link className="text-warning">
                            <i className="mdi mdi-lock mr-1"></i> Forgot your Password?
                          </Link>
                        </div>
                      </AvForm>
                      </div>
                    </CardBody>
                    </Card>
                    <div className="mt-2 text-center">
                      <p>
                        Don't have an account? {" "}
                        <Link to="/register" className="font-weight-medium text-warning">
                           {" "}
                           Signup now{" "}
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
    connect(mapStatetoProps, { loginUser, apiError })(stateWrapper(Login))
  );
