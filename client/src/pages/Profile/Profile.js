import React, {useState, useEffect} from "react";
import {Container, Row, Col, CardBody, Label, Input, CardTitle, FormGroup} from 'reactstrap'
import {AvForm} from "availity-reactstrap-validation";
import {CountryDropdown} from "react-country-region-selector";
import stateWrapper from "../../containers/provider";
import * as _ from "lodash";

const Profile = (props) => {

    const [state, setState] = useState({
        _id: "",
        firstname: "",
        lastname: "",
        phone: null,
        email: "",
        address: "",
        country: "",
        success: ""
      });


      function handleValidSubmit(event, values) {
        event.preventDefault();
        console.log(values);
        props.userStore.updateClientProfile(
          state,
          props
        )
        setState({
          ...state,
          success: "passed",
        });
        setTimeout(function(){
            setState({...state,  success: ""})
          }, 2000)
      }

      useEffect(() => {
        props.userStore.fetchUser();


      //  console.log(userData)

        if (!_.isEmpty(userData)) {
          setState({
            ...state,
            _id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            phone: userData.phone,
            email: userData.email,
            address: userData.address,
            country: userData.country,
          });
        } else {
          alert("not available");
        }
        //eslint-disable-next-line
      }, []);
      let userData = props.userStore.state.sessionData.user;

    return(
        <React.Fragment>
          <div className="page-content">
            <Container fluid>
              {state.success == "passed" ? (
                <div>
                  <div
                    className="alert-dismissible fade show mb-0 alert alert-info alert-dismissible fade show"
                    role="alert"
                  >
                    <i className="mdi mdi-alert-circle-outline mr-2"></i> Profile Updated!
                    <button
                      type="button"
                      class="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="mb-4"></div>
                </div>
                ) : ("")}
                <Row>
                  <Col lg="12">
                    <CardBody>
                      <CardTitle>
                        PROFILE DETAILS
                      </CardTitle>
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={(e, v) => {
                          handleValidSubmit(e, v);
                        }}
                      >
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <Label>First Name</Label>
                              <Input
                                value={state.firstname}
                                onChange={(e) => setState({...state, firstname: e.target.value})}
                                type="text"
                                className="form-control"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <Label>Last Name</Label>
                              <Input
                                value={state.lastname}
                                onChange={(e) => setState({...state, lastname: e.target.value})}
                                type="text"
                                className="form-control"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <Label>Email</Label>
                              <Input
                                value={state.email}
                                onChange={(e) => setState({...state, email: e.target.value})}
                                type="text"
                                className="form-control"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <Label>Home Address</Label>
                              <Input
                                value={state.address}
                                onChange={(e) => setState({...state, address: e.target.value})}
                                type="text"
                                className="form-control"
                             />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <Label>Country</Label>
                              <CountryDropdown
                                className="custom-select"
                                value={state.country}
                                onChange={(e) => setState({...state, country: e})}
                                showDefaultOption={true}
                                defaultOptionLabel={"Select Country"}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <Label>Phone</Label>
                              <Input
                                value={state.phone}
                                onChange={(e) => setState({...state, phone: e.target.value})}
                                type="number"
                                className="form-control"
                                id="example-number-Input"
                                defaultValue="0"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <div>
                          <button className="btn btn-warning waves-effect waves-light">
                            Update Profile
                          </button>
                        </div>
                      </AvForm>
                    </CardBody>
                  </Col>
                </Row>
             </Container>
            </div>
        </React.Fragment>
    )
}

export default (stateWrapper(Profile));