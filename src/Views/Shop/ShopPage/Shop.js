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
      userID: 2,
      cartRef: 0,
      numItemsInCart: 0,
      cartItems: []
    };
  }

  componentDidMount() {
    //componentDidMount order of operations:
    // 1: load products.
    // 2: fetch userID. (2.!userinfo: do nothing)
    // (2.userinfo: !activecart: create a new cart and save refid on state.)
    // (2.userinfo: actviecart: save refid on state)

    this.initialProduct();
    if (this.state.userID) {
      this.initialCart();
    }
  }

  initialProduct = () => {
    return Axios.get("/shop/initial").then(res => {
      for (let i = 0; i < res.data.length; i++) {
        const e = res.data[i];
        let newArr = this.state.products;
        newArr.push(e);
        this.setState({ products: newArr });
      }
    });
  };

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

  addToCart = productID => {
    const { userID, cartRef, cartItems } = this.state;
    if (userID === 0) {
      console.log("No user found, please sign in.");
    } else {
      // let itemObj = cartItems.find(item => item.product_id === productID);
      // console.log({ cartItems }, { productID });
      if (cartItems.findIndex(el => el.product_id === productID) !== -1) {
        let foundCartItem = cartItems.find(el => el.product_id === productID)
        let newQty = foundCartItem.quantity + 1;
        let foundCartID = foundCartItem.cart_id
        Axios.put("/shop/changeQuantity", { foundCartID, newQty }).then(res => {
          this.initialCart();
          console.log(`${productID} successfully incremented.`);
        });
      } else {
        Axios.post("/shop/addToCart", { productID, userID, cartRef }).then(
          res => {
            this.initialCart();
          }
        );
      }
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
      <div className="shop_background">
        <div className="shop_header">
          <div className="shop_menu">
            <Link to="/shop/cart">
              <div>cart({this.state.numItemsInCart})</div>
            </Link>
            <Link to="/shop/history">
            </Link>
          </div>
          <Link to="/">
            <h1>FRealXP</h1>
          </Link>
        </div>
        <div className="shop_body_container">{mappedProducts}</div>
      </div>
    );
  }
}
export default Shop;