---
layout: page
title: DoneTodo App
description: Minimalistic Time-Planning Solution
img: assets/img/DoneTodo.jpeg
importance: 1
category: individual
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/DoneTodo.jpeg"
       title="DoneTodo App"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

**DoneTodo** is my latest iOS app designed for **visual time scheduling**. Users can **paint** their day with **color-coded tasks**, distinguishing between what they **plan** to do versus what they actually **complete**—all in a straightforward, grid-based UI.

I handled **every aspect** of DoneTodo’s creation:

- **Code Architecture** in Swift & SwiftUI
- **Data Persistence** with JSON-encoded day schedules
- **UI/UX Design** focusing on simplicity yet maintaining advanced features (undo/redo, analytics)
- **App Store** submission and distribution

It’s available now on the App Store, aiming to make personal time management both **effective** and **enjoyable**.

<br>

## Download

<div class="row my-3">
  <div class="col-sm-12 text-center">
    <div class="row">
      <div class="col-sm">
        <a href="https://apps.apple.com/us/app/donetodo-task/id6743181289"
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
      Get <strong>DoneTodo</strong> for iOS.
    </div>
  </div>
</div>

<br>

## User Stories & Demo

### Story 1: The Visual Planner

> _“I’m tired of text-heavy to-do apps. I want to literally ‘see’ how my day is mapped out—like a painter’s canvas for scheduling.”_

DoneTodo uses a **24×6** grid (24 hours × 6 increments of 10 minutes). By tapping or dragging color-coded **task buttons** onto each cell, users visually **paint** their day, distinguishing tasks with unique hues.

### Story 2: The Reflective Learner

> _“Sometimes I plan tasks but end up doing something else. I need a way to mark the difference so I can analyze it later.”_

DoneTodo has **two** columns of color buttons: one for **planned** tasks (semi-transparent) and another for **done** tasks (solid fill). This side-by-side approach clarifies how the day deviates from the plan, fueling reflection and self-improvement.

### Watch DoneTodo in Action

<div style="display: flex; justify-content: center; align-items: center; flex-direction: row;">
  <video controls="" style="max-width: 250px;"> 
      <source src="/assets/video/donetodo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<br>

## Project Highlights

### 1. Color-coded, Grid-based UI

- **10-minute Increments**  
  Each cell in the grid is precisely 10 minutes. Users can plan up to 24 hours of the day in a single scroll.
- **Current Time Indicator**  
  A **black line** or marker shows the user’s real-time progress, so they know exactly where they stand compared to their planned schedule.

### 2. Plan vs. Done Buttons

- **Two Columns of Task Buttons**
  - Left Column: **Plan** (lighter, shadow-like fill).
  - Right Column: **Done** (fully colored fill).
- **Eraser Tools**
  - One eraser each for “Plan” or “Done.” Quickly correct scheduling mistakes with a single tap—no multi-level menus required.

### 3. Calendar & Daily Swiping

- **Built-in Calendar**
  - Users see which dates have data at a glance. Tapping a date loads the day’s timeline, letting them revisit past activities.
- **Vertical Swipe Navigation**
  - Swipe **up** or **down** on the grid to move to the next or previous day, with a smooth slide animation. Perfect for quickly scanning multiple days’ usage.

### 4. Statistics & Time Analytics

- **Pie Charts & Bar Graphs**
  - Summaries of each task’s total minutes for a day, week, month, or year.
  - **Striped** pattern highlights done-vs-planned time in the same bar.
- **Average vs. Total**
  - Toggle a segmented control to see either **total** or **average** usage for each task.
  - Thoroughly coded in SwiftUI, with dynamic slice “exploding” animations on chart segments.

### 5. Undo/Redo & Local Persistence

- **Undo/Redo Stack**
  - Stores up to 50 states of the **entire** schedule, replicating a typical design or text editor’s behavior.
  - One line of code to revert an entire day’s painting or reapply it.
- **Local JSON Storage**
  - Each day’s 24×6 grid is encoded as `gridItems_YYYYMMDD` in `UserDefaults`.
  - Custom color serialization using `Color.toHex()` ensures user-defined tasks never lose their chosen hues.

<br>

## Technical Breakdown

My development **stack** includes **SwiftUI** with structured, maintainable code:

### Architecture & Data Modeling

- **`GridItemState`** Model  
  Encapsulates both a `backgroundColor` (planned) and a `patternColor` (done) for each cell, along with references to the **ButtonItem** `UUID`.
