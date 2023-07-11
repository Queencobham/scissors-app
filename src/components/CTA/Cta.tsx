import { useState } from "react";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import validUrl from 'valid-url';
import './Cta.css'

interface Link {
  longURL: string;
  shortUrl: string;
}

const Cta = (): JSX.Element => {
  const [longURL, setLongURL] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate the long URL
      if (!validUrl.isWebUri(longURL)) {
        setError("Invalid long URL. Please enter a valid URL.");
        return;
      }

      setIsLoading(true);

      const firestore = getFirestore();

      const shortCode = nanoid(6);

      const generatedShortUrl = `${window.location.host}/${shortCode}`;

      const link: Link = {
        longURL,
        shortUrl: generatedShortUrl,
      };

      const publicDocRef = doc(collection(firestore, "publicLinks"), shortCode);
      await setDoc(publicDocRef, link);

      setShortUrl(generatedShortUrl);

      // Clear the error state
      setError("");
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <div className="cta" id="cta">
      <div className="cta-form">
        <form onSubmit={handleFormSubmit} className="input-form">
          <div className="first-input">
            <input
              type="text"
              placeholder="Long URL"
              value={longURL}
              onChange={(e) => setLongURL(e.target.value)}
              required
            />
          </div>
          {/* <div className="domainalias">
            <input type="text" placeholder="Enter domain name - optional" />
            <input type="text" placeholder="Type alias here - optional" />
          </div> */}
          <button type="submit">  {isLoading ? 'Loading...' : 'Trim URL'} </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {shortUrl && (
          <div className="shortened">
            <p>Short URL: <span>{shortUrl}</span></p>
            <button onClick={handleCopyToClipboard}>
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
          <p>By clicking TrimURL, I agree to the <span>Terms of Service, Privacy Policy</span> and Use of Cookies.</p>
      </div>
    </div>


    // <div className="cta" id="cta">
    //     <div className="cta-form">
    //         <form onSubmit={handleFormSubmit} className="input-form">
    //             <div className="first-input">
    //                 <input
    //                     type="text"
    //                     placeholder="Long URL"
    //                     value={longURL}
    //                     onChange={(e) => setLongURL(e.target.value)}
    //                     required
    //                 />
    //             </div>
    //             {/* <div className="domainalias">
    //                 <input type="text" placeholder="Enter domain name" />
    //                 <input type="text" placeholder="Type alias here" />
    //             </div> */}
    //             <button type="submit">Trim URL</button>
    //         </form>
    //         {error && <p className="error-message">{error}</p>}
    //         {shortUrl && (
    //             <div className="shortenedurl">
    //                 <p>Shortened URL: {shortUrl}</p>
    //             </div>
    //         )}
    //         <p>By clicking TrimURL, I agree to the <span>Terms of Service, Privacy Policy</span> and Use of Cookies.</p>
    //     </div>
    // </div>
    // // <div>
    // //   <form onSubmit={handleFormSubmit}>
    // //     <input
    // //       type="text"
    // //       placeholder="Long URL"
    // //       value={longURL}
    // //       onChange={(e) => setLongURL(e.target.value)}
    // //       required
    // //     />
    // //     <button type="submit">Generate Short URL</button>
    // //   </form>

    // //   {error && <p className="error-message">{error}</p>}
    // //   {shortUrl && (
    // //     <div>
    // //       <p>Short URL: {shortUrl}</p>
    // //     </div>
    // //   )}
    // // </div>
  );
};

export default Cta;

