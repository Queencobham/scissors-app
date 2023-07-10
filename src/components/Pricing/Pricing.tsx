import './Pricing.css'

export default function Pricing(){
    return(
        <div className="pricing" id='pricing'>
        <div className="a-price-perfect-for-wrapper">
          <h1 className="a-price-perfect-for">
            A <span className="span-pricing">price perfect</span> for your needs.
          </h1>
          <p>
          From catering for your personal, business, event, socials needs, you can be rest assured we have you in mind
          in our pricing.
          </p>
        </div>

        <div className="cards">
            <div className="card">
              <div className="card-head">
               <h4>basic</h4>
                <h3>free</h3>
                <p>Free plan for all users</p>
              </div>
              <div className="card-body">
                <p>unlimited URL Shortening</p>
                <p>basic link analytics</p>
                <p>customizable short link</p>
                <p>standard support</p>
                <p>ad-supported</p>
              </div>
            </div>

            <div className="card card-center">
              <div className="card-head">
              <h4>professional</h4>
                <h3>$15/month</h3>
                <p>Ideal for business creators</p>
              </div>
              <div className="card-body">
                <p>enhanced link analytics</p>
                <p>custom branded domains</p>
                <p>Advanced link customization</p>
                <p>priority support</p>
                <p>ad-free Experience</p>
              </div>
            </div>

            <div className="card card-last">
              <div className="card-head">
              <h4>teams</h4>
                <h3>$25/month</h3>
                <p>Share with up to 10 users</p>
              </div>
              <div className="card-body">
                <p>team collaboration</p>
                <p>user roles and permissions</p>
                <p>enhanced security</p>
                <p>api access</p>
                <p>dedicated account manager</p>
              </div>
            </div>
        </div>
        <button>select pricing</button>
      </div>
    )
}