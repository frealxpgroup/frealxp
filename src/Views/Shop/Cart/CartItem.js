import React from "react";
import "./CartItem.scss";

const CartItem = props => {
  const {
    product_id: id,
    product_name: name,
    product_description: description,
    price,
    product_image: image
  } = props.product;


  let incrementItemLocal = () => {
      return props.incrementItem(id)
  }

  let decrementItemLocal = () => {
      return props.decrementItem(id)
  }


  return (
    <div className="cartitem_box">
      <img src={props.product_img} alt={props.product_name} />
      <div className="cartitem_summary_container">
        <div>T-shirt</div>
        <div>15.99</div>
        <div>qty: 4</div>
      </div>
      <div> subtotal: $60</div>
      <div className="cartitem_button_container">
        <div className="cartitem_plus_minus_container">
          <div>-</div>
          <div>+</div>
        </div>
        <button>remove</button>
      </div>
    </div>
  );
};

export default CartItem;