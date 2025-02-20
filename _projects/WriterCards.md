---
layout: page
title: WriterCards App
description: Daily Creativity & Self-Reflection
img: assets/img/writercards.png
importance: 2
category: individual
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/writercards.png"
       title="WriterCards App"
       class="rounded z-depth-1"
       max-width="350px"
    %}
  </div>
</div>

## Overview

**WriterCards** is an iOS application I created from scratch (February 2024 – April 2024) to inspire daily creative writing and introspection. Developed entirely in **Swift** using **SwiftUI**, this project demonstrates my comprehensive skill set spanning **UI/UX design**, **state management**, **data persistence**, and **project coordination** (via **Jira** and **GitHub**).

As the **sole developer**, I not only architected the codebase but also managed the project lifecycle end to end—**from concept** and **scope definition** to **feature implementation**, **QA**, and **final release**. In doing so, I effectively controlled **scope creep**, delivering the app on time and with a clear, feature-focused MVP.

<br>

## Project Highlights

1. **Daily Writing & Self-Reflection**

   - Randomly generates engaging writing prompts (referred to as “cards”) each session.
   - Encourages journaling habits that foster creativity and personal growth.

2. **Robust SwiftUI Architecture**

   - Harnesses the power of SwiftUI for a **declarative, responsive UI** across different orientations (portrait/horizontal) and system color modes (light/dark).
   - Employs **tab-based** navigation (TabView), **lazy grids**, and advanced SwiftUI modifiers (e.g., `withAnimation`) for polished transitions.

3. **Data Persistence & State Management**

   - Mixes **UserDefaults** with **JSON encoding/decoding** to store user-generated content, ensuring a persistent writing history.
   - Implements **@State**, **@Binding**, and **@ObservedObject** patterns for real-time UI updates.

4. **Dynamic Color & Layout**

   - Generates vibrant **HSB-based gradients** (with dynamic hue shifts) for backgrounds and card designs, adding a visually stimulating flair.
   - Supports drag-and-drop reordering (with a custom `DropDelegate`) for history entries, demonstrating advanced SwiftUI interactions.

5. **Professional Project Coordination**
   - Utilized **Jira** for task management, sprint planning, and backlog grooming.
   - Integrated **GitHub** for version control, issue tracking, and collaborative code reviews (preparing for potential future team scaling).

<br>

## Feature Overview

Despite the simplicity of the interface, WriterCards sports several **key interactions** and behind-the-scenes complexities:

- **Dynamic Card Creation**: Each new session spawns unique cards with random color gradients and distinct creative prompts.
- **Interactive Writing Sheet**: Users can expand and edit their chosen “lucky card” immediately.
- **Persistence**: All changes (e.g., new prompts, edited content, reorderings) remain intact on app restart, reflecting real-world usage for daily journaling.
- **Flexible Editing & History**: Previously generated prompts and user entries can be revisited, refined, or deleted. This fosters continuous engagement and reflection.
- **Background Gradient Manager**: SwiftUI environment objects allow for seamless real-time updates to the app’s look and feel with minimal overhead.

<br>

## Technical Breakdown

### 1. SwiftUI-Based Architecture

- **Declarative UI**  
  Leveraged `@State` and `@Binding` properties to synchronize user input with the interface, minimizing boilerplate and complexity.
- **Tab & Grid Layout**  
  Used SwiftUI’s `TabView` to present a multi-functional interface (Main, Edit Topics, History).  
  Implemented `LazyVGrid` for streamlined prompt organization, ensuring responsive layouts across device orientations.
- **Environment Objects**  
  Adopted `@EnvironmentObject` to share a custom `BackgroundGradientManager` across different views, enabling real-time transitions and animations.

### 2. Data Persistence & State Management

- **UserDefaults + JSON**  
  Created a custom `WritingTopic` struct (conforming to `Codable`) for easy JSON encoding/decoding, storing user data (e.g., custom topics, writing history) in UserDefaults.
- **On-Device Sync**  
  Guaranteed that any modifications to writing prompts or user journal entries would immediately propagate across relevant app sections.

### 3. Dynamic Gradients & Color Manipulation

- **HSB Gradient Generation**  
  Wrote a custom method (`generateRandomGradientHSB()`) to produce random, aesthetically pleasing color pairs.  
  Converted SwiftUI `Color` to/from hex strings for consistent theming across sessions.
- **Animations**  
  Employed `withAnimation(.easeInOut(duration: 1))` to smoothly transition background gradients, creating a subtle yet engaging visual effect.  
  Used `opacity` and `scaleEffect` transitions for card reveal, adding a fun “fan-out” animation when refreshing prompts.

### 4. Advanced UI Interactions

- **Drag & Drop in History**  
  Implemented a custom `DropViewDelegate` to reorder history items, showcasing an advanced SwiftUI pattern.  
  Integrated context menus for quick actions (editing, deleting), facilitating a seamless user experience.
- **FocusState Management**  
  Ensured that tapping on the background dismisses keyboards and text editors, preventing UI clutter and maintaining a clean, distraction-free interface.

### 5. Project Management

