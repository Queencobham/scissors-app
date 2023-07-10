import grid from '../../assets/grid.png'
import activity from '../../assets/activity.png'
import edit from '../../assets/edit.png'
import link3 from '../../assets/link3.png'
import "./Why.css";

export default function Why() {
  return (
    <div className="why container" id='features'>
      <div className="why-wrapper">
        <div className="flex-left">
          <h1 className="why-choose-scissors">why choose <span>scissors</span></h1>
          <p className="flex-left-text">
            Scissors is the hub of everything that has to do with your link management. We shorten your URLs, allow
            you creating custom ones for your personal, business, event usage. Our swift QR code creation, management
            and usage tracking with advance analytics for all of these is second to none.
          </p>
        </div>

        <div className="flex-right">
          <div className="group">
            <div className="img-circle">
            <img src={link3} alt="link" />
            </div>
            <h3>URL Shortening</h3>
            <p>
              Scissor allows you to shorten URLs of your business, events. Shorten your URL at scale, URL
              redirects.
            </p>
          </div>
          <div className="group">
            <div className="img-circle">
            <img src={edit} alt="edit" />
            </div>
            <h3>Custom URLs</h3>
            <p>
              With Scissor, you can create custom URLs, with the length you want! A solution for socials and
              businesses.
            </p>
          </div>
          <div className="group">
            <div className="img-circle">
            <img src={grid} alt="grid" />
            </div>
            <h3>QR Codes</h3>
            <p>
              Generate QR codes to your business, events. Bring your audience and customers to your doorstep with
              this scan and go solution.
            </p>
          </div>
          <div className="group">
           <div className="img-circle">
           <img src={activity} alt="activity" />
           </div>
            <h3>Data Analytics</h3>
            <p>
              Receive data on the usage of either your shortened URL, custom URLs or generated QR codes. Embedded
              to monitor progress.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
