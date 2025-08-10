---
layout: page
title: Web Crawler (Python)
description: Implements a polite, trap-aware crawler over the UCI ICS static corpus with absolute-URL extraction, heuristics for trap avoidance, and comprehensive crawl analytics.
img: https://images.unsplash.com/photo-1750969185331-e03829f72c7d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
importance: 98
category: group
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://images.unsplash.com/photo-1750969185331-e03829f72c7d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       title="Web Crawler"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

This was a group assignment to build a focused web crawler that operates against the UCI ICS static corpus. The crawler manages a persistent frontier, fetches pages from the local corpus, extracts absolute links, validates and filters potential traps, and records crawl analytics including subdomain coverage, outlink maxima, the longest page by word count, and the top frequent words. The system is organized around four modules: `frontier.py`, `corpus.py`, `crawler.py`, and `main.py`.

<br>

## Key Features

- **Persistent frontier with deduplication**
  Queue, set, and a fetched counter are checkpointed to disk so runs can be paused and resumed. If no state exists, the crawler seeds from `http://www.ics.uci.edu/`.

- **Static corpus access**
  URLs are mapped to hashed filenames, then parsed from CBOR to recover body, headers, status, and size. This enables repeatable experiments off-network.

- **Absolute link extraction**
  Links are parsed from HTML and normalized to absolute form using `lxml.html`’s `make_links_absolute` and `iterlinks`, which avoids brittle string concatenation.

- **Trap-aware URL validation**
  Heuristics reject already processed URLs, missing hosts, excessive length, deep paths, repetitive segments, parameter explosions, session IDs, and non-HTML assets. The validator also screens known dynamic patterns such as `wp-json` and reply-thread parameters.

- **Crawl analytics**
  While crawling, the system tracks per-subdomain URL counts, the page with the most links, the longest page by words, frequently used terms (stop-words removed), downloaded URLs, and identified traps, then writes a human-readable `analytics.txt`.

<br>

## Architecture

- **Frontier**: double-ended queue plus membership set, with `save_frontier` and `load_frontier` for crash-safe progress.
- **Corpus**: hashed URL mapping (`sha224`) and CBOR decoding to return a uniform response dictionary of `content`, `content_type`, `http_code`, and redirection fields.
- **Crawler**: main loop fetches a URL, extracts links, validates candidates, adds valid ones back to the frontier, and updates analytics; stop-words come from NLTK and HTML text is extracted with BeautifulSoup.
- **Entry point**: `main.py` wires modules together and registers a shutdown hook to persist state.

<br>

## Trap Avoidance Heuristics

The validator applies layered checks to reduce duplicates and crawler traps:

- protocol check for `http` and `https`, hostname required, fragment removal and URL normalization
- hard caps on URL length and query parameter count; long query strings are rejected
- repetitive directory patterns and excessive depth detection
- session-ID filters, reply-to comment parameters, and JSON API endpoints for CMS platforms
- a broad extension blacklist for non-HTML assets and archives

All logic is in `crawler.py:is_valid` together with helpers for normalization and repetition checks.

<br>

## Analytics Collected

- **Per-subdomain URL counts** and the **page with the most links**
- **Longest page by word count** (HTML markup excluded)
- **Top 50 words** across the corpus, excluding English stop-words
- **Downloaded URLs** and a list of **identified traps**
  Results are written to `analytics.txt` at the end of a crawl.

<br>

## How to Run

Follow the course brief: install Python 3 and required libraries, download the ICS static corpus, then run the crawler with the corpus directory path. For example:

```bash
python3 main.py /path/to/spacetime_crawler_data
```

The frontier will autosave on shutdown. Delete the `frontier_state` directory to reset progress.

<br>

## My Role

I collaborated with my teammate on the crawler loop, absolute-URL extraction using `lxml`, and the trap-aware validator. I also contributed to the analytics subsystem: subdomain aggregation, longest-page detection, and frequency analysis with a custom tokenizer and NLTK stop-words.
