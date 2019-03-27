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
    <div className="box">
      <div className="title">{name}</div>
      <img src={image} alt={name} />
      <div>{description}</div>
      <div>
        <span>{price}</span>
        <span>
            <button onClick={incrementItemLocal}>+</button> 
            <button onClick={decrementItemLocal}>-</button> 
        </span>
      </div>
    </div>
  );
};

export default CartItem;