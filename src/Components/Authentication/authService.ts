// authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../../../firebase";
import { db } from "../../../firebase";
import { ref, set } from "firebase/database";
import { EmptyDataVariable, fetchUserData } from "@/assets/Data/userData";
import scheduleNotifications from "../Notifications/ScheduleNotifications";

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const personalInfo = {
      uid: user.uid,
      name: name,
      email: email,
    };
    localStorage.setItem("details", JSON.stringify(personalInfo));

    await set(ref(db, "users/" + user.uid), {
      uid: user.uid,
      email: user.email,
      name: name,
    });

    fetchUserData(user.uid);

    return user;
  } catch (error) {
    throw error;
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userData = await fetchUserData(userCredential.user.uid);
    let personalDetails;

    if (userData) {
      personalDetails = {
        uid: userCredential.user.uid,
        name: userData.name,
        email: userData.email,
      };

      // Schedule notifications for all baskets
      const baskets = userData.allbaskets; // Access all baskets from userData
      if (baskets) {
        for (const basketID in baskets) {
          if (baskets.hasOwnProperty(basketID)) {
            const basket = baskets[basketID]; // Get basket object
            await scheduleNotifications(basket); // Schedule notifications for each basket
          }
        }
      }
    }

    localStorage.setItem("details", JSON.stringify(personalDetails));
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    EmptyDataVariable();
    localStorage.removeItem("uid");
    localStorage.removeItem("details");
  } catch (error) {
    throw error;
  }
};

export const checkAuthState = (callback: (user: any) => void) => {
  return auth.onAuthStateChanged(callback);
};
