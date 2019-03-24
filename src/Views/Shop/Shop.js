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
      userID: 1
    };
  }

  componentDidMount() {
      //this request is to get products
    Axios.get("/shop/initial").then(res => {
      for (let i = 0; i < res.data.length; i++) {
        const e = res.data[i];
        let newArr = this.state.products;
        newArr.push(e);
        this.setState({ products: newArr });
      }
    });
  }

  addToCart = (productID) => {
      const {userID} = this.state
    if (userID === 0) {
      alert("please sign in first");
    } else {
      Axios.post("/shop/addToCart", {productID, userID}).then(res => {
        alert("Item added to cart");
      });
    }
  }

  render() {
    const mappedProducts = this.state.products.map(eachProductObj => {
      return (
        <Product key={eachProductObj.product_id} product={eachProductObj} addToCart={this.addToCart}/>
      );
    });

    return (
      <div className="background">
        <div className="header">
          <div className="menu">
            <Link to="/shop/cart">
              <div>cart</div>
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
