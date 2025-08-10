---
layout: page
title: StockQuery TCP Client/Server (C)
description: A compact client–server system in C for querying historical stock data.
img: https://tse3.mm.bing.net/th/id/OIP.jS0f3A9bdLncOxrFKeFWoQHaD4?r=0&w=474&h=474&c=7&p=0
importance: 999
category: group
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://tse3.mm.bing.net/th/id/OIP.jS0f3A9bdLncOxrFKeFWoQHaD4?r=0&w=474&h=474&c=7&p=0"
       title="StockQuery"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

This was a group assignment to build a networked client and server in **C** that exchange custom binary-framed messages over **TCP** and serve historical prices for two equities. I implemented the socket layer, message framing, command parsing, and the analytics logic for computing optimal profit or loss over a date interval. The system loads prices from CSV, answers queries on demand, and returns results in a compact, length-prefixed format.

The project exercised low-level networking, robust string handling, defensive CSV parsing, and algorithm design under an explicit message budget of **less than 256 bytes per frame**.

<br>

## Features at a Glance

- **Binary framing** with a 1-byte length prefix and ASCII payload
- **Two commands**: `PricesOnDate <YYYY-MM-DD>` and
  `MaxPossible <profit|loss> <PFE|MRNA> <start> <end>`
- **CSV-backed dataset** for PFE and MRNA, using the **Close** column and rounding to two decimals as specified
- **Single-client server** with continuous request handling until terminated by the operator
- **Client REPL** prompt with immediate responses and graceful exit on `quit`

<br>

## Architecture

- **Protocol**: Each frame begins with a single byte `n` followed by `n` bytes of UTF-8/ASCII text. This meets the maximum message length requirement and keeps parsing trivial on both sides.
- **Server**: Preloads two price tables into memory, listens on a chosen port, and handles one connected client at a time.
- **Client**: Opens a TCP connection, frames each user command into a binary message, and prints the returned payload.

<br>

## Command Set and Data Model

**Commands**

- `PricesOnDate <YYYY-MM-DD>`
  Returns `PFE: <price> | MRNA: <price>` for the given date, or `Unknown` if the date is not found.

- `MaxPossible <profit|loss> <PFE|MRNA> <start-date> <end-date>`
  Returns a single decimal value representing the best achievable one-share profit or loss when buy and sell are ordered in time.

**Dataset**

- Source files: `PFE.csv`, `MRNA.csv`
- Date coverage: trading days between 2019-07-02 and 2021-06-30
- Field used: **Close**
- Rounding: values are rounded to two decimals

<br>

## Selected Implementation Details

### Length-Prefixed Framing

The client constructs an output buffer where byte 0 stores `strlen(payload)`, followed by the bytes of the payload. The server reads a buffer, prints the received command for observability, and replies with a similarly framed buffer. This format is compact, quick to parse, and prevents delimiter ambiguities.

### CSV Loading

On server startup, both CSV files are read once, skipping header rows and keeping an in-memory array of `{ date, close }` pairs per symbol. This avoids I/O during query handling and keeps latency consistent for multiple requests.

### Baseline Algorithms

- **`PricesOnDate`** performs a lookup by matching ISO dates.
- **`MaxPossible`** computes the optimal profit or loss with respect to temporal order.

<br>

## Refactor Highlights

After revisiting the project, I improved two areas that matter to correctness and performance in production contexts.

1. **ISO-8601 parsing without destructive tokenization**

The original date checks used `strtok` directly on input buffers, which mutates the string and makes validation order dependent. I replaced this with an ISO-aware parser that leaves buffers intact and validates component ranges precisely.

```c
/* Safe ISO-8601 date check: YYYY-MM-DD */
static int is_valid_iso_date(const char *s) {
    int y = 0, m = 0, d = 0;
    if (sscanf(s, "%4d-%2d-%2d", &y, &m, &d) != 3) return 0;
    if (y < 1900 || m < 1 || m > 12) return 0;
    static const int mdays[12] = {31,28,31,30,31,30,31,31,30,31,30,31};
    int leap = (y%4==0 && (y%100!=0 || y%400==0));
    int maxd = mdays[m-1] + (leap && m==2 ? 1 : 0);
    return d >= 1 && d <= maxd;
}
```

2. **Linear-time profit or loss**

The initial `MaxPossible` walked triple nested loops over the date range. I replaced this with O(n) scans. For profit, track the best buy so far and measure the spread to the current price. For loss, track the best sell so far when scanning from the right.

```c
/* Profit in O(n): max(pr[j] - min_so_far) with j increasing */
static double max_profit(const double *a, int n) {
    double minp = a[0], best = 0.0;
    for (int i = 1; i < n; ++i) {
        if (a[i] - minp > best) best = a[i] - minp;
        if (a[i] < minp) minp = a[i];
    }
    return best;
}

/* Loss in O(n): max(max_so_far_from_right - pr[i]) using reverse scan */
static double max_loss(const double *a, int n) {
    double maxp = a[n-1], best = 0.0;
    for (int i = n - 2; i >= 0; --i) {
        if (maxp - a[i] > best) best = maxp - a[i];
        if (a[i] > maxp) maxp = a[i];
    }
    return best;
}
```

3. **Correct rounding behavior**

The specification requires rounding to two decimals. To guarantee rounding that matches financial expectations and the assignment’s rule, the close values are normalized with `ceilf(x * 100.0f) / 100.0f` when the spec calls for rounding up, or `roundf` for standard rounding. This is applied once at load time to avoid cumulative error.

<br>

## How to Build and Run

```bash
# Compile
gcc server.c -o server
gcc client.c  -o client

# Start server (choose a port in the allowed range)
./server PFE.csv MRNA.csv 30000

# Start client and issue queries
./client localhost 30000
> PricesOnDate 2019-07-02
PFE: 187.18 | MRNA: 44.98
> MaxPossible profit PFE 2019-09-11 2019-10-15
14.41
> quit
```

<br>

## What I Learned

- **Message design matters**. A minimal, length-prefixed frame simplified both sides of the wire and removed edge cases that often appear with delimiter-based protocols.
- **Parsing is part of correctness**. Non-destructive, ISO-aware date validation avoided subtle bugs when buffers were reused or shared.
- **Asymptotic complexity is visible to users**. Replacing cubic scans with single-pass analytics changed worst-case response time from seconds to milliseconds on modest hardware.
- **Defensive I/O is not optional**. Clear separation between loading, validation, and serving lowered the risk of runtime failures and improved observability.
