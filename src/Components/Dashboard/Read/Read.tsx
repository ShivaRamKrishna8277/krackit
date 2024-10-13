import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import userData from "@/assets/Data/userData";
import { Timing } from "@/assets/Data/userData"; // Ensure you're importing your types

export default function Read() {
  const { id, day, timing, questionIndex } = useParams<{
    id: string;
    day: string;
    timing: string;
    questionIndex: string;
  }>();

  const Index = Number(questionIndex);

  // Access the basket from userData
  const basket = userData.allbaskets[id as keyof typeof userData.allbaskets];
  if (!basket) {
    return <p>Basket not found</p>;
  }

  // Access the correct day's schedule
  const daySchedule =
    basket.questionsSchedule[day as keyof typeof basket.questionsSchedule];
  if (!daySchedule) {
    return <p>Day schedule not found</p>;
  }

  // Access the correct timing and assert its type
  const timingData = daySchedule.timings[
    timing as keyof typeof daySchedule.timings
  ] as Timing; // Assert type here
  if (!timingData) {
    return <p>Timing not found</p>;
  }

  const questions = timingData.questions; // Now TypeScript should recognize questions
  const maxQuestionIndex = questions.length; // Directly get the length of the array
  // Determine bounds
  const isLowerBound = Index === 0;
  const isUpperBound = Index + 1 === maxQuestionIndex;
  // Access the specific question and answer by index
  const questionData = questions[Index]; // Use Index instead of questionIndex
  if (!questionData) {
    return <p>Question not found</p>;
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
          variant="outlined"
          size="small"
          startIcon={<KeyboardDoubleArrowLeftIcon />}
          disabled={isLowerBound}
          component={isLowerBound ? "div" : Link}
          to={
            !isLowerBound
              ? `/read/${id}/${day}/${timing}/${Index - 1}`
              : undefined
          }
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          size="small"
          endIcon={<KeyboardDoubleArrowRightIcon />}
          disabled={isUpperBound}
          component={isUpperBound ? "div" : Link}
          to={
            !isUpperBound
              ? `/read/${id}/${day}/${timing}/${Index + 1}`
              : undefined
          }
        >
          Next
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
          className="my-3"
          variant="contained"
          color="success"
          size="small"
          startIcon={<DoneAllIcon />}
          disableElevation
          disabled={questionData.status === "completed"}
        >
          {questionData.status === "pending"
            ? "Mark as completed"
            : "Completed"}
        </Button>
      </div>
    </>
  );
}
