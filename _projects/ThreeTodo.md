---
layout: page
title: ThreeTodo App
description: Efficient Task Management
img: assets/img/threetodo.png
importance: 1
category: individual
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/threetodo.png"
       title="ThreeTodo App"
       class="rounded z-depth-1"
       max-width="350px"
    %}
  </div>
</div>

## Overview

From **April 13 to April 21, 2024**, I independently built **ThreeTodo**, a **lightweight iOS** task manager emphasizing **fluid navigation**, **minimal UI**, and **drag-and-drop** efficiency. The project demanded a **swift**, **five-day** turnaround—an ideal environment to showcase my **agile** approach and expertise in **user-centric** design. ThreeTodo's hallmark is its **intuitive** multi-page structure (Plan / Today / Thoughts), requiring minimal taps or screens to keep track of evolving tasks and ideas.

<br>

## Core Highlights

1. **Rapid Development**

   - Single-handedly coded and tested within just **five days**, from initial concept to functional MVP.
   - Utilized **SwiftUI** for swift prototyping, iterative feedback, and **clean** layout definitions.

2. **Minimal Navigation & UI**

   - Only **three** primary views—**Plan**, **Today**, and **Thoughts**—to reduce complexity.
   - Implemented **drag-and-drop** gestures for reordering tasks, cross-screen transfers, and quick deletion in a single **touch** flow.
   - No extraneous steps (due dates, priority setups)—**one-tap** additions or inline edits.

3. **User-centric Approach**

   - Emphasis on **inline editing** with dynamic text expansions (auto height), eliminating sub-menus or separate edit screens.
   - **Contextual actions**: hold long-press to insert dividers, multi-task deletion, or use a built-in "trash" drop zone.

4. **Agile Success & Feedback**
   - Deployed an MVP that testers praised for **clarity** and **practical** usage in daily to-do management.
   - Demonstrated readiness for **quick project** turnarounds in dynamic, fast-paced environments.

<br>

## Key Functionalities

### 1. Draggable Tasks & Cross-Screen Flows

- **Single Source of Truth**:

  - Maintained tasks in three arrays (`plans`, `todays`, `thoughts`) with a global function `removeTaskGlobally()` to seamlessly move a task from one screen to another if dragged outside.

- **Swipe-based Navigation**:
  - **SwiftUI TabView** with `.page` style—**Plan**, **Today**, **Thoughts**—enables horizontal swiping.
  - Each tab maintains its own list of tasks, but a user can drag tasks from one list onto another tab's “plus” button to re-categorize.

<details>
<summary><strong>Sample: Drag & Drop for Cross-Screen Transfer</strong></summary>

{% highlight swift %}
func handleDropTask(withId taskId: UUID) {
if let task = removeTaskGlobally(taskId) {
tasks.append(task)
}
}
{% endhighlight %}

**Why it’s clever**:

- Relies on a universal `removeTaskGlobally()` to detach a `TaskItem` from whichever array it’s in, then appends it to the **destination** array.
- Minimizes user steps: a single drag gesture reassigns tasks across categories.

</details>

<br>

### 2. Inline Editing & Resizable Text Fields

- **Dynamic TextEditor**:

  - Each task dynamically resizes based on content length.
  - No separate “edit mode”; text is always directly editable in place.

- **Height Estimation**:
  - Calculated text height using `NSLayoutManager` and `NSTextContainer` to ensure the UI expansions remain fluid and stable.

<details>
<summary><strong>Sample: Dynamic Sizing for Task Text</strong></summary>

{% highlight swift %}
private func estimateHeight(text: String, width: CGFloat) -> CGFloat {
let attributes: [NSAttributedString.Key: Any] = [
.font: UIFont.systemFont(ofSize: fontSize)
]
let textStorage = NSTextStorage(string: text, attributes: attributes)
let textContainer = NSTextContainer(size: CGSize(width: width - 30,
height: .greatestFiniteMagnitude))
let layoutManager = NSLayoutManager()
layoutManager.addTextContainer(textContainer)
textStorage.addLayoutManager(layoutManager)

    layoutManager.glyphRange(for: textContainer)
    let rect = layoutManager.usedRect(for: textContainer)
    return ceil(rect.size.height)

}
{% endhighlight %}

**Why it’s clever**:

