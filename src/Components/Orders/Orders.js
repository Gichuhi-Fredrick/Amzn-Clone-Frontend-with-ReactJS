import React, { useState, useEffect, useContext } from "react";
import "./Orders.css";
import Order from "../Order/Order";
import { UserContext } from "../../App";
import CurrencyFormat from "react-currency-format";

export default function Orders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [created, setCreated] = useState();
  const [amount, setAmount] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "https://amazon-clone-with-nodejs.herokuapp.com/orders",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:3000",
            Authorization: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({
            user: user,
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert(error.error);
        return;
      }
      const data = await res.json();
      setId(data.payment_id);
      setOrders(data.items_purchased);
      setCreated(data.created);
      setAmount(data.amount);
    };

    getData();
  }, [user]);

  const orderComponent = Object.entries(orders).map(([key, values], i) => {
    console.log(i);
    let value = [];
    value.push(values);
    return (
      <Order
        key={Math.random() * 100}
        id={id}
        created={created}
        amount={amount}
        items={[value]}
      />
    );
  });

  return (
    <div className="orders">
      <div className="orders__title">
        <h1>Your Orders</h1>
        <div className="orders__total">
          <CurrencyFormat
            renderText={(value) => (
              <>
                <h3 className="order__total">Order Total: {value}</h3>
              </>
            )}
            decimalScale={2}
            value={amount / 100} //Convert to dollars from cents
            displayType={"text"}
            thousandSeparotor={true}
            prefix={"$"}
          />
          <p className="order__id">{<small>Order Id: {id}</small>}</p>
        </div>
      </div>

      <div className="orders__order">{orderComponent}</div>
    </div>
  );
}
