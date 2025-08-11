---
layout: page
title: Virtual Memory Simulator (C)
description: An interactive demand-paged VM simulator
img: https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
importance: 199
category: group
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       title="Virtual Memory Simulator"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

This group assignment implements a compact virtual memory simulator in C that models page translation, page faults, and page replacement. The simulator exposes a prompt so you can issue `read`, `write`, `showmain`, and `showptable` commands repeatedly until `quit`. The default replacement policy is FIFO, and you can switch to LRU by passing `LRU` as the single program argument.

### Memory model

- **Virtual address space**: 16 virtual pages.
- **Physical memory**: 4 page frames.
- **Page size**: 8 words.
- **Backing store**: 128 words on “disk”.

These sizes follow directly from the fixed arrays: main memory has 32 words, disk has 128 words, and the page table tracks 16 virtual pages. Each page table entry stores the virtual page number, a valid bit, a dirty bit, the physical frame index, and a timestamp used by FIFO. An auxiliary `MemoryTable[4]` holds the LRU counters.

### Page fault and replacement

On a **page fault**, the simulator prints `A Page Fault Has Occurred`, then pulls the needed page from disk into an available frame. If all frames are occupied, it evicts one page according to the active policy.

- **FIFO** chooses the page with the smallest timestamp.
- **LRU** chooses the frame with the smallest recency counter.

When evicting, if the victim page is marked dirty, its eight words are written back to disk before invalidating the entry.

### Write policy

Writes update main memory and set the page’s dirty bit. Eviction later handles persistence to disk only if the page was modified.

### CLI commands

- `read <addr>` reads the word at virtual address `<addr>` and prints the value. The simulator transparently handles translation and faults.
- `write <addr> <num>` writes `<num>` to `<addr>` and marks the page dirty.
- `showmain <frame>` prints the eight word values stored in a physical frame.
- `showptable` prints all page table entries as `vpage:valid:dirty:frame`.
- `quit` exits.

### Usage

```bash
# FIFO by default
gcc hw.c -o vmsim
./vmsim

> write 19 7
A Page Fault Has Occurred
> read 19
7
> showptable
# prints lines like: vpage:valid:dirty:frame
> showmain 0
# prints 8 addresses and values in frame 0
> quit
```

To run with **LRU**, start the program as `./vmsim LRU`.

### Implementation notes

- **Initialization** sets all main and disk words to −1 and clears page-table bits. Each main-memory slot also tracks its backing virtual address to recover the resident page number during eviction.
- **FIFO timestamps** use a monotonically increasing counter stored in each resident page’s entry when the page is loaded.
- **LRU** maintains simple per-frame counters, incremented on access and used as the eviction key.

---

## What I contributed

I focused on the paging core and the interactive shell loop: the read and write paths, the page-fault handler, the FIFO and LRU selection logic, and the table and frame inspection commands. This included the timestamp scheme for FIFO, the counter-based LRU, and the small text protocol that makes the simulator easy to grade and demo.

---

## Build and run

```bash
gcc hw.c -o vmsim
./vmsim             # FIFO
./vmsim LRU         # LRU
```
