import link from '../../assets/link-2.png'
import arrow from '../../assets/Line 7.png'
// import rectangle from '../../assets/Rectangle.png'
// import ellipse from '../../assets/Ellipse 1.png'
import "./Hero.css";

export default function Hero() {
  return (
    <div className="box">
      <div className="frame">
        <div className="group">
          <h1 className="optimize-your-online">
            Optimize Your Online Experience with Our
            Advanced<span className="url-shortener"> URL Shortening</span> Solution
          </h1>
        </div>
        <p className="hero-text">
          Personalize your shortened URLs to align with your brand identity. Utilize custom slugs, branded links, and
          domain customization options to reinforce your brand presence and enhance user engagement.
        </p>
        <div className="hero-btn">
          <button>sign up</button>
          <p>learn more</p>
        </div>
        <div className="box-before">
          <div className="box-links">
            <div className="links">
              <img src={link} alt="link" className='one' />
              <img src={link} alt="link" className='two' />
              <img src={link} alt="link" className='three' />
              <img src={arrow} alt="arrow" className='four' />
              <img src={link} alt="link" className='five' />
            </div>
            <p>Seamlessly transform your long URLs into concise and shareable links with just few clicks.</p>
          </div>
        </div>
        {/* <div className="rectangle"
          style = {{
            display: "flex",
            justifyContent: "center",
            height: "100px",
            backgroundImage:`url(${rectangle})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
         }}
        >
          <img src={ellipse} alt="ellipse" className='ellipse' />
        </div> */}
      </div>
    </div>
  );
};
