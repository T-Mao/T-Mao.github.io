---
layout: page
title: SparkDays App
description: Habit Tracking with Reward-based Motivation
img: assets/img/SparkDays.jpg
importance: 5
category: individual
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/SparkDays.jpg"
       title="SparkDays App Icon"
       class="rounded z-depth-0"
       max-width="200px"
    %}
  </div>
</div>

## Overview

**SparkDays** is my fully self-developed iOS app that merges **habit tracking** with a **fun coin-and-reward** system. Rather than just ticking off tasks, users **earn coins** whenever they complete daily goals—unlocking meaningful **in-app store** items as they progress. By weaving immediate rewards into everyday routines, SparkDays boosts motivation and consistency.

From start to finish, I singlehandedly built everything—**planning**, **design**, **architecture**, **Swift/SwiftUI coding**, **testing**, and **App Store** deployment. This comprehensive approach allowed me to integrate creative gameplay elements, a robust data model, and a polished user experience seamlessly.

<br>

## Download

<div class="row my-3">
  <div class="col-sm-12 text-center">
    <div class="row">
      <div class="col-sm">
        <a href="https://apps.apple.com/us/app/sparkdays/id6743457838"
           target="_blank"
           style="display:inline-block;"
        >
          {% include figure.liquid
             loading="eager"
             path="assets/img/appleDownload.png"
             alt="Download on iOS"
             title="Download on iOS"
             width="180"
             class="rounded z-depth-1"
             style="display:inline-block;"
          %}
        </a>
      </div>
    </div>
    <div class="caption my-2">
      Get <strong>SparkDays</strong> for iOS.
    </div>
  </div>
</div>

<br>

## User Stories & Motivation

### Story 1: The Habit Builder

> _“I need a daily tracker that shows my progress and keeps me on track without tedious overhead.”_

SparkDays displays tasks in a clear day-by-day **grid**, letting users check off each daily accomplishment. The visual completion bars help them **see** their progress at a glance—no confusion, no clutter.

### Story 2: The Gamification Lover

> _“Plain checkmarks are not enough. I want a reward system that keeps me motivated long-term.”_

SparkDays awards **virtual coins** for each completed day, with coin amounts scaled by difficulty. After saving enough coins, users purchase items in the built-in **store**, transforming consistent effort into tangible (and fun) milestones.

<br>

## Core Features

1. **Daily Task Management**

   - Create tasks with a **difficulty setting** and total-day goal (e.g., 30 days).
   - Progress bar automatically updates as each day is checked off.

2. **Reward Coins & Bonus Multipliers**

   - **Easy**, **Normal**, and **Hard** tasks yield different daily coin amounts.
   - Bonus coins trigger on certain streaks (e.g., Hard tasks every 3 days, Normal tasks every 7 days), inspiring you to stay consistent.

3. **Personal Store**

   - A curated list of items—organized by tiers such as small treats (Tier 1) or bigger rewards (Tier 4).
   - Use your coins to redeem items or experiences, from coffee breaks to short weekend getaways.

4. **Progress Visualization**

   - Each task has a **grid** of squares representing total required days.
   - Filled squares show how far you’ve come, reinforcing the momentum.

5. **Editing & Organization**
   - Add or edit tasks **on the fly**, change your store inventory, or remove items you no longer want.
   - **Local JSON** storage ensures your data remains synced with minimal overhead.

<br>

## Technical Breakdown

I developed SparkDays in **Swift** using **SwiftUI**, focusing on clarity, scalability, and seamless state management:

### 1. Data Models & Persistence

SparkDays uses distinct model classes for tasks (`Task`) and store items (`ShopItem`), each conforming to `Codable` through custom bridging. By combining **`@Published`** properties with **JSON encoding**, the app:

- Maintains a robust **two-way data flow**—updates in the UI reflect instantly in the model.
- Loads/saves user preferences in **UserDefaults** with no complicated databases or external servers.

<details>
<summary><strong>Sample: Task Model & Encoding</strong></summary>

```swift
class Task: Identifiable, ObservableObject {
    let id: UUID
    @Published var title: String
    @Published var description: String
    @Published var totalDays: Int
    @Published var completedDays: Int
    @Published var difficulty: TaskDifficulty
    ...
    var isDoneToday: Bool { ... }

    // Convert to a Codable struct
    func toData() -> TaskData {
        TaskData(
            id: self.id,
            title: self.title,
            ...
        )
    }

    convenience init(from data: TaskData) {
        ...
    }
}
```

