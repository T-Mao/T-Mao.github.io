---
layout: page
title: SupTech Apps
description: My role as an App Developer
img: assets/img/SupTech.jpeg
importance: 2
category: work
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/SupTech.jpeg"
       title="SupTech"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

During my time at **SupTech**, I took on the challenge of building two large-scale mobile applications in **Flutter**—the **SupTech Consumer App** (C-end) and **SupTech Technician App** (T-end). I was not only responsible for **designing and coding** these apps but also took on roles typically divided among multiple teams in larger companies.

Throughout the process, I specialized in:

1. **Full-cycle App Development**: from **requirement gathering**, system architecture, responsive UI design, to final deployment on both iOS and Android.
2. **Cross-platform Flutter**: building robust, fluid interfaces supporting multiple languages (English, Simplified Chinese, Traditional Chinese).
3. **Backend Integration**: initially leveraging **Firebase-based serverless functions (Node.js)** for rapid prototyping, then moving to a **MySQL/Java** architecture to ensure stable data synchronization, authentication, push notifications, and real-time location tracking.
4. **Stripe Payment Integration**: implementing secure payment flows, creating and attaching payment methods, and enabling technicians to bind their bank accounts for receiving payouts.
5. **Team Coordination & Leadership**: bridging communication between stakeholders, gathering app requirements, leading daily stand-ups, and guiding new hires. I also assumed responsibilities like a Project Manager, documenting tasks, drawing mind maps, making swimlane diagrams, and clarifying business logic with the in-house or external tech teams.

Below is a more detailed breakdown of my work.

<br>

## Downloads

<div class="row">

  <!-- Left Column (Consumer App) -->
  <div class="col-sm-6 text-center"><!-- 加了 text-center -->
    <h4 class="text-center">SupTech Consumer App</h4><!-- 标题也可加 text-center -->
    
    <!-- iOS Button -->
    <div class="row">
      <div class="col-sm">
        <a href="https://apps.apple.com/us/app/suptech-consumer/id6581481234" 
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

    <!-- Android Button -->
    <div class="row mt-2">
      <div class="col-sm">
        <a href="https://play.google.com/store/apps/details?id=com.suptech.suptechconsumer"
           target="_blank"
           style="display:inline-block;"
        >
          {% include figure.liquid
             loading="eager"
             path="assets/img/androidDownload.png"
             alt="Download on Google Play"
             title="Download on Google Play"
             width="180"
             class="rounded z-depth-1"
             style="display:inline-block;"
          %}
        </a>
      </div>
    </div>

  </div> <!-- end col-sm-6 (Consumer) -->

  <!-- Right Column (Technician App) -->
  <div class="col-sm-6 text-center"><!-- 加了 text-center -->
    <h4 class="text-center">SupTech Technician App</h4>
    
    <!-- iOS Button -->
    <div class="row">
      <div class="col-sm">
        <a href="https://apps.apple.com/us/app/suptech-technician/id6581481909" 
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

    <!-- Android Button -->
    <div class="row mt-2">
      <div class="col-sm">
        <a href="https://play.google.com/store/apps/details?id=com.suptech.suptechtechnician"
           target="_blank"
           style="display:inline-block;"
        >
          {% include figure.liquid
             loading="eager"
             path="assets/img/androidDownload.png"
             alt="Download on Google Play"
             title="Download on Google Play"
             width="180"
             class="rounded z-depth-1"
             style="display:inline-block;"
          %}
        </a>
      </div>
    </div>

  </div> <!-- end col-sm-6 (Technician) -->

</div> <!-- end .row -->

<div class="caption my-3">
  Download the <strong>Consumer App</strong> (left) or <strong>Technician App</strong> (right) for iOS & Android.
</div>

<br>

## Project Highlights

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/C.jpg"
       title="SupTech Consumer App"
       class="rounded z-depth-1"
       max-width="250px"
    %}
  </div>
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="assets/img/T.jpg"
       title="SupTech Technician App"
       class="rounded z-depth-1"
       max-width="250px"
    %}
  </div>
</div>
<div class="caption">
  From left to right: (1) The Consumer App (C-end), allowing customers to create and track repair orders; (2) The Technician App (T-end), enabling technicians to pick up tasks and communicate in real time.
</div>

