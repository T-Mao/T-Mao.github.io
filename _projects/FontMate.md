---
layout: page
title: FontMate App
description: Dedicated iOS Font Explorer & SwiftUI Code Generator
img: assets/img/FontMate.jpg
importance: 5
category: work
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/FontMate.jpg"
       title="FontMate App Icon"
       class="rounded z-depth-0"
       max-width="200px"
    %}
  </div>
</div>

## Overview

**FontMate** is my all-in-one iOS font explorer, allowing designers and developers to **preview**, **compare**, and **instantly generate** SwiftUI code for iOS system fonts. I built this app **entirely on my own**—from conception and project management, to UI/UX design, coding, testing, App Store submission, and even marketing. I genuinely **enjoy** every step of the process, treating it as both my profession and my hobby.

In FontMate, you can:

- Quickly **browse** through all native iOS system fonts
- **Customize** size, weight, color, and sample text in real-time
- **Copy** SwiftUI code snippets with **one tap**—no manual coding necessary
- Save frequently used fonts to **Favorites** for easy retrieval and comparison

By handling **all aspects** of development and design myself, I’ve sharpened my **coding abilities**, **product sense**, and **creative flair**, ensuring this app serves as an efficient, streamlined tool for developers and designers alike.

<br>

## Download

<div class="row my-3">
  <div class="col-sm-12 text-center">
    <div class="row">
      <div class="col-sm">
        <a href="https://apps.apple.com/us/app/fontmate/id6743818835"
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
      Get <strong>FontMate</strong> for iOS.
    </div>
  </div>
</div>

<br>

## User Stories & Real-world Scenarios

### Story 1: The Designer’s Dilemma

> _“I spend too much time switching between design software to see how each iOS system font looks. I need a quick, direct preview tool!”_

With FontMate’s **live preview** interface, designers can see how each system font displays at various sizes, weights, and colors, all in **one** place. No guesswork needed—it’s a visual solution that saves time and preserves creative flow.

### Story 2: The Developer’s Shortcut

> _“Typing out SwiftUI font code manually, especially with custom weights and colors, slows me down.”_

FontMate **automatically** generates SwiftUI code snippets—simply select your font, size, weight, and color, then tap **Copy** to paste it straight into your Xcode project. It’s an immediate productivity boost for any iOS developer.

<br>

## Core Features & Highlights

### 1. Comprehensive iOS Font Library

- **Full Coverage**  
  Includes all native iOS system fonts, neatly organized by font family, so you never have to dig around for the right typeface.
- **Detailed Family Descriptions**  
  Each font family comes with short, localized descriptions for quick referencing.

### 2. Live Preview & Customization

- **Real-time Sliders & Pickers**  
  Adjust size, weight, and color instantly. The text preview updates as you tweak parameters, giving you an immediate sense of how your UI may look.
- **Unified Settings Panel**  
  All adjustments—text, font size, weight, color—take place in one simple view. No more complicated menus or tab switching.

### 3. One-Tap Code Generation

- **SwiftUI Code Snippets**  
  FontMate automatically creates `.font(.custom("...", size: ...))` plus weight and color. Copying it is as simple as tapping **one** button.
- **Favored by SwiftUI Devs**  
  Speeds up iteration cycles, eliminates typos, and ensures code accuracy.

### 4. Favorites & Organization

- **Saving to Favorites**  
  Star any font that you frequently use. The Favorites tab groups them by family to compare side by side or quickly recall them later.
- **Instant Preview**  
  Even in the Favorites tab, you can continue customizing the preview with size, weight, and color pickers.

### 5. Intuitive Navigation

- **Family Detail Pages**  
  Tapping a font family reveals all of its variants, letting you test each style’s differences in a consistent layout.
- **Minimalist UI**  
  Reduced friction: discover, test, and code in the same streamlined environment—ideal for both design-minded folks and code-centric devs.

<br>

## Technical Breakdown

I wrote **every line** of FontMate’s code in **Swift** and **SwiftUI**, adopting a **clean**, **scalable** architecture. The code samples below demonstrate how I:

- **Manage Data** (like storing favorites in `UserDefaults` via JSON encoding/decoding)
- **Implement Previews** (fully dynamic SwiftUI views for on-screen rendering)
- **Generate SwiftUI Code Snippets** with user-specified parameters
- **Maintain a Crisp UI** that gracefully supports dark mode

