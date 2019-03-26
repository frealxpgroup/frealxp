import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import Product from './Product/Product'

import "./Cart.scss";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
        userID: 1,
        cartRef: 0,
        products: [],
        numItemsInCart: 0
    }
  }
  componentDidMount() {
    //componentDidMount order of operations: 
    // 1: load products.
    // 2: fetch userID. (2.!userinfo: do nothing)
    // (2.userinfo: !activecart: create a new cart and save refid on state.)
    // (2.userinfo: actviecart: save refid on state)


    if (this.state.userID) {
      this.initialCart();
    }
  }


  initialCart = () => {
    const { userID } = this.state;
    // pull all qty and update state (numItemsInCart)
    return Axios.post("/shop/cart", { userID }).then(res => {
      let numItemsInCartLocal = 0;
      res.data.forEach(arr => (numItemsInCartLocal += arr["quantity"]));
      this.setState({
        numItemsInCart: numItemsInCartLocal,
        cartRef: res.data[0].cart_ref
      });
    });
  };

  render() {
    const mappedProducts = this.state.products.map(eachProductObj => {
      return (
        <Product
          key={eachProductObj.product_id}
          product={eachProductObj}
          increment={true}
          decrement={true}
        />
      );
    });

    return (
      <div className="background">
      <div className="header">
          <div className="menu">
              <div>cart({this.state.numItemsInCart})</div>
            <div>checkout</div>
            <Link to="/shop/history">
              <div>order history</div>
            </Link>
          </div>
          <Link to="/">
            <h1>FRealXP</h1>
          </Link>
        </div>
        <div className="body_container">
            {mappedProducts}
        </div>
      </div>
    );
  }
}

export default Cart;