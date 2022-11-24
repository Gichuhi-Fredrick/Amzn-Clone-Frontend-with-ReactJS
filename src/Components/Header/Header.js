import React, { useContext } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import { useStateValue } from "../../Hooks/StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export default function Header() {
  const [{ basket }] = useStateValue();
  const { user, isLogged, isOpen, toggle, windowSize, handleIsLoggedToFalse } =
    useContext(UserContext);
  const navigate = useNavigate();
  const width = windowSize.innerWidth;
  const maxWidth = 768;

  return (
    <div className="header">
      <div className="header__menu" onClick={toggle}>
        {!isOpen && !isLogged && maxWidth >= width ? (
          <Menu className="menu" />
        ) : (
          <Close className="menu close" />
        )}
      </div>
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

      {(isOpen || maxWidth <= width) && (
        <div className="header__nav">
          <div className="nav__login">
            <Link to={!isLogged && "/login"}>
              <div className="header__option">
                <span className="header__optionLineOne">
                  {isLogged && "/login" ? <p>{user.email} </p> : <p>Guest</p>}
                </span>
                <span className="header__optionLineTwo">
                  {!isLogged && "/login" ? (
                    <p
                      onClick={() => {
                        navigate("/login");
                        toggle();
                      }}
                    >
                      Login
                    </p>
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
          </div>

          <div className="nav__orders">
            <Link to="/Orders" onClick={toggle}>
              <div className="header__option header__orders">
                <span className="header__optionLineOne">
                  <p>Returns </p>
                </span>
                <span> &</span>
                <span className="header__optionLineTwo">
                  <p> Orders</p>
                </span>
              </div>
            </Link>
          </div>

          <div className="header__option">
            <span className="header__optionLineOne">
              <p>Your</p>
            </span>
            <span className="header__optionLineTwo ">
              <p>Prime</p>
            </span>
          </div>

          <div className="nav__checkout">
            <Link to="/checkout" onClick={toggle}>
              <div className="header__optionBasket">
                <ShoppingCartIcon />
                <span className="header__optionLineTwo header__basketCount">
                  <p>{basket?.length} </p>
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
