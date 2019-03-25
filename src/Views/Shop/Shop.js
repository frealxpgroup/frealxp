// Shop will have two buttons, cart and checkout. Shop will render a list of all available products.

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Shop.scss";
import Axios from "axios";
import Product from "./Product/Product";

class Shop extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      userID: 1,
      numItemsInCart: 0,
      cartRef: 0
    };
  }

  componentDidMount() {


    //componentDidMount order of operations: 1: load products.
    // 2: fetch userID. (2.!userinfo: do nothing)
    // (2.userinfo: !activecart: create a new cart and save refid on state.)
    // (2.userinfo: actviecart: save refid on state)

    const {userID} = this.state;

    Axios.get("/shop/initial").then(res => {
      for (let i = 0; i < res.data.length; i++) {
        const e = res.data[i];
        let newArr = this.state.products;
        newArr.push(e);
        this.setState({ products: newArr });
      }
    });
    if (userID) {
        Axios.post('/shop/cart', {userID}).then(res => {
            // pull all qty and update state (numItemsInCart)
            let numItemsInCartLocal = 0;
            res.data.forEach(arr => numItemsInCartLocal += arr['quantity'])
            this.setState({numItemsInCart: numItemsInCartLocal, cartRef: res.data[0].cart_ref})
        })
    }
  }

  addToCart = productID => {
    const { userID, cartRef } = this.state;
    if (userID === 0) {
      alert("please sign in first");
    } else {
      Axios.post("/shop/addToCart", { productID, userID, cartRef }).then(res => {
        alert("Item added to cart");
      });
    }
  };

  render() {
    const mappedProducts = this.state.products.map(eachProductObj => {
      return (
        <Product
          key={eachProductObj.product_id}
          product={eachProductObj}
          addToCart={this.addToCart}
        />
      );
    });

    return (
      <div className="background">
        <div className="header">
          <div className="menu">
            <Link to="/shop/cart">
              <div>cart({this.state.numItemsInCart})</div>
            </Link>
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
export default Shop;
