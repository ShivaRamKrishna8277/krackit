import { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import DisplayBasket from "../DisplayBasket/DisplayBasket";
import { Link } from "react-router-dom";
import emptyImg from "../../../assets/images/emptyImage.png";
import { fetchUserData, UserData } from "@/assets/Data/userData";
import Skeleton from "@mui/material/Skeleton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";

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

  // Tab
  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };

  return (
    <div className="blackTextWrapper w-full h-full border overflow-x-auto">
      <Navbar />
      <div className="px-4">
        {/* create new basket */}
        <Link to={"/create-new-basket"}>
          <div className="createNewBasketWrapper mb-4">
            <p className="subTitle">Create New Basket</p>
            <div className="createNewBox flex flex-col items-center">
              <p className="text-5xl">+</p>
              <span className="subTitle">Create Basket</span>
            </div>
          </div>
        </Link>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Live" {...a11yProps(0)} />
              <Tab label="Completed" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
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
                <div className="pt-4 pb-3">
                  <img src={emptyImg} alt="" className="emptyImg" />
                  <p className="text-xs opacity-50 text-center pt-3">
                    No Live Baskets Available
                  </p>
                </div>
              )}
            </ul>
          </TabPanel>
          <TabPanel value={value} index={1}>
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
                <div className="pt-4 pb-3">
                  <img src={emptyImg} alt="" className="emptyImg" />
                  <p className="text-xs opacity-50 text-center pt-3">
                    No Completed Baskets Available
                  </p>
                </div>
              )}
            </ul>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
