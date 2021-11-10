/* eslint-disable no-undef */
import React, {useState} from 'react'

import i18n from '../../i18n';


import usFlag from '../../assests/images/flags/us.jpg';
import spain from '../../assests/images/flags/spain.jpg'
import germany from '../../assests/images/flags/germany.jpg'
import italy from '../../assests/images/flags/italy.jpg'
import russian from '../../assests/images/flags/russia.jpg'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';


const LanguageDopdown = (props) => {
    const [menu, setMenu] = useState(false);
  const [flag, setFlag] = useState(usFlag);
  const [lng, setLng] = useState("English");


   function changeLanguage(lng) {

     //set language as i18n
     i18n.changeLanguage(lng);

    if(lng === "sp")
    {
       setFlag(spain);
      setLng('Spanish');
    }
    else if(lng === "gr")
    {
         setFlag(germany);
         setLng('German');
    }
    else if(lng === "rs")
    {
         setFlag(russian);
         setLng('Russian');
    }
    else if(lng === "it")
    {
       setFlag(italy);
       setLng('Italian');
    }
    else if(lng === "eng")
    {
        setFlag(usFlag);
        setLng('English');
    }
  }



    return(
        <React.Fragment>
            <Dropdown isOpen={menu}
            toggle={() => setMenu(!menu)}
            className="d-inline-block">
                <DropdownToggle
                    className="btn header-item waves-effect"
                    tag="button"
                >
                    <img src={flag} alt="" height="16" className="mr-1"/>
                    <span className="align-middle">{lng}</span>

                </DropdownToggle>
                <DropdownMenu className="language-switch" right>
                    <DropdownItem tag="a" href="#" onClick={() => changeLanguage('eng')} className="notify-item">
                    <img src={usFlag} alt="" className="mr-1" height="12"/>
                    <span className="align-middle">English</span>
                    </DropdownItem>
                    <DropdownItem tag="a" href="#" onClick={() => changeLanguage('sp')} className="notify-item">
                    <img src={spain} alt="" className="mr-1" height="12"/>
                    <span className="align-middle">Spain</span>
                    </DropdownItem>
                    <DropdownItem tag="a" href="#" onClick={() => changeLanguage('gr')} className="notify-item">
                    <img src={germany} alt="" className="mr-1" height="12"/>
                    <span className="align-middle">German</span>
                    </DropdownItem>
                    <DropdownItem tag="a" href="#" onClick={() => changeLanguage('it')} className="notify-item">
                    <img src={italy} alt="" className="mr-1" height="12"/>
                    <span className="align-middle">Itanlian</span>
                    </DropdownItem>
                    <DropdownItem tag="a" href="#" onClick={() => changeLanguage('rs')} className="notify-item">
                    <img src={russian} alt="" className="mr-1" height="12"/>
                    <span className="align-middle">Russian</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    )
}

export default (LanguageDopdown)