<details>
<summary><strong>Sample: FavoriteListView</strong></summary>

```swift
import SwiftUI

struct FavoriteListView: View {
    @AppStorage("favoriteFonts") private var favoriteFontsData: Data = Data()
    @AppStorage("fontSize") private var fontSize: Double = 20
    @AppStorage("selectedWeightIndex") private var selectedWeightIndex: Int = 3
    @AppStorage("customSampleText") private var customSampleText: String = "ABCabc 123 Hello, 你好!"
    @AppStorage("fontColorHex") private var fontColorHex: String = "#000000"

    private var favoriteFonts: [String] {
        get { (try? JSONDecoder().decode([String].self, from: favoriteFontsData)) ?? [] }
        nonmutating set {
            favoriteFontsData = (try? JSONEncoder().encode(newValue)) ?? Data()
        }
    }
    ...
    // Additional logic for grouping fonts by family,
    // copy-to-clipboard code generation, and UI gestures
}
```

**Key Points**:

- Persists favorites in a JSON-encoded array for easy **local** retrieval.
- Taps into SwiftUI’s **@AppStorage** for automatic user-default synchronization.
- Groups fonts by family and displays them in a tidy list.

</details>

<br>

<details>
<summary><strong>Sample: Code-Snippet Generation</strong></summary>

```swift
func copyCodeSnippet(fontName: String) {
    let weightStr = weightToString(selectedWeight)
    let code = """
    Text("\(customSampleText)")
        .font(.custom("\(fontName)", size: \(Int(fontSize))))
        .fontWeight(.\(weightStr))
        .foregroundColor(Color(hex: "\(fontColorHex)"))
    """
    UIPasteboard.general.string = code
    // Show a toast, handle user feedback, etc.
}
```

**Highlights**:

- Dynamically builds SwiftUI instructions (`.custom()`, `.fontWeight()`, `.foregroundColor()`) based on current user settings.
- Immediately copies to the system pasteboard so developers can switch to Xcode and paste away.

</details>

<br>

## Architecture & Coding Practices

1. **SwiftUI First**  
   I embraced SwiftUI’s declarative design from Day 1, structuring each screen with clear data bindings and well-contained `View` components.

2. **AppStorage & JSON Encoding**  
   For local data (favorites, user preferences), I used Swift’s `Codable` with `@AppStorage`. This approach is lightweight but robust, keeping user changes in sync.

3. **Gesture & UI Polishing**  
   SwiftUI’s built-in gestures and UI frameworks power the “one-tap copy” buttons, real-time sliders, and color pickers. Custom haptic feedback ensures a satisfying, interactive feel.

4. **Dark Mode & Localization**  
   All color usage leverages dynamic color sets. Even user-defined colors are re-encoded in hex strings to ensure accurate restoration. Strings can localize seamlessly in English or Simplified Chinese.

5. **Single-developer Efficiency**  
   Being a one-person team, I meticulously track my tasks, code reviews, and test results. This approach fosters a deep understanding of each layer, from UI flows to data handling.

<br>

## My Personal Growth

- **Full-cycle Ownership**  
  I refined my ability to **plan**, **design**, **implement**, **test**, and **release** an app solely by myself. This end-to-end responsibility made me extremely self-sufficient and detail-oriented.
- **Advanced SwiftUI Techniques**  
  By implementing custom color serialization, dynamic previews, and bridging Swift/SwiftUI code with `UserDefaults`, I honed **advanced SwiftUI** development skills, especially around data management and platform nuances.

- **Passion & Consistency**  
  While others might relax in their free time, I genuinely **love** building apps like FontMate. My self-driven enthusiasm not only yields tangible products but also showcases my commitment to continuous improvement.

<br>

## Conclusion

**FontMate** stands as a testament to my **robust** iOS development capability and my drive to craft **practical**, **efficient**, and **beautiful** tools. From the fundamental code architecture to the final icon on the App Store, I’ve done it all:

- **Innovative Idea** → **Wireframes** → **Code Implementation**
- **UI/UX & Testing** → **App Store Submission** → **Marketing & Updates**

The result is a polished, high-performance tool that solves real pain points for both designers and developers.

<br>

### Get in Touch

I’m always eager to apply my expertise in **Swift**, **SwiftUI**, and **product design** to new projects or roles. If you need a **driven**, **passionate** app developer with **full-stack iOS** experience—**let’s connect**!
