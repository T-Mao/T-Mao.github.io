---
layout: page
title: Spotify Browser
description: High-Performance Music Streaming Web App
img: https://static.vecteezy.com/system/resources/previews/006/057/992/non_2x/spotify-logo-on-transparent-background-free-vector.jpg
importance: 1
category: individual
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://static.vecteezy.com/system/resources/previews/006/057/992/non_2x/spotify-logo-on-transparent-background-free-vector.jpg"
       title="Spotify Browser"
       class="rounded z-depth-1"
       max-width="350px"
    %}
  </div>
</div>

## Overview

Between **October 2022** and **November 2022**, I developed a **Spotify-like** music streaming web application that aimed to be **high-performance** and **user-friendly**. The project blended a **Node.js / Express** backend with an **Angular** frontend, incorporating **OAuth** for secure authentication and leveraging **MongoDB** for multi-user capabilities. A major focus was **optimizing load times** using **lazy loading** and **caching** strategies, ensuring a smooth experience reminiscent of real Spotify use cases.

**Tech Stack**:

- **Frontend**: Angular, TypeScript, HTML/CSS
- **Backend**: Node.js, Express, OAuth integration
- **Database**: MongoDB
- **Spotify API**: OAuth flows, data retrieval for artists, albums, and tracks

<br>

## Project Highlights

1. **Spotify OAuth + Node/Express**

   - Configured OAuth for secure user authentication against Spotify servers.
   - Backend Node.js server used Express routes to handle token exchange, refresh tokens, and data retrieval from Spotify's API.
   - Implemented advanced token management to support **multi-user** logins (storing tokens in MongoDB).

2. **Angular SPA with TypeScript**

   - Built a **single-page application** featuring multiple components (e.g., `SearchComponent`, `TrackListComponent`, `CarouselCardComponent`).
   - Adhered to best practices in TypeScript, ensuring clear data models (`ArtistData`, `AlbumData`, `TrackData`) and robust type safety.
   - Leveraged Angular routing for dynamic URL segments like `/artist/:id`, `/album/:id`, `/track/:id`.

3. **Performance Optimization**

   - **Lazy Loading**: only loaded necessary modules/pages on demand, **minimizing** initial download overhead.
   - **Caching**: stored frequently accessed user or track data in browser cache, **reducing server calls** and accelerating page loads.
   - Quick UI performance was verified with minimal re-rendering in Angular’s template bindings and by limiting extraneous API calls.

4. **Multi-User Sessions**
   - Engineered multi-user session handling so that different users (with distinct Spotify accounts) could simultaneously log in, each retrieving personalized data.
   - Stored user settings and favorites in MongoDB, enabling concurrency and stable performance across sessions.

<br>

## Detailed Features & Technical Contributions

### 1. Angular + Spotify API Integration

**Purpose**: Provide a user-friendly interface for searching and browsing artists, albums, and tracks—similar to Spotify’s official web app.

- **Search Flow**:
  - Implemented a `<SearchComponent>` that calls the `spotifyService.searchFor(...)`, retrieving data from Express.
  - Dynamically renders results in either a `<CarouselComponent>` (for albums/artists) or `<TrackListComponent>` (for tracks).
- **Routing & Navigation**:
  - Angular **Router** set up with routes like `/artist/:id`, `/album/:id`, `/track/:id`.
  - Allowed deep linking so that copying/pasting a URL opened the correct Angular page with minimal overhead.

<details>
<summary><strong>SearchComponent Excerpt</strong></summary>

{% highlight ts %}
search() {
// Calls SpotifyService, which calls the Express server
this.spotifyService.searchFor(this.searchCategory, this.searchString)
.then((data) => {
this.resources = data;
});
}

{% endhighlight %}
**Highlights**:

- Binds `[(ngModel)]` to handle user input changes for search queries and categories (artist, album, track).
- On button click, fires an HTTP request to **Node.js** server, which in turn queries **Spotify’s REST endpoints**.

</details>

### 2. OAuth & Express Middleware

**Goal**: Securely handle user authentication with **Spotify’s OAuth** process and persist tokens for subsequent requests.

- **Node.js Server**:
  - Used a dedicated route `/login` to redirect the user to Spotify’s authorization portal.
  - On callback (`/callback` route), exchanged the `code` for **access** and **refresh tokens**, storing them in `tokens.json` or MongoDB for multi-user scenarios.
- **Refresh Token Logic**:
  - If the Spotify API returned a `401 Unauthorized`, triggered a refresh token flow automatically so the user wouldn’t be abruptly logged out.

<details>
<summary><strong>server/routes/index.js - Refresh Logic</strong></summary>

{% highlight js %}

function makeAPIRequest(url, res) {
const headers = { Authorization: "Bearer " + access_token };
fetch(url, { method: "GET", headers })
.then((response) => {
if (response.ok) {
return response.json();
} else if (response.status === 401) {
// handle token refresh
return refresh().then(() => fetch(url, { method: "GET", headers }));
}
})
.then((json) => {
res.json(json);
})
.catch((err) => {
console.error(err);
});
}

