import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import CartItem from "./CartItem";
import Checkout from "./../../../Components/Stripe/Checkout";
import {initialProductLogic} from "./CartLogic";

import "./Cart.scss";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      userID: 2,
      cartRef: 0,
      products: [{ price: 0 }],
      numItemsInCart: 0,
      cartItems: [],
      cartSum: 0
    };
  }
  componentDidMount() {
    this.initialProduct().then(() => {
      if (this.state.userID) {
        this.initialCart().then(() => {
          if (this.state.cartItems.length > 0) {
            this.initialTotal();
          }
        });
      }
    });
  }

  initialProduct = () => {
    return Axios.get("/shop/initial").then(res => {
      this.setState({ products: initialProductLogic(res.data) });
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

  initialTotal = () => {
    for (let index = 0; index < this.state.cartItems.length; index++) {
      const eachItemObj = this.state.cartItems[index];
      let productID = eachItemObj.product_id;
      let productsIndex = this.state.products.findIndex(
        el => el.product_id === productID
      );

      let productPrice = this.state.products[productsIndex].price;
      let productQty = eachItemObj.quantity;
      let multiplier = (a, b) => a * b;
      let localTotal =
        this.state.cartSum + multiplier(productPrice, productQty);
      this.setState({
        cartSum: localTotal
      });
    }
  };

  incrementItem = productID => {
    const { cartItems } = this.state;
    //axios call to change quantity for cart_ref to quantity + 1
    const foundItem = cartItems.find(
      cartItem => cartItem.product_id === productID
    );
    let foundCartID = foundItem.cart_id;
    let foundQty = foundItem.quantity;
    let newQty = foundQty + 1;
    Axios.put("/shop/changeQuantity", { foundCartID, newQty }).then(res => {
      this.initialCart();
    });
  };

  decrementItem = productID => {
    //axios call to change quantity for cart_ref to quantity - 1
    const { cartItems } = this.state;
    const foundItem = cartItems.find(
      cartItem => cartItem.product_id === productID
    );
    let foundCartID = foundItem.cart_id;
    let foundQty = foundItem.quantity;
    let newQty = foundQty - 1;
    Axios.put("/shop/changeQuantity", { foundCartID, newQty }).then(res => {
      this.initialCart();
    });
  };

  removeItem = productID => {
    //axios call to delete the row from the cart by cart_id
    const { cartItems } = this.state;
    const foundItem = cartItems.find(
      cartItem => cartItem.product_id === productID
    );
    let foundCartID = foundItem.cart_id;
    Axios.delete(`/shop/cart/${foundCartID}`).then(res => {
      this.initialCart();
    });
  };

  render() {
    const mappedProducts = this.state.cartItems.map(eachItemObj => {
      return (
        <CartItem
          key={eachItemObj.product_id}
          item={eachItemObj}
          allProducts={this.state.products}
          incrementItem={this.incrementItem}
          decrementItem={this.decrementItem}
          removeItem={this.removeItem}
        />
      );
    });

    return (
      <div className="cart_background">
        <div className="cart_header">
          <div className="cart_menu">
            <div>cart({this.state.numItemsInCart})</div>
            <Checkout
              grandTotal={this.state.cartSum}
              cartID={this.state.cartItems[0]}
            />
            <Link to="/shop/history" />
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