### 1. The SupTech Consumer App (C-end)

**Purpose:** Provide consumers with an easy way to request installation/repair services, track order statuses, chat with assigned technicians, and leverage **AI Repair** for self-diagnosis.

- **Built with Flutter**: Ensuring a consistent UI/UX across iOS and Android.
- **User-Centric Flows**:
  - Account creation & login
  - Order creation & management (brand/SKU selection, photo upload, location pin)
  - Secure online payment (integrating with **Stripe**)
  - Chat system (real-time messaging & photo exchange)
  - Rating and feedback
- **Internationalization (i18n)**: English, Simplified Chinese, Traditional Chinese.

### 2. The SupTech Technician App (T-end)

**Purpose:** Empower field technicians to view and accept nearby orders, manage scheduling, provide real-time service updates, and handle payments.

- **Location-Based Task Allocation**:
  - Built real-time location services with geofencing logic (50mi radius) for relevant orders.
- **In-app Communication**:
  - Integrated chat with consumers
  - Provided custom action buttons (e.g., “Depart Now,” “Begin Service,” “Complete Service”).
- **Stripe Connect**:
  - Technicians can link their bank account for direct payouts.
- **Work Dashboard & Performance**:
  - Real-time income stats, upcoming tasks, and completed tasks counter.

### 3. AI Repair Integration

I implemented a custom **AI chatbot** (powered by Chat GPT 4.0) within both apps—**C-end** and **T-end**—for fault diagnosis:

- **Prompt engineering**: to ensure the AI’s language is user-friendly and robust enough to guide users (even novices) through potential troubleshooting steps.
- **Conversation flow**: multiple-step guidance from hypothesizing the fault cause to deciding whether to do self-repair or request a technician’s visit.

### 4. Cross-Platform + Real-time Features

- **Hybrid Backend**:
  - Legacy Firebase-based serverless functions (Node.js)
  - New MySQL/Java-based API for production scale.
- **Real-time Bidding**: Technicians see instantly updated order info as location or status changes.
- **Push Notifications**: Firebase Cloud Messaging for timely updates (e.g., new tasks assigned, new messages).
- **Payment Workflow**:
  - Customer -> Stripe -> SupTech -> Technician
  - Delayed payout scheduling and partial refunds via custom logic.

<br>

## My Additional Responsibilities

Besides solely focusing on app coding, I played multiple roles:

- **Project Manager**:
  - Held requirement-gathering meetings, created mind maps and swimlane diagrams, documented all changes, and aligned them with the dev tasks.
  - Handled stakeholder requests, bridging business logic with technical feasibility.
- **Ad Hoc Tasks**:
  - Assisted with HR tasks: from screening candidates to orienting new hires.
  - Built the company’s basic web presence and fixed design issues on official website.
  - Occasionally performed office errands (e.g., shipping packages, setting up coworker computers, supporting system admin tasks).
  - Engaged in cross-team communication, from clarifying B-end system queries to instructing business partners on how to utilize the new AI chat modules.
- **Release & Store Management**:
  - Single-handedly managed app submissions to Apple’s App Store and Google Play.
  - Coordinated store listing, test flight/beta testing cycles, and official rollout.

<br>

## Technical Contributions

**Flutter Architecture**

- Implemented **Provider** & **Riverpod** for state management in different modules.
- Optimized performance with asynchronous data streams (StreamBuilders) + caching (SharedPreferences).

**Multi-Language & Internationalization**

- Organized translations in `.arb`/`.json` files, ensuring easy expansions to new languages.
- Dynamically switched UI texts based on system language or user preference.

**Stripe Payment & Connect**

- Built robust flow for PaymentMethod creation, ephemeral keys handling, PaymentIntents, and Connect-based payouts to technicians.
- RSA encryption for sensitive data, ephemeral token usage for web hooks.

**Location & Map Integrations**

- Deployed Google Maps SDK for in-app location display, technician route mapping, and geo-based filtering of tasks.
- Handling iOS & Android location permission differences, background location updates, and UI refresh cycles.

**AI Chat & Prompt Engineering**

- Built Chat GPT 4.0 conversation flows, ensuring clear step-by-step troubleshooting guides, brand/SKU/fault code recognition, and user-linguistic style adaptation.

<br>

