import logo1 from "../../assets/Vector (3).png"
import logo2 from "../../assets/Vector 2.png"
import {Link} from "react-router-dom"
import Hamburger from '../Hamburger/Hamburger'
import AnchorLink from "react-anchor-link-smooth-scroll"
import "./Header.css";

export default function Header() {
  return (
      <>
      <Hamburger />
      <nav className="header container">
      <div className="logo">
        <img src={logo1} alt="logo" />
        <img src={logo2} alt="logo" />
        <p>SCISSOR</p>
      </div>

      <div className="frame">
        <ul>
          <li><Link to="/login">My URLs</Link></li>
          <li><AnchorLink href="#features">Features</AnchorLink></li>
          <li><AnchorLink href="#pricing">Pricing</AnchorLink></li>
          <li><Link to="/login">Analytics</Link></li>
          <li><AnchorLink href="#faq">FAQs</AnchorLink></li>
        </ul>
      </div>

      <div className="btn">
        <div className="log-in"><Link to="/login">Log in</Link></div>
        <button><AnchorLink href="#cta">Try for free</AnchorLink></button>
      </div>
    </nav>
      </>
  );
};
