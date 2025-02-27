---
layout: post
title: Dealing with Constantly Changing Requirements in Mobile App Projects
date: 2024-10-02 08:00:00
description: Real-world lessons learned from SupTech on requirement management, version control, agile dev, and iterative releases
tags: [project-management, mobile, agile, flutter]
categories: [mobile-dev]
thumbnail: https://idealrev.co/wp-content/uploads/2025/01/3.jpeg
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://idealrev.co/wp-content/uploads/2025/01/3.jpeg"
       title="Project-Management"
       class="rounded z-depth-1"
       max-width="800px"
    %}
  </div>
</div>

Frequent requirement changes can be extremely disruptive to mobile app development, especially when teams and stakeholders aren’t aligned. In my experience building two large-scale **Flutter** apps at **SupTech** (the Consumer App and Technician App), I encountered near-constant requirement churn. Below, I’ll share specific methods I employed to handle shifting specs while still keeping development on track.

<br>

## Context: Our “Ever-Evolving” Specs at SupTech

As the only app developer for both our **Consumer (C-end)** and **Technician (T-end)** mobile clients, I essentially acted as:

- **PM** \+ **Dev** \+ **Release Manager** \+ **Business Analyst** \+ more

We were building from scratch, and our leadership’s vision changed often. While it was stressful, it forced me to get proactive about **requirement management** and **version control**—no matter how chaotic the business logic got.

**Example**: An urgent pivot to a new location-based workflow after we’d already coded a simpler version for assigning tasks. This switch didn’t just add complexities to the UI; it required rethinking how we stored order data in the backend.

---

## Strategy #1: Formalize Requirement Gathering & Freezing

### 1. Structured Requirement Logs

I made it standard to keep an active requirement log, typically in a shared doc or PM tool:

- **“Frontline doc”**: A single place for all requests, labeled with requestor name, date, priority, and category (UI change, new feature, bug fix).
- **Detailed acceptance criteria**: Even if leadership gave vague requests, I’d push for explicit acceptance details (e.g., “Push notifications must show location-based details within 50mi radius.”).

### 2. Planned “Requirement Freeze” Windows

Instead of allowing daily “drive-by” requests, I instituted **freeze windows**:

- **Short sprints (1–2 weeks)**: After scoping tasks for the next sprint, I’d freeze them. Any new requests would go into a backlog for the following sprint, unless mission-critical.
- **Stakeholder buy-in**: I’d communicate freeze schedules in group chats and daily stand-ups, so everyone knew if a request came late, it might be bumped to the next iteration.

**Outcome**: This effectively reduced mid-sprint whiplash. People quickly realized that if they wanted something urgent changed mid-sprint, we’d have to trade something out or push sprint timelines.

---

## Strategy #2: Maintain Explicit Version Control & Branching

When requirements pivoted frequently, robust version management in Git was crucial. I created branching policies:

1. **Trunk = stable release**
   - Only bug fixes or completed features get merged back once tested.
2. **Feature branches**
   - For bigger changes like new location-based flows or revised payment steps, I’d isolate them in feature branches, build, and test in parallel, then merge if accepted.
3. **Agile merges**
   - Whenever leadership changed a major spec mid-development, I would either:
     - Adjust the existing branch if feasible, or
     - Fork off a new branch if it risked interfering with ongoing tested code.

**Tech example**:

```bash
# Example Git branch for new “Geo-based dispatch” logic:
git checkout -b feature/geo-dispatch

# Implement the new logic ...
# Commit often, referencing the requirement ticket or doc:
git commit -m "Add location-based order filtering (#REQ-132)"

# Merge after QA tests confirm acceptance
git checkout dev
git merge feature/geo-dispatch
```

This approach allowed me to keep “half-baked changes” away from the main code until they were truly ready.

---

## Strategy #3: Agile Development with Frequent Builds & Stakeholder Demos

Because specs shifted so often, I embraced short cycles: **weekly or even twice-weekly builds** for rapid feedback:

1. **Interactive demos**:

   - I’d regularly provide an Android APK or iOS TestFlight build so the business side could see new features in action (like a newly introduced “Depart Now” button for technicians).
   - This avoided big “surprises” months later and let me confirm if new changes aligned with the fast-evolving vision.

2. **Close-the-loop communication**:
   - I’d meet with stakeholders daily, clarifying questions about new rules.
   - If they realized something was off, we’d talk about it early. I’d log the scope changes and estimate the dev impact.

**Result**: With frequent small releases, we never got too far down a misguided path, and stakeholders felt more in control despite the fluid environment.

