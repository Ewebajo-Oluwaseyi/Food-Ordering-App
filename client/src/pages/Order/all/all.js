import React, {useState} from 'react'
import TopFood from '../top/TopFood';
import {useHistory, useParams} from 'react-router-dom'
import stateWrapper from "../../../containers/provider";

const All = (props) => {
    const[state, setState] = useState(props.sortState)
    const[changeState, setChangeState] = useState(false)
    const param = useParams();
    const importAll = (r) => {
      let images = {}
      // eslint-disable-next-line
      r.keys().map((item, index) => {
        images[item.replace("./", "")] = r(item);
      })
      return images
    }

    const images = importAll(
      require.context("../../../assests/images/total", false, /\.(png|jpe?g|svg)$/)
    )

    let a, b;
    if (param.food === "salad") {
      a = 4;
      b = 0;
    }
    if (param.food === "spaghetti") {
      a = 8;
      b = 4;
    }
    if (param.food === "pizza") {
      a = 12;
      b = 8;
    }
    if (param.food === "fast") {
      a = 16;
      b = 12;
    }

    const stateArray = [...state];
    const params = props.param.replace("viewall/", "")

    const sortHandler= (e) => {
      if(e.target.value === "High to Low") {
        setChangeState(true);
        stateArray.sort((a,b) => b.price - a.price)
        setState(stateArray)
      }
      else {
        setChangeState(false);
       // history.push(`/popular/view-all/${props.param.replace("viewall/", "")}?sort=asc`)
        stateArray.sort((a,b) => a.price - b.price)
        setState(stateArray)
      }
    }
    const[click, setClicked] = useState("")
    const addCartHandler = async(id) => {
      const selectedFood = stateArray.find((ev) => ev.id === id)
      const res = await props.orderStore.addOrder({food: selectedFood.title, quantity: 1, price: selectedFood.price, unique:selectedFood.unique});
      if(res.status === 200) {
        setClicked(res.data.orders.unique)
        setTimeout(function(){
          setClicked("")
        }, 1000);
      }
    }

    let show = stateArray.map((item, index) => {
      let z;
      if (index > 3) {
        z = index + b;
      } else {
        z = index + a
      }
      return(
        <TopFood
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          label={item.label}
          onAdd={addCartHandler}
          clicked={click === item.unique}
          pics={images[`${z}.png`] && images[`${z}.png`]["default"]}
        />
      )
    })

    return (
      <div>
        <div className="allflex">
          <h3>{params}</h3>
          <div className="viewall">
            <span>Sort by Price:</span>
             <form>
                <select
                  name="prices"
                  className="selectall"
                  onChange={sortHandler}
                >
                  <option value="Low to High" className="option">Low to High</option>
                  <option value="High to Low" className="option">High to Low</option>
                </select>
              </form>
          </div>
        </div>
        <div className="top">{show}</div>
      </div>
    )
}

export default (stateWrapper(All))
