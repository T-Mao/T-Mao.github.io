---
layout: post
title: "Bringing Orders, Chat, and Payment Together: A Full-Stack Approach to On-Demand Services"
date: 2024-10-23 10:00:00
tags: [mobile, backend-integration, flutter, payments, chat]
categories: [mobile-dev]
thumbnail: https://static.vecteezy.com/system/resources/previews/021/192/395/non_2x/full-stack-development-structure-full-stack-mind-map-programming-coding-developer-website-application-illustration-vector.jpg
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://static.vecteezy.com/system/resources/previews/021/192/395/non_2x/full-stack-development-structure-full-stack-mind-map-programming-coding-developer-website-application-illustration-vector.jpg"
       title="Full-Stack"
       class="rounded z-depth-1"
       max-width="800px"
    %}
  </div>
</div>

## Overview

**Key Objective:** Integrate _multiple front-end components_ (mobile apps for Consumers & Technicians) with a _robust back-end_ that orchestrates:

1. **Orders**: Creation, location-based dispatch, acceptance, and status transitions.  
2. **Real-time Chat**: In-app messaging so consumers can interact with assigned technicians.  
3. **Stripe**: Payment method binding, pay-in (for consumers), payout (for technicians).  
4. **Intelligent Order Assignment**: Harness geolocation data + user roles to distribute tasks.  
5. **Back-Office Moderation**: Provide business owners with an overview of all activities, from orders to final payouts.

## Architecture in a Nutshell

1. **Front-End Layer**: Two Flutter apps, each with distinct UI flows:
   - **Consumer App**:  
     - Creates orders, attaches photos, sets location, pays via **Stripe**.  
     - Chats in real time with assigned technicians.  
     - Manages history, ratings, and AI-driven self-troubleshooting.
   - **Technician App**:  
     - Views nearby tasks (within X miles).  
     - Accepts or declines jobs.  
     - Provides updates—like “Depart Now,” “Begin Service,” “Complete Service.”  
     - Collects payment or triggers payout flows (via **Stripe Connect**).  
     - Displays work stats: total earnings, tasks completed, average rating.

2. **Back-End Layer**:
   - **Node.js / Firebase** (Legacy):  
     - Real-time database triggers for location-based queries.  
     - FCM push notifications for new tasks/messages.  
     - AI chatbot bridging (initial prototypes).
   - **MySQL / Java** (New):  
     - Order/payment logic, with clearer relational structure for tasks, user roles, brand data, logs.  
     - Stripe Connect integration for technician payouts.  
     - RESTful APIs to unify app communications, store user & order data.
   - **B-end Dashboard** (browser-based):  
     - Designed for merchants & internal staff: manage orders, inspect process logs, view final photos.  
     - Mark brand & SKU details (e.g., price, categories), run audits.

## Building the Core Flows

### A. Orders and Location

**Flow**:

1. **Creation**: Consumers either self-create (via app) or merchants push orders from a B-end panel.  
2. **Location**: 
   - Each order includes a lat/long from the consumer’s pinned address.  
   - Technician devices broadcast a location update every ~1 minute.  
3. **Matching**:
   - The system calculates which technicians lie within a 50-mile radius.  
   - Those technicians see a carousel of “Eligible Orders” + real-time updates as new tasks appear.  
4. **Acceptance**:  
   - Once a technician hits “Accept,” the order moves out of the “pool” into that tech’s pipeline.  

### B. In-App Chat

**Key Features**:

- **Socket/FCM**: Real-time message passing or notifications.  
- **Order ID-based** chat rooms: Consumers only see the chat for their own order; technicians only see chats for assigned tasks.  
- **Attachments**: Photos or short videos.  
- **Push Alerts**: If someone sends a new message while the other side is offline, FCM triggers a notification.

### C. Stripe Payment Flow

**Consumers**:

1. **Attach Payment Method** (e.g., credit card).  
2. **Pay**: On order creation or later (depending on the business logic), the app creates a Stripe PaymentIntent.  
3. **Confirmation**: Payment success triggers a status change to “Paid.”

**Technicians**:

1. **Create Stripe Connect Account**: Onboarding wizard that captures banking info.  
2. **Delayed Payouts**: Once an order is marked “Complete,” the system schedules a **transfer**.  
3. **Transfer**: A timed function automatically calls `stripe.transfers.create` to deposit the funds into the technician’s bank.

