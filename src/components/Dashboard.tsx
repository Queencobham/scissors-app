import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, setDoc, doc, Timestamp} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { nanoid } from "nanoid";
import QRCodeGenerator from "./Qrcode";
import validUrl from 'valid-url'


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
    <form onSubmit={handleFormSubmit}>
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
      <button type="submit">Add to Firestore</button>
      {error && <p className="error-message">{error}</p>}
      {links.map((link) => (
        <div key={link.id}>
          <p>{link.name}</p>
          <p>{link.longURL}</p>
          <p>{link.shortUrl}</p>
          <p>TotalClicks: {link.totalClicks}</p>
          <button
            type="button"
            onClick={() => {
              setShortUrl(link.shortUrl);
              setShowQRCode(!showQRCode);
            }}
          >
            Generate QR Code
          </button>
          {shortUrl === link.shortUrl && showQRCode && (
            <QRCodeGenerator shortUrl={shortUrl} />
          )}
        </div>
      ))}
    </form>
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

  // useEffect(() => {
  //   const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
  //     if (!user) {
  //       navigate("/"); // Redirect to the login page if the user is not authenticated
  //     }
  //   });

  //   return () => unregisterAuthObserver(); // Cleanup the auth observer when the component unmounts
  // }, [navigate]);

  
  // useEffect(() => {
  //   setPersistence(auth, browserLocalPersistence); // Set Firebase persistence to local storage
  // }, []);

  return (
    <>
      {user && <h2>Welcome, {user.email}</h2>}
      <AddDataToFirestore />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;


