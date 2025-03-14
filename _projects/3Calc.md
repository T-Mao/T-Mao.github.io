---
layout: page
title: 3Calc
description: Multi-Calculator with Individual Histories
img: assets/img/ThreeCalc.png
importance: 2
category: individual
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/ThreeCalc.png"
       title="3Calc App"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

**3Calc** is my **triple-calculator** iOS app, letting users swipe between **three distinct calculators**, each with its own **independent** history stack. Instead of juggling multiple windows or losing track of older results, users can keep **ongoing calculations** neatly separated—perfect for switching between personal finance, a quick tip calculation, or a separate science formula.

I developed **3Calc** entirely on my own:

- **Design & UI/UX**: all visuals, user flows, and layout decisions.
- **SwiftUI Code**: from data models to gesture handling and animations.
- **Project Management**: requirements planning, testing, release to the App Store, and promotional tasks.

Despite having numerous ways to unwind, **I dedicate my free time** to building iOS apps—**3Calc** is yet another result of my passion-driven coding and determination to expand my skill set.

<br>

## Downloads

<div class="row my-3">
  <div class="col-sm-12 text-center">
    <div class="row">
      <div class="col-sm">
        <a href="https://apps.apple.com/us/app/3calc/id6743180803"
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
      Get <strong>3Calc</strong> for iOS.
    </div>
  </div>
</div>

<br>

## User Stories & Demo

### Story 1: The Multi-Tasking Pro

> _“I often do separate calculations for personal budgeting, tip splits, and random math checks. I hate mixing them all in one cluttered history.”_

3Calc solves this by giving you **three** distinct calculators. Swipe left or right to switch, and each retains its **own** history. No more confusion over which result belongs to which context.

### Story 2: The “Recall & Reuse” Fan

> _“Sometimes I do a complex calculation, then realize I need that same result again—like a sub-total. It’d be great if I could just tap it from history.”_

3Calc’s **history log** is fully interactive: **tap** an older result to reuse it in your new expression, or **long-press** to copy or delete it. Each line stores not just the **result** but also the preceding expression.

### Watch 3Calc in Action

<div class="row">
  <div class="col-sm-12 text-center">
    <video width="320" height="240" controls>
      <source src="assets/video/3calc.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <p class="caption my-2">
      A quick walkthrough of using 3Calc, including switching calculators and reusing past results.
    </p>
  </div>
</div>

<br>

## Project Highlights

### 1. Triple-Tab Calculator Design

- **Swipe Between Three Calculators**  
  Each calculator is a **dedicated tab** in a `PageTabViewStyle`. Flick left or right to move seamlessly among them.
- **Separate Histories**  
  No cross-contamination. Each calculator’s result list remains independent, capturing the expression and final numeric outcome.

### 2. Detailed History & Reuse

- **Scrollable History**  
  The **most recent** results appear at the bottom; scroll upward to find older entries.
- **Long-Press on an Entry**
  - **Copy** both expression & result to your clipboard.
  - **Delete** it from the log if it’s no longer needed.
- **Tap to Reuse**  
  Tapping an old result automatically **inserts** that value into your current calculation. Perfect for chaining multi-step calculations.

### 3. Handy Calculation Features

- **Live Expression & Display**
  - The top of each calculator view shows the in-progress formula.
  - The main result display updates as digits or operators are pressed, with standard operator precedence (\*/ before +-).
- **Undo & Clear**
  - A custom backspace button (`⌫`) removes just the last digit.
  - A quick single-press of **C** resets the current calculator’s expression to zero, and a **long-press** can prompt to wipe the entire history.

### 4. Code Architecture & SwiftUI Patterns

- **SwiftUI + Multi-File Structure**
  - `ContentView.swift` manages the array of `Calculator` objects, each of which has an `id`, a `history` array, and its own `display`.
  - `CalculatorView.swift`, `CalculatorPadView.swift`, and `HistoryDisplay.swift` handle the layout, user input logic, and dynamic updates.
