---
layout: page
title: Byte-Level Memory Allocator (C, 127-byte Heap)
description: A compact implicit-list heap simulator with 1-byte headers and footers, splitting, coalescing, Best-Fit or First-Fit allocation, and low-level memory I/O commands.
img: https://plus.unsplash.com/premium_photo-1752161958518-41bdf022f0bd?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
importance: 199
category: group
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://plus.unsplash.com/premium_photo-1752161958518-41bdf022f0bd?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       title="Memory Allocator"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

This **group assignment** implements a byte-addressable heap of 127 bytes organized as an implicit free list. Each block carries a **1-byte header** and **1-byte footer** whose most-significant 7 bits encode the block size (including header and footer) and whose least-significant bit is the allocation flag. The program reads commands from a prompt and supports allocation, freeing with forward and backward coalescing, a block listing view, raw memory writes, and raw memory reads. The behavior matches the assignment brief.

<br>

## Key Features

- **Exact heap model**
  Heap size 127 bytes. Initial state is one free block with header at address 0 and footer at address 126. No alignment assumptions.

- **Headers and footers**
  Pack size and allocation bit into a single byte, placed just before and after the payload. Your code sets both and zeroes payload bytes on init and on free.

- **Allocation strategies**
  **First Fit** by default, or **Best Fit** when launched with the `BestFit` argument. Splitting occurs when possible; if the remainder would be smaller than 3 bytes, the whole block is allocated.

- **Coalescing**
  On `free`, the allocator coalesces with the next free block and the previous free block, then rewrites header and footer as a single larger free block. Payload bytes are reset to zero.

- **Interactive commands**

  - `malloc <size>` prints the pointer to the first payload byte
  - `free <index>` frees by payload pointer
  - `blocklist` prints `payloadSize-pointer-status` sorted by descending payload size, ties broken by lower address first
  - `writemem <index> <alnum>` writes raw bytes starting at index
  - `printmem <index> <n>` prints decimal bytes separated by hyphens
  - `quit` exits
    All follow the format and semantics required by the brief.

<br>

## Architecture and Data Representation

- **Memory**: `unsigned char memory[127]` represents the entire heap. A helper sets header, footer, and zeroes payload in a single call.
- **Block encoding**: `header = (size << 1) | allocBit` for allocated, `(size << 1) & 0xFE` for free. Footer mirrors header.
- **Allocator**:

  - **First Fit** scans forward and takes the first sufficiently large free block.
  - **Best Fit** scans all blocks to find the smallest sufficient free block.
  - **Split rule**: if `remainder <= 2`, do not split. Otherwise create a second free block with correct header and footer.

- **Free path**: merges with the next free block if present, then with the previous free block if present, writes zeros across the merged region, and sets a single free header and footer.
- **Block list**: collects block starts, sorts by size descending and address ascending, then prints `size-pointer-status` lines where size is the payload size.
- **Raw I/O**: `writemem` copies alphanumeric bytes into `memory` starting at the index. `printmem` prints `n` bytes in decimal with hyphens. Bounds checks are intentionally lax per the brief.

<br>

## Example Usage

```text
> malloc 10
1
> malloc 5
13
> blocklist
106-20-free
10-1-allocated
5-13-allocated
> free 1
> blocklist
106-20-free
10-1-free
5-13-allocated
> writemem 1 HELLO
> printmem 1 5
72-69-76-76-79
> quit
```

<br>

## How to Build and Run

```bash
gcc -std=c11 -O2 -Wall -Wextra -o alloc hw4.c

# Default: First Fit
./alloc

# Best Fit
./alloc BestFit
```

The program prints `>` and accepts commands until `quit`. It compiles on OpenLab with GCC 11 as required.

<br>

## Notes and Edge Cases

- The allocator treats all pointers as heap addresses from 0 to 126 inclusive.
- Writing outside a payload can intentionally corrupt headers, footers, or neighboring blocks, which mirrors the brief’s “no bounds checking” requirement.
- Block sizes in headers and footers include only payload bytes, while pointer values printed by `malloc` and `blocklist` point to the first payload byte.
