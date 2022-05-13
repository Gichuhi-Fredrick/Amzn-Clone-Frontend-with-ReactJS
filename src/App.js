import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import Home from "./Components/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Components/SignIn/Login";
import Checkout from "./Components/Checkout/Checkout";
import Payment from "./Components/Payment/Payment";
import Orders from "./Components/Orders/Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51Kln9LLGsLdoY76q00Md9KipBewA6s29Hywi3vwrBoDwBpXybDVPr1KWIf5bRqRb7HQBQezG9tTkZQ5nHjAp4D9S00DWzIXCMO"
);

export const UserContext = React.createContext();

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState({ email: "" });
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const loadUser = (data) => {
    setUser({ email: data.data.email });
  };

  // Hanlding form submission
  const handleIsLogged = () => {
    setIsLogged(true);
  };

  const handleIsLoggedToFalse = (e) => {
    e.preventDefault();
    setIsLogged(false);
    navigate("/");
  };

  // Handling name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling  password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const userValues = {
    user,
    name,
    email,
    submitted,
    password,
    isLogged,
    loadUser,
    handleEmail,
    handleName,
    handlePassword,
    handleIsLogged,
    handleIsLoggedToFalse,
  };

  return (
    <div className="App">
      <UserContext.Provider value={userValues}>
        <Header />
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />{" "}
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
