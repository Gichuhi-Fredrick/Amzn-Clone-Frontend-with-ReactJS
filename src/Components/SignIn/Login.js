import React, { useContext } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function Login() {
  const {
    email,
    password,
    error,
    loadUser,
    handleEmail,
    handlePassword,
    handleIsLogged,
  } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle error message
  const handleError = () => {
    return (
      <div className="error" style={{ display: error ? "" : "none" }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  const handleLogin = async () => {
    const response = await fetch(
      "https://amazon-clone-with-nodejs.herokuapp.com/login",
      {
        method: "post",
        headers: {
          Origin: "http://localhost:3000/login",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      alert(error.error);
      return;
    }
    const user = await response.json();
    sessionStorage.setItem("token", user.token);
    await handleIsLogged();
    handleError();
    await loadUser(user);
    navigate("/");
  };

  const handleRegister = async () => {
    const response = await fetch(
      "https://amazon-clone-with-nodejs.herokuapp.com/register",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000/login",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      alert(error.error);
      return;
    }
    const user = await response.json();
    sessionStorage.setItem("token", user.token);
    await handleIsLogged();
    await loadUser(user);
    handleError();
    navigate("/");
  };

  return (
    <div className="login__logo">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="login"
        />
      </Link>

      <div className="login__container">
        <h1>Login</h1>

        <div className="login__form">
          <h5 style={{ marginBottom: "5px" }}>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={handleEmail}
            style={{
              marginBottom: "10px",
              backgroundColor: "white",
              width: "98%",
              height: "30px",
            }}
          />

          <h5 style={{ marginBottom: "5px" }}>Password</h5>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            style={{
              marginBottom: "10px",
              backgroundColor: "white",
              width: "98%",
              height: "30px",
            }}
          />

          <button
            type="submit"
            onClick={handleLogin}
            className="login__signInButton"
          >
            Sign In
          </button>
        </div>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={handleRegister} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}
