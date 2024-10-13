import Navbar from "../Navbar/Navbar";
import DisplayBasket from "../DisplayBasket/DisplayBasket";
import userData from "@/assets/Data/userData";

export default function CompletedBaskets() {
  const allBasketsData = userData.allbaskets;
  return (
    <div className="bg-white h-screen">
      <Navbar />

      <div className="px-4">
        <p className="subTitle mb-2">Completed Baskets</p>
        <div>
          {Object.values(allBasketsData).map(
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
        </div>
      </div>
    </div>
  );
}
