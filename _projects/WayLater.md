---
layout: page
title: WayLater App
description: A Time-Capsule App for Writing Letters to Your Future Self
img: assets/img/WayLater.jpeg
importance: 2
category: individual
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/WayLater.jpeg"
       title="WayLater App"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

**WayLater** is an iOS application that lets users write “time-capsule” letters to their future selves. Each letter is sealed until the chosen **receive date**, after which it becomes “unlocked.” Only then can you relive your own words from days, months, or years ago. By merging a **two-tab** interface with **SwiftUI** and local data storage, I built a unique journaling experience—where **past meets future**.

I developed every aspect of **WayLater** from scratch:

- **Architecture & Code**  
  Swift + SwiftUI structure, local JSON-based persistence, date-based “unlocking,” robust **undo/redo** logic in letter composition, and a built-in comments system.
- **UI/UX & Feature Design**  
  A minimal two-tab layout:
  1. **Mailbox** – The main “home” tab showing unopened letters, today’s written letters, and a random previously unlocked letter.
  2. **Records** – Lists all sent and received letters in a flexible timeline or grid.  
     Each letter can include a photo, text content, and even user comments.
- **Project Management & Distribution**  
  Single-handedly handled the entire product lifecycle: from concept, design prototypes, coding, QA testing, to final (and future) App Store distribution.

Despite typically having free time, I love building my own apps – this is my **fun**. Whether it’s coding, designing UIs, or doing routine tasks like updating icons and writing docs, I pour all my enthusiasm into it.

<br>

## Downloads

<div class="row my-3">
  <div class="col-sm-12 text-center">
    <div class="row">
      <div class="col-sm">
        <a href="https://apps.apple.com/us/app/waylater/id6743181268" 
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
      Get <strong>WayLater</strong> for iOS.
    </div>
  </div>
</div>

## User Stories & Demo

### Story 1: The Reflective Dreamer

> _“I want a safe space to write letters for future me—so I can see how far I’ve grown or if I’ve stayed true to my dreams.”_

WayLater saves each letter, ensuring it can’t be opened until the intended day arrives. Opening that letter later creates a powerfully **reflective moment**: a snapshot of your past hopes, fears, or daily musings.

### Story 2: The Creative Time-Traveler

> _“I love the idea of time capsules. I want a quick, app-based method to record messages for birthdays or achievements—then open them months or years later.”_

In WayLater, you pick the **future date** for each letter. The app locks it. On arrival day, you unlock the letter and read your own words. You can also attach **photos** and add comments for your future self to reread.

### Watch WayLater in Action

<div style="display: flex; justify-content: center; align-items: center; flex-direction: row;">
  <video controls="" style="max-width: 250px;"> 
      <source src="/assets/video/waylater.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

<br>

## Project Highlights

### 1. Locked Until the Future

- **Receive Date Mechanic**  
  Each letter is date-bound. Letters remain “locked” (unopened) until the current date >= the chosen receive date.
- **Visual Cues**  
  An easy lock icon on letter items clarifies whether the letter is still sealed or unlocked.

### 2. Two-Tab Navigation

- **Home (Mailbox) Tab**
  - **Unopened Letters**: those that have passed the receive date but haven’t been read yet.
  - **Letters Written Today**: quickly recall what you just wrote.
  - **Random Unsealed Letter**: get a surprise from your older, unlocked letters.
- **Records Tab**
  - **Sent but Not Received**: letters still waiting for their future date.
  - **Received**: all unlocked letters, grouped by year and month, newest to oldest.

### 3. Letter Composition & Undo/Redo

- **Write New Letter** (Sheet)
  - Title, content, optional photo, plus a date picker for the future day.
  - Simplistic **undo/redo** concept tracks changes so you can revert if you accidentally wipe out your text.
- **Photo Attachments**
  - Users can optionally attach an image (like a photo-of-the-day or a memory visual) with each letter.

### 4. Comments & Reflection

- **In-Letter Comments**  
  Even after a letter is unlocked, you can **add comments** at any time. These are separate lines of text that appear beneath the letter content—like a personal forum between your past and present self.