**Key Points**:

- **`TaskDifficulty`** enumerations define daily/bonus coins.
- Each property is bound to the UI with `@Published`, ensuring live updates as tasks evolve.

</details>

### 2. Coin & Streak Mechanism

- **Dynamic Rewards**: On check-in, SparkDays calculates a base coin reward plus optional streak bonuses.
- **Consistency Tracking**: Tasks store daily completion dates. SwiftUI logic verifies if “today” was already checked off, preventing double-earn scenarios.
- **Local Notification**: The app can reflect an immediate coin increment in a top-level view model (`AppViewModel`), then **toast** the user a success message.

### 3. Store & Item Purchasing

- A **ShopItem** class details each potential reward: title, description, price, an optional image, etc.
- Purchasing subtracts coins, sets `isPurchased = true`, and moves the item from the “Shop” to “Owned” list.
- Just like tasks, everything is JSON-encoded in `UserDefaults` for simplicity and reliability.

<details>
<summary><strong>Sample: Purchasing Logic</strong></summary>

```swift
func purchaseItem(_ item: ShopItem) -> Bool {
    if userCoin < item.price { return false }
    userCoin -= item.price
    item.isPurchased = true
    item.purchasedDate = Date()
    ...
    return true
}
```

**Takeaway**: By decoupling logic into the `AppViewModel`, I keep the UI code crisp and the purchasing routine easy to maintain or extend (e.g., multi-currency systems, expansions, etc.).

</details>

### 4. SwiftUI Architecture & UX Flow

- **`AppViewModel`**: A single, observable source of truth hosting tasks, coins, and store items.
- **`ContentView`**: Manages the app’s `TabView` (Tasks, Store, Achievements).
- **Declarative UI**: Reusable SwiftUI components (e.g., `TaskCardView`, `ShopItemCardView`) keep the code organized and straightforward.
- **Context Menus & Sheets**: Quick edits or item detail sheets appear modally, seamlessly integrated via SwiftUI’s environment objects.

### 5. Haptic Feedback & Visual Polish

- **Haptic Buttons**: Tapping tasks or store items triggers subtle feedback, boosting user satisfaction.
- **Animated Toast**: Coin changes are displayed with a toast overlay that auto-dismisses, reinforcing user engagement.

<br>

## My End-to-End Involvement

**1. Full Ownership**  
I crafted every aspect—ideation, coding, data management, and user interface. This approach gave me a **holistic** view of feature interplay and user flows.

**2. Advanced SwiftUI Proficiency**  
SparkDays let me dive deep into SwiftUI patterns—custom gestures, environment objects, dynamic color usage, and extended local storage solutions.

**3. Persistence & Scalability**  
In building SparkDays, I solidified my approach to local data handling, ensuring minimal friction for users while keeping the code base **extendable** (e.g., potential iCloud sync or advanced analytics in future updates).

<br>

## Reflection & Impact

SparkDays effectively merges **gamified habit tracking** with **daily tasks** and **store-based rewards**—an approach that stands out in a crowded to-do market. By offering both a practical grid-based tracker and a motivating coin system, users are more likely to stick with their goals and enjoy the journey.

On a personal level, SparkDays reinforced my ability to:

- **Architect** a multi-screen, multi-model SwiftUI app
- **Balance** intuitive design with deeper functionality (store edits, image uploads, day-by-day tracking)
- **Iterate** quickly as a single developer—achieving robust code while delivering a polished user experience

<br>

## Conclusion

**SparkDays** demonstrates my capacity to **innovate**, **design**, and **implement** a complete iOS solution that fuses productivity with gamification:

- **Habit-tracking** grid for daily tasks
- **Reward-based** coin economy with adjustable tiers
- **User-friendly** design powered by advanced SwiftUI architecture

I’m excited to further enhance SparkDays—adding new reward mechanics, expanded analytics, or even optional group challenges. If you seek an iOS developer who can handle **everything** from core code to final polish, **let’s talk**. I’d love to apply this expertise to future app or product endeavors.
