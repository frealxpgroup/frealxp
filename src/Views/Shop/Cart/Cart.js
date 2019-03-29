import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import CartItem from "./CartItem";

import "./Cart.scss";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      userID: 1,
      cartRef: 0,
      products: [],
      numItemsInCart: 0,
      cartItems: []
    };
  }
  componentDidMount() {
    if (this.state.userID) {
      this.initialCart();
    }
  }

  initialCart = () => {
    const { userID } = this.state;
    return Axios.post("/shop/cart", { userID }).then(res => {
      let numItemsInCartLocal = 0;
      res.data.forEach(arr => (numItemsInCartLocal += arr["quantity"]));
      this.setState({
        numItemsInCart: numItemsInCartLocal,
        cartRef: res.data[0].cart_ref
      });
      let cartLocal = [];
      res.data.forEach(el => cartLocal.push(el));
      this.setState({
        cartItems: cartLocal
      });
    });
  };

  incrementItem = (productID) => {
    console.log('hit for ' + productID)
  }

  decrementItem = (productID) => {
    console.log('reduce ' + productID)
  }

  render() {
    const mappedProducts = this.state.products.map(eachProductObj => {
      return (
        <CartItem key={eachProductObj.product_id} product={eachProductObj} incrementItem={this.incrementItem} decrementItem={this.decrementItem} />
      );
    });

    return (
      <div className="cart_background">
        <div className="cart_header">
          <div className="cart_menu">
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
        <div className="cart_body_container">{mappedProducts}</div>
      </div>
    );
  }
}

export default Cart;