{% endhighlight %}
**Highlights**:

- Demonstrates robust error handling by hooking into Spotify’s standard 401 response, ensuring continuous user sessions.
- The `refresh()` function also writes the new tokens to disk or a DB for persistent state.

</details>

### 3. Modular Angular Components

**Reasoning**: Achieve a clean, maintainable architecture, with each UI piece (like track lists, carousels, artist pages) living in discrete Angular components.

- **`TrackListComponent`**:
  - Displays a table of track results.
  - Supports optional flags like `hideArtist` or `hideAlbum`, controlling columns for context-specific rendering (e.g., skip repeated info in album pages).
- **`CarouselComponent`**:
  - Displays a Bootstrap-based carousel for resources (artist/album) with a “swipe” animation.
  - Built a `<CarouselCardComponent>` subcomponent to show individual items.

<details>
<summary><strong>CarouselCardComponent Template Excerpt</strong></summary>

{% highlight html %}

<a [href]="'/' + resource.category + '/' + resource.id">
<img [src]="resource.imageURL" class="d-block w-100" alt="Resource image" />

  <div class="carousel-caption d-none d-md-block">
    <h5>{{ resource.name }}</h5>
  </div>
</a>
{% endhighlight %}

</details>

### 4. Lazy Loading + Caching

- **Lazy Loading**:
  - Separated certain modules or routes so they only load on demand—for instance, the “Track Page” or “Artist Page” could be a lazy-loaded route.
  - Minimizes the initial bundle size, speeding up first-page loads for new users.
- **Caching**:
  - Stored frequently accessed data like user preferences or recently viewed items in the browser’s local storage.
  - Also leveraged in-memory caching of certain Spotify requests to reduce round trips.

### 5. MongoDB for Multi-User Storage

- Allowed each user’s credentials and preferences to persist across sessions.
- Provided concurrency handling, ensuring multiple user tokens were safely updated or refreshed without collisions.

<br>

## Representative Code Modules

Below are code snippets and their significance, demonstrating how I **blended front-end TypeScript with a Node/Express** backend for an end-to-end solution.

1. **`spotify.service.ts`** – Central Angular service to **bridge** the front-end and Express.
2. **`search.component.ts`** – Showcases **real-time** queries for artists/tracks/albums.
3. **`track-page.component.ts`** – Example of multi-step data retrieval: track details + audio features, then UI displays progress bars with color-coded thermometers using **chroma.js**.

> **Skill**: Managing typed data models (`ResourceData`, `ArtistData`, `AlbumData`) so that the UI can stay strongly typed and well-structured.

<br>

## Project Outcomes

- **High-Performance UX**:

  - By combining lazy loading, caching, and minimized API calls, page loads and transitions felt **snappy**, even under slower network conditions.
  - The final user experience mirrored a scaled-down version of Spotify’s official interface.

- **Strong Code Quality**:

  - **Angular** + **TypeScript** synergy: enforced type safety across modules, cut down on runtime errors.
  - Divided UI features into small, testable components (`ThermometerComponent`, `CarouselCardComponent`, etc.), enabling a clean architecture.

- **Scalable Architecture**:
  - Multi-user session handling with MongoDB paves the way for expansions like user-specific playlists, favorites, or collaborative queues.
  - The Node/Express server is easily adaptable for other streaming services or endpoints.

<br>

## Personal Growth & Reflection

**Technical Mastery**

- Gained deeper mastery of **Angular’s** component-based architecture, routing, forms, and **RxJS**-based HTTP calls.
- Implemented advanced **Node.js** patterns for API bridging, OAuth flows, and refresh token logic.

**Project Management & Communication**

- Coordinated the assignment scope—**designing** data models, clarifying **API usage**, and ensuring minimal friction for user tasks.
- Demonstrated leadership by guiding code reviews, ensuring consistency across front-end modules, and helping peers integrate the OAuth flows.

**Adaptability & Creativity**

- Successfully **transformed** a simple assignment into a robust multi-user web app with a strong focus on caching and performance.
- Showcased creativity in UI design, including the color-coded “thermometer” progress bars for track audio features.

<br>

## Final Thoughts

Developing this **Spotify Browser** was a **comprehensive** full-stack undertaking. I gained valuable insight into:

1. **Angular** for building dynamic, high-performance SPAs.
2. **Express** middleware for external API access and OAuth token management.
3. **Performance techniques** (lazy loading, caching) crucial for real-world user satisfaction.

Whether building a new streaming product or any other **data-intensive** web app, these **front-end + back-end** skills and architectural patterns form a strong foundation for delivering **efficient**, scalable, and user-friendly applications.

I’m confident these **modern web dev** and **Angular** engineering experiences equip me to tackle **complex** front-end architectures, integrate robust Node.js back-ends, and ultimately create powerful, user-focused applications.
