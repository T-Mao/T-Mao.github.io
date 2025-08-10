---
layout: page
title: Tic-Tac-Toe (Python CLI)
description: A compact two-player console game
img: https://images.unsplash.com/photo-1692514355472-85d1a498e505?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
importance: 100
category: group
related\_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://images.unsplash.com/photo-1692514355472-85d1a498e505?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       title="Tic-Tac-Toe"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

This was a group assignment to implement a two-player Tic-Tac-Toe game in Python. The program renders a 3×3 board, alternates turns between Player 1 (X) and Player 2 (O), validates moves with a regular expression, prevents overwriting occupied squares, and reports win or tie outcomes. The board is stored as a 10-element list so positions 1 through 9 map directly to the grid for simple input.

<br>

## Key Features

- **Clear console UI**
  A simple ASCII board, explicit prompts, and immediate redraw after each move.
- **Strict input validation**
  A compiled regex `^[1-9]$` ensures users enter digits 1 to 9 only. Illegal or occupied choices trigger a helpful message and a re-prompt.
- **Deterministic win detection**
  A single `win(panels, sign)` check tests all rows, columns, and diagonals for either X or O.
- **Accurate end states**
  The game declares a winner as soon as a line is formed. If nine moves complete without a line, a tie is reported.

<br>

## How It Works

### Board model

- `panels` is a 10-slot list, index 0 unused, indices 1–9 map to the grid:

  ```
  1 | 2 | 3
  4 | 5 | 6
  7 | 8 | 9
  ```

- `PrintGameBoard()` renders the current state with X, O, or space.

### Turn loop

- `count` starts at 0 and increments after each valid move.
- Even `count` selects Player 1 (X). Odd `count` selects Player 2 (O).
- `IsDigit()` reads the user choice, validates via regex, then defers to `CheckEmpty()` to ensure the square is free.

### Win and tie

- `win(panels, sign)` returns true if any of the eight three-in-a-row patterns match the given sign.
- `isGameFinished(sign)` prints the winner and exits, or reports a tie when nine moves have been placed.

<br>

## Refinements I Would Apply

These are drop-in improvements that keep the visible behavior the same while tightening correctness and readability.

1. **Centralize winning lines**
   Replace chained comparisons with a tuple list for clarity.

   ```python
   WINS = [(1,2,3),(4,5,6),(7,8,9),(1,4,7),(2,5,8),(3,6,9),(1,5,9),(3,5,7)]
   def win(panels, s):
       return any(panels[a]==panels[b]==panels[c]==s for a,b,c in WINS)
   ```

2. **Looped input instead of recursion**
   Convert `IsDigit()` and `CheckEmpty()` to a single loop that continues until a valid empty square is returned. This avoids deep recursion on repeated bad input.

<br>

## How to Run

```bash
python3 tictactoe.py
```

Use digits 1–9 to place your mark. The program enforces valid, empty squares and announces the result.
