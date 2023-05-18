import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../images/click-tweet.svg";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <img
        src={Logo}
        alt="logo"
        width={80}
        onClick={() => {
          navigate("/");
        }}
      />
      <nav className="nav-menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/tweets">Tweets</NavLink>
      </nav>
    </header>
  );
};
export { Header };
