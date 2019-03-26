import React from "react";
import "./Product.scss";

const Product = props => {
  const {
    product_id: id,
    product_name: name,
    product_description: description,
    price,
    product_image: image
  } = props.product;

  let addToCartLocal = () => {
    return props.addToCart(id);
  };

  return (
    <div className="box">
      <div className="title">{name}</div>
      <img src={image} alt={name} />
      <div>{description}</div>
      <div>
        <span>{price}</span>
        <span>
          {
            props.addToCart ? 
            <button onClick={addToCartLocal}>add to cart</button> 
            :
            <img src="https://static.thenounproject.com/png/592841-200.png" alt="plus sign" />
            <img src='https://static.thenounproject.com/png/592841-200.png' alt="minus sign" />
          }
        </span>
      </div>
    </div>
  );
};

export default Product;

// ternary for precense of add item to cart button or the plus and minus buttons.
