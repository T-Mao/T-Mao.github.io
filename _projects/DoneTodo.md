---
layout: page
title: DoneTodo App – Minimalistic Time-Planning Solution
description: My role as an iOS Developer
img: assets/img/DoneTodo.png
importance: 1
category: individual
related_publications: false
---

## Overview

**DoneTodo** is a **lightweight iOS** time-planning application that leverages a **drag-and-drop** interface, **color-coded** timelines, and **usage analytics** to help users visualize where every minute is spent—and effortlessly schedule upcoming tasks. Inspired by a _“less is more”_ philosophy, I focused on minimal UI elements, **streamlined workflows**, and **intuitive** navigation, ensuring that users could plan and track their days without clutter or confusion.

During this project (from **August 2024 to Present**), I took the lead in:

1. Designing a **SwiftUI** interface that merges **drag-and-drop** and color-coded blocks for tasks.
2. Implementing **real-time analytics** on time distribution, providing daily/weekly/monthly/yearly usage stats with dynamic visualization.
3. Building core data structures (e.g., color-coded tasks) and **serializable** states for storing multiple user-defined tasks across arbitrary dates.
4. Integrating thoughtful **haptic feedback** and transitions to enhance user satisfaction and encourage consistent usage.
5. Streamlining the entire app around a minimal footprint, ensuring **swift** performance and **low cognitive load** for users.

<br>

## Project Highlights

### 1. Lightweight UI/UX (SwiftUI)

- **Drag-and-drop** Time Grid

  - Users effortlessly paint or erase 10-minute time blocks, with **instant** haptic feedback on touches.
  - Real-time visual changes (“striped patterns” vs. “solid fills”) to differentiate **planned** vs. **done** tasks.

- **Intuitive Daily Calendar**
  - Custom **Mini Calendar** panel allowing quick date changes via gestures.
  - Maintained minimal, decluttered design: only the essential elements appear on screen (time grid, tasks, day selector).

<details>
<summary><strong>Sample: HapticButton + Drag Gesture</strong></summary>

{% highlight swift %}
struct HapticButton<Label: View>: View {
var action: () -> Void
var label: () -> Label

    var body: some View {
        Button(action: {
            // Trigger haptic feedback
            let generator = UIImpactFeedbackGenerator(style: .rigid)
            generator.prepare()
            generator.impactOccurred()

            // Perform the original action
            action()
        }, label: label)
    }

}
{% endhighlight %}

**Why it’s clever**:

- Combining **UIImpactFeedbackGenerator** with SwiftUI’s `Button` seamlessly provides user feedback.
- Minimizes code duplication by encapsulating haptics in a custom view, simplifying repeated usage.

</details>

### 2. Color-Coded Timelines & Data Modeling

- **Dynamic Color Management**

  - Created **`ButtonItem`** objects (storing color & title) that users can freely add/edit.
  - Implemented a **Codable** extension (`CodableColor`) that stores color in **Hex** format, ensuring consistent serialization/deserialization.

- **Grid Storage**
  - Each day’s schedule is stored in a 6x24 matrix (6 columns = 10-minute increments per hour, for 24 hours).
  - Users can “paint” color blocks for “Plan” or apply a diagonal “striped pattern” for “Done,” each cell saving two color states.

<details>
<summary><strong>Sample: Color & Codable Implementation</strong></summary>

{% highlight swift %}
struct CodableColor: Codable, Equatable {
let color: Color?

    init(_ color: Color?) {
        self.color = color
    }

    // encoding/decoding color as a hex string
    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        if let color = color, let hex = color.toHex() {
            try container.encode(hex)
        } else {
            try container.encodeNil()
        }
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if let hex = try? container.decode(String.self) {
            self.color = Color(hex: hex)
        } else {
            self.color = nil
        }
    }

}
{% endhighlight %}

**Highlights**:

- Supports full ARGB hex (`#RRGGBBAA` or `#RRGGBB`) for flexible color alpha.
- **`CodableColor`** + `Color(hex:)` allowed robust data persistence in `UserDefaults`, minimizing user friction.

</details>

### 3. Real-time Statistics & Time Analytics

- **Daily/Weekly/Monthly/Yearly Summaries**

  - Automatic collection of planned vs. completed “minutes,” aggregated across tasks.
  - Trend analytics in an optional **`StatisticsView`** with both bar-charts and donut visuals.

- **Interactive Charts**
  - **PieChartView** with **DonutSliceView** animates each slice and highlights details (percent, total minutes) on tap.
  - Implementation of an “average vs. total” mode: can quickly re-summarize data across the chosen time period.

<details>
<summary><strong>Sample: PieChartView & DonutSliceView</strong></summary>

