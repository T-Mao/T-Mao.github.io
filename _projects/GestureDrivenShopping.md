---
layout: page
title: Gesture-Driven Shopping App (Angular + handtrackjs)
description: Implements hand gesture control in an Angular storefront using handtrackjs, with custom gesture combos for navigation and quantity control and a clean cart flow.
img: https://tse2.mm.bing.net/th/id/OIP.I1R3MxCGXsKfyPCUKeRuyQHaD4?w=474&h=474&c=7&p=0
importance: 98
category: group
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://tse2.mm.bing.net/th/id/OIP.I1R3MxCGXsKfyPCUKeRuyQHaD4?w=474&h=474&c=7&p=0"
       title="Gesture-Driven"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

This group assignment delivers a gesture-controlled shopping experience in the browser. The app detects hands with **handtrackjs**, maps gestures to UI actions in Angular, and supports a minimal cart with visual feedback. I focused on the gesture pipeline, the event model between the detector and the UI, and the product navigation and cart interaction.

**Created features**

- Working Angular app with a product carousel, detail card, and a cart page
- Gesture control using `handtrackjs` with a stable sampling loop
- Two custom gesture combinations for quantity changes
- Clean layout and clear on-screen feedback for each action

<br>

## Tech Stack

- **Angular** components for Home, Carousel, Cart, and routing stubs
- **handtrackjs** for client-side detection
- **ngx-toastr** for lightweight notifications in the carousel
- JSON inventory for product data and a simple in-memory cart service

<br>

## Gesture Pipeline

**Component**: `HandtrackerComponent`

- Loads the model once with parameters such as `scoreThreshold` and `maxNumBoxes`.
- Starts the camera and schedules detection at a fixed **SAMPLERATE** of 500 ms.
- For each run, counts labels: `open`, `closed`, `point`, and `pinch`.
- Emits a single normalized string via `EventEmitter<PredictionEvent>`.

**Detected labels**

- One open hand, two open hands
- One closed hand, two closed hands
- One pointing hand, two pointing hands
- One pinching hand, two pinching hands
- **Custom combinations**:

  - Open Hand and Closed Hand
  - Open Hand and Hand Pointing

The component only emits when a label is present and falls back to `None` if no hands are detected.

<br>

## Interaction Model

**Component**: `HomePageComponent`
The `prediction(event)` handler receives a gesture string and maps it to UI actions.

**Navigation gestures**

- `Two Open Hands` switches to **Home**
- `Two Closed Hands` switches to **Cart**

**Home page actions**

- `Closed Hand` selects the previous item in the carousel
- `Open Hand` selects the next item
- `Hand Pointing` triggers **Add to Cart**
- `Open Hand and Closed Hand` triggers **Increase quantity**
- `Open Hand and Hand Pointing` triggers **Decrease quantity**

The component uses well-named element ids to trigger semantic buttons so the gesture layer remains decoupled from carousel internals.

<br>

## Carousel and Cart

**`CarouselComponent`**

- Maintains a local `qty` with guardrails
- Exposes `prevItem`, `nextItem`, `increaseQty`, `decreaseQty`, and `addToCart`
- Uses **Toastr** to show immediate feedback such as “Quantity increased by 1”
- Calls a `CartCalculator` service to add the current item

**`CartPageComponent`**

- Hydrates `items` from the cart service and computes totals
- Sums `price × quantity` using the static catalog in `HomePageComponent.allItems`

<br>

## Files and Responsibilities

- `handtracker.component.ts`: camera start and stop, periodic detection, gesture labeling, event emission
- `home-page.component.ts`: maps gestures to navigation and actions, loads inventory from `assets/inventory.json`
- `carousel.component.ts`: carousel movement, quantity changes, add-to-cart
- `cart-page.component.ts`: cart summary and total calculation
- `route-page.component.ts`: input-driven routing shell for current page and item
- `*.spec.ts`: Angular unit test scaffolds that validate component creation

<br>

## Design Notes

- **Clarity**: every gesture produces a corresponding on-screen change or toast so users understand system state.
- **Fallbacks**: keyboard and mouse controls remain available, which helps in demos and accessibility testing.

<br>

## How to Run

1. `npm install` to restore dependencies.
2. `ng serve` in a modern desktop browser.
3. Allow camera permission when prompted.
4. Use gestures or conventional controls to navigate and add items.
