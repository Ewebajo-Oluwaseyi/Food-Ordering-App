import React, {useState, useEffect} from "react";
import {Container} from 'reactstrap';
import stateWrapper from "../../containers/provider";
import CategoryNav from '../../components/Categories/CategoryNav';
import {Route, Switch} from 'react-router-dom'
import All from "./all/all";
import Top from './top/Top'

const PRICE = [
    34.54, 25.4, 12.5, 30.4, 23, 39.4, 21.3, 12.3, 23.99
];
const Order = (props) => {
  const [popularState, setPopularState] = useState([])
  const [loading, setLoading] = useState(false)
  const [food, setFood] = useState("")

  useEffect(() => {
    const food = props.location.pathname.replace("/popular/", "")
    setFood(food);
    setLoading(true)
    async function popularDish() {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/food-database/v2/parser?ingr=${food}&app_id=679ef8d9&app_key=547e9bfc4e3438877744862fc12c80bf`
         )
        const res = await response.json();
        const data = res.hints.slice(0, 8);
        const formData = data.map((item, index) => ({
          id: `${item.food.foodId}${index}`,
          unique: `${item.food.foodId}`,
          title: item.food.label,
          label: `${item.food.categoryLabel ? item.food.categoryLabel: ""},
          ${item.food.category ? item.food.category: ""},
          ${item.food.brand ? item.food.brand: ""}`,
          price: PRICE[index]
        }))
        setPopularState(formData)
        setTimeout(function(){
          setLoading(false)
        }, 1000)
      } catch (error) {

      }
    }
    
    popularDish();
 }, [props.location])

    return(
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <CategoryNav/>
                    <Switch>
                        <Route path="/popular/viewall/:food">
                            <All sortState={popularState} param={food}></All>
                        </Route>
                        <Route path="/popular/:food">
                            <Top loading={loading} sortState={popularState} param={food}></Top>
                        </Route>
                    </Switch>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default (stateWrapper(Order));