{% highlight swift %}
struct DonutSliceView: View {
var pieSliceData: PieSliceData
var isSelected: Bool

    var body: some View {
        GeometryReader { geometry in
            // compute arcs + shape...
            Path { path in
                // outer arc
                path.addArc( /* omitted */ )
                // inner arc
                // closeSubpath
            }
            .fill(pieSliceData.color)
            // small offset if isSelected = true
        }
    }

}
{% endhighlight %}

**Why it’s clever**:

- Combines **offset** animations with SwiftUI geometry to “pop out” a slice on tap.
- Simple configuration allows toggling between **“Total”** or **“Average”** calculations via a segmented control.

</details>

### 4. Undo/Redo & Gesture Handling

- **Undo/Redo** Stack

  - Maintains a maximum of 50 snapshot states in memory, enabling quick user corrections.
  - Each time the user modifies the grid, the previous state is pushed onto an **undo stack**.

- **Vertical Drag Navigation**
  - SwiftUI’s `DragGesture` used to switch entire days with a vertical drag (like flipping a daily planner).
  - Smooth transitions (with optional “preview” of the next day’s grid while dragging).

### 5. Minimalism & Creativity

- Focused solely on **core** productivity: color-coded tasks, scheduling & time usage, real-time stats.
- Avoided “feature bloat”: **no** extraneous toggles or secondary screens—**immediate** load times and **less user stress**.
- Task naming or editing uses an in-place textfield approach, quietly integrated into the color button row.

<br>

## Technical Contributions

1. **SwiftUI Architecture**

   - Data stored in `[[GridItemState]]`, each state handling up to two color references (`backgroundColor` & `patternColor`).
   - **Haptic** feedback extension (`HapticButton`) for consistent user experience across the entire UI.

2. **Advanced Persistence**

   - Used **UserDefaults** (keyed by `gridItems_YYYYMMDD`) to store each day’s entire schedule JSON.
   - `CodableColor` + hex conversions ensuring color accuracy in iOS’ sRGB space.

3. **Task List & Customizability**

   - Dynamically generated “Task Buttons” for each user-defined category.
   - Real-time rename, recolor, or delete tasks—integrated into a **long-press** menu or **TextField** for in-place edits.

4. **Undo/Redo**
   - Simple but effective stack-based approach: pushing a full 2D array copy onto an “undoStack.”
   - Clears “redoStack” on any new user changes, consistent with typical editor behavior.

<br>

## Project Outcomes

- **Enhanced User Productivity**

  - By blending a simple color-coded daily grid and minimal taps, users found it quick to plan time or do post-day reflection.
  - The “Done” overlay stripes **visually** encourage quick recognition of completed tasks, providing motivational feedback.

- **User Satisfaction**

  - Testers praised the **low friction** approach—**“Add a color-coded button, paint your time, done.”**
  - In-app time usage logs reduced anxiety and improved daily accountability.

- **Scalable for Additional Features**
  - The underlying code structure is easily extended for multi-user login or heavier cloud sync (e.g., CloudKit).
  - SwiftUI-based approach ensures consistent maintenance and future expansions (e.g., watchOS, widgets).

<br>

## Personal Growth & Reflection

1. **Technical Mastery**

   - Strengthened SwiftUI knowledge with advanced gestures (drag, multi-state preview), custom shape drawing, and haptic feedback.
   - Gained practical experience in **data serialization** (hex-based color coding) and **undo/redo** design patterns on iOS.

2. **Design & UX**

   - Balanced minimal UI with advanced capabilities like daily scheduling and analytics.
   - Showcased strong attention to user-friendly details (tap vs. drag distinctions, “striped” done-layers, partial day scrolling).

3. **Adaptability & Creativity**
   - Provided robust solutions (undo stack, vertical day-swiping) with minimal overhead.
   - Devised a purely color-coded approach to reduce textual clutter, letting time blocks serve as the primary “UI language.”

<br>

## Final Thoughts

The **DoneTodo** project embodies my passion for **simple yet powerful** app design. By blending:

- **SwiftUI** for a quick, reactive interface
- **Custom color-coded data** with easy-to-use serialization
- **Analytics** for immediate time usage insights

I delivered an iOS app that **motivates** users to plan effectively while keeping friction near zero. The code foundation—**undo/redo stacks**, **gesture-based day navigation**, and **drag-based painting**—demonstrates both my creativity and systematic approach to designing a truly **user-centric** time planner.

**DoneTodo** remains an evolving project, but its current success shows how carefully **orchestrated minimal features** can significantly enhance daily productivity—and do so with **fluid** performance and minimal complexity.
