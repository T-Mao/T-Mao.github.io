---
layout: page
title: LifeTune App
description: Streamlined Health Monitoring (Concept & Prototype)
img: assets/img/9.png
importance: 3
category: group
related_publications: false
---

## Overview

From **January 2024** to **March 2024**, I spearheaded a **concept-to-prototype** project called **LifeTune**, aimed at **simplifying personal health management**. Rather than being a fully integrated, production-level app, **LifeTune** represents a **high-fidelity iOS prototype**—complete with user-driven design insights, interactive mockups, and foundational Swift code. Our focus was to **distill complex health data** (diet, activity, sleep) into clear visuals and **motivational nudges**, reducing data overload for everyday users.

<br>

## Problem Statement

> “How might we develop a solution that **minimizes data overwhelm** for health-conscious users, providing **motivational insights** and **personalized recommendations**—for instance, showing a current health score and offering small, actionable steps to ensure real-time, user-friendly health updates?”

This guiding question shaped every phase of our design and development process, from initial **user research** to final high-fidelity mockups.

<br>

## User Research & Key Insights

### Research Participants

1. **Health Enthusiasts**
   - Already monitoring exercise and diet, but felt many apps were cluttered or inconsistent.
2. **Existing App Users**
   - Offered comparative feedback on popular health apps—highlighting the need for streamlined dashboards.
3. **Developers / Tech Professionals**
   - Provided feasibility checks and suggestions for key features in a minimal viable prototype.
4. **Tech-Wary Individuals**
   - Voiced concerns about complexity and privacy, emphasizing intuitive design and clear data use policies.

### Findings

- **Data Overwhelm**: Many users appreciated having health metrics but were turned off by cluttered interfaces or tedious manual inputs.
- **Motivation & Progress**: They favored apps that **celebrate small wins** (e.g., daily progress updates, reminders to move or hydrate).
- **Seamless Integration**: Automated data input (hypothetically via Apple HealthKit) was critical for consistency and engagement.
- **Privacy Concerns**: Even in a conceptual prototype, participants stressed wanting control over personal data.

<br>

## Design & Prototyping Process

### Storyboards & Wireframes

- Drafted **user journey storyboards** to ensure each screen had a clear purpose and minimized user friction.
- Low-fidelity **wireframes** tested initial layout ideas, focusing on clean navigation and straightforward visuals.

### Mid-Fidelity Prototype

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/mid_fidelity_prototypes.png"
       title="LifeTune Mid-Fidelity Prototype"
       class="rounded z-depth-1"
       style="max-height: 350px"
    %}
  </div>
</div>

- Added **interactive elements** for key tasks (e.g., logging meals, checking steps).
- Incorporated basic color coding and icons to differentiate various health metrics at a glance.

### High-Fidelity Prototype

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/high_fidelity_prototypes.png"
       title="LifeTune High-Fidelity Prototype"
       class="rounded z-depth-1"
       style="max-height: 350px;"
    %}
  </div>
</div>

- Refined the **visual design** with SwiftUI styling for iOS consistency.
- Introduced a **“Health Score”** feature to give users an at-a-glance overview of their overall well-being.

<br>

## Technical Implementation (iOS / SwiftUI)

1. **SwiftUI Structure**

   - Built a **basic model-view** architecture allowing swift UI updates in response to user actions.
   - Mocked health data (e.g., calorie intake, steps) to simulate real-world scenarios in user testing.

2. **Local Data Handling**

   - No full backend integration; data persisted locally or in mock JSON files.
   - Demonstrated potential for future Apple HealthKit integration if fully developed.

3. **Iterative Testing**

   - Conducted **user tests** on interactive prototypes, refining the UI for better clarity (e.g., reorganizing menu items, adjusting color schemes).
   - Focused on **key flows** like daily check-ins, meal logging, and progress viewing.

4. **Conceptual Privacy & Consent**
   - Discussed potential privacy controls (permissions dialog, data encryption) to address user concerns, though not fully implemented in code.

<br>

## Demo

<div style="text-align: center;">
  <video controls="" width="100%" style="max-height: 600px;"> 
    <source src="https://cdn.jsdelivr.net/gh/ZL-Asica/web-cdn@master/video/lifetune-demo.mp4" type="video/mp4">
  </video>
</div>

Experience **LifeTune** in action! The demo highlights our **streamlined dashboard**, **motivational prompts**, and **interactive flows**, demonstrating how we tackled data overload through clean, intuitive design.

<br>

## My Contributions

1. **SwiftUI Prototyping**

   - Set up the **core screens** and navigational flows in Swift, using mock datasets for realistic demonstrations.
   - Experimented with layout optimizations and interactive components to capture essential user tasks.

2. **User-Centric Design**

   - Conducted **user research** sessions and integrated feedback directly into iterative design.
   - Developed **wireframes** and storyboards, translating them into clickable prototypes.

3. **Project Coordination**

   - Organized sprint-based **milestones** and deliverables (mid-fi, hi-fi prototypes, user interviews).
   - Consolidated findings into clear documentation for team reference and stakeholder presentations.

4. **Competitive Analysis & Insights**
   - Examined popular health apps, highlighting best practices (simple dashboards, activity reminders) and pitfalls (cluttered data, lack of engagement).
   - Derived design goals that shaped LifeTune’s minimalistic, motivating approach.

<br>

## Outcomes & Reflections

- **Validated Concept**: User tests confirmed that **simplified UIs** and **motivational scoring** can effectively reduce data overwhelm.
- **Showcased Technical Feasibility**: Demonstrated how **SwiftUI**’s dynamic nature could support a flexible health-tracking interface, even without a full backend.
- **Enhanced Design Thinking**: Balancing user insights with prototype coding sharpened my skills in **translating needs into functional interfaces**.
- **Foundation for Future Expansion**: If developed further, LifeTune could incorporate **live HealthKit integration**, secure data storage, and personalized AI-driven recommendations.

<br>

## Final Thoughts

Though **LifeTune** remains a **conceptual prototype** rather than a production app, it stands as a testament to **user-driven design** and **solid SwiftUI practices**. By marrying **in-depth user research**, a **streamlined interface**, and **iterative testing**, we created a compelling vision of how everyday users can manage health data with minimal stress. I’m proud of this project’s potential to evolve into a full-fledged solution and grateful for the lessons learned in delivering a **clear, motivating** health-tracking experience.
