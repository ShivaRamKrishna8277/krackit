import { db } from "../../../firebase";
import { get, ref, update } from "firebase/database";

// Define the structure of each question
export interface Question {
  question: string;
  answer: string;
  status: string;
}
// Define the structure for timings within a day
export interface Timing {
  status: string;
  questions: Question[];
}
// Define the structure of the schedule for each day
export interface DaySchedule {
  [time: string]: Timing;
}
// Define the basket structure
export interface Basket {
  basketID: number;
  basketTitle: string;
  startDate: string;
  endDate: string;
  status: string;
  questionsDaily: number;
  totalQuestions: number;
  completedQuestions: number;
  progress: number;
  schedule: { time: string; questionsCount: number }[];
  questionsSchedule: {
    [day: string]: {
      status: string;
      timings: DaySchedule;
    };
  };
}
// Define the entire userData structure
export interface UserData {
  userID: string;
  name: string;
  email: string;
  allbaskets: {
    [id: string]: Basket;
  };
}

let data: UserData | null = null;
export const fetchUserData = async (uid: string) => {
  if (data !== null) {
    return data;
  } else {
    try {
      const userRef = ref(db, `users/${uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        data = snapshot.val();
        return data;
      } else {
        console.log("User Not Found");
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
};
export default fetchUserData;

// Function to empty data variable
export function EmptyDataVariable() {
  data = null;
}

// Function to get user id
export function getLocalDetails() {
  const personalDetails = localStorage.getItem("details");
  if (personalDetails) {
    const user = JSON.parse(personalDetails);
    return user;
  } else {
    return null;
  }
}

// Function to get Basket by ID
export const fetchBasketById = async (basketId: string) => {
  const user = getLocalDetails();
  const uid = user.uid;
  if (!uid) {
    console.error("User UID not found in local storage.");
    return null; // Return null if no UID found
  }
  try {
    // Fetch user data to get baskets
    const userData = await fetchUserData(uid);
    // Check if userData is not null and contains baskets
    if (userData && userData.allbaskets) {
      // Find the specific basket by its ID
      const basket = userData.allbaskets[basketId];
      // Return the basket if found, or null if not
      return basket || null;
    } else {
      console.log("No baskets available for this user.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching basket:", error);
    return null;
  }
};

// Function to get Question Details by Props
export const fetchQuestionDetails = async (
  basketId: string,
  day: string,
  time: string
) => {
  const user = getLocalDetails();
  const uid = user.uid;
  if (!uid) {
    console.log("User ID Not Found.");
    return null;
  }

  try {
    const userData = await fetchUserData(uid);
    if (userData && userData.allbaskets) {
      const questionDetails =
        userData.allbaskets[basketId].questionsSchedule[day].timings[time];
      return questionDetails;
    }
  } catch (error) {
    console.log(error);
  }
};

// Function to update status at all levels
const markQuestionAsCompleted = async (
  uid: string,
  basketId: string,
  day: string,
  time: string,
  index: number
) => {
  const basket = data?.allbaskets[basketId];
  if (basket) {
    const questionsSchedule = basket.questionsSchedule[day];
    if (questionsSchedule) {
      const timings = questionsSchedule.timings[time];
      if (timings) {
        const question = timings.questions[index];
        if (question) {
          // Update the local data for the specific question and completed questions
          question.status = "completed";
          const completedQuestionsBefore = basket.completedQuestions;
          const completedQuestionsAfter = completedQuestionsBefore + 1;
          basket.completedQuestions = completedQuestionsAfter; // Increment locally

          // Calculate updated progress percentage
          const updatedProgress =
            (completedQuestionsAfter / basket.totalQuestions) * 100;
          basket.progress = updatedProgress;
          // Firebase references
          const basketRef = ref(db, `users/${uid}/allbaskets/${basketId}`);
          const questionRef = ref(
            db,
            `users/${uid}/allbaskets/${basketId}/questionsSchedule/${day}/timings/${time}/questions/${index}`
          );
          // Perform all updates at once in Firebase
          await update(basketRef, {
            completedQuestions: completedQuestionsAfter,
            progress: updatedProgress,
          });
          await update(questionRef, { status: "completed" });

          // Check if all questions for that timing are completed
          const allQuestionsCompleted = timings.questions.every(
            (question) => question.status === "completed"
          );
          if (allQuestionsCompleted) {
            // Update the local timing status to "completed"
            timings.status = "completed";
            // Update the timing status in Firebase
            const timingsRef = ref(
              db,
              `users/${uid}/allbaskets/${basketId}/questionsSchedule/${day}/timings/${time}`
            );
            await update(timingsRef, { status: "completed" });

            // Check if all timings for the day are completed
            const allTimingsCompleted = Object.values(
              questionsSchedule.timings
            ).every((timing) => timing.status === "completed");
            if (allTimingsCompleted) {
              // Update the local day status to "completed"
              questionsSchedule.status = "completed";
              // Update the day status in Firebase
              const dayRef = ref(
                db,
                `users/${uid}/allbaskets/${basketId}/questionsSchedule/${day}`
              );
              await update(dayRef, { status: "completed" });

              // Check if all days in the basket are completed
              const allDaysCompleted = Object.values(
                basket.questionsSchedule
              ).every((daySchedule) => daySchedule.status === "completed");

              if (allDaysCompleted) {
                // Update the local basket status to "completed"
                basket.status = "completed";

                // Update the basket status in Firebase
                const basketRef = ref(
                  db,
                  `users/${uid}/allbaskets/${basketId}`
                );
                await update(basketRef, { status: "completed" });

                console.log(`Basket ${basketId} status updated to completed.`);
              } else {
                console.log(`Day ${day} status updated to completed.`);
              }
            }
          }
        }
      }
    }
  }
};
// Function to update stauts
export const updateStatus = async (
  basketId: string | undefined,
  day: string | undefined,
  time: string | undefined,
  questionIndex: string | undefined
) => {
  const user = getLocalDetails();
  const uid = user.uid;
  if (!uid) {
    console.log("User ID Not Found.");
    return null;
  }

  const questionRef = ref(
    db,
    `users/${uid}/allbaskets/${basketId}/questionsSchedule/${day}/timings/${time}/questions/${questionIndex}`
  );
  try {
    // Update the question status in Firebase first
    await update(questionRef, {
      status: "completed",
    });

    if (basketId && day && time && questionIndex) {
      const index = Number(questionIndex);
      // Mark question as completed and check for higher-level updates
      await markQuestionAsCompleted(uid, basketId, day, time, index);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
