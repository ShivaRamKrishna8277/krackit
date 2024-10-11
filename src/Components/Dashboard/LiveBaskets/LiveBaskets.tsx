import Navbar from "../Navbar/Navbar";
import basketsData from "../../../assets/Data/liveBaskets.json";
import DisplayBasket from "../DisplayBasket/DisplayBasket";

interface BasketInterface {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  progress: number;
}
const LiveBasketsData: BasketInterface[] = basketsData.baskets;

export default function LiveBaskets() {
  return (
    <div className="bg-white h-screen">
      <Navbar />

      <div className="px-4">
        <p className="subTitle mb-2">Live Baskets</p>
        <div>
          {LiveBasketsData.map((basket) => (
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
        </div>
      </div>
    </div>
  );
}