- Merges SwiftUI’s real-time rendering with a refined height calculation from UIKit’s text system.
- Ensures tasks seamlessly expand while maintaining a stable list layout.

</details>

<br>

### 3. Contextual Menus & Divider Templates

- **Dividers**:

  - Long-press on the “+” button toggles between adding normal tasks or **divider** tasks.
  - Dividers help visually group tasks—**Morning / Afternoon / Evening**, or custom user-defined sets.

- **Template System**:
  - Users can create an array of divider sets (`["Morning", "Afternoon", "Evening"]` etc.) and insert them as needed.
  - Efficiently reuses repeated structures for daily planning or priority grouping.

<details>
<summary><strong>Sample: TemplateSelector & Inline Generation</strong></summary>

{% highlight swift %}
TemplateSelector(templates: $templates) { selectedTemplate in
for name in selectedTemplate.names {
tasks.append(TaskItem(text: name, isDivider: true))
}
}
{% endhighlight %}

**Why it’s clever**:

- Lowers repetitive setup each day by letting users inject full sets of custom dividers with **one tap**.
- Showcases swift prototyping: the entire logic is built as a separate reusable SwiftUI `View`.

</details>

<br>

### 4. Swift & SwiftUI Architecture

- **Single `ContentView`**: orchestrates data arrays for three subviews (Plan, Today, Thoughts).
- **Per-Tab** custom `TodoListView`\*\*:

  - Each view includes a “trash” area for convenient mass deletion or single drag-drop disposal.
  - Each list uses SwiftUI’s `List` with `.onMove(perform:)` to reorder tasks seamlessly.

- **UserDefaults Persistence**:
  - Data is periodically encoded via `JSONEncoder` for quick, simple local storage.

<details>
<summary><strong>Sample: Multi-Tab & Data Persistence</strong></summary>

{% highlight swift %}
func saveData() {
if let encodedPlans = try? JSONEncoder().encode(plans),
let encodedTodays = try? JSONEncoder().encode(todays),
let encodedThoughts = try? JSONEncoder().encode(thoughts) {
UserDefaults.standard.set(encodedPlans, forKey: "Plans")
UserDefaults.standard.set(encodedTodays, forKey: "Todays")
UserDefaults.standard.set(encodedThoughts, forKey: "Thoughts")
}
}
{% endhighlight %}

**Why it’s clever**:

- Merges the entire multi-view model into straightforward JSON for minimal overhead.
- Ensures tasks are automatically recovered upon relaunch without complex external databases.

</details>

<br>

## Project Outcomes

- **Immediate Praise**: Beta testers found the app’s simplicity extremely appealing—**“No fluff, just tasks.”**
- **Demonstrated Agility**: Showed that a **week-long** project can produce a highly functional, user-friendly to-do manager with advanced features (drag, context menus, partial screen transfers).
- **Scalable**: The approach can easily integrate additional boards/screens or more advanced collaborative features—foundation is deliberately **clean** and easily extensible.

<br>

## Personal Growth & Reflection

1. **Technical Mastery**

   - Mastered bridging advanced iOS text measurement (`NSLayoutManager`) with SwiftUI’s reactive layout.
   - Fine-tuned multi-gesture logic for a truly drag-centric UX, from in-list reordering to cross-list moves.

2. **Rapid Delivery & Problem-Solving**

   - Balanced “must-have” features (inline editing, drag-and-drop) with a minimal UI to meet a **five-day** MVP deadline.
   - Employed iterative refinements—**shipping** quickly and refining on user feedback in real time.

3. **User-Centered Design**
   - Avoided common complexities like due dates or priorities, focusing on frictionless daily usage.
   - Keenly leveraged “divider” logic and templates to reduce repetitive overhead and highlight user creativity.

<br>

## Final Thoughts

**ThreeTodo** exemplifies my ability to craft a **purpose-driven** app under tight deadlines, employing a lean feature set that resonates with everyday to-do needs. By championing straightforward user flows (dragging, minimal tapping) and implementing technical solutions (dynamic text expansion, flexible data structures, context menus), I delivered a tool that merges **usability**, **performance**, and **clarity**—all in under a week.

This project underscores my competence in **rapidly** transforming an idea into a polished, robust product. It stands as proof of my **coding versatility** in Swift and my dedication to **user-friendly** software design that truly meets real-world demands.
