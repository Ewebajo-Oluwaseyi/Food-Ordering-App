import React, {useState} from 'react';


import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from 'reactstrap';
const NotificationDropdown = (props) => {
    const[menu, setMenu] = useState(false)

    return(
        <React.Fragment>
            <Dropdown
            isOpen={menu}
            toggle={() => setMenu(!menu)}
            className="dropdown d-line-block"
            tag="li"
            >
               <DropdownToggle
               className="btn header-item noti-icon waves-effect"
               tag="button" id="page-header-notification-dropdown"
               >
                   <i className="bx bx-bell bx-tada"></i>

                   </DropdownToggle>
                <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0">
                    <div className="p-3">
                        <Row className="align-items-center">
                            <Col>
                                <h6 className="m-0">notification</h6>
                            </Col>
                            <div className="col-auto">
                                <a href="#!" className="small">view All</a>
                            </div>
                        </Row>
                    </div>
                    </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    )
}


export default (NotificationDropdown)