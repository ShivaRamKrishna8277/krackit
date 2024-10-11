import "./Home.css";
import Navbar from "../Navbar/Navbar";
import DisplayBasket from "../DisplayBasket/DisplayBasket";
import basketsData from "../../../assets/Data/liveBaskets.json";
import { Link } from "react-router-dom";

interface BasketInterface {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  progress: number;
}
const Livebaskets: BasketInterface[] = basketsData.baskets;

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
            {Livebaskets.map((basket) => (
              <DisplayBasket
                key={basket.id}
                basketType="live"
                id={basket.id}
                basketTitle={basket.title}
                startDate={basket.startDate}
                width={basket.progress}
                endDate={basket.endDate}
              />
            ))}
          </ul>
        </div>

        {/* Completed baskets */}
        <div className="liveBaskets mb-7">
          <p className="subTitle mb-2">Completed Baskets</p>
          <ul>
            {Livebaskets.map((basket) => (
              <DisplayBasket
                key={basket.id}
                basketType="completed"
                id={basket.id}
                basketTitle={basket.title}
                startDate={basket.startDate}
                width={basket.progress}
                endDate={basket.endDate}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
