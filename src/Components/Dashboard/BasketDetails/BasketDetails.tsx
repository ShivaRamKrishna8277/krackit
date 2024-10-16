import "./BasketDetails.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import BasketListQuestion from "./basketListQuestion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useParams } from "react-router";
import { Basket, fetchBasketById } from "@/assets/Data/userData";
import Loader from "@/Components/Loaders/ContentLoader";

export type TimingData = {
  status: string;
  questions: { question: string; answer: string; status: string }[];
};

export default function BasketDetail() {
  // Get the 'id' param from the URL
  const { id } = useParams<{ id: string | undefined }>();

  const [basket, setBasket] = useState<Basket | null>(null); // Define the state for the basket
  const [loading, setLoading] = useState(true); // Add loading state
  const [showMoreDetails, setShowMoreDetails] = useState(false); // Moved this up to the top

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const fetchedBasket = await fetchBasketById(id);
        setBasket(fetchedBasket);
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchData();
  }, [id]);
  // Handle loading state
  if (loading) {
    return <Loader />;
  }
  // Handle basket not found
  if (!basket) {
    return <p>Basket not found</p>;
  }
  const questionsSchedule = basket.questionsSchedule;

  return (
    <div>
      <Navbar />

      {/* basket details wrapper */}
      <div className="px-4">
        <div
          className={`basketDetailsHeaderWrapper ${!showMoreDetails && "mb-2"}`}
        >
          <div className="Header1 p-2 border rounded bg-white relative z-10">
            <p className="basketTitle text-lg">{basket.basketTitle}</p>
            <div className="basketTimeLine flex items-center justify-between gap-3 my-2">
              <div className="timeLeft">
                <p className="text-xs opacity-50">Started On:</p>
                <p id="startedOnTime" className="text-sm">
                  {basket.startDate}
                </p>
              </div>
              <div className="timeLineDash border-t border-dashed flex-grow"></div>
              <div className="timeRight">
                <p className="text-xs opacity-50">Ends On:</p>
                <p id="endsOnTime" className="text-sm">
                  {basket.endDate}
                </p>
              </div>
            </div>
            <p
              className="viewMoreBtn text-blue-700 text-xs"
              onClick={() => setShowMoreDetails(!showMoreDetails)}
            >
              {!showMoreDetails ? "View More" : "View Less"}
            </p>
          </div>

          <div
            className={`Header2 p-2 pt-4 bg-slate-200 rounded -translate-y-4 ${
              showMoreDetails ? "block" : "hidden"
            }`}
          >
            <p className="text-xs mb-2">
              <span className="opacity-50">Total Questions : </span>
              {basket.totalQuestions}
            </p>
            <p className="text-xs mb-2">
              <span className="opacity-50">Total Questions Daily : </span>
              {basket.questionsDaily}
            </p>
            <p className="text-xs mb-1">
              <span className="opacity-50">Schedule : </span>
            </p>
            <ul className="ps-3 text-xs">
              {basket.schedule.map((sch, index) => (
                <li className="list-disc" key={index}>
                  {sch.time} - {sch.questionsCount} Questions
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="basketDetailsContentWrapper">
          <div className="dailyScheduleWrapper flex flex-col gap-2">
            {Object.keys(questionsSchedule).map((dayKey) => {
              const daySchedule =
                questionsSchedule[dayKey as keyof typeof questionsSchedule]
                  ?.timings;
              return (
                <Accordion key={dayKey}>
                  {daySchedule &&
                    Object.keys(daySchedule).map((timeKey) => {
                      const timingData = daySchedule[
                        timeKey as keyof typeof daySchedule
                      ] as TimingData;
                      // Ensure that timingData is properly typed and check if questions exist
                      return (
                        <Accordion.Item
                          eventKey={`${dayKey}-${timeKey}`}
                          key={`${dayKey}-${timeKey}`}
                        >
                          <Accordion.Header>
                            <p className="capitalize flex items-center gap-2">
                              <span style={{ lineHeight: "15px " }}>
                                {dayKey} : {timeKey}{" "}
                              </span>
                              {timingData.status === "completed" ? (
                                <CheckCircleIcon
                                  color="success"
                                  sx={{ fontSize: 17 }}
                                />
                              ) : null}
                            </p>
                          </Accordion.Header>
                          <Accordion.Body>
                            <ul>
                              {timingData?.questions?.length > 0 ? (
                                timingData.questions.map(
                                  (
                                    questionData: {
                                      question: string;
                                      status: string;
                                    },
                                    index: number
                                  ) => (
                                    <li key={index}>
                                      <BasketListQuestion
                                        question={questionData.question}
                                        index={index}
                                        id={id ? id : ""}
                                        day={dayKey}
                                        time={timeKey}
                                        status={questionData.status}
                                      />
                                    </li>
                                  )
                                )
                              ) : (
                                <li>
                                  <p className="text-center py-2 opacity-50">
                                    No questions available.
                                  </p>
                                </li>
                              )}
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    })}
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