- **Jira**  
  Tracked user stories (e.g., “As a user, I want to easily reorder prompts via drag and drop”), assigned sprints, and monitored progress for timely delivery.
- **GitHub**  
  Maintained a clean `main` branch for production-ready code, leveraging branches for feature development, code reviews, and rapid iterations.
- **Scope Control**  
  Kept a tight focus on must-have features for an initial MVP—card generation, writing sheet, editing tools, and basic customizations—to ensure quality output within deadlines.

<br>

## Code Snippets & Highlights

Below is a small sample illustrating how I dynamically generate vibrant gradients and store the resulting color codes in SwiftUI:

<details>
<summary><strong>Sample: Dynamic Gradient Generation & Color Conversion</strong></summary>

{% highlight swift %}
static func generateRandomGradientHSB() -> [String] {
let hue1 = Double.random(in: 0...360)
var hue2 = (hue1 + Double.random(in: 50...110))
.truncatingRemainder(dividingBy: 360)
if hue2 < 0 { hue2 += 360 }

    let saturation = Double.random(in: 0.2...1.0)
    let brightness = Double.random(in: 0.7...0.75)

    let color1 = Color(hue: hue1 / 360,
                       saturation: saturation,
                       brightness: brightness)
    let color2 = Color(hue: hue2 / 360,
                       saturation: saturation,
                       brightness: brightness)

    // Convert color objects to hex strings for consistent rendering
    return [color1.toHex(), color2.toHex()]

}
{% endhighlight %}

Why it’s clever:

- Utilizes **HSB** (Hue, Saturation, Brightness) logic to create more visually appealing gradients than purely random RGB generation.
- Ensures that the second hue diverges from the first for clearly distinct color pairs, preventing monotony.
</details>

<br>

<details>
<summary><strong>Sample: ContentView.swift & State Management</strong></summary>

{% highlight swift %}
struct ContentView: View {
@State private var topics: [WritingTopic]
= load("topics")
@State private var dailyTopics: [WritingTopic]
= load("dailyTopics")
@State private var historyTopics: [WritingTopic]
= load("historyTopics")

    @State private var selectedTab: Int = 1
    @StateObject private var backgroundManager
        = BackgroundGradientManager()

    var body: some View {
        TabView(selection: $selectedTab) {
            EditTopicsView(topics: $topics,
                           dailyTopics: $dailyTopics)
                .tag(0)
                .tabItem { Text("Edit") }

            MainContentView(topics: $topics,
                            historyTopics: $historyTopics,
                            dailyTopics: $dailyTopics)
                .tag(1)
                .tabItem { Text("Main") }

            HistoryView(historyTopics: $historyTopics,
                        topics: $topics,
                        dailyTopics: $dailyTopics,
                        showSheet: .constant(false))
                .tag(2)
                .tabItem { Text("History") }
        }
        .tabViewStyle(.page(indexDisplayMode: .never))
        .background(
            backgroundManager.backgroundGradient
                .edgesIgnoringSafeArea(.all)
        )
        .environmentObject(backgroundManager)
    }

}
{% endhighlight %}

Key takeaways:

- **@State** & **@StateObject** for maintaining reactive UI updates and global states (e.g., dynamic backgrounds).
- **TabView** with `.page` style for seamless navigation among the “Edit,” “Main,” and “History” views.
</details>

<br>

## Project Outcomes

- **Heightened User Engagement**  
  By generating random writing prompts and encouraging a daily approach, **WriterCards** sustains user curiosity and fosters consistent journaling habits.
- **Clean, Scalable Codebase**  
  A well-structured SwiftUI architecture, modular components, and detailed documentation make it easy to incorporate future enhancements or integrate third-party services.
- **Timely Delivery & Quality**  
  Leveraging Jira and GitHub helped me stick to a lean MVP, launching on schedule and validating the core concept of a daily writing companion.

<br>

## Personal Growth & Reflection

1. **SwiftUI Proficiency**  
   Mastered advanced techniques—ranging from environment objects and animations to sophisticated drag-and-drop reordering flows.
2. **Scope & Time Management**  
   Learned to balance must-have features with nice-to-haves, ensuring a refined and polished product release under tight deadlines.
3. **Architectural Insight**  
   Gained deeper knowledge of data persistence strategies, from simple `UserDefaults` usage to potential future expansions like Core Data or cloud sync.
4. **Holistic Project Ownership**  
   Handled everything from design and development to QA and partial product management, showcasing adaptability and a strong sense of responsibility.

<br>

## Final Thoughts

**WriterCards** is a testament to my ability to independently create, refine, and release a fully functioning iOS application. From dynamic color gradients to advanced drag-and-drop functionality and real-time state updates, each feature highlights my **technical versatility** and **commitment to quality user experiences**.

If you’re seeking an **iOS App Developer** with **end-to-end project execution** capabilities, strong **SwiftUI proficiency**, and a flair for building engaging digital products, I believe my work on **WriterCards** demonstrates exactly those strengths. I’m eager to bring this adaptability and problem-solving mindset to future projects and teams.

<br>
