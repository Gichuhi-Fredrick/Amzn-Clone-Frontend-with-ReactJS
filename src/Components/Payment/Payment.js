import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Payment.css";
import { useStateValue } from "../../Hooks/StateProvider";
import CheckoutProduct from ".././CheckoutProduct/CheckoutProduct";
import { CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../Hooks/reducer";
import { UserContext } from "../../App";

export default function Payment() {
  const [{ basket }, dispatch] = useStateValue();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://amazon-clone-with-nodejs.herokuapp.com/payment?total=${
          getBasketTotal(basket) * 100
        }`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:3000",
            Authorization: sessionStorage.getItem("token"),
          },
          body: JSON.stringify({
            basket: basket,
            user: user,
          }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert(error.error);
        return;
      }

      setLoading(false);
    };

    postData();
    // eslint-disable-next-line
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    navigate("/orders", { replace: true });
    setSucceeded(true);
    setError(null);
    setProcessing(false);
    dispatch({
      type: "EMPTY_BASKET",
    });
  };

  const handleChange = (e) => {
    // Listen for changes
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email} </p>
            <p>Address</p>
            <p>City</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
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
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({basket.length} items):{" "}
                        <strong>{value}</strong>
                      </p>
                      <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                      </small>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparotor={true}
                  prefix={"$"}
                />
                <button
                  disabled={processing || disabled || succeeded}
                  onClick={handleSubmit}
                >
                  <span>
                    {processing ? (
                      <p>Processing</p>
                    ) : loading ? (
                      "Loading..."
                    ) : (
                      "Buy Now"
                    )}
                  </span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
