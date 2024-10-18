import { LocalNotifications } from "@capacitor/local-notifications";

const scheduleNotifications = async (basket: any) => {
  const permissionStatus = await LocalNotifications.checkPermissions();

  if (permissionStatus.display === "granted") {
    const currentDate = new Date();

    // Schedule notifications based on the basket's schedule
    for (const item of basket.schedule) {
      const { time, questionsCount } = item;
      const [hours, minutes] = time.split(":");
      const notificationDate = new Date(currentDate);
      notificationDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Schedule the notification only if the time is in the future
      if (notificationDate > currentDate) {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: `New Questions Available`,
              body: `You have ${questionsCount} questions to complete.`,
              id: new Date().getTime(), // Unique ID
              schedule: { at: notificationDate },
              sound: undefined,
            },
          ],
        });
        console.log("Scheduled notification for:", notificationDate);
      }
    }

    // Schedule an additional notification after 2 seconds
    const notificationId = new Date().getTime(); // Unique ID for the new notification
    const twoSecondsLater = new Date(Date.now() + 2000); // Get the current time + 2 seconds

    await LocalNotifications.schedule({
      notifications: [
        {
          title: `Reminder`,
          body: `You just set up new questions!`,
          id: notificationId, // Use the unique ID
          schedule: { at: twoSecondsLater }, // Schedule for 2 seconds later
          sound: undefined,
        },
      ],
    });

    console.log(
      "Scheduled reminder notification for 2 seconds later:",
      twoSecondsLater
    );
  } else {
    console.log("Notification permission not granted.");
  }
};

export default scheduleNotifications;
