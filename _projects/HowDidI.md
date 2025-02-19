---
layout: page
title: HowDidI App
description: Paid Résumé-Sharing Platform
img: https://i.fbcd.co/products/original/04-resume-cover-letter-page-free-resume-design-template-acc6f24923fb19e12b9a301619175f200cfdd73d19538a86453429f40ff5d7bf.jpg
importance: 2
category: group
related_publications: false
---

## Overview

From **June 2024** to **October 2024**, I served as both **Project Manager** and **Technical Lead** for the **HowDidI App**, an iOS application that enables professionals to upload their résumés, earn income from viewership, and offers readers first-hand application materials for purchase. We built this platform with **Swift** (front-end) and **Firebase** (back-end) to provide real-time content synchronization and user interactions.

The platform’s core concept:

- **Uploaders** share their CVs, personal statements, or interview experiences.
- **Buyers** purchase “passes” to access specialized or niche résumés for educational and career-boosting insights.

<br>

## Key Highlights

1. **Project & Team Management**

   - Led a 3-person university team using Agile sprints, continuous requirement refinement, weekly progress demos, and stakeholder feedback loops.
   - Acted as the primary liaison with business stakeholders—translating business ideas into actionable user stories and sprint tasks.

2. **Swift + Firebase Integration**

   - Built the app’s entire flow in **Swift**: navigation (SwiftUI/NavigationView), user sessions, in-app media (PDFKit, AVKit).
   - Leveraged **Firebase** for real-time updates and data sync (e.g., storing PDF résumés, user metadata, and purchase records).

3. **Mentorship & Knowledge Transfer**
   - Provided comprehensive guidance to junior developers on front-end design patterns (MVVM with SwiftUI), real-time data sync, user testing, and release management.
   - Organized daily stand-ups, refined backlogs, and used tools like GitHub Projects to ensure a smooth development lifecycle.

<br>

## Code & Technical Achievements

To illustrate my deep involvement in code design, here’s an overview of **selected SwiftUI components** (see below) along with advanced techniques I introduced:

### 1. Multi-Screen Navigation with SwiftUI

```swift
struct ContentView: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem { Image(systemName: "house.fill") }
            LibraryView()
                .tabItem { Image(systemName: "book.fill") }
            PostView()
                .tabItem { Image(systemName: "plus.circle.fill") }
            ChatView()
                .tabItem { Image(systemName: "bubble.left.and.bubble.right.fill") }
            ProfileView()
                .tabItem { Image(systemName: "person.crop.circle.fill") }
        }
    }
}
```

- **Tabbed Navigation**: Demonstrated clear user flows—Home, Library, Post, Chat, Profile—using SwiftUI’s `TabView`.
- **Custom Tab Bar**: Overrode `UITabBarAppearance` for consistent brand styling and theming.

### 2. PDFKit & AVKit for Rich Media

```swift
struct ResumeView: View {
    @State private var selectedPDF: String = ""
    @State private var isImageFullScreen = false
    ...
    var body: some View {
        ZStack {
            // PDF Thumbnails, comment sections, pinch-to-zoom in full-screen
            // ...
        }
    }
}
```

- **Dynamic PDF Viewing**: Employed `PDFView` to let users read or zoom in on uploaded documents.
- **Fullscreen & Pinch-to-Zoom**: Tapped gesture to go fullscreen, combined `MagnificationGesture` and `DragGesture` to handle offset + scale transformations.
- **Video Playback**: Integrated `AVKit` for in-app demonstration videos; auto-scaling to device screen, gesture-based exit from fullscreen.

### 3. Custom Paging & Swipe Navigation

```swift
struct PagingScrollView<Content: View>: UIViewControllerRepresentable {
    // A specialized scroll that allows vertical paging across multiple screens.
    // ...
}
```

- **Vertical Paging**: A specialized `UIScrollView` bridging SwiftUI, enabling swipe between “Resume,” “Advice,” and “SoP” screens.
- **Manual Index Management**: Controlled page offsets and index indicators for a custom, smooth user experience.

### 4. Firebase Real-time Sync

- **Store & Retrieve PDFs**: Automatic sync once a user uploads a PDF or media file, ensuring instant availability to other app visitors.
- **Pass Purchase Flow**: Maintained user purchase states (did they buy a pass? expiration date, etc.) in Firebase, controlling access to locked résumé content.

### 5. Mentorship & Code Review

- **Guided Team** on Swift best practices: usage of `@State` vs. `@Binding`, custom `UIViewRepresentable` bridging frameworks like PDFKit.
- **Implemented Agile**: daily stand-ups, backlog grooming, weekly sprints with tasks assigned to each developer, thorough code reviews for quality control.

<br>

## Additional Responsibilities

- **Stakeholder Communication**  
  Set up requirement-gathering sessions with project owners, refined user stories, and validated acceptance criteria—ensuring each sprint delivered meaningful increments.
- **UI/UX Design**  
  Collaborated on wireframes, tested color palettes, and tested user flows for frictionless reading/purchase experiences.
- **Database & Security**  
  Advised team on Firebase rules for read/write privileges, preventing unauthorized access or data tampering. Proposed minimal data indexing for faster queries.

<br>

## Personal Growth & Reflection

**Technical Mastery**

- Strengthened SwiftUI architecture knowledge, bridging Apple frameworks (PDFKit, AVKit) with custom UI controllers.
- Hands-on experience with advanced gesture handling (pinch, drag) for media.

**Project Leadership**

- Juggled **PM** tasks (Agile sprints, backlog refinement) with **tech lead** duties (code structure decisions, mentorship).
- Ensured code quality via peer reviews and continuous integration setups.

**Communication & Adaptability**

- Balanced stakeholder requests with pragmatic dev timelines, re-prioritizing features and scope as needed.

<br>

## Final Thoughts

Building **HowDidI App** reinforced my ability to blend **technical expertise** in iOS (SwiftUI + Firebase) with **project management** responsibilities. Handling advanced media viewing, real-time sync, and a monetization model demanded meticulous planning and robust coding. The experience sharpened my cross-functional leadership and cemented my passion for delivering polished, user-centered mobile apps.

I’m confident this project demonstrates my **Swift** knowledge, **Firebase** integration, and **team leadership**—all invaluable assets for any role seeking a proactive, full-stack-minded iOS developer.
