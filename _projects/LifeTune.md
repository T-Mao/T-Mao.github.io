---
layout: page
title: LifeTune App
description: Streamlined Health Monitoring with a User-Centric, Tech-Driven Approach
img:
importance: 3
category: group
related_publications: false
---

## Overview

From **January 2024** to **March 2024**, I built **LifeTune**, a health-tracking application designed to reduce data overwhelm through **simple visuals**, **motivational nudges**, and **personalized recommendations**. I played multiple roles—**developer**, **designer**, and **researcher**—crafting a robust, **Flutter-based** mobile app that integrates with **Apple HealthKit / Google Fit**, transforming raw health data into actionable insights for users.

<br>

## Problem Statement

> “How might we develop a solution that **minimizes data overload** for health-conscious users, providing **motivational insights** and **personalized recommendations**—such as showing a current health score, offering small actionable steps, and giving users **real-time, user-friendly** health status updates?”

This question guided the entire design and development process, ensuring LifeTune addressed core user pain points right from ideation to deployment.

<br>

## User Research & Key Insights

### Research Participants

1. **Health Enthusiasts**  
   \- Individuals actively tracking exercise, diet, and sleep who needed a more **user-friendly** dashboard.
2. **Existing App Users**  
   \- People who have tried other health apps and found them either too complicated or lacking key features.
3. **Technology Developers**  
   \- Professionals familiar with building health apps, offering feedback on feasibility and best practices.
4. **Reluctant Tech Users**  
   \- Skeptics who fear complexity or privacy issues, ensuring our design accommodates non-tech-savvy audiences.

### Focus & Findings

- **Awareness & Usage**: Users want a concise, holistic view of health metrics in one place.
- **Overwhelm & Complexity**: Many existing apps bombard users with unprioritized data, leading to confusion and eventual dropout.
- **Integration & Simplicity**: Hands-off data capture (e.g., Apple HealthKit / Google Fit sync) is critical for sustained engagement.
- **Motivation & Feedback**: Gamified features (e.g., progress trackers, health scores) can encourage users to stay consistent.
- **Privacy & Control**: Transparent data policies and user consent features are non-negotiable for trust.

### Design Insights

1. **Simplification**: Consolidate multiple data points (diet, fitness, sleep) into a single “at-a-glance” dashboard.
2. **Seamless Integration**: Automate data collection and reduce manual input, lowering the barrier to entry.
3. **Progress & Achievement**: Use dynamic prompts and visual cues to celebrate small wins and motivate continuous improvement.
4. **Emotional Well-Being**: Offer subtle mental health nudges, highlighting healthy habits beyond just numbers.

<br>

## Storyboards & Design Evolution

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/mid_fidelity_prototypes.png"
       title="LifeTune Mid-Fidelity Prototypes"
       class="rounded z-depth-1"
       style="height: 350px; width: auto;"
    %}
  </div>
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/high_fidelity_prototypes.png"
       title="LifeTune High-Fidelity Prototypes"
       class="rounded z-depth-1"
       style="height: 350px; width: auto;"
    %}
  </div>
</div>

<div class="caption">
  Storyboards and prototypes guided iterative improvements, ensuring user needs always shaped the UI and feature set.
</div>

- **Initial Sketches & Storyboards**
  - Mapped out user journeys for tasks like “log a meal” or “view today’s health score,” confirming the need to keep screens minimal and intuitive.
- **Mid-Fidelity Prototypes**
  - Validated navigation flows with real users, refining the **daily check-in** and **progress tracking** modules.
- **High-Fidelity Designs**
  - Finalized visual elements for iOS/Android, with an emphasis on clean layouts and consistent color schemes that reinforce user motivation.

<br>

## Development Approach

### 1. Tech Stack & Architecture

- **Flutter & Dart**  
  \- Delivered cross-platform performance while maintaining native look-and-feel.
- **Firebase**  
  \- Used for real-time database, secure user authentication, and offline caching.
- **Apple HealthKit / Google Fit Integration**  
  \- Automated data sync for workout sessions, dietary logs, and sleep analysis.

### 2. Core Responsibilities

1. **Full-Stack Implementation**
   - Set up **Firebase** environment with secure role-based read/write permissions.
   - Built out client-side logic in **Flutter** using **Provider** for state management and **StreamBuilders** for real-time updates.
2. **Iterative Testing & Feedback Loops**
   - Conducted **usability tests** weekly, adjusting the UI/UX to remove friction points.
   - Leveraged **user analytics** to track feature engagement, pivoting as needed in agile sprints.
3. **Agile Project Management**
   - Created and refined **user stories**, scoping MVP features in **Jira**.
   - Led **daily stand-ups** and milestone demos, ensuring timely progress under tight deadlines.
4. **Performance Optimization**
   - Streamlined data fetches using asynchronous calls and caching strategies.
   - Ensured minimal UI lag by splitting large updates into smaller, continuous streams.
5. **Security & Compliance**
   - Enforced **OAuth 2.0**–based user authorization, data encryption, and transparent consent flows.

<br>

## Demo

<div style="text-align: center;">
  <video controls="" width="100%" style="max-height: 600px;"> 
    <source src="https://cdn.jsdelivr.net/gh/ZL-Asica/web-cdn@master/video/lifetune-demo.mp4" type="video/mp4">
  </video>
</div>

Experience **LifeTune** in action! The demo reveals our consolidated dashboard, motivational nudges, and user-friendly flows, showing how even novice users can track their well-being effectively.

<br>

## Outcomes & Reflections

- **Minimized Data Overwhelm**
  - Testers reported feeling more **in control** of their wellness, citing the app’s “at-a-glance” design.
- **Higher Engagement Rates**
  - Gamification features, like daily health scores and progress badges, boosted user retention across the 3-month beta.
- **Robust, Maintainable Codebase**
  - Flutter’s modular architecture and well-structured provider patterns ensure easy feature expansions (e.g., additional health metrics).
- **Personal & Team Growth**
  - Balanced stakeholder expectations, user needs, and technical constraints under strict deadlines, refining both my **leadership** and **development** skillset.
- **Future Roadmap**
  - Plans to integrate **stress-level monitoring**, additional wearable device support, and AI-driven personalized tips.

<br>

## Final Thoughts

**LifeTune** highlights my ability to unify **technical engineering** with **design thinking** and **user research**—ultimately delivering a cross-platform app that helps people grasp and improve their health data. By focusing on simplifying complex metrics, motivating users to take small steps, and ensuring a rock-solid code foundation, I believe **LifeTune** stands as a prime example of my passion for building impactful, user-centered mobile solutions.
