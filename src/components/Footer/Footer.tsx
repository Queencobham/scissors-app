import logo1 from "../../assets/Vector black.png"
import logo2 from "../../assets/Vector 2 black.png"
import { AiOutlineTwitter, AiOutlineInstagram, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai'
import './Footer.css'

export default function Footer() {
    return (
        <div className="footer container">
            <div className="footer-flex">
                <div className="footer-logo">
                    <div className="logo">
                        <img src={logo1} alt="logo" />
                        <img src={logo2} alt="logo" />
                        <p>SCISSOR</p>
                    </div>
                    <div className="socials">
                        <AiOutlineTwitter />
                        <AiOutlineInstagram />
                        <AiFillLinkedin />
                        <AiFillFacebook />
                    </div>
                </div>

                <div className="footer-links">
                    <div className="link">
                        <h4>why scissor ?</h4>
                        <ul>
                            <li><a href="#">scissor 101</a></li>
                            <li><a href="#">integration & API</a></li>
                            <li><a href="#">pricing</a></li>
                        </ul>
                    </div>

                    <div className="link">
                        <h4>solutions</h4>
                        <ul>
                            <li><a href="#">social media</a></li>
                            <li><a href="#">digital marketing</a></li>
                            <li><a href="#">customer service</a></li>
                            <li><a href="#">for developers</a></li>
                        </ul>
                    </div>

                    <div className="link">
                        <h4>products</h4>
                        <ul>
                            <li><a href="#">link management</a></li>
                            <li><a href="#">QR codes</a></li>
                            <li><a href="#">link-in-bio</a></li>
                        </ul>
                    </div>

                    <div className="link">
                        <h4>company</h4>
                        <ul>
                            <li><a href="#">about scissor</a></li>
                            <li><a href="#">careers</a></li>
                            <li><a href="#">partners</a></li>
                            <li><a href="#">press</a></li>
                            <li><a href="#">contact</a></li>
                            <li><a href="#">reviews</a></li>
                        </ul>
                    </div>

                    <div className="link">
                        <h4>resources</h4>
                        <ul>
                            <li><a href="#">blog</a></li>
                            <li><a href="#">resource library</a></li>
                            <li><a href="#">developers</a></li>
                            <li><a href="#">app connections</a></li>
                            <li><a href="#">support</a></li>
                            <li><a href="#">trust center</a></li>
                            <li><a href="#">browser extension</a></li>
                            <li><a href="#">mobile app</a></li>
                        </ul>
                    </div>

                    <div className="link">
                        <h4>featured</h4>
                        <ul>
                            <li><a href="#">branded links</a></li>
                            <li><a href="#">mobile links</a></li>
                            <li><a href="#">campaign</a></li>
                            <li><a href="#">management & <br />analytics</a></li>
                            <li><a href="#">QR code generator</a></li>
                        </ul>
                    </div>

                    <div className="link">
                        <h4>legal</h4>
                        <ul>
                            <li><a href="#">privacy policy</a></li>
                            <li><a href="#">cookie policy</a></li>
                            <li><a href="#">term of service</a></li>
                            <li><a href="#">acceptable use policy</a></li>
                            <li><a href="#">code of conduct</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-text">
                <p>Term of Service</p>
                <span />
                <p>Security</p>
                <span />
                <p>Scissor 2023</p>
            </div>
        </div>
    )
}
