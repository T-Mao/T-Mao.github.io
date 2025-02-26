---
layout: post
title: Leveraging Push Notifications in Mobile Apps
date: 2025-01-06 17:45:00
description: Techniques for implementing push notifications across iOS and Android, including scheduling, message routing, and handling deep links
tags: push-notifications firebase android ios
categories: mobile-dev
thumbnail: https://denis-test.com/wp-content/uploads/2024/07/Examples-of-standard-push-notifications-on-iOS-and-Android.png
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://denis-test.com/wp-content/uploads/2024/07/Examples-of-standard-push-notifications-on-iOS-and-Android.png"
       title="Push Notifications"
       class="rounded z-depth-1"
       max-width="800px"
    %}
  </div>
</div>

Push notifications can make or break the user experience in a mobile application. They handle everything from real-time updates (such as incoming messages in a chat) to sophisticated scheduling (like nudging users to revisit an order that has gone idle). Over the years, I’ve built robust push notification features in multiple production applications, ensuring reliability and a seamless user experience.

Below, I’ll outline the typical architectural pieces I consider when implementing push notifications in both iOS and Android environments—using a serverless backend, custom message channels, and at times advanced scheduling logic.

---

## Why Push Notifications Matter

- **Real-Time Engagement**: If you run any form of commerce or on-demand service, push alerts keep users informed the moment a new request or status update hits.
- **Increased Conversion**: Well-targeted notifications can drive users back to your app, boosting usage and retention.
- **Operational Efficiency**: For internal apps (such as technician or driver apps), push notifications can inform staff of new tasks, ensuring minimal response time.

---

## Backend and Cloud Function Triggers

My typical implementation uses a serverless architecture (e.g., Firebase Functions or AWS Lambda) to handle the following steps:

1. **Message Creation**: A new chat message or system event triggers a write to a database collection (e.g., Firestore).
2. **Function Trigger**: A function runs automatically on database updates. That function:
   - Parses the newly inserted data.
   - Determines the correct recipients (e.g., user vs. admin vs. staff).
   - Sends push messages only to relevant device tokens.
3. **Token Management**: Each user may have multiple FCM tokens, one for each device. My code ensures tokens are stored and pruned if they become invalid.

Below is a simplified version of a Node.js Cloud Function that sends out a message whenever a user submits a new chat message. This code pattern can be generalized for other events:

```js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.notifyOnNewChatMessage = functions.firestore.document("chats/{chatId}/messages/{messageId}").onCreate(async (snapshot, context) => {
  try {
    const messageData = snapshot.data();
    const senderUid = messageData.senderUid;
    const text = messageData.text;

    // Retrieve the conversation details or intended recipient
    // For example, look up participant IDs in Firestore
    const chatRef = admin.firestore().collection("chats").doc(context.params.chatId);
    const chatDoc = await chatRef.get();
    const { participantUids } = chatDoc.data() || {};

    // Filter out the sender's own UID
    const targetUids = participantUids.filter((uid) => uid !== senderUid);

    // Collect FCM tokens for all recipients
    let tokens = [];
    for (const uid of targetUids) {
      const tokenSnapshot = await admin.firestore().collection("users").doc(uid).collection("fcm_tokens").get();
      tokenSnapshot.forEach((doc) => {
        const fcmToken = doc.data().fcm_token;
        tokens.push(fcmToken);
      });
    }

    if (!tokens.length) {
      console.log("No tokens found, skipping push.");
      return;
    }

    // Construct the notification message
    const payload = {
      notification: {
        title: "New Message",
        body: text || "You have a new chat message!",
      },
      data: {
        // Possibly define custom key-value pairs for deep linking
        chatId: context.params.chatId,
      },
    };

    // Send to all tokens in batches
    const batchResponse = await admin.messaging().sendToDevice(tokens, payload);
    console.log("Push notification sent", batchResponse);
  } catch (err) {
    console.error("Error sending notification:", err);
  }
});
```

### Scheduling and Delayed Notifications

If you need delayed messages—for example, automatically reminding a user after 3 days of inactivity— you can store a `scheduled_time` field in your database. A separate scheduled function (e.g., a cron-like Pub/Sub job) queries for “to-be-delivered” notifications. Once the time is right, the function sends them out.

---

## App-Side Setup

On the mobile side, you typically need to:

1. **Request Permission**: iOS requires prompting the user for notification permissions. On Android 13+, you need [`POST_NOTIFICATIONS`](https://developer.android.com/develop/ui/views/notifications#permissions) permission as well.
2. **Establish Notification Channels (Android)**: For high-importance notifications, create channels so your push messages appear with the correct sound/priority.
3. **Register for Tokens**: Once the app is up, request the FCM token. If it changes (e.g., user reinstalled the app), re-register the new token on the backend.
4. **Foreground Notification Handling**: Decide how you show a message if it arrives while the user is actively using the app. On Android, you can rely on local notifications for that if you want a system tray icon to appear.

Here’s a minimal Kotlin snippet for setting up a notification channel in an Android `Activity`:

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "high_importance_channel"
            val channelName = "High Importance Notifications"
            val channelDescription = "Used for urgent messages"
            val importance = NotificationManager.IMPORTANCE_HIGH
            val channel = NotificationChannel(channelId, channelName, importance).apply {
                description = channelDescription
            }
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager?.createNotificationChannel(channel)
        }
        // Other onCreate logic, e.g. setContentView(...)
    }
}
```

When it comes to iOS, you’d create a similar channel concept in Xcode by setting up categories or using local notifications in tandem with push. Then register an `UNUserNotificationCenterDelegate` to handle how foreground notifications are displayed.

---

## Edge Cases and Advice

1. **Token Rotation**: Users can lose or regain tokens at any time. Make sure your backend cleans up invalid tokens after each message send.
2. **Foreground vs. Background**: In the foreground, you might show custom in-app alerts. In the background, rely on system notifications.
3. **Payload Size**: Some push services limit payload to around 4KB. If you must send extra data, place it in your DB and embed only references or IDs in your push payload.
4. **Localization**: If your app spans multiple regions, prepare the push text in localized form or dynamically fetch translations from your backend.
5. **Scheduled vs. Instant**: Real-time pushes are straightforward, but scheduling them can be more elaborate. Timers or cron tasks in your serverless environment are the typical approach.

---

## Conclusion

Push notifications are a crucial part of modern mobile app development. They bridge the gap between user engagement and real-time updates. Over time, I’ve implemented solutions that:

- Use serverless triggers (Firebase Functions, etc.) to isolate push logic.
- Maintain token sets for each user device.
- Provide flexible channels on Android with `IMPORTANCE_HIGH` for critical messages.
- Support advanced scheduling for any “reminder” use cases.

By combining these strategies, your app can deliver reliable notifications that users find actually useful—boosting your overall user satisfaction and internal efficiency.
