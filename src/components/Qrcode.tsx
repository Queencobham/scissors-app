import QRCode from "qrcode.react";

interface QRCodeGeneratorProps {
  shortUrl: string;
}

const QRCodeGenerator = ({ shortUrl }: QRCodeGeneratorProps) => {
  const downloadQRCode = () => {
    const canvas = document.getElementById("qrcode-canvas") as HTMLCanvasElement;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div>
      <QRCode id="qrcode-canvas" value={shortUrl} size={200} />
      <button type="button" onClick={downloadQRCode}>Download QR Code</button>
    </div>
  );
};

export default QRCodeGenerator; 





// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getFirestore, collection, doc, getDoc, updateDoc } from "firebase/firestore";
// import { getAnalytics, logEvent } from "firebase/analytics";

// export default function LinkRedirect() {
//   const { shortCode } = useParams();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLinkDoc = async () => {
//       const firestore = getFirestore();
//       const linkDocRef = doc(collection(firestore, "publicLinks"), shortCode);

//       try {
//         const linkDocSnap = await getDoc(linkDocRef);
//         const linkData = linkDocSnap.data();

//         if (linkData) {
//           const { longURL, totalClicks } = linkData;

//           // Redirect to the long URL
//           window.location.replace(longURL);

//           // Increment totalClicks count
//           const updatedTotalClicks = totalClicks + 1;
//           await updateDoc(linkDocRef, { totalClicks: updatedTotalClicks });

//           // Track URL click event
//           const analytics = getAnalytics();
//           logEvent(analytics, "url_click", { shortCode });
//         } else {
//           console.log("Link document does not exist");
//         }
//       } catch (error) {
//         console.error("Error fetching link data:", error);
//       }

//       setLoading(false);
//     };

//     fetchLinkDoc();
//   }, [shortCode]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return null;
// }




// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

// export default function LinkRedirect() {
//   const { shortCode } = useParams();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("Short Code:", shortCode);
//     const fetchLinkDoc = async () => {
//       const firestore = getFirestore();
//       const linkDocRef = doc(collection(firestore, "publicLinks"), shortCode);
//       console.log("Link Document Reference:", linkDocRef);

//       const linkDocSnap = await getDoc(linkDocRef);
//       const linkData = linkDocSnap.data();
//       console.log("Link Data:", linkData);

//       if (linkData) {
//         const { longURL } = linkData;
//         console.log("Redirecting to:", longURL);
//         window.location.replace(longURL);
//       } else {
//         console.log("Link document does not have data");
//       }

//       setLoading(false);
//     };

//     fetchLinkDoc();
//   }, [shortCode]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return null;
// }
