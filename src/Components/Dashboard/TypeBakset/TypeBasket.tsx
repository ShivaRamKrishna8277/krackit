import Navbar from "../Navbar/Navbar";
import DisplayBasket from "../DisplayBasket/DisplayBasket";
import { Basket, fetchUserData, getLocalDetails } from "@/assets/Data/userData";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import emptyImg from "../../../assets/images/emptyImage.png";

interface basketType {
  type: string;
}

export default function TypeBaskets({ type }: basketType) {
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState<string | null>(null);
  const [baskets, setBaskets] = useState<{ [id: string]: Basket } | null>(null);

  // Get userID on component mount
  useEffect(() => {
    const uid = getLocalDetails(); // Assuming this function returns the user ID
    setUserID(uid.uid);
  }, []);

  // Fetch user data when userID is available
  useEffect(() => {
    const fetchBasketsData = async () => {
      if (userID) {
        try {
          const userData = await fetchUserData(userID); // Fetching user data
          if (userData && userData.allbaskets) {
            setBaskets(userData.allbaskets); // Update baskets if userData is found
          } else {
            setBaskets(null); // Set to null if no baskets are found
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setBaskets(null); // Handle error case
        } finally {
          setLoading(false); // Always stop loading after fetch
        }
      } else {
        console.log("No User Found");
        setLoading(false); // Stop loading if userID is not found
      }
    };

    if (userID) {
      fetchBasketsData(); // Call the async function when userID is available
    }
  }, [userID]);

  return (
    <div className="bg-white h-screen">
      <Navbar />

      <div className="px-4">
        <p className="subTitle mb-2">
          {type === "pending" ? "Live Baskets" : "Completed Baskets"}
        </p>
        <div>
          {!loading ? (
            baskets && Object.keys(baskets).length > 0 ? (
              // Filter baskets by the type passed as prop (type)
              Object.values(baskets).filter((basket) => basket.status === type)
                .length > 0 ? (
                // If filtered baskets exist, display them
                Object.values(baskets)
                  .filter((basket) => basket.status === type)
                  .map((basket) => (
                    <DisplayBasket
                      key={basket.basketID}
                      basketType={type}
                      id={basket.basketID}
                      basketTitle={basket.basketTitle}
                      startDate={basket.startDate}
                      width={basket.progress || 0}
                      endDate={basket.endDate}
                    />
                  ))
              ) : (
                // No baskets of the given type are available
                <div className="pt-4 pb-3 border-t">
                  <img src={emptyImg} alt="" className="emptyImg" />
                  <p className="text-xs opacity-50 text-center pt-3">
                    {type === "pending"
                      ? "No Live Baskets Available"
                      : "No Completed Baskets Available"}
                  </p>
                </div>
              )
            ) : (
              // If no baskets are available at all
              <div className="pt-4 pb-3 border-t">
                <img src={emptyImg} alt="" className="emptyImg" />
                <p className="text-xs opacity-50 text-center pt-3">
                  {type === "pending"
                    ? "No Live Baskets Available"
                    : "No Completed Baskets Available"}
                </p>
              </div>
            )
          ) : (
            // Display skeleton loader while loading
            <ul>
              <li>
                <Skeleton
                  className="mb-3"
                  animation="wave"
                  variant="rounded"
                  height={60}
                />
                <Skeleton
                  className="mb-3"
                  animation="wave"
                  variant="rounded"
                  height={60}
                />
                <Skeleton
                  className="mb-3"
                  animation="wave"
                  variant="rounded"
                  height={60}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
