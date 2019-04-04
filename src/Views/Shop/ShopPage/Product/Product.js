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
    <div className="product_box">
      <div className="product_title">{name}</div>
      <img className="product_image" src={image} alt={name} />
      <div className="product_div">{description}</div>
      <div>
        <span className="product_span">{price}</span>
        <span>
          <button className="product_button" onClick={addToCartLocal}>
            add to cart
          </button>
        </span>
      </div>
    </div>
  );
};

export default Product;