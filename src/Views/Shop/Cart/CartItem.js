import React from "react";
import "./CartItem.scss";

const CartItem = props => {
  const {
    product_id,
    product_name,
    product_description,
    price,
    product_image,
  } = props.item;

  console.log(props)

  const currentItem = props.allProducts.findIndex(el => el.product_id === props.item.product_id)
  console.log(currentItem)

  const subtotal = () => {return props.allProducts[currentItem].price * props.item.quantity}

  let incrementItemLocal = (product_id) => {
      return props.incrementItem(product_id)
  }

  let decrementItemLocal = () => {
      return props.decrementItem(product_id)
  }


  return (
    <div>
    { (currentItem <= 0) ? null :
    (<div className="cartitem_box">
      <img src={props.allProducts[currentItem].product_image} alt={props.product_name} />
      <div className="cartitem_summary_container">
        <div>{props.allProducts[currentItem].product_name}</div>
        <div>{props.allProducts[currentItem].price}</div>
        <div>qty: {props.item.quantity}</div>
      </div>
      <div> subtotal: ${subtotal()}</div>
      <div className="cartitem_button_container">
        <div className="cartitem_plus_minus_container">
          <div>-</div>
          <div>+</div>
        </div>
        <button>remove</button>
      </div>
    </div>)
    }
  </div>
  );

};

export default CartItem;