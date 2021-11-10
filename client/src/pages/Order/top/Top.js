import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import TopFood from './TopFood';
import stateWrapper from "../../../containers/provider";

const Top = (props) => {
    const[click, setClicked] = useState("");
    const params = useParams();
    const addCartHandler = async (id) => {
      const selectedFood = props.sortState.find((ev) => ev.id === id)
      const res = await props.orderStore.addOrder({food: selectedFood.title, quantity: 1, price: selectedFood.price, unique:selectedFood.unique});
      if(res.status === 200) {
        setClicked(res.data.orders.unique)
        setTimeout(function(){
          setClicked("")
            }, 1000);
        }
      }

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

    let a;
    if (params.food === "jollof") {
        a = 1;
    }
    if (params.food === "salad") {
        a = 4;
    }
    if (params.food === "spaghetti") {
        a = 8;
    }
    if (params.food === "pizza") {
        a = 12;
    }
    if (params.food === "fast") {
        a = 16;
    }

    let show = props.sortState
      .slice(0, 4).map((item, index) => (
        <TopFood
          key={item.id}
          id={item.id}
          title={item.title}
          pics={images[`${index + a}.png`] && images[`${index + a}.png`]["default"]}
          price={item.price}
          label={item.label}
          onAdd={addCartHandler}
          clicked={click === item.unique}
        >
        </TopFood>
      ))

      return props.loading ?
        <div className="spinloading">
          <div
            className="spinner-grow text-warning m-0"
            role="status"
            ></div>
        </div> : (
        <div>
           <div className="topflex">
              <h3>Top {props.param}</h3>{
                props.sortState.length > 3 ?
                <Link to={`/popular/viewall/${props.param}`} className="view">
                  <div>View all</div>
                  <i className="fas fa-arrow-right"></i>
                </Link>: ""}
            </div>
            <div className="top">{show}</div>
        </div>
    )
}

export default (stateWrapper(Top))