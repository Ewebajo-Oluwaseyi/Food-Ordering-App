import React from 'react';

const TopFood = (props) => {

    const addCartHandler = () => {
      props.onAdd(props.id);
    }

    return (
        <div className="casing">
          <div className="topfood">
            <h2>{props.title}</h2>
              <div className="align-self-center ">
                <span><img src={props.pics} alt="" height="60"/></span>
              </div>
              <div className="cartprice">
                <span className="foodprice">{`$${props.price}`}</span>
                <span className="addcart mt-2" onClick={addCartHandler} >
                  {props.clicked ? 'Added To Cart' : 'Add To Cart'}
                </span>
              </div>
            </div>
        </div>
    )
}

export default TopFood
