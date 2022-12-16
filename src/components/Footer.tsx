import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer className="footer">
            <Link to="/regulamin">
                Regulamin
            </Link>
            {" | "}
            <Link to="/kontakt">
                Kontakt
            </Link>
            {" | "}
            <Link to="/polityka-prywatnosci">
                Polityka Prywatności
            </Link>
            {" | "}
            <Link to="/changelog">
                Dziennik zmian
            </Link>
        </footer>
    )
}

export default Footer;