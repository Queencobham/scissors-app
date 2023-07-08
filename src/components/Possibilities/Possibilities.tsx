import "./Possibilities.css";

export default function Possibilities() {
  return (
    <div className="possibilities">
      <div className="possibilities-frame container">
      <div className="one-stop-four-wrapper">
        <h1 className="one-stop">One Stop.</h1>
        <h1 className="four-Possibilities">Four <span>Possibilities</span>.</h1>
      </div>
      <div className="box-flex">
        <div className="frame-1">
          <p className="text-wrapper">3M</p>
          <p className="text-wrapper-1">Active users</p>
        </div>
        <div className="frame-2">
          <p className="text-wrapper">60M</p>
          <p className="text-wrapper-1">Links &amp; QR <br/> codes created</p>
        </div>
        <div className="frame-3">
          <p className="text-wrapper">1B</p>
          <p className="text-wrapper-1">Clicked &amp; Scanned <br /> connections</p>
        </div>
        <div className="frame-4">
          <p className="text-wrapper">300k</p>
          <p className="text-wrapper-1">App Integrations</p>
        </div>
      </div>
      </div>
    </div>
  );
};


