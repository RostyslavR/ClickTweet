import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../images/click-tweet.svg";
import userAvatar from "../../images/avatar.png";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <img
        className="logo"
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
      <img
        className="user-avatar"
        src={userAvatar}
        alt="user avatar"
        width={80}
      />
    </header>
  );
};
export { Header };
