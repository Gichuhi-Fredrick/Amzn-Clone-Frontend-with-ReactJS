import React from "react";
import "./Checkout.css";
import Subtotal from ".././Subtotal/Subtotal";
import { useStateValue } from "../.././Hooks/StateProvider";
import CheckoutProduct from ".././CheckoutProduct/CheckoutProduct";

export default function Checkout() {
  const [{ basket, user }] = useStateValue();

  return (
    <div className="Checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div className="checkout__hello">
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>

          {basket.map((item, i) => (
            <CheckoutProduct
              key={i}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}
