---
layout: page
title: Flipperly App
description: My Role as a Solo iOS App Developer
img: assets/img/Flipperly.jpeg
importance: 88
category: individual
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/Flipperly.jpeg"
       title="Flipperly App"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

**Flipperly** is my passion project—an iOS **flashcard-based memory revision app** built entirely by myself in **Swift** and **SwiftUI**. While many people spend their spare time on unrelated hobbies, I dedicate mine to **designing, coding, testing, and publishing** my own iOS apps. This all-encompassing experience has sharpened both my **technical prowess** and **project ownership** capabilities.

In larger teams, responsibilities like **UI/UX design**, **feature development**, **quality assurance**, and **App Store submissions** are split across multiple roles. For Flipperly, I filled **all** those roles—single-handedly delivering a **production-ready** app that reflects my dedication, **innovative coding techniques**, and deep understanding of iOS best practices.

<br>

## Download

<div class="row my-3">
  <div class="col-sm-12 text-center">
    <div class="row">
      <div class="col-sm">
        <a href="https://apps.apple.com/us/app/flipperly/id6743181103" 
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
      Get <strong>Flipperly</strong> for iOS.
    </div>
  </div>
</div>

<br>

## User Stories & Demo

### Story 1: The Language Learner

> _“As a language learner, I want to see all my vocabulary flashcards due today on one screen, so I can systematically review them without missing anything.”_

Flipperly tackles this by automatically surfacing **due flashcards** each day. A quick tap flips the card to reveal the answer, and each _remember_ or _forgot_ action adjusts the future review schedule. This ensures learners stay consistent without manual tracking.

### Story 2: The Busy Professional

> _“As a busy professional, I need an efficient way to track new concepts or reminders. I only have a few minutes to swipe through flashcards, so every interaction must be fast and intuitive.”_

Flipperly’s gesture-based controls let users swipe left or right to mark results. Cards animate away in a single movement, and the app handles scheduling behind the scenes. Because everything is stored locally, it launches quickly and works offline—ideal for short, on-the-go study sessions.

<br>

### Watch Flipperly in Action

<div style="display: flex; justify-content: center; align-items: center; flex-direction: row;">
  <video controls="" style="max-width: 250px;"> 
      <source src="/assets/video/flip.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

## Project Highlights

### 1. Core Purpose & Functionality

- **Flashcards with Spaced Repetition**  
  Each card has a front (_question_) and back (_answer_). The next review date is automatically scheduled based on user input:
  - _Forget:_ Resets to the very next day.
  - _Remember:_ Follows incremental intervals (`2 → 4 → 7 → 15 → random(20–50)` days).
- **Two Main Views**
  - **Home (Review) Tab**: Displays current due flashcards in a large, card-flipping interface.
  - **Decks Tab**: Organizes flashcards into collapsible decks, each with add/edit/delete functions and a grid preview.
- **Rich Editing & History**  
  Easily create or modify flashcards, and view the review log (dates and success/failure) to track progress.

### 2. My Role (A One-Person Army)

I took on every aspect of the product:

- **Design & UI/UX**  
  Developed a visual style in **SwiftUI** using custom animations, sleek transitions, and user-friendly layouts.
- **Architecture & Code Quality**
  - Structured the data with custom models (`Flashcard`, `FlashcardDeck`), employing local JSON storage.
  - Implemented an **undo/redo** system for review actions, ensuring users can revert accidental taps.
- **Spaced Repetition Logic**  
  Programmed the algorithm to compute review intervals—using day calculations and random long-term intervals after repeated successes.
- **App Store Delivery**  
  Single-handedly tackled provisioning profiles, TestFlight, and final publication under Apple’s review guidelines.

<br>

## Technical Breakdown

### SwiftUI Highlights

- **Custom Views & Animations**
  - `FlashcardFlipView` for 3D flipping transitions.
  - `DeckRowView` & `DeckFlashcardItemView` for deck organization and context menus.
  - **Toast Messages** for quick feedback on upcoming review dates.
- **State Management**
  - `@StateObject` centralizes data in `FlashcardViewModel`.
  - `@EnvironmentObject` and `@Binding` to keep subviews in sync without complexity.

### Persistence & Data Handling

- **Local JSON**  
  Uses `JSONEncoder`/`JSONDecoder` (with `.iso8601` date encoding) to securely store decks without external dependencies.
- **Scalable Structure**  
  The architecture can pivot to iCloud or a server-based approach if future expansions demand broader storage solutions.

### Gestures & Haptic Feedback

- **Intuitive Swiping**  
  Swipe left (forgot) or right (remembered) to mark each flashcard, with dynamic color overlays.
- **Haptic Interactions**  
  `UIImpactFeedbackGenerator` for a satisfying “click” feel on flips, taps, and tab switches.

<br>

## Project Outcomes

- **User-Friendly & Engaging**  
  A minimalist UI keeps daily reviews quick, enabling consistent study habits.
- **Comprehensive Feature Ownership**  
  Handling design, code, QA, and the App Store cycle gave me a **holistic** perspective on software development.
- **Elevated Coding Skills**  
  Gained deeper expertise in SwiftUI’s powerful animation system, local data persistence, and multi-layer state management.
- **Future-Ready**  
  The design allows for easy feature extensions, from advanced analytics to integration with external SRS (Spaced Repetition System) platforms.

<br>

## Personal Growth & Reflection

**Technical Depth**

- Created a robust app from scratch, leveraging advanced SwiftUI, concurrency, and iOS best practices for animations, gestures, and triggers.

**Relentless Work Ethic**

- I genuinely **love** to code, spending countless hours refining every interaction and ensuring it meets high-quality standards.

**Self-Driven Project Management**

- Owned the entire development timeline, from idea brainstorming to final deployment, continuously iterating based on test feedback.

**Adaptability & Resilience**

- Solved SwiftUI corner-cases, overcame daily design challenges, and balanced new feature ideas with stable release cycles—doing it all **solo**.

<br>

## Final Thoughts

**Flipperly** showcases my commitment to **clean code**, **user-focused features**, and **nimble innovation**. From design and coding to testing and promotion, I’ve proven my ability to deliver end-to-end app solutions with **speed and care**. I’m excited to bring these skills—honed in building Flipperly—to any future iOS development team or project.

<br>
