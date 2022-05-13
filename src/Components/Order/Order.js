import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";

export default function Order({ id, created, amount, items }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(created).format("MMMM Do YYYY, h:mma")}</p>
      {items.map((item, i) => (
        <CheckoutProduct
          id={item[i].id + (Math.random() * 10).toFixed(i)}
          title={item[i].title}
          image={item[i].image}
          price={item[i].price}
          rating={item[i].rating}
          hideButton
        />
      ))}
    </div>
  );
}
