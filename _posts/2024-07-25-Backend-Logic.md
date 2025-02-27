---
layout: post
title: "Integrating Stripe Payments and Intelligent Job Dispatch"
date: 2024-07-25 12:00:00
tags: [mobile, fullstack, flutter, node.js, firebase]
categories: [mobile-dev]
thumbnail: https://www.shutterstock.com/image-photo/business-process-workflow-automation-flowchart-600nw-1812113506.jpg
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://www.shutterstock.com/image-photo/business-process-workflow-automation-flowchart-600nw-1812113506.jpg"
       title="logic"
       class="rounded z-depth-1"
       max-width="800px"
    %}
  </div>
</div>

In modern app development, especially in service marketplaces or on-demand platforms, **managing secure online payments** and **intelligent job dispatch** is critical to delivering a seamless user experience. Below is a deep-dive into how we can integrate **Stripe Connect** with delayed payouts and build a **distance-based dispatch** system (using the Haversine formula and real-time location updates). I’ll also share a few security considerations and tips on ensuring **traceability** throughout the payment and dispatch process.

---

## 1. Stripe Connect, Delayed Payout Scheduling

### 1.1 Stripe Connect Account & Custom Onboarding

When dealing with a multi-sided marketplace, we often need the ability to route payments between customers and various service providers (e.g., technicians). [**Stripe Connect**](https://stripe.com/connect) offers a clean solution to:

1. **Create a Connect Account** for each service provider:

   ```js
   exports.createConnectedAccount = functions.https.onCall(async (data, context) => {
     // ...
     const account = await stripe.accounts.create({
       type: "custom",
       country: "US",
       email: data.email,
       capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
     });
     return { stripeAccountId: account.id };
   });
   ```

   The `type: 'custom'` approach provides the flexibility to handle KYC (Know Your Customer) compliance, transfer schedule, etc.

2. **Add a bank account** for payouts:

   ```js
   exports.addBankAccount = functions.https.onCall(async (data, context) => {
     // ...
     const bankAccount = await stripe.accounts.createExternalAccount(data.connectAccountId, {
       external_account: {
         object: "bank_account",
         account_holder_name: data.bankAccountDetails.accountHolderName,
         // ...
       },
     });
     return { bankAccount };
   });
   ```

3. **Account Link** creation for onboarding flows:
   ```js
   exports.createAccountLink = functions.https.onCall(async (data, context) => {
     const accountLink = await stripe.accountLinks.create({
       account: data.accountId,
       refresh_url: "https://example.com/reauth",
       return_url: "https://example.com/success",
       type: "account_onboarding",
     });
     return { accountLinkUrl: accountLink.url };
   });
   ```
   This link is then presented to the technician (or service provider) to input their personal/banking details, satisfying all compliance steps.

### 1.2 Delayed Transfers & Scheduling

A typical user flow is:

- The customer pays at the moment of booking (`PaymentIntent` or direct charge).
- Funds remain in the platform’s balance or “escrow” for a certain period (e.g., after completion).
- The platform disburses the funds to the service provider (minus fees) at some scheduled date.

**Stripe** has multiple patterns to achieve this; in the sample code, we:

1. Update the `PaymentIntent`'s metadata with `connectedAccountId` and `transferAmount`.
2. Store a record in Firestore (`scheduledTransfers`) with a future `transferDate`.
3. Use a **PubSub** scheduled function (`processScheduledTransfers`) that periodically checks which scheduled transfers are due:
   ```js
   exports.processScheduledTransfers = functions.pubsub.schedule("every 1 minutes").onRun(async (context) => {
     const snapshot = await admin
       .firestore()
       .collection("scheduledTransfers")
       .where("status", "==", "pending")
       .where("transferDate", "<=", Date.now())
       .get();
     // ...
     stripe.transfers.create({
       amount: data.transferAmount,
       currency: "usd",
       destination: data.connectedAccountId,
       // Possibly source_transaction referencing a Charge object
     });
     // Then mark status='completed'
   });
   ```

### 1.3 Security & Traceability

- **Metadata & Firestore**: we keep detailed logs in Firestore for each scheduled transfer, including `chargeId`, `connectedAccountId`, etc. This ensures that if disputes or audits arise, we can backtrack every transaction’s timeline.
- **Time-based triggers**: Instead of immediate or manual payouts, this design allows you to handle potential cancellations or disputes within a safe window.

---

## 2. Intelligent Job Dispatch: Real-Time Location & Haversine Distance

### 2.1 Haversine Distance & Threshold

When matching tasks (a.k.a. orders) with technicians, you likely only want to consider those within some radius (e.g., 50 miles). The Haversine formula calculates **great-circle** distance given lat/lon:

```js
function haversineDistance(coords1, coords2) {
  const R = 3958.8; // Earth radius in miles
  const lat1 = coords1.latitude,
    lon1 = coords1.longitude;
  const lat2 = coords2.latitude,
    lon2 = coords2.longitude;

  // Convert degrees to radians
  const dLat = toRad(lat2 - lat1),
    dLon = toRad(lon2 - lon1);

  // Haversine formula
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
```

**Implementation notes**:

- Typically store coordinates in `GeoPoint` fields in Firestore (`{ latitude, longitude }`).
- `distance_threshold` could be 50 for a 50-mile radius, or some dynamic user-defined range.

### 2.2 Firestore Hooks

#### `onOrderChange`

Whenever an order doc changes in `order/{orderId}`:

1. If order is newly created or the location changed:
   - For each technician, compute distance.
   - If within threshold, push to `nearby_orders` array.
2. If order is canceled or no longer in status “waiting,” remove from each technician’s `nearby_orders`.
3. If only order details changed, update the same record in the technician’s `nearby_orders`.

#### `onTechnicianLocationChange`

Whenever a technician doc changes in `Technician/{techId}`:

1. Read all active orders from Firestore.
2. Calculate distance to each order; filter out those beyond the threshold.
3. Sort them by newest message time, then store them in the doc’s `nearby_orders`.

This ensures each technician sees relevant tasks with up-to-date info.

### 2.3 Real-Time Updates

Technicians typically **poll** or **listen** (via Firestore snapshot listeners in the client app) for changes to their own `Technician/{techId}` doc:

- If `nearby_orders` changes, the app’s “Nearby Opportunities” UI instantly updates to reflect newly available or removed tasks.
- On the consumer side, once a tech picks up the order or the status changes, `onOrderChange` again modifies the dispatch lists for everyone else.

---

## 3. Security & Traceability Measures

### 3.1 Authentication & Authorization

- **Firebase Auth** or custom tokens should be used consistently.
- Role-based claims or separate Firestore rules can ensure technicians can only update their own location doc, not others’.

### 3.2 Data Integrity

- Key fields like `PaymentIntentId`, `ChargeId`, or `ScheduledTransfer` doc IDs should be carefully stored in the order doc. If a Payment Intent fails or a user disputes, having consistent references across systems is crucial.

### 3.3 Observability & Logs

- Each function logs relevant input data, doc changes, and errors.
- Consider an external logging solution (e.g., Stackdriver or Datadog) for analyzing historical transaction data or debugging unusual job assignment behaviors.

---

## 4. Putting it All Together

By blending **Stripe Connect** for delayed payouts and **Haversine-based** job assignment, you get:

- A robust **payment flow** ensuring the platform can hold funds, manage disputes, and pay out providers once an order is successfully done.
- **Automatic job dispatch** to technicians within a certain radius, with real-time location updates and sorted priority.
- Clear **traceability**: each order doc ties together customer payments, scheduling logic, and dispatch events.

### Example Code Snippet (Excerpt)

Here’s a short excerpt from the Node.js/Firebase code focusing on new orders dispatch:

```js
async function newOrderUpdateTechnicians(orderData, orderId) {
  const techniciansSnapshot = await db.collection("Technician").get();
  const updatePromises = [];

  techniciansSnapshot.forEach((doc) => {
    const techData = doc.data();
    if (techData.realtime_location) {
      const distance = haversineDistance(techData.realtime_location, orderData.Location.GeoLocation);
      if (distance <= distance_threshold) {
        // Add this order to the technician's nearby orders
        const nearbyOrders = techData.nearby_orders || [];
        nearbyOrders.push({ id: orderId, ...orderData, distance });
        const sorted = sortOrdersByNewestMessageTime(nearbyOrders);
        updatePromises.push(doc.ref.update({ nearby_orders: sorted }));
      }
    }
  });

  return Promise.all(updatePromises);
}
```

---

## 5. Conclusion

In the highly competitive environment of on-demand apps, combining **secure payment handling** (via Stripe) with **smart location-based job dispatch** can significantly elevate your platform’s reliability and user confidence:

- **Stripe Connect** simplifies multi-party payouts, ensuring compliance and an automated scheduling approach.
- **Distance-based** matching with the Haversine formula ensures technicians see relevant tasks, improving acceptance rates and overall platform efficiency.
- **Security** is reinforced by centralized logging, consistent doc references, and robust exception handling.

With a thoughtful architecture, you can easily scale these ideas—expanding to new geographies, introducing advanced scheduling heuristics (e.g., technician skill matching), or layering in more sophisticated fraud prevention and compliance measures.

The bottom line: get the payments right, and get the dispatch logic right, to create a frictionless experience and highlight your engineering expertise to prospective employers.
