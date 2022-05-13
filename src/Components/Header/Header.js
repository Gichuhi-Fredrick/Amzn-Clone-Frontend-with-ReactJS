import React, { useContext } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../../Hooks/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function Header() {
  const [{ basket }, dispatch] = useStateValue();
  const { user, isLogged, handleIsLoggedToFalse } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amzn-header"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!isLogged && "/login"}>
          <div className="header__option">
            <span className="header__optionLineOne">
              {isLogged && "/login" ? <p>{user.email} </p> : <p>Guest</p>}
            </span>
            <span className="header__optionLineTwo">
              {!isLogged && "/login" ? (
                <p onClick={() => navigate("/login")}>Sign In</p>
              ) : (
                <p
                  onClick={() => {
                    sessionStorage.clear();
                    window.location = "/";
                    handleIsLoggedToFalse();
                  }}
                >
                  Sign Out
                </p>
              )}
            </span>
          </div>
        </Link>

        <Link to="/Orders">
          <div className="header__option">
            <span className="header__optionLineOne">
              <p>Returns</p>
            </span>
            <span className="header__optionLineTwo">
              <p>& Orders</p>
            </span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">
            <p>Your</p>
          </span>
          <span className="header__optionLineTwo ">
            <p>Prime</p>
          </span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header__optionLineTwo header__basketCount">
              <p>{basket?.length} </p>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
