import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./CreateBasket.css";
import Form from "react-bootstrap/Form";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateBasketInput {
  basketTitle: string;
  targetDate: string;
  schedule: { time: string; count: string }[];
  qa: { question: string; answer: string }[];
}

export default function CreateBasket() {
  // Date
  const today = new Date();
  const currentYear = today.getFullYear();
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i); // Next 10 years
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Schedule
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`
  );
  const [scheduleTime, setshceduleTime] = useState("");
  const [scheduleCount, setscheduleCount] = useState("");
  const [scheduleList, setScheduleList] = useState<
    { scheduleTime: string; scheduleCount: string }[]
  >([]);
  const addSchedule = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    if (scheduleTime.trim() && scheduleCount.trim()) {
      setScheduleList([...scheduleList, { scheduleTime, scheduleCount }]);
      setshceduleTime(""); // Reset question input
      setscheduleCount(""); // Reset answer input
    }
  };
  const removeSchedule = (index: number) => {
    const updatedList = scheduleList.filter((_, i) => i !== index);
    setScheduleList(updatedList);
  };

  // Q&A
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qaList, setQaList] = useState<{ question: string; answer: string }[]>(
    []
  );
  const addQA = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    if (question.trim() && answer.trim()) {
      setQaList([...qaList, { question, answer }]);
      setQuestion(""); // Reset question input
      setAnswer(""); // Reset answer input
    }
  };
  const removeQA = (index: number) => {
    const updatedList = qaList.filter((_, i) => i !== index);
    setQaList(updatedList);
  };
  // End Q&A

  // React Hook Form
  const { register, handleSubmit } = useForm<CreateBasketInput>();
  const onSubmit: SubmitHandler<CreateBasketInput> = (data) => {
    const newBasketData = {
      title: data.basketTitle,
      targetDate: `${selectedDay}-${selectedMonth}-${selectedYear}`,
      scheduleList: scheduleList,
      qaList: qaList,
    };
    console.log(newBasketData);
  };

  return (
    <div>
      <Navbar />
      <div className="px-4" id="NewBasketFormWrapper">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group
            className="marginInputsWrapper"
            controlId="basketTitleInput"
          >
            <Form.Label>Basket Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eg : Chapter 1 Fundamentals of Computer Science"
              {...register("basketTitle")}
            />
          </Form.Group>
          <Form.Group
            className="marginInputsWrapper"
            controlId="basketTargetDateInput"
          >
            <Form.Label>Target Date</Form.Label>
            <div className="dateInputWrapper flex items-center gap-2">
              <Form.Select
                aria-label="Select Date"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option>Date</option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                aria-label="Select Month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option>Month</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                aria-label="Select Year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option>Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Form.Group>
          <Form.Group
            className="marginInputsWrapper mb-3"
            controlId="basketScheduleInput"
          >
            <Form.Label>Create Schedule</Form.Label>
            <div className="flex gap-2">
              <Form.Select
                aria-label="Select Schedule Time"
                onChange={(e) => setshceduleTime(e.target.value)}
              >
                <option disabled>Date</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </Form.Select>
              <Form.Control
                aria-label="Select Schedule Count"
                value={scheduleCount}
                type="number"
                placeholder="Number of Questions"
                inputMode="numeric"
                onChange={(e) => setscheduleCount(e.target.value)}
              ></Form.Control>
            </div>
            <Button
              size="small"
              variant="contained"
              className="w-full"
              onClick={addSchedule}
              disableElevation
            >
              Add
            </Button>
          </Form.Group>
          {scheduleList.length > 0 && (
            <table id="scheduleTable" className="w-full text-center mb-3">
              <thead>
                <tr>
                  <td>Timing</td>
                  <td>Number of Questions</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {scheduleList.map((schedule, index) => (
                  <tr key={index}>
                    <th>{schedule.scheduleTime}</th>
                    <th>{schedule.scheduleCount}</th>
                    <th
                      className="cursor-pointer text-blue-700"
                      onClick={() => removeSchedule(index)}
                    >
                      Remove
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Form.Group controlId="basketQA" className="mb-3">
            <Form.Label>Question & Answer</Form.Label>
            <Form.Control
              type="text"
              value={question}
              placeholder="Enter Question"
              onChange={(e) => setQuestion(e.target.value)}
              className="QAInputs"
            />
            <Form.Control
              as="textarea"
              value={answer}
              aria-label="answer"
              placeholder="Enter Answer"
              onChange={(e) => setAnswer(e.target.value)}
              className="QAInputs"
            />
            <Button
              size="small"
              variant="contained"
              onClick={addQA}
              className="w-full"
              disableElevation
            >
              Add
            </Button>
          </Form.Group>
          {qaList.length > 0 && (
            <div
              className="overflow-hidden mb-3"
              style={{ border: "1px solid #e6e6e6", borderRadius: "3px" }}
            >
              {qaList.map((qa, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    className="text-sm"
                  >
                    {`${index + 1}. `}
                    {qa.question}
                  </AccordionSummary>
                  <AccordionDetails className="text-sm opacity-50">
                    {qa.answer}
                  </AccordionDetails>
                  <AccordionActions>
                    <Button onClick={() => removeQA(index)}>Remove</Button>
                  </AccordionActions>
                </Accordion>
              ))}
            </div>
          )}
          <div className="flex gap-2 mb-10">
            <Button
              size="small"
              variant="contained"
              color="success"
              type="submit"
              className="w-full"
              disableElevation
            >
              Create Basket
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
