import { Container } from "unstated";
import axios from 'axios';
import setAuthToken from './utils/setAuthToken'


class OrderContainer extends Container{
    constructor() {
        super();
        this.state = {
          sessionData: {
            orders: [],
            total: 0
          },
        };
      }

      fetchOrder = async () => {
        if(localStorage.token){
          setAuthToken(localStorage.token)
        }
          let res= await axios.get('/api/order');
          let order = JSON.stringify(res.data)
          order = JSON.parse(order)
          this.setState({
            sessionData: {
              orders: order
              },
            });
          return order;
      }

      addOrder = async({food, quantity, price, unique}, props) => {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
       const res = await axios.post("/api/order", {food, quantity, price, unique}, config)
        return res
      }

      deleteOrder = async (_id) => {
        if(localStorage.token){
        setAuthToken(localStorage.token)
        }
        const res = await axios.delete(`/api/order/${_id}`)
      }

      setTotal =  (e) => {
        let data =  e
        this.setState({
          sessionData: {
          total: data
          },
        });
        return data
      }

      update = async(qty, item, _id) => {
        try {
          if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const res = await axios.put(`/api/order/${_id}` , {
          food: item.food,
          price: item.price,
          quantity: qty,
          unique: item.unique
        }, config)
        } catch (err) {

        }
      }


}


export {OrderContainer}