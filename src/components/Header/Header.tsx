import logo1 from "../../assets/Vector (3).png"
import logo2 from "../../assets/Vector 2.png"
import {Link} from "react-router-dom"
import "./Header.css";

export default function Header() {
  return (
    <nav className="header container">
      <div className="logo">
        <img src={logo1} alt="logo" />
        <img src={logo2} alt="logo" />
        <p>SCISSOR</p>
      </div>

      <div className="frame">
        <ul>
          <li><a href="#">My URLs</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">FAQs</a></li>
        </ul>
      </div>

      <div className="btn">
        <div className="log-in"><Link to="/login">Log in</Link></div>
        <button><Link to="/signup">Try for free</Link></button>
      </div>
    </nav>
  );
};