### D. AI-Powered Self-Service

Within the consumer app, a “Help with AI” button leads to:

- **Chat GPT 4** pipeline:
  - Gathers brand/SKU + user’s textual description.
  - Provides step-by-step troubleshooting steps (like checking for simple wiring issues).  
  - Exits to “Technician needed” if the user still can’t fix the issue, generating recommended data for the official repair order.

## Implementation Highlights

1. **Flutter**:  
   - Common code for “authentication, i18n, theming.”  
   - Split modules for “orders,” “chat,” “payments,” “AI.”  
   - Real-time location with `geolocator`, ensuring background updates.

2. **Firebase Functions** (legacy part):  
   - Listens on `orders/{id}` changes => triggers re-calculation for nearby technicians.  
   - Push notifications if new messages appear or order statuses change.

3. **MySQL** (new part):  
   - Provides stable user management, multi-relational brand/SKU data.  
   - Stripe Connect endpoints to create accounts, attach bank info, handle payouts.  
   - Schedules tasks with cron-like logic for delayed transfers or refunds.

4. **Security**:  
   - **RSA** + **AES** hybrid encryption for sensitive data.  
   - Obfuscates card data (front-end only sees tokens).  
   - Enforces role-based checks (consumers can’t see T-end pages, etc.).

5. **B-end System**:  
   - Built with Java + Spring.  
   - Allows merchants to create orders, track statuses, see final completion photos.  
   - Summaries for each brand/SKU, controlling pricing reference data.

## What Stands Out

- **Unified Flow**: The “one-stop” approach ensures that a user can create an order, chat, pay, and see the entire timeline in a single integrated solution.  
- **Technician Empowerment**: T-end app with a geo-based job feed, direct chat, and easy payment settlement fosters autonomy and quicker acceptance.  
- **Self-service AI**: Reduces trivial tasks and fosters user trust.  
- **Scalability**: Moved from simpler Firebase triggers to a more robust MySQL + microservices approach as user volumes grew.

## Sample Code Snippet (Pseudo-Dart)

Below is a simplified snippet (slightly stylized) of how the Technician App loads “Nearby Orders” on a refresh:

```dart
Future<void> _fetchNearbyOrders() async {
  setState(() => isLoading = true);
  try {
    final currentLoc = await getLocation();
    final response = await ApiOrderTechnician.api.fetchNearbyOrders({
      'latitude': currentLoc.lat,
      'longitude': currentLoc.lng,
      'searchRadius': 50,  // miles
      'brandFilter': _brandFilter,
      'serviceType': _serviceType,
    });
    setState(() {
      nearbyOrders = response.orders;
      isLoading = false;
    });
  } catch (e) {
    setState(() => isLoading = false);
    showErrorDialog(context, 'Failed to load nearby orders: $e');
  }
}
```

**Note**: The actual code integrates authentication tokens, FCM tokens, concurrency solutions, etc.

## Results & Reflections

**Project Gains**:

- **Cut Manual Dispatch**: Automated matching using location data drastically reduced human overhead.  
- **Reduced Support Calls**: The integrated AI + chat system offered immediate, structured support.  
- **Better Monetization**: Stripe Connect streamlined payouts and overcame friction in cross-border transactions.

**Lessons**:

- Balancing a **Firebase** real-time approach with a **MySQL** relational approach requires careful synchronization.  
- Building in **i18n** from day one is easier than retrofitting.  
- The user experience soared by merging order management, location tracking, chat, and payments under one roof.

---

## Final Thoughts

Pulling together orders, chat, and payment in a single **full-stack** ecosystem offers a smoother user journey. If you’re handling on-demand services, bridging location-based tasks, real-time messaging, and a trusted payment platform like **Stripe** can accelerate growth and boost user satisfaction. The key is to keep the architecture modular—so expansions (like adding AI or enterprise-level dashboards) remain straightforward.

If you have questions on integrating **Flutter** with advanced back-end logic, or how to embed real-time chat + Stripe payouts, feel free to reach out! Each piece—be it geo queries, i18n, or AI-based workflows—brings its own challenges, but the payoff is an efficient, modern user experience that stands out in today’s crowded market.
