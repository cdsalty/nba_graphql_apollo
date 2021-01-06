import "./navbar.css";
import nba from "../nba.png";

const NavBar = () => {
  return (
    <div className="heading">
      <div className="logo_holder">
        <img src={nba} alt="NBA Logo" />
      </div>
    </div>
  );
};

export default NavBar;
