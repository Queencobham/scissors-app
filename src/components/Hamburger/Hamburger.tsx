import { CgMenuLeftAlt } from "react-icons/cg"
import logo1 from "../../assets/Vector (3).png"
import logo2 from "../../assets/Vector 2.png"
import { Link } from "react-router-dom"
import './Hamburger.css'

function HamburgerMenu() {
  const handleToggle = () => {
    let sidebar = document.querySelector(".menu");
    if (sidebar) {
      sidebar.classList.toggle("show");
    }
  };

  return (
    <div>
      <div className="hamburger-flex container">
        <div className="logo">
          <img src={logo1} alt="logo" />
          <img src={logo2} alt="logo" />
          <p>SCISSOR</p>
        </div>
        <button onClick={handleToggle} className="toggle-btn">
          <span className="hamburger-icon"><CgMenuLeftAlt /></span>
        </button>
      </div>
      <div className="menu">
        <ul className="menu-items">
          <li><a href="#">My URLs</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">FAQs</a></li>

          <div className="btn">
            <div className="log-in"><Link to="/login">Log in</Link></div>
            <button><Link to="/signup">Try for free</Link></button>
          </div>
        </ul>
        <div className="close-btn">
          <button onClick={handleToggle} className="close">
            X
          </button>
        </div>
      </div>
    </div>
  );
}


export default HamburgerMenu