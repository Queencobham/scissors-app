import './Cta.css'

export default function Cta() {
    return (
        <div className="cta">
            <div className="cta-form">
                <div className="first-input">
                    <input type="text" placeholder="Paste URL here..." />
                </div>
                <div className="domainalias">
                    <select name="domain" id="domain" form="domainform">
                        <option value="volvo">Choose Domain</option>
                        <option value="volvo">domain</option>
                        <option value="saab">domain</option>
                        <option value="opel">domain</option>
                    </select>
                    <input type="text" placeholder="Type Alias here" />
                </div>
                <button>Trim URL</button>
                <p>By clicking TrimURL, I agree to the <span>Terms of Service, Privacy Policy</span> and Use of Cookies.</p>
            </div>
        </div>
    )
}