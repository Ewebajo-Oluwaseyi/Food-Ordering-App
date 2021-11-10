import React from 'react'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'
import Category from './Category'
import streak from '../../assests/images/category/streak-meat.png'
import Pizza from '../../assests/images/total/14.png'
import Jollof from '../../assests/images/category/jollof-rice1.png'
import Salad from '../../assests/images/category/RainbowSalad0519_PDS.png'
import Spaghetti from '../../assests/images/category/spaghetti1.png'
import Fastfood from '../../assests/images/category/fastfood.png'

const CategoryNav = () =>{

    const food = [
        "jollof",
        "salad",
        "spaghetti",
        "pizza",
        "fast"
    ]

    return (
        <div className="categoryNav">
            <h3>Food Category</h3>
            <Row>
                <Col lg="12" md="12" sm="12">
                    <Row>
                        <Col lg="2" md="2" sm="4" xs="6">
                        <Category path={"/popular/jollof"}>
                        <Card className="categorycard">
                            <CardBody>
                                <CardTitle className="title">Jollof Rice</CardTitle>
                                <img src={Jollof} alt="Jollof rice" className="pic"/>
                            </CardBody>
                        </Card>

                        </Category>
                        </Col>
                        <Col lg="2" md="2" sm="4" xs="6">
                        <Category path={"/popular/salad"}>
                        <Card className="categorycard">
                            <CardBody>
                                <CardTitle className="title">Salad</CardTitle>
                                <img src={Salad} alt="A Pizza Dish" className="pic"/>
                            </CardBody>
                        </Card>

                        </Category>
                        </Col>
                        <Col lg="2" md="2" sm="4" xs="6">
                        <Category path={"/popular/spaghetti"}>
                        <Card className="categorycard">
                            <CardBody>
                                <CardTitle className="title">Spaghetti</CardTitle>
                                <img src={Spaghetti} alt="A Pizza Dish" className="pic"/>
                            </CardBody>
                        </Card>

                        </Category>
                        </Col>
                        <Col lg="2" md="2" sm="4" xs="6">
                        <Category path={"/popular/pizza"}>
                        <Card className="categorycard">
                            <CardBody>
                            <CardTitle className="title">Pizza</CardTitle>
                                <img src={Pizza} alt="A Pizza Dish" className="pic"/>
                            </CardBody>
                        </Card>

                         </Category>
                        </Col>
                        <Col lg="2" md="2" sm="4" xs="6">
                        <Category path={"/popular/fast"}>
                        <Card className="categorycard">
                            <CardBody>
                                <CardTitle className="title">Fast Food</CardTitle>
                                <img src={Fastfood} alt="A Pizza Dish" className="pic"/>
                            </CardBody>
                        </Card>

                        </Category>
                        </Col>
                    </Row>

                </Col>
            </Row>

        </div>
    )
}

export default CategoryNav
