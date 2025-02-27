---
layout: post
title: "Technical Perspective & App Development Insights: Building SupTech Apps from Zero to One"
description: "How to deliver iOS/Android apps in just 2–3 months, why Flutter was chosen, the agile development/iteration process, and tackling major technical challenges."
date: "2024-09-04 10:00:00"
tags: [cross-platform, mobile, agile, flutter]
categories: [mobile-dev]
thumbnail: https://kms-technology.com/wp-content/uploads/2022/09/iStock-1336229255-scaled.jpg
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://kms-technology.com/wp-content/uploads/2022/09/iStock-1336229255-scaled.jpg"
       title="App Development"
       class="rounded z-depth-1"
       max-width="800px"
    %}
  </div>
</div>

## Introduction

When working in a startup environment, business and technical requirements often evolve in parallel—demands are unclear, resources are limited, but everything needs to be built _yesterday_. This article recounts my experience building **SupTech**’s core mobile applications under extreme time constraints, focusing on technical choices, agile iteration, and shipping two production apps in just a few months.

I’ll share examples (while preserving confidentiality) showcasing how Flutter, agile practices, and back-end integration came together. My hope is that fellow developers under similar “high-intensity, short timeframe” pressures will find these insights valuable.

---

## 1. Project Context & Rapid Delivery

### 1.1 Business Requirements & Time Pressure

- **Goal**: Within about 2–3 months, create and deploy two mobile apps—a **Consumer** (C-end) app and a **Technician** (T-end) app for both iOS and Android.
- **Challenges**:
  - Constantly changing requirements, incomplete specs at kick-off.
  - Small team with no dedicated QA or DevOps. In practice, the developer must handle **PM, testing, operations**, plus assorted tasks.
- **Launch Requirements**:
  - Simultaneous iOS/Android availability on App Store & Google Play.
  - Multilingual support (English, Simplified Chinese, Traditional Chinese), real-time messaging, Stripe payments, location tracking, etc.
  - Must be stable, handle crucial tasks like dispatch & live updates.

### 1.2 Technology Choice: Why Flutter?

In a short-deadline, high-intensity scenario, I chose **Flutter** as the cross-platform framework due to:

1. **Cross-Platform Efficiency**: Single codebase for iOS/Android saves substantial labor.
2. **Widget Ecosystem**: Rich built-in Material components plus a huge third-party plugin ecosystem (for example, `flutter_stripe`, `firebase_messaging`, etc.).
3. **Community & Active Maintenance**: Many stable libraries that reduce time-consuming “reinventing the wheel.”
4. **Performance**: Flutter’s near-native performance and built-in GPU-accelerated rendering suits mid-level complexity features like interactive maps and animations.

---

## 2. Agile Development & Lightning-Fast Iterations

### 2.1 Brief Agile Process

1. **Breaking Down Requirements**: Though initial specs were ambiguous, I quickly split them into small, deliverable modules (“Login & Registration,” “Order Creation,” “Order Acceptance,” “Online Payment,” etc.) and aligned priorities with the team.
2. **Sprint Cycles**: 1-week sprints with daily stand-ups. I served as both **lead developer** and “mini-PM,” frequently clarifying with management/biz folks whenever requirements changed.
3. **Continuous Integration & Version Control**: Using Git plus either a simple CI/CD pipeline or basic scripts to expedite builds and releases.
4. **Gathering Feedback & Quick Fixes**: Regular **TestFlight** or internal Android builds for testers, gather feedback every week, push new features or fixes rapidly.

### 2.2 “Ship Fast” vs. “Technical Debt”

> The prime directive was “deliver essential features quickly,” but we still needed some baseline maintainability.

- **Technical Debt**: Some modules inevitably had hard-coded logic or tight coupling. However, I maintained abstractions in mission-critical parts (payment, map, messaging) so expansions wouldn’t require a full rewrite.
- **Refactoring**: Each iteration cycle allocated a small chunk of time to address **TODO** items and remove the most pressing tech debt.

---

## 3. Major Technical Challenges

### 3.1 Multi-Language & Internationalization

#### 3.1.1 .arb or JSON for Translations