## Project Outcomes

- **Faster Customer-Provider Matching**: By building a robust cross-platform solution with real-time location-based order dispatch, the company drastically reduced manual dispatch overhead.
- **Reduced Support Overhead**: The integrated chat system & AI assistance lowered the number of repeated phone calls and manual troubleshooting queries.
- **Scalable Infrastructure**: Transition from Firebase-based quick prototypes to a more scalable MySQL/Java environment. Performance under high concurrency improved significantly.
- **Business Value**: Enhanced brand image with modern, user-friendly apps. Gained potential to expand the service across wider regions and device platforms.

<br>

## Personal Growth & Reflection

**Technical Mastery**:

- Deepened my expertise in Flutter, including advanced state management, custom animations, and platform-specific integrations.
- Gained hands-on experience with Node.js serverless functions and MySQL-based microservices.

**Project Management & Communication**:

- Learned to swiftly re-assess scope when business logic changed.
- Strengthened stakeholder communication, from clarifying ambiguous requirements to training end-users.

**Adaptability & Tenacity**:

- Faced tight deadlines and frequently shifting requirements.
- Wore multiple hats—developer, coordinator, occasional HR or admin tasks—demonstrating resilience and a can-do attitude.

<br>

## Final Thoughts

My experience at SupTech was both demanding and rewarding. I took pride in **shipping two fully functional Flutter apps**—from scratch to production—and integrating them with dynamic, AI-powered features. Though the path was challenging, I honed my full-stack understanding, sharpened my project management skills, and grew more confident as an **App Developer** ready for new frontiers.

I believe these experiences and the robust code I wrote can significantly contribute to any team seeking a **passionate** developer with **multi-faceted** problem-solving skills and an eye for **quality software** that truly serves its end users.

<br>

## Office Gallery

<style>
  .office-gallery { column-gap: 0.75rem; }
  @media (max-width: 575.98px) { .office-gallery { column-count: 2; } }
  @media (min-width: 576px)      { .office-gallery { column-count: 2; } }
  @media (min-width: 768px)      { .office-gallery { column-count: 3; } }
  @media (min-width: 992px)      { .office-gallery { column-count: 4; } }

  .office-gallery .item { break-inside: avoid; margin-bottom: 0.75rem; }
  .office-gallery figure { margin: 0; } 
  .office-gallery .thumb {
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0,0,0,.08);
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .office-gallery .thumb:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0,0,0,.12);
  }
  .office-gallery img { width: 100%; height: auto; display: block; image-orientation: from-image; }
</style>

{% assign photos = site.static_files
  | where_exp: "f", "f.path contains '/assets/img/SupTechPhoto_web/'"
  | where_exp: "f", "f.extname == '.jpg' or f.extname == '.jpeg' or f.extname == '.JPG' or f.extname == '.JPEG'"
%}
{% assign photos = photos | sample: photos.size %}

<div class="office-gallery">
  {% for photo in photos %}
    {% capture img_path %}{{ photo.path | remove_first: '/' }}{% endcapture %}
    {% capture img_title %}SupTech Office Photo {{ forloop.index }}{% endcapture %}
    <div class="item">
      <div class="thumb">
        {% include figure.liquid loading="lazy" path=img_path title=img_title class="rounded z-depth-1" max-width="100%" %}
      </div>
    </div>
  {% endfor %}
</div>

## Additional Resources

- **SupTech Official Website**: [https://suptech.pro](https://suptech.pro)
- **B-end System (merchants)**: [https://admin.app.suptech.pro](https://admin.app.suptech.pro)
- **Consumer App Manual (PDF)**: [View here](https://drive.google.com/file/d/1j4Cwr_yp5ZLrX-ZkkmdUNP7Lh3v_0Qcy/view?usp=sharing)
- **Technician App Manual (PDF)**: [View here](https://drive.google.com/file/d/1EOJLPrZmqyvNHaLw-YYWX3LCRfjXeIlv/view?usp=sharing)
- **Consumer App Video Tutorial**: [Step-by-Step Guide (for orders created by businesses)](https://youtu.be/AZmgWjkivf0?si=Rapk2FASGpgNS29B)
- **Technician App Video Tutorial**: [YouTube Demo](https://youtu.be/g31Roq_gGrU)
