import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "react-bootstrap/Button";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  fetchQuestionDetails,
  Timing,
  updateStatus,
} from "@/assets/Data/userData";
import { useEffect, useState } from "react";
import Loader from "@/Components/Loaders/ContentLoader";

export default function Read() {
  const { id, day, timing, questionIndex } = useParams<{
    id: string | undefined;
    day: string | undefined;
    timing: string | undefined;
    questionIndex: string | undefined;
  }>();

  const navigate = useNavigate();
  const [timingData, setTimingData] = useState<Timing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if all parameters are defined
    if (id && day && timing) {
      const fetchDetails = async () => {
        const details = await fetchQuestionDetails(id, day, timing);
        details !== undefined && setTimingData(details); // Set the fetched timing data
        setLoading(false); // Set loading to false after fetching
      };
      fetchDetails();
    } else {
      console.log("One or more parameters are undefined.");
      setLoading(false); // Set loading to false even if parameters are missing
    }
  }, [id, day, timing, questionIndex]);

  // Handle loading state
  if (loading) {
    return <Loader />;
  }
  // Handle timing data not found
  if (!timingData) {
    return <p>Timing not found</p>;
  }

  const questions = timingData.questions;
  const maxQuestionIndex = questions.length;
  const Index = Number(questionIndex);
  // Determine bounds
  const isLowerBound = Index === 0;
  const isUpperBound = Index + 1 === maxQuestionIndex;
  // Access the specific question and answer by index
  const questionData = questions[Index]; // Use Index instead of questionIndex
  if (!questionData) {
    return <p>Question not found</p>;
  }

  // Function to update question status
  async function updateQuestionStatus() {
    const isUpdated = await updateStatus(id, day, timing, questionIndex);
    if (isUpdated && !isUpperBound) {
      navigate(`/read/${id}/${day}/${timing}/${Index + 1}`, {
        replace: true,
      });
    } else {
      navigate(`/basket/${id}`, {
        replace: true,
      });
    }
  }

  return (
    <>
      <div className="readNavbar bg-white border-b p-3">
        <Link to={`/basket/${id}`}>
          <div className="flex items-center gap-2">
            <ArrowBackIcon />
            <span>Back</span>
          </div>
        </Link>
      </div>
      <div className="readNavBtns flex items-center justify-between p-3">
        <Button
          variant="primary"
          size="sm"
          disabled={isLowerBound}
          onClick={() => {
            if (!isLowerBound) {
              navigate(`/read/${id}/${day}/${timing}/${Index - 1}`, {
                replace: true,
              });
            }
          }}
          className="flex items-center gap-1"
        >
          <KeyboardDoubleArrowLeftIcon sx={{ fontSize: 20 }} />
          Previous
        </Button>
        <Button
          variant="primary"
          size="sm"
          disabled={isUpperBound}
          onClick={() => {
            if (!isUpperBound) {
              navigate(`/read/${id}/${day}/${timing}/${Index + 1}`, {
                replace: true,
              });
            }
          }}
          className="flex items-center gap-1"
        >
          Next
          <KeyboardDoubleArrowRightIcon sx={{ fontSize: 20 }} />
        </Button>
      </div>
      <div className="px-3 mb-2">
        <p className="bg-white p-2 border rounded-sm capitalize">
          {day} - {timing}
        </p>
      </div>
      <div className="readContent bg-white border p-3 rounded-sm mx-3">
        <p className="subTitle">Question</p>
        <p className="readQuestion my-1 text-lg font-medium pb-2">
          {Index + 1}. {questionData.question}
        </p>
        <div className="readAnswer text-base opacity-50">
          {questionData.answer}
        </div>
      </div>
      <div className="px-3">
        <Button
          className="my-3 flex items-center gap-2"
          variant="success"
          size="sm"
          color="success"
          disabled={questionData.status === "completed"}
          onClick={() => updateQuestionStatus()}
        >
          <DoneAllIcon sx={{ fontSize: 20 }} />
          {questionData.status === "pending"
            ? "Mark as completed"
            : "Completed"}
        </Button>
      </div>
    </>
  );
}