In Flutter, I used `.arb` or `.json` files for storing translations of UI strings. Paired with [flutter_localizations](https://docs.flutter.dev/development/accessibility-and-localization/internationalization) or a custom approach:

```dart
// Simplified code snippet, showing a typical pattern
class AppLocalizations {
  static String get hello => _localizedValues[localeName]['hello'];
  // ...
}
```

This keeps strings externally editable and loaded at runtime.

#### 3.1.2 Real-Time Language Switching

- By employing a global state manager (e.g., `Provider` or `Riverpod`), I could change the app’s current locale on demand (`setAppLanguage(context, 'en')`), forcing an immediate UI refresh.

### 3.2 Stripe Payments & Connect Splits

#### 3.2.1 Customer Payment Flow

- Using [flutter_stripe](https://pub.dev/packages/flutter_stripe), typical flow:
  - Backend creates a `PaymentIntent` & ephemeral key,
  - Flutter calls `Stripe.instance.initPaymentSheet(...)` + `presentPaymentSheet()`,
  - On success, the payment is confirmed.

```dart
Future<void> payWithStripe(String paymentIntentClientSecret) async {
  await Stripe.instance.initPaymentSheet(
    paymentSheetParameters: SetupPaymentSheetParameters(
      paymentIntentClientSecret: paymentIntentClientSecret,
      // ...
    ),
  );
  await Stripe.instance.presentPaymentSheet();
  // handle success in onComplete
}
```

#### 3.2.2 Technician Payout & Connect

- Techs add their bank accounts to a Stripe Connect account. Upon order completion, the backend schedules delayed payouts to these Connect accounts (giving space for refunds or disputes).
- This approach was straightforward from the Flutter front end: handle the linking flow, store an account ID, and let the server do the actual transfer scheduling.

### 3.3 Real-Time Chat & Push Notifications

1. **Messaging Model**: Leveraged either **Firebase Cloud Messaging** or a custom WebSocket. In the initial stage, I integrated `firebase_messaging` for push notifications on both iOS/Android.
2. **Chat History**: Maintained local caching in the app. For older messages, pulled them from the server if needed. This approach speeds up the chat experience.

### 3.4 Maps & Live Location

- Used [google_maps_flutter](https://pub.dev/packages/google_maps_flutter) for map rendering, plus [geolocator](https://pub.dev/packages/geolocator) to get the device’s GPS coordinates and handle background updates.
- Balanced battery/data usage vs. accuracy by updating location every 30–60 seconds. For active jobs, we might increase frequency.

---

## 4. Sample Code Snippets

Below are simplified code segments for illustration. They’re not direct copies from production but convey how I structured critical modules.

### 4.1 Payment Confirmation

```dart
Future<void> confirmPayment(BuildContext context) async {
  try {
    final sheetData = await ApiOrder.api.createPaymentIntent(...);
    await Stripe.instance.initPaymentSheet(
      paymentSheetParameters: SetupPaymentSheetParameters(
        paymentIntentClientSecret: sheetData.clientSecret,
        merchantDisplayName: 'Merchant',
        customerEphemeralKeySecret: sheetData.ephKey,
        customerId: sheetData.customerId,
      ),
    );
    await Stripe.instance.presentPaymentSheet();
    // On success, update the order’s status, etc.
  } catch (e) {
    // handle errors
  }
}
```

### 4.2 Nearby Orders on Map

```dart
List<Marker> _buildMarkers(List<OrderModel> nearOrders) {
  return nearOrders.map((order) {
    return Marker(
      markerId: MarkerId(order.id),
      position: LatLng(order.lat, order.lng),
      infoWindow: InfoWindow(
        title: '\$${order.price.toStringAsFixed(2)}',
        snippet: 'Tap for details',
      ),
      onTap: () => _navigateToOrderDetail(order),
    );
  }).toList();
}
```

---

## 5. Insights on Fast Iterations

1. **MVP Focus**: In a short timeframe, you can’t implement everything. Deliver the critical path first—(order flow, payment, messaging)—and postpone non-essentials (like loyalty points, complex analytics).
2. **Requirement Creep**: Keep daily or weekly check-ins to prevent endless scope expansion. If big new features pop up late, push them to a subsequent phase.
3. **Testing is Essential**: Even lacking dedicated QA, I wrote basic integration tests and did manual test runs to mitigate regression.

---

## 6. Release & Ongoing Updates

### 6.1 App Store & Play Store Submission

- **Apple**: Managing certificates, provisioning profiles, often best handled with `fastlane` or a custom script. TestFlight for internal betas.
- **Google Play**: Build an `.aab` and upload. Possibly maintain a closed or open testing track for iterative feedback.
- **Pitfalls**: iOS privacy or push notification details. Android 64-bit, targetSdkVersion compliance, new store policies that appear over time.

### 6.2 After Launch: Iteration & Tech Upgrades

- Once business scaled, the backend moved from Firebase-based serverless to a **MySQL/Java** microservice architecture. I retained consistent repository interfaces on the Flutter side for a gradual switch, avoiding total rewrites.
- Typically, we aimed for a new version release every 1–2 weeks—short, iterative cycles.

---

## Conclusion & Personal Takeaways

- **Flutter** excelled under tight deadlines, enabling quick UI development for both iOS and Android.
- **Agile** means more than short sprints: you need thorough **requirement slicing** and continuous priority alignment to stay on track despite frequent changes.
- **Fast iteration** doesn’t mean sloppy. For crucial modules (like payments, maps, chat), keep a decent architecture so future expansions aren’t painful.
- Wearing many hats—developer, PM, occasional QA, plus a flurry of non-tech chores—was challenging but also gave me a deeper understanding of product, team dynamics, and end-to-end ownership.

Working on SupTech allowed me to refine my cross-platform development and agile project skills under extreme deadlines. I hope these experiences help other developers racing to deliver robust apps at startup speed.
