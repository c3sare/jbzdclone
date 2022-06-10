import '../styles/Navigation.css';
import logo from '../images/logo.png';
import coin from '../images/coin.png';
import { MdCampaign, MdSearch, MdEmail, MdNotifications, MdMenu, MdArrowDropDown } from "react-icons/md";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="nav">
            <div className="navContent">
            <div className="left">
                <Link to="/" className="logo">
                    <img height="35px" width="auto" style={{margin: '5px'}} src={logo} alt="logo"/>
                </Link>
                <Link to="/mikroblog/gorace">
                <MdCampaign/> Mikroblog
                </Link>
                <span className="navLink" onClick={(e) => {e.preventDefault();setShowSearch(!showSearch)}}>
                <MdSearch/> Szukaj
                </span>
            </div>
            <div className="right">
                <Link to="/oczekujace">
                Oczekujące
                </Link>
                <Link to="/losowe">
                Losowe
                </Link>
                <Link to="/upload">
                Dodaj
                </Link>
                <span className="navLink" id="departments">
                Działy <MdArrowDropDown />
                <div className="departmentsMenu">
                    <ul>
                    <li><Link to="/kategoria/motoryzacja">Motoryzacja</Link></li>
                    <li><Link to="/kategoria/wiedza">Wiedza</Link></li>
                    <li><Link to="/kategoria/humor">Humor</Link></li>
                    <li><Link to="/kategoria/polityka">Polityka</Link></li>
                    <li><Link to="/kategoria/dowcipy">Dowcipy</Link></li>
                    <li><Link to="/kategoria/pasty">Pasty</Link></li>
                    <li><Link to="/kategoria/czarnyhumor">Czarny humor</Link></li>
                    <li><Link to="/kategoria/gry">Gry</Link></li>
                    <li><Link to="/kategoria/pytanie">Pytanie</Link></li>
                    <li><Link to="/kategoria/sport">Sport</Link></li>
                    <li><Link to="/kategoria/hobby">Hobby</Link></li>
                    <li><Link to="/kategoria/filmy">Filmy</Link></li>
                    <li><Link to="/kategoria/ciekawostki">Ciekawostki</Link></li>
                    <hr/>
                    <li><Link to="/war">Wojna</Link></li>
                    <li><Link to="/metal">Metale</Link></li>
                    <li><Link to="/template">Templatki</Link></li>
                    <li><Link to="/hobby">Hobby</Link></li>
                    <li><Link to="/kitchen">Kuchnia</Link></li>
                    <li><Link to="/music">Muzyka</Link></li>
                    </ul>
                    <ul>
                    <li><b style={{color: 'darkred'}}>NSFW:</b></li>
                    <li><Link to="/hard">Hard</Link></li>
                    <li><Link to="/nsfw">Witam</Link></li>
                    <li><Link to="/anime">Anime</Link></li>
                    <li><Link to="/feet">Stopy</Link></li>
                    <li><Link to="/furry">Furry</Link></li>
                    <li><Link to="/other">Inne nsfw</Link></li>
                    <li><Link to="/cosplay">Cosplay</Link></li>
                    <li><Link to="/hardmem">Hard memy</Link></li>
                    <li><Link to="/premium" style={{color: 'gold'}}>Premium</Link></li>
                    <li><Link to="/own" style={{color: 'lightblue'}}>Własne</Link></li>
                    <li><Link to="/own_male" style={{color: 'blueviolet'}}>Własne</Link></li>
                    </ul>
                </div>
                </span>
                <Link id="coins" to="/">
                <img height="20px" style={{marginRight: '10px'}} width="auto" src={coin} alt="Moneta"/> 0
                </Link>
                <Link id="icon" to="/">
                <MdEmail/>
                </Link>
                <Link id="icon" to="/">
                <MdNotifications/>
                </Link>
                <span className="mobileMenu">
                <MdMenu/>
                </span>
            </div>
            </div>
            {showSearch &&
            <div className="search">
                <div className="searchContent">
                <form>
                    <div className="inputs">
                    <input placeholder="Wpisz szukaną wartość..."/>
                    <button>
                        <MdSearch/>
                    </button>
                    </div>
                    <div className="searchIn">
                    <label>
                        <input type="radio" name="search"/> Wszystkie
                    </label>
                    <label>
                        <input type="radio" name="search"/> Obrazki
                    </label>
                    <label>
                        <input type="radio" name="search"/> Tagi
                    </label>
                    <label>
                        <input type="radio" name="search"/> Użytkownicy
                    </label>
                    </div>
                </form>
                </div>
            </div>
            }
        </div>
    )
}

export default Navigation;