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
      numItemsInCart: 0
    };
  }
  componentDidMount() {
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
      // let localProductsArr = [];
      // for (let index = 0; index < res.data.length; index++) {
      //   const element = res.data[index];
      //   if (!localProductsArr.includes(element)) {
      //     localProductsArr.push(element)
      //     console.log(localProductsArr)
      //   }
      // }
      let localProductsArr = []
      res.data.map((e) => localProductsArr.push(e))

      this.setState({
        numItemsInCart: numItemsInCartLocal,
        cartRef: res.data[0].cart_ref,
        products: localProductsArr
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
    console.log(this.state.products)
    const mappedProducts = this.state.products.map(eachProductObj => {
      return (
        <CartItem key={eachProductObj.product_id} product={eachProductObj} incrementItem={this.incrementItem} decrementItem={this.decrementItem} />
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
        <div className="body_container">{mappedProducts}</div>
      </div>
    );
  }
}

export default Cart;
