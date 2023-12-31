import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import { nanoid } from "nanoid";
import QRCodeGenerator from "../Qrcode";
import validUrl from 'valid-url'
import { BsPersonCircle } from 'react-icons/bs'
// import {FaRegCopy, FaCheck} from 'react-icons/fa'
import './Dashboard.css'


interface Link {
  timestamp: any;
  name: string;
  longURL: string;
  shortUrl: string;
  totalClicks: number;
  id?: string;
}

const AddDataToFirestore = (): JSX.Element => {
  const [name, setName] = useState("");
  const [longURL, setLongURL] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [shortUrl, setShortUrl] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate the long URL
      if (!validUrl.isWebUri(longURL)) {
        setError("Invalid long URL. Please enter a valid URL.");
        return;
      }

      const firestore = getFirestore();

      const shortCode = nanoid(6);

      const generatedShortUrl = `${window.location.host}/${shortCode}`;

      const link: Link = {
        name,
        longURL,
        shortUrl: generatedShortUrl,
        totalClicks: 0,
        timestamp: Timestamp.now(),
      };

      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(
          collection(firestore, "users", currentUser.uid, "links"),
          shortCode
        );
        const publicDocRef = doc(collection(firestore, "publicLinks"), shortCode);

        await setDoc(userDocRef, link);
        await setDoc(publicDocRef, link);

        setLinks((prevLinks) => [{ ...link, id: shortCode }, ...prevLinks]);
        setShortUrl(generatedShortUrl);
      }

      // Clear the error state
      setError("");

      // Reset the form fields
      setName("");
      setLongURL("");
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const firestore = getFirestore();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userLinksCollection = collection(firestore, "users", currentUser.uid, "links");
        const publicLinksCollection = collection(firestore, "publicLinks");

        const userLinksSnapshot = await getDocs(userLinksCollection);
        const publicLinksSnapshot = await getDocs(publicLinksCollection);

        const tempLinks: Link[] = [];

        userLinksSnapshot.forEach((userLinkDoc) => {
          const userLinkData = userLinkDoc.data() as Link;
          const publicLinkDoc = publicLinksSnapshot.docs.find(
            (publicLinkDoc) => publicLinkDoc.id === userLinkDoc.id
          );

          const totalClicks = publicLinkDoc?.data()?.totalClicks || 0;

          const link: Link = {
            ...userLinkData,
            id: userLinkDoc.id,
            totalClicks: totalClicks,
          };

          tempLinks.unshift(link);
        });

        // Sort the links before adding them to the state variable
        tempLinks.sort((a, b) => {
          // Compare the timestamps using the toDate() method
          const timestampA = a.timestamp?.toDate();
          const timestampB = b.timestamp?.toDate();
          if (timestampA && timestampB) {
            return timestampB.getTime() - timestampA.getTime();
          } else {
            return 0;
          }
        });

        setLinks(tempLinks);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="trim-container">
      <form onSubmit={handleFormSubmit} className="trim">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Long URL"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          required
        />
        <button type="submit">Trim URL</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <div className="content">
        <h2>Generated URLs</h2>
        {links.map((link) => (
          <div key={link.id} className="content-card">
            <p className="longurl">{link.longURL}</p>
            <span className="shorturl">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" role="graphics-document" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><title>redirect</title><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"></path></svg>
              <a href={`http://${link.shortUrl}`} target="_blank" rel="noopener noreferrer">
                {link.shortUrl}
              </a>
            </span>
            <p className="totalclicks"><span>Total Clicks:</span> {link.totalClicks}</p>
            <button
              type="button"
              onClick={() => {
                setShortUrl(link.shortUrl);
                setShowQRCode(!showQRCode);
              }}
            >
              Generate QR Code
            </button>\
            {shortUrl === link.shortUrl && showQRCode && (
              <QRCodeGenerator shortUrl={shortUrl} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


const Dashboard = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      alert("You are logged out.");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  const email = user && user.email;
  const trimmedEmail = email ? email.substring(0, email.indexOf('@')) : '';

  return (
    <div className="dashboard">
      <div className="board container">
        <div className="user">
          {user && <div><span><BsPersonCircle /></span><h2>Welcome, {trimmedEmail}</h2></div>}
          <button onClick={handleLogout}>Log out</button>
        </div>
        <AddDataToFirestore />
      </div>
    </div>
  );
};

export default Dashboard;


