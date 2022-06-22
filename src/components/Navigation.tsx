import "../styles/Navigation.css";
import logo from "../images/logo.png";
import coin from "../images/coin.png";
import defaultAvatar from "../images/avatars/default.jpg";
import {
  MdCampaign,
  MdSearch,
  MdEmail,
  MdNotifications,
  MdMenu,
  MdArrowDropDown,
  MdAccessTime,
  MdStar,
  MdOutlineFileUpload,
  MdSettings,
} from "react-icons/md";
import { GiDiceSixFacesTwo } from "react-icons/gi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Category, categories } from "../data/categories";

const Navigation = () => {
  const [showSearch, setShowSearch] = useState<Boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<Boolean>(false);

  const categoryContainer = categories.map(
    (group: Category[], index: number) => (
      <ul key={index}>
        {group.map((category: Category, indexCategory: number) => (
          <li key={indexCategory}>
            <Link
              style={category.color ? { color: category.color } : {}}
              to={category.to}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    )
  );

  return (
    <div className="nav">
      <div className="navContent">
        <div className="left">
          <Link to="/" className="logo">
            <img
              height="35px"
              width="auto"
              style={{ margin: "5px" }}
              src={logo}
              alt="logo"
            />
          </Link>
          <Link to="/mikroblog/gorace">
            <MdCampaign /> Mikroblog
          </Link>
          <span
            className="navLink"
            onClick={(e) => {
              e.preventDefault();
              setShowSearch(!showSearch);
            }}
          >
            <MdSearch /> Szukaj
          </span>
        </div>
        <div className="right">
          <Link to="/oczekujace">Oczekujące</Link>
          <Link to="/losowe">Losowe</Link>
          <Link to="/upload">Dodaj</Link>
          <span className="navLink" id="departments">
            Działy <MdArrowDropDown />
            <div className="departmentsMenu">{categoryContainer}</div>
          </span>
          <Link id="coins" to="/">
            <img
              height="20px"
              style={{ marginRight: "10px" }}
              width="auto"
              src={coin}
              alt="Moneta"
            />{" "}
            0
          </Link>
          <Link id="icon" to="/">
            <MdEmail />
          </Link>
          <Link id="icon" to="/">
            <MdNotifications />
          </Link>
          <span
            className="mobileMenu"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <MdMenu />
          </span>
        </div>
      </div>
      {showSearch && (
        <div className="search">
          <div className="searchContent">
            <form>
              <div className="inputs">
                <input placeholder="Wpisz szukaną wartość..." />
                <button>
                  <MdSearch />
                </button>
              </div>
              <div className="searchIn">
                <label>
                  <input type="radio" name="search" /> Wszystkie
                </label>
                <label>
                  <input type="radio" name="search" /> Obrazki
                </label>
                <label>
                  <input type="radio" name="search" /> Tagi
                </label>
                <label>
                  <input type="radio" name="search" /> Użytkownicy
                </label>
              </div>
            </form>
          </div>
        </div>
      )}
      {showMobileMenu && (
        <div className="mobileMenuContainer">
          <div className="loginInfo">
            <Link to="/login">
              <img src={defaultAvatar} alt="Avatar" />
              <span>Niezalogowany</span>
            </Link>
          </div>
          <div className="mainMenuMobileContainer">
            <Link to="/mikroblog">
              <span className="iconMenu">
                <MdCampaign />
              </span>
              <span>Mikroblog</span>
            </Link>
            <Link to="/wyszukaj">
              <span className="iconMenu">
                <MdSearch />
              </span>
              <span>Szukaj</span>
            </Link>
            <Link to="/oczekujace">
              <span className="iconMenu">
                <MdAccessTime />
              </span>
              <span>Oczekujące</span>
            </Link>
            <Link to="/ulubione">
              <span className="iconMenu">
                <MdStar />
              </span>
              <span>Ulubione</span>
            </Link>
            <Link to="/losowe">
              <span className="iconMenu">
                <GiDiceSixFacesTwo />
              </span>
              <span>Losowe</span>
            </Link>
            <Link to="/upload">
              <span className="iconMenu">
                <MdOutlineFileUpload />
              </span>
              <span>Upload</span>
            </Link>
            <Link to="/uzytkownik/ustawienia">
              <span className="iconMenu">
                <MdSettings />
              </span>
              <span>Ustawienia</span>
            </Link>
          </div>
          <div className="departmentsMenuMobile">{categoryContainer}</div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