- **Context Menus**  
  You can press-and-hold on a comment to delete it. Confirm with a second prompt to avoid accidental removals.

### 5. Rich Writing Prompts

- **Prompt Suggestions**  
  A panel with random prompts (like “What’s a personal milestone you’re proud of?”), encouraging fresh topics for each letter.
- **Refresh**  
  Tap a button for new sets of prompts if you want more inspiration.

<br>

## Technical Breakdown

**Core Language**: Swift + SwiftUI

### Data Modeling & Persistence

- **`Letter` Model**
  - `receiveDate` for future unlocking
  - `isOpened` bool for “locked/unlocked” state
  - Optional `imageData` for photo attachments
  - `comments` array, each with content + date
- **Local JSON Storage**
  - Save letters in `WayLaterLetters.json` using a custom `@Published` and file I/O approach.
  - Uses `Codable` with date encoding in `.iso8601`.

### App Architecture

- **`LetterViewModel`**
  - Stores `[Letter]` in a single stateful object.
  - Computed properties:
    - `unopenedLetters`, `sentButNotReceived`, `receivedLetters`, etc.
  - Functions to `addLetter`, `openLetter`, `addComment`, handle `undo/redo` states, etc.
- **Tabs & Navigation**
  - **HomeView**: sees “Mailbox” structure (unopened, random unlocked, written today).
  - **RecordsView**: organizes letters into “unreceived” and “received” by year/month grouping.

### UI/UX & Gestures

- **Scrolling Grids**  
  SwiftUI `LazyVGrid` for letter items, enabling a neat 3-column layout.
- **Drag & Context Menus**
  - Letters remain unresponsive if locked. If unlocked, a tap triggers the detail sheet.
  - Comments handle long-press context menus for deletion.
- **Sheet Navigation**
  - **WriteLetterView** for new letters.
  - **LetterDetailView** with a bottom `CommentInputBar`.

### Undo/Redo in Write Screen

- **Capturing Edits**  
  Each text or date change triggers a `pushUndoState()`, storing title/content/date in memory.
- **Simplified Redo**  
  If the user changes again, we nuke the redo stack—a typical text editor approach.
- **Revert**  
  Potential usage of “pop” from undo stack to revert. The code structure is already there for expansions.

<br>

## Project Outcomes

1. **Deep Emotional Engagement**

   - Time-capsule letters evoke nostalgia and reflection, providing a unique journaling experience.
   - Photos + delayed open date fosters a sense of curiosity and longing.

2. **Minimized Overwhelm**

   - Minimal tabs, straightforward design, and per-letter comments keep everything uncluttered.
   - The user experience is calm and intimate—like a personal mailbox for your future self.

3. **Scalable for More Features**
   - Architecture easily supports expansions, e.g., push notifications on the letter’s arrival date, iCloud sync, or advanced search (by date or tag).

<br>

## Personal Growth & Reflection

**Self-Driven**

- While others might watch Netflix or browse social media, I gain **joy** from building real apps. This project reaffirms my unstoppable enthusiasm for coding and product creation.

**Technical & UI Mastery**

- **SwiftUI** gestures, local data management, JSON-based archiving, photography attachments, plus a user-friendly approach to “unlocking” data. Each step refined my knowledge of iOS best practices.

**One-Person Army**

- Designing the UI, coding the logic, testing the date-bound system, creating marketing assets, and writing help docs—**all** done by me. This all-around approach taught me to be more resourceful, efficient, and creative.

<br>

## Final Thoughts

**WayLater** stands out as a modern, personal time-capsule app, bridging your **present** and **future** in a single interface. By focusing on minimal friction—just write, pick a date, and let WayLater handle the rest—I created a tool that gently reminds us how precious our thoughts can be over time.

As a **solo developer**, I single-handedly delivered the code, UI design, feature scope, testing, and release. This demonstrates my **multi-faceted** skill set: from advanced SwiftUI techniques to thoughtful user journeys, I’m ready to join teams seeking a **passionate** iOS developer who can turn big ideas into elegant, **fulfilling** solutions.
