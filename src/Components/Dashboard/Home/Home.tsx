import { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import DisplayBasket from "../DisplayBasket/DisplayBasket";
import { Link } from "react-router-dom";
import emptyImg from "../../../assets/images/emptyImage.png";
import { fetchUserData, UserData } from "@/assets/Data/userData";
import Skeleton from "@mui/material/Skeleton";

interface personalDetails {
  name: string;
  email: string;
  uid: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null); // State to store userData
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [personalDetailsState, setPersonalDetailsState] =
    useState<personalDetails | null>(null);

  // Fetch personal details from localStorage
  useEffect(() => {
    const personalDetails = localStorage.getItem("details");
    if (personalDetails) {
      setPersonalDetailsState(JSON.parse(personalDetails));
    } else {
      console.log("Personal Details Not Found!");
      setLoading(false);
    }
  }, []);

  // Fetch user data based on personalDetailsState (wait until it is set)
  useEffect(() => {
    const fetchData = async () => {
      if (personalDetailsState?.uid) {
        const data = await fetchUserData(personalDetailsState.uid); // Wait for the data to be fetched
        data && setUserData(data); // Set the fetched user data
        setLoading(false); // Set loading to false after fetching
      } else {
        console.log("UID not found");
        setLoading(false); // Set loading to false after fetching
      }
    };

    // Only fetch data when personalDetailsState is available
    if (personalDetailsState?.uid) {
      fetchData();
    }
  }, [personalDetailsState]);

  return (
    <div className="blackTextWrapper w-full h-full border overflow-x-auto">
      <Navbar />
      <div className="px-4">
        {/* create new basket */}
        <Link to={"/create-new-basket"}>
          <div className="createNewBasketWrapper mb-10">
            <p className="subTitle">Create New Basket</p>
            <div className="createNewBox flex flex-col items-center">
              <p className="text-5xl">+</p>
              <span className="subTitle">Create Basket</span>
            </div>
          </div>
        </Link>

        {/* live baskets */}
        <div className="liveBaskets mb-10">
          <p className="subTitle pb-2">Live Baskets</p>
          <ul>
            {loading ? (
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
            ) : userData?.allbaskets &&
              Object.keys(userData.allbaskets).filter(
                (key) => userData.allbaskets[key].status !== "completed"
              ).length > 0 ? (
              Object.values(userData.allbaskets).map(
                (basket) =>
                  basket.status !== "completed" && (
                    <DisplayBasket
                      key={basket.basketID}
                      basketType="pending"
                      id={basket.basketID}
                      basketTitle={basket.basketTitle}
                      startDate={basket.startDate}
                      width={basket.progress}
                      endDate={basket.endDate}
                    />
                  )
              )
            ) : (
              <div className="pt-4 pb-3 border-t">
                <img src={emptyImg} alt="" className="emptyImg" />
                <p className="text-xs opacity-50 text-center pt-3">
                  No Live Baskets Available
                </p>
              </div>
            )}
          </ul>
        </div>

        {/* Completed baskets */}
        <div className="liveBaskets mb-10">
          <p className="subTitle pb-2">Completed Baskets</p>
          <ul>
            {loading ? (
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
            ) : userData?.allbaskets &&
              Object.keys(userData.allbaskets).filter(
                (key) => userData.allbaskets[key].status === "completed"
              ).length > 0 ? (
              Object.values(userData.allbaskets).map(
                (basket) =>
                  basket.status === "completed" && (
                    <DisplayBasket
                      key={basket.basketID}
                      basketType="completed"
                      id={basket.basketID}
                      basketTitle={basket.basketTitle}
                      startDate={basket.startDate}
                      width={basket.progress}
                      endDate={basket.endDate}
                    />
                  )
              )
            ) : (
              <div className="pt-4 pb-3 border-t">
                <img src={emptyImg} alt="" className="emptyImg" />
                <p className="text-xs opacity-50 text-center pt-3">
                  No Live Baskets Available
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