- **`ButtonItem`** Model  
  Each task button has an ID, a SwiftUI **Color**, and a text label. This design allows dynamic additions, renaming, or color adjustments without complicated DB tables.

<details>
<summary><strong>Sample: GridItemState</strong></summary>

```swift
struct GridItemState: Codable, Equatable {
    var backgroundColor: CodableColor? = nil
    var isPatternFilled: Bool = false
    var patternColor: CodableColor? = nil

    var backgroundButtonID: UUID? = nil
    var patternButtonID: UUID? = nil
}
```

**Key Insight**: Each cell can simultaneously store a “plan” color (backgroundColor) and a “done” pattern (patternColor), unlocking the layered approach that visually separates planning from action.

</details>

### Gesture Handling & Drawing

- **Tap or Drag**
  - A custom **DragGesture** recognized in the grid lets users paint multiple cells in a single swipe.
  - The code calculates every “touched” cell along the drag path, filling them automatically with either plan or done color.
- **Vertical Day-Swipe**
  - A second gesture on the same grid detects vertical motion beyond a threshold—**switching** the entire day’s schedule to the next or previous date.
  - This was carefully layered to not conflict with the painting gesture.

### Undo/Redo System

- **Push/Pull Stack**
  - Before each painting action, DoneTodo captures the entire 2D grid as a “snapshot.”
  - Undoing pops the last snapshot, reloading the entire grid from that memory.
  - Redo is reversed if the user undoes then changes something new.

<details>
<summary><strong>Sample: Pushing an Undo State</strong></summary>

```swift
func pushUndoState() {
    // Limit to 50 to prevent memory bloat
    if undoStack.count >= 50 {
        undoStack.removeFirst()
    }
    // Clone current grid state
    undoStack.append(gridItems.map { $0.map { $0 } })
    // Clear redo stack
    redoStack.removeAll()
}
```

**Why it’s clever**: The grid is a 2D array, so “copying” it carefully ensures changes to the new array don’t alter the old references.

</details>

### Statistics & Analytics

- **Task Aggregation**
  - Each day’s grid cells are scanned for background/done usage, tallying up total or average minutes for each **ButtonItem**.
- **PieChartView & DonutSlice**
  - A custom SwiftUI shape that arcs around the center with a configurable “explode” offset. On tapping a slice, it animates out, displaying stats in the center.

### Design & UX Principles

- **Minimal Overhead**
  - The app has a single main screen (the time grid) plus an optional stats screen. No labyrinth of tabs or complicated forms.
- **Color-coded Everything**
  - Color is the user’s prime visual anchor. The code ensures consistent, bright palettes and easy shading or erasing.

<br>

## Project Outcomes

1. **Highly Engaging Time Visualization**

   - Users can see at a glance how their day “paints out.” They love the directness, skipping complex data entry and letting **color** handle the messaging.

2. **Concrete Self-Review**

   - Because each day can be recalled, users can reflect on time usage historically. The difference between plan vs. done fosters deeper self-awareness.

3. **Performance & Scalability**
   - The 24×6 grid remains extremely lightweight. The system easily extends to new features like iCloud sync or watchOS compatibility without major code rewrites.

<br>

## Personal Growth & Reflection

**1. Technical Mastery**

- I refined advanced SwiftUI patterns, from custom shapes to dynamic color encoding, and orchestrated multi-gesture layers (painting + day-swiping) without UI collisions.

**2. Thoughtful Design Mindset**

- Balancing minimalism with “power features” (undo/redo, day-swiping, stats) taught me how to present deeper complexity under a simple, calm UI—making it **instantly** approachable.

**3. Ownership from End to End**

- I was responsible for everything: architecture, user flows, local storage, gesture management, and the final **App Store** submission. This 360° responsibility sharpened both my technical and product sensibilities.

<br>

## Final Thoughts

**DoneTodo** exemplifies how **clean code** and **vibrant design** converge to create a **truly user-friendly** tool. Merging color-coded task painting with seamless day-to-day navigation, it stands out as:

- **Immediate**: No steep learning curve, just intuitive taps and drags.
- **Reflective**: Contrasting “planned” vs. “done” fosters genuine insights.
- **Extendable**: The structured SwiftUI approach paves the way for future expansions—like watch apps or advanced analytics—without losing the elegant simplicity.

Already **live on the App Store**, DoneTodo showcases my passion for building **polished**, **engaging**, and **technically robust** iOS apps. I look forward to applying this multi-faceted skill set—covering design, gestures, code architecture, and data persistence—on future projects or collaborations.
