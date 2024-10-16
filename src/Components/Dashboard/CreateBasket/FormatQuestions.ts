export interface Question {
  question: string;
  answer: string;
  status: string;
}

export interface Schedule {
  time: string;
  questionsCount: number;
}

export function createSchedule(questions: Question[], schedule: Schedule[]) {
  const questionsSchedule: any = {}; // To store the final schedule
  const questionsPerDay = schedule.reduce(
    (sum: number, timeSlot: Schedule) => sum + timeSlot.questionsCount,
    0
  ); // Total questions per day
  const days = Math.ceil(questions.length / questionsPerDay); // Calculate the number of days
  let questionIndex = 0; // Track the current question index

  for (let day = 1; day <= days; day++) {
    // Initialize the structure for each day
    const dayKey = `day${day}`;
    questionsSchedule[dayKey] = {
      status: "pending",
      timings: {},
    };

    // Iterate over each time slot in the schedule for the current day
    schedule.forEach((timeSlot: Schedule) => {
      const timeKey = timeSlot.time;
      const questionsForThisTime = [];

      // Add questions to the current time slot, but only up to the available questions
      for (
        let i = 0;
        i < timeSlot.questionsCount && questionIndex < questions.length;
        i++
      ) {
        questionsForThisTime.push(questions[questionIndex]);
        questionIndex++; // Move to the next question
      }

      // Only include the time slot if there are questions for this time
      if (questionsForThisTime.length > 0) {
        questionsSchedule[dayKey].timings[timeKey] = {
          status: "pending",
          questions: questionsForThisTime,
        };
      }
    });
  }

  return questionsSchedule;
}
