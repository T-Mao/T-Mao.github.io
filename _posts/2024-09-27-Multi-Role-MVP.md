---
layout: post
title: "Becoming the Multi-Role MVP: From App Developer to PM, HR, Admin, and Beyond"
date: 2024-09-27 09:00:00
description: "Reflections on wearing multiple hats in a startup: how juggling PM, HR, administrative, and customer support tasks shaped my growth as a developer—and beyond."
tags: [career, growth, flutter]
categories: [experience]
thumbnail: https://cdn.prod.website-files.com/6529762860f5d2796d4eb495/65e5cde9dcea6715d63265c0_What%20is%20a%20MVP-low%20code%20agency-grorapidlabs.jpeg
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://cdn.prod.website-files.com/6529762860f5d2796d4eb495/65e5cde9dcea6715d63265c0_What%20is%20a%20MVP-low%20code%20agency-grorapidlabs.jpeg"
       title="Multi-Role MVP"
       class="rounded z-depth-1"
       max-width="800px"
    %}
  </div>
</div>

In a **fast-paced startup** environment, **people often wear multiple hats**—sometimes all on the same day. My time at an early-stage company taught me precisely that. On paper, my title said _App Developer_, but in practice, I found myself functioning as **Project Manager**, **HR Assistant**, **Administrative Aide**, **Customer Support**, and more. Below, I'll break down this journey and share how each role strengthened my technical expertise and cross-functional abilities.

---

## The Leap from Developer to “Utility Player”

### Developer First, Then Everything Else

Originally, I joined the startup to **build mobile applications**—a role aligned with my background in **App** development. But once I was on board, it became clear the company needed support in a variety of areas. With minimal staff, I embraced a **“roll up your sleeves”** approach: from **coordinating with new hires** to **ordering office supplies**, I was soon entangled in tasks well beyond an average developer’s scope.

### Balancing Code with PM Duties

My day started with a code review or writing new app features—**updating UI widgets in Flutter** or hooking into back-end APIs. Then I switched gears to plan sprints, define user stories, create mind maps, or schedule short stand-up meetings. By stepping in as a **PM (Project Manager)**, I had to:

- **Refine Requirements**: speaking to internal stakeholders and translating vague business goals into clear, implementable tasks.
- **Architect Timelines**: deciding when features could realistically be shipped, identifying dependencies, and mitigating blockers.
- **Manage Team Communication**: bridging product owners with developers, or clarifying scope changes.

These responsibilities sharpened my organizational instincts. I also discovered how important concise communication is—especially when bridging non-technical folks and developers.

---

## The Unexpected Roles: HR, Admin, and Customer Support

### HR On-the-Fly

Our HR tasks quickly landed on my plate. I helped **screen new candidates**, schedule interviews, draft job posts, and even conduct orientation for new hires. While it was a big departure from coding, it allowed me to:

- **Evaluate Tech Talent**: Through interviews, I got a better sense of how other developers approached problems, which, in turn, refined my own problem-solving lens.
- **Shape Team Culture**: Writing job postings and chatting with prospects taught me a lot about company values, how they attract or deter potential employees.

### Administrative and “Everything Else”

In a pinch, I'd often handle:

- **Office Logistics**: shipping packages, handling building services, restocking hardware.
- **Ad Hoc Errands**: from a quick supply run to sorting out the occasional mismatch in invoices.
- **Office IT**: configuring co-workers’ machines, solving spontaneous network issues, or managing internal accounts.

Sure, it’s not glamorous, but seeing these behind-the-scenes tasks offered me deeper respect for all that keeps a business functional.

### Customer & Tech Support

We didn’t have a dedicated support team, so I jumped in to answer user queries, replicate bugs, or walk them through workflows. I also tackled bug logs from the user perspective, bridging them straight to the dev backlog. This experience:

- **Closed the Feedback Loop**: hearing real customers speak about app usage was invaluable. I learned how to refine our user flows, address friction points, and better prioritize fixes.
- **Built Empathy**: it reinforced the notion that code is never just code— `it’s about solving real user problems`.

---

## Technical Growth & Career Insights

Handling so many roles drastically broadened my understanding of how an **app-based business** operates end-to-end. Some key takeaways:

1. **Holistic Problem-Solving**  
   Writing Flutter code for new features is important, but aligning that with user needs, stakeholder priorities, and stable back-end architecture completes the picture.

2. **Stakeholder Communication**  
   My PM experience improved how I collaborate with non-technical members—**translating** requirements into dev tasks or clarifying resource constraints back to the business side.

3. **Adaptability**  
   Every day was a mini-challenge. Being able to pivot from unit tests in Dart to a hiring call or to an office errand fosters grit and mental flexibility—traits that stand out in any software engineering role.

4. **Minding the Big Picture**  
   Engaging in tasks outside raw development forced me to consider the **full product life cycle**—from the earliest user experience design to final deployment and support. I definitely code with a broader lens now.

---

## A Sample Code Snippet (Flutter)

Even amidst the chaos, **clean code** remained a top priority. Below is a snippet illustrating part of a _state management_ approach using Riverpod—brief but indicative of how I structure components for clarity:

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:my_app/models/order.dart';

final orderProvider = StateNotifierProvider<OrderNotifier, AsyncValue<Order>>(
  (ref) => OrderNotifier(),
);

class OrderNotifier extends StateNotifier<AsyncValue<Order>> {
  OrderNotifier() : super(const AsyncValue.loading());

  Future<void> fetchOrderDetails(String orderId) async {
    try {
      state = const AsyncValue.loading();
      final orderData = await fetchOrderFromApi(orderId); // hypothetical function
      state = AsyncValue.data(orderData);
    } catch (e) {
      state = AsyncValue.error(e);
    }
  }

  // Additional methods to handle order cancellation, status update, etc.
}
```

**Why this is relevant**: juggling tasks taught me the significance of well-organized code that others can pick up quickly. With so many responsibilities, you can’t always be the single point person for every piece of logic—so code must be self-documenting and modular.

---

## Closing Thoughts

**“Being an MVP”** isn’t just about building minimal viable products—sometimes it’s about **being the most valuable person** in your startup environment. Straddling roles in a young company can seem daunting, but it accelerates your growth in ways a narrowly defined corporate position often cannot.

- **Technical Depth**: You still ship robust features.
- **Cross-Functional Width**: You gather requirements, orchestrate sprints, onboard new hires, fix random admin problems, and deal with real-world customer pain points.

This synergy shaped me into a more **well-rounded developer**—one who is comfortable both in the trenches of app code and orchestrating team efforts. If you’re in a similar place, **embrace it**. The best advice: lean into every role, be flexible, and remember that every skill you pick up, from HR practices to coffee runs, can feed into your holistic value as an engineer and leader.

---

**Ready to tackle your next app challenge**—and everything else that might come with it!
