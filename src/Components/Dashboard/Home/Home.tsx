import "./Home.css";
import Navbar from "../Navbar/Navbar";
import DisplayBasket from "../DisplayBasket/DisplayBasket";
import { Link } from "react-router-dom";
import userData from "@/assets/Data/userData";

export default function Home() {
  return (
    <div className="blackTextWrapper w-full h-full border overflow-x-auto">
      <Navbar />
      <div className="px-4">
        {/* create new basket */}
        <Link to={"/create-new-basket"}>
          <div className="createNewBasketWrapper mb-7">
            <p className="subTitle">Create New Basket</p>
            <div className="createNewBox flex flex-col items-center">
              <p className="text-5xl">+</p>
              <span className="subTitle">Create Basket</span>
            </div>
          </div>
        </Link>

        {/* live baskets */}
        <div className="liveBaskets mb-7">
          <p className="subTitle mb-2">Live Baskets</p>
          <ul>
            {Object.values(userData.allbaskets).map(
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
            )}
          </ul>
        </div>

        {/* Completed baskets */}
        <div className="liveBaskets mb-7">
          <p className="subTitle mb-2">Completed Baskets</p>
          <ul>
            {Object.values(userData.allbaskets).map(
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
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
