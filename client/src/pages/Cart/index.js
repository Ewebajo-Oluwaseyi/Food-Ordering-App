import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Col, Container, Media, Row} from 'reactstrap'
import stateWrapper from "../../containers/provider";
import Pizza from '../../assests/images/category/QuattroPizza.png'
import Jollof from '../../assests/images/category/jollof-rice1.png'
import Salad from '../../assests/images/category/RainbowSalad0519_PDS.png'
import Spaghetti from '../../assests/images/category/spaghetti1.png'
import Fastfood from '../../assests/images/category/fastfood.png'


const Dashboard = (props) => {
    const[state, setState] = useState({
      order: '',
      total: 0,
      success: ""
    })

    useEffect(() => {
      props.orderStore.fetchOrder();
      //eslint-disable-next-line
    }, [])

    let orderData = props.orderStore.state.sessionData.orders;

    function handleDelete(_id) {
      props.orderStore.deleteOrder(_id)
      props.orderStore.fetchOrder();
      setState({
        ...state,
        success: "Deleted",
      });
      setTimeout(function(){
        setState({...state,  success: ""})
      }, 2000)
    }

    function  handleSubmit(e) {
       props.history.push("/payment");
       localStorage.setItem("total", e)
    }
    
    const desHandler =(id , Food) => {
      const decrease = orderData.find(order => order._id === id)
      decrease.quantity = decrease.quantity - 1;
      props.orderStore.update(decrease.quantity, Food, id)
      props.orderStore.fetchOrder();
    }

    const addHandler =(id, Food) => {
      const increase = orderData.find(order => order._id === id)
      increase.quantity = increase.quantity + 1;
      props.orderStore.update(increase.quantity, Food, id)
      props.orderStore.fetchOrder();
    }

    return(
        <React.Fragment>
          <div className="page-content">
            <Container>
              {state.success == "Deleted" ? (
                <div>
                  <div
                    className="alert-dismissible fade show mb-0 alert alert-info alert-dismissible fade show"
                    role="alert"
                    >
                    <i className="mdi mdi-alert-circle-outline mr-2"></i> Item deleted from Cart
                  </div>
                  <div className="mb-4"></div>
                </div>
                  ) : ("")}
              <Row>
                <Col lg="12" md="12" sm="12">
                  <Row>
                    <Col md="8" className="orderscontainer">
                      <div className="carttitle">
                        Added Items
                      </div>
                      {
                        orderData.length === 0 && (
                          <div className="noitem">
                            <span>No Item in cart</span>
                          </div>
                        )
                      }
                      <div>
                        {orderData && orderData.map((Food, key) => (
                          <div  key={"_col_" + key} className="cartitem">
                            <div className="mini-stat-icon avatar-sm rounded-circle align-self-center ">
                              <span>
                                {Food.food.toLowerCase().includes("jollof") && <img src={Jollof} alt=""
                                  height="50"/>  }
                                {Food.food.toLowerCase().includes("salad") && <img src={Salad} alt=""
                                  height="50"/>  }
                                {Food.food.toLowerCase().includes("spaghetti") && <img src={Spaghetti} alt=""
                                  height="50"/>  }
                                {Food.food.toLowerCase().includes("pizza") && <img src={Pizza} alt=""
                                  height="50" width="50"/>  }
                                {Food.food.toLowerCase().includes("fast") && <img src={Fastfood} alt=""
                                  height="50"/>  }
                              </span>
                            </div>
                            <p className="text-muted font-weight-medium cartfood">
                               {Food.food}
                            </p>
                            <div className="cartflex">
                              <div className="sign" onClick={() => desHandler(Food._id, Food)}>
                                <i className="fas fa-minus"></i>
                              </div>
                              <p className="mb-0">{Food.quantity}</p>
                              <div className="sign" onClick={() => addHandler(Food._id, Food)}>
                                <i className="fas fa-plus"></i>
                              </div>
                            </div>
                            <div className="m-0 cartprice">${(Food.quantity * Food.price).toFixed(2)}</div>
                            <div onClick={() => handleDelete(Food._id)} className="deletefood">
                              <i className="fas fa-times"></i>
                            </div>
                            <div className="foodprice">{Food.price}</div>
                              <div className="sizeqty">quantity</div>
                              <div className="sizetotal">subtotal</div>
                            </div>
                          )
                        )}
                      </div>
                      </Col>
                        <Col md="4">
                          <div className="orderscontainer2">
                            <div className="totalorder">
                              <span className="text-muted">Total</span>
                              <span>${orderData && orderData.reduce((sum, c) =>
                                sum + c.price * c.quantity, 0
                                ).toFixed(2)}</span>
                            </div>
                            <div className="totalorder2">
                              <Link to="/payment"
                                type="submit"
                                className="proceedbtn"
                                onClick={()=> handleSubmit((orderData && orderData.reduce((sum, c) =>
                                sum + c.price * c.quantity , 0).toFixed(2)))}
                              >Proceed to payments
                              </Link>
                            </div>

                          </div>
                        </Col>
                      </Row>
                    </Col>
                </Row>
                {state.order.food &&
                  <div className="align-self-center my-2">
                    <Link to="/order"
                      type="submit"
                      className="btn btn-warning waves-effect waves-light"
                    >
                      Add More to Cart
                    </Link>
                  </div>
                }
            </Container>
          </div>
        </React.Fragment>
    )
}


export default (stateWrapper(Dashboard));