- **Persistence with `UserDefaults`**
  - Each of the three calculators is saved as JSON. Closing the app preserves your partial calculations and entire history across launches.
- **Responsive Animations & Gestures**
  - Leveraged `TabView` with page-swiping gestures.
  - Built custom long-press actions in the history for copying or removing entries.
  - Triggered **haptic feedback** on important actions (taps, long-presses) to enhance user engagement.

<br>

## Technical Breakdown

### Data Modeling

Each calculator is represented by:

```swift
struct Calculator: Identifiable, Codable, Equatable {
    let id: UUID
    var history: [HistoryItem] = []
    var display: String = "0"
    var expression: String = ""
    var justCalculated: Bool = false
}
```

- **`history`** holds an array of `HistoryItem`s, each storing the user’s expression and final result.
- **`display`** is the current numeric input on screen.
- **`expression`** tracks a partial formula if the user is chaining multiple operations.

### Expression Parsing & Evaluation

- **Tokenizing**
  - The user’s input is segmented into tokens (numbers, operators) to handle correct math precedence (× and ÷ before + and -).
- **Decimal Arithmetic**
  - Everything is performed with `Decimal`—rather than `Double`—to minimize floating-point rounding issues in a financial or high-precision scenario.

<details>
<summary><strong>Sample: Evaluate Expression</strong></summary>

```swift
func evaluateExpression(_ rawExpression: String) -> String {
    let tokens = rawExpression.components(separatedBy: " ")
    // Step 1: handle × and ÷ first
    // Step 2: handle + and - next
    // Return final decimal as a trimmed string or "Error"
}
```

**Why it’s clever**: This two-pass approach is a straightforward way to respect standard operator precedence without diving into complicated expression trees.

</details>

### Layout & Gestures

- **`TabView(selection:)`**
  - Each calculator is a subview, assigned an index in the array. Swiping horizontally cycles through them.
- **History Scroll**
  - A `ScrollView` with each entry in the history. Tapping re-injects that result into the **current** display, and a “long-press” menu allows copying or deletion.

### Local Persistence

- **`UserDefaults.standard`**
  - The `[Calculator]` array is saved as `calculators_v1`.
  - On every update, the model is re-encoded to JSON.
  - Ensures each calculator’s expression remains intact when the user reopens the app, with no external server required.

<br>

## Project Outcomes

1. **Multi-Scenario Convenience**

   - Users can maintain separate contexts (work, personal, etc.) in parallel, never losing track of past results in a single jumbled history.

2. **Seamless Reuse of Past Results**

   - Tapping old entries is a time-saver for multi-step calculations—**no retyping** of an older number needed.

3. **Technical Scalability**
   - The SwiftUI architecture easily extends for potential new “specialty calculators”—like a scientific or unit-conversion tab—by adding more views or logic to each calculator instance.

<br>

## Personal Growth & Reflection

**Relentless Development Spirit**

- While others might unwind with passive hobbies, **I love** pushing out new iOS projects. Building 3Calc was a testament to this unstoppable enthusiasm for coding.

**Deepened SwiftUI & Arithmetic**

- I refined custom numeric parsing, perfected concurrency in storing data, and orchestrated an intuitive UI flow for switching among multiple calculators.

**Self-Driven Project Ownership**

- From concept to deployment, I was the **designer, developer, and QA**. No external teams—just my passion, discipline, and a drive to deliver a polished product.

<br>

## Final Thoughts

**3Calc** stands out as a **time-saving**, **user-friendly** tool for all sorts of calculations, organized into **three** distinct spaces. I wrote every line of code, designed each screen, and orchestrated the entire release—showcasing my ability to craft **robust** SwiftUI apps with **clean** code, **thoughtful** design, and **real** user benefits.

Now on the **App Store**, **3Calc** highlights my dedication to building **simple-yet-powerful** iOS experiences. I’m excited to continue pushing the boundaries of my coding and design skills, and I believe this multi-calculator concept underscores my readiness for any **App Developer** role that demands **creativity**, **technical expertise**, and **user-focused** problem-solving.
