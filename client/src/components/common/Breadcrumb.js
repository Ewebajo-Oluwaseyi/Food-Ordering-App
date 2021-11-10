import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem, Col, Row } from 'reactstrap';

const BreadCrumb = (props) => {
    return(
        <Row>
            <Col xs="12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">{props.title}</h4>
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                       
                            <BreadcrumbItem active>
                                <Link to="#">
                                    {props.breadcrumbItem}
                                </Link>
                            </BreadcrumbItem>
                        </ol>
                    </div>
                    
                </div>
            </Col>
        </Row>
    )
}

export default BreadCrumb;