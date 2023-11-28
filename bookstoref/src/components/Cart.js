import React from "react";
import { Image } from "react-bootstrap";

const Cart = ({ cart }) => {
  return (
    <div>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <Image
            className="cart-item-image"
            src={`data:image/png;base64,${item.image}`}
            alt={item.title}
          />
          <div className="cart-item-details">
            <p>{item.title}</p>
            <p>Price: Rs{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: Rs{item.price * item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;






