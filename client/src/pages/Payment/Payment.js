import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import stateWrapper from "../../containers/provider";

const Payments = (props) => {
  let total = localStorage.getItem("total")
  const[card, setCard] = useState('Credit Card')

  useEffect(()=> {
    props.userStore.fetchUser();

    //eslint-disable-next-line
  }, [])

  let userData = props.userStore.state.sessionData.user;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="8">
              <div className="paymentcontainer">
                <div className="delivery">
                  <div className="deliverygrid">
                  <div className="deli">delivery address</div>
                  <div>
                    {userData.address === undefined ? 
                      <Link to="/profile" className="deliveryprofile">
                        <i className="fas fa-map-marker-alt mx-2"></i>
                        <div>Update delivery address</div>
                      </Link> :
                      <div className="d-flex">
                        <span>
                          <i className="fas fa-map-marker-alt mx-2"></i>
                        </span>
                        <div>
                          <div>{userData && userData.firstname} {userData && userData.lastname}</div>
                          <div>{userData && userData.email}</div>
                          <div>{userData && userData.phone}</div>
                          <div>{userData && userData.address}</div>
                          <div>{userData && userData.country}</div>
                        </div>
                      </div>
                    }

                  </div>
                </div>
                </div>
                <div className="payment">
                  <div className="paymentgrid">
                    <div className="choose">payment options</div>
                    <input
                      type="radio"
                      name="card"
                      value="credit card"
                      defaultChecked="checked"
                      id="credit card"
                      onClick={() => setCard('Credit Card')}
                     />
                    <label htmlFor="credit card" className="mastercard">
                      <i className="fab fa-cc-mastercard fa-2x"></i>
                    </label>
                    <label htmlFor="credit card" className="credit">
                     credit card
                    </label>
                    <input type="radio" name="card" value="paypal" id="paypal" onClick={() => setCard('Paypal')}/>
                    <label htmlFor="paypal" className="paypal">
                      <i className="fab fa-cc-paypal fa-2x"></i>
                    </label>
                    <label htmlFor="paypal" className="credit">
                     paypal
                    </label>
                  </div>
                </div>
                <div>
                  <div className="payable">
                    <div className="payablegrid">
                      <div className="choose1">Payable amount</div>
                      <span className="circle">
                        <i className="far fa-circle"></i>
                      </span>
                      <span className="sub">Sub total : </span>
                      <span className="dol">{total === null ? 0 : `$${total}`}</span>
                      <span className="circle">
                        <i className="far fa-circle"></i>
                      </span>
                      <span className="sub">Delivery charge</span>
                      <span className="dol">$0.00</span>

                    </div>
                    <div className="my-4">
                      <button className="btn btn-warning waves-effect waves-light" type="submit">
                        <div>Pay with {card}</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default (stateWrapper(Payments));
