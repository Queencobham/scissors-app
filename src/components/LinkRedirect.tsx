import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

export default function LinkRedirect() {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinkDoc = async () => {
      const firestore = getFirestore();
      const linkDocRef = doc(collection(firestore, "publicLinks"), shortCode);
  
      try {
        const linkDocSnap = await getDoc(linkDocRef);
        const linkData = linkDocSnap.data();
  
        if (linkData) {
          const { longURL, totalClicks } = linkData;
  
          // Increment totalClicks count
          const updatedTotalClicks = totalClicks + 1;
          await updateDoc(linkDocRef, { totalClicks: updatedTotalClicks });
  
          // Redirect to the long URL
          window.location.replace(longURL);
  
          // Track URL click event
          const analytics = getAnalytics();
          logEvent(analytics, "url_click", { shortCode });
        } else {
          console.log("Link document does not exist");
        }
      } catch (error) {
        console.error("Error fetching link data:", error);
      }
  
      setLoading(false);
    };
  
    fetchLinkDoc();
  }, [shortCode]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
}