---

## Strategy #4: Structured Iterative Releases & Feature Flags

To handle urgent new ideas without destabilizing the entire app, I introduced **feature flags**:

- **Flag toggles**: If leadership wanted a big new feature quickly but wasn’t sure if it’d pan out, I’d code it behind a flag. Then we could turn it on/off for internal or Beta testing.
- **Phased rollout**: For the T-end app, I’d release certain features only to a subset of pilot technicians, gather feedback, and refine before a full rollout.

**Example**: Our AI Repair bot integration. I kept it behind a config-based feature flag, so if it malfunctioned or we changed providers, I could disable it instantly without shipping a new version.

---

## Strategy #5: Document Everything (Even If It Seems Overkill)

Given constant spec changes, any undocumented detail can cause huge confusion. So I made sure to:

1. **Write short design docs** for each major feature—like **Stripe Connect** flow or **Location-based geofencing**.
   - Include bullet points, flowcharts, or simple state diagrams of how the feature works.
   - This helps stakeholders see the big picture and realize earlier if they want a different approach.
2. **Rev control docs**:
   - If a requirement changed at 2pm, I’d update the doc’s version, note the change, and share a link with the stakeholder. That way, there was always a paper trail of “who asked for what, and when.”

**Benefit**: Minimizing “he said/she said” disputes later—particularly valuable if the PM or leadership forgets having requested something.

---

## Strategy #6: Balance Tech Debt with Rapid Pivots

Chronic changes can lead to messy code and burnout if you never refactor. I scheduled **“cleanup sprints”** every so often:

- **Refactor** confusing logic from all those mid-flight changes.
- **Boost test coverage** to reduce regressions when new changes inevitably come in.

**Why**: If you don’t, the code gets so entangled that each new pivot is 10x more painful. A short cleanup sprint paid off significantly by preventing meltdown in future expansions.

---

## Real-World Example at SupTech

**Scenario**: “Originally, the system treated all technicians equally and used a default 50mi radius for nearby order matching. Suddenly, leadership decided to introduce brand-new technician categories—_Plumber_ vs. _Electrician_—each requiring a different radius. Plumbers needed a 100mi coverage zone, while Electricians stayed at 50mi.”

1. **Logged request**: Recorded a new requirement labeled **“P2”** (medium priority), but flagged as urgent because it introduced major data structure changes (technician categories).
2. **Mid-sprint freeze**: Announced that this feature would be queued for the next sprint unless business stakeholders re-prioritized something out of the current sprint.
3. **New branch**: Created `feature/technician-categories` for the new classification logic.
4. **Refined acceptance**:
   - _Plumber_ → 100mi radius
   - _Electrician_ → 50mi radius
   - Each technician’s profile must specify category, and the T-end UI needed a toggle or selection for “Plumber” or “Electrician.”
5. **Implementation**:
   - Updated backend DB schema to store “tech_category” field.
   - Adjusted geofencing logic to dynamically set coverage radius based on category.
   - Tweaked UI disclaimers and map markers to show the correct radius ring on the T-end app.
6. **Weekly build**: Demoed the updated approach. We used feature flags to keep the old single-radius logic in place as a fallback, and to isolate potential issues from the new classification system.
7. **Approved**: After internal testing, we merged the branch into dev, then production, validated on the T-end app for selected technicians.
8. **Doc update**: Documented the final coverage logic as “Version 2.3 – ‘Technician Category Coverage,’” noting that Plumbers get 100mi and Electricians get 50mi.

By systematically logging this pivot, isolating the new logic in its own branch, and gating it with feature flags, we preserved a rollback path had the 100mi coverage caused undesired side effects. This approach turned a last-minute category addition from a potential showstopper into a manageable release.

---

## Conclusion

Frequent requirement changes can’t be eliminated, but you can corral them. By:

- **Forcing structured sprints and requirement logs**
- **Using rigorous version control and feature flags**
- **Releasing iteratively with constant stakeholder demos**
- **Documenting changes** and scheduling cleanup sprints

… you significantly reduce confusion, rework, and frustration. These processes also highlight you as a developer with strong project-management sensibilities—vital in any environment where specs are a moving target.

**Key takeaway**: Don’t let changing requirements become chaos. Turn them into an agile feedback loop, staying flexible but never losing track of formal processes (sprint freeze, branch management, frequent demos). By applying discipline in version control and documentation, you’ll protect the codebase’s integrity and keep stakeholders aligned, no matter how many pivots come your way.
