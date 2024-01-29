import "./Navbar.css";
import logo from "../../assets/logo-no-background.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} />
      </div>
    </div>
  );
};

export default Navbar;
