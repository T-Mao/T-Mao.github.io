---
layout: page
title: CheckersAI
description: Intelligent Board-Game Strategy
img: https://t4.ftcdn.net/jpg/05/46/06/29/360_F_546062917_u6HIsUWvGiMbucvviIDZ0gAHXxB0xliN.jpg
importance: 10
category: group
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://t4.ftcdn.net/jpg/05/46/06/29/360_F_546062917_u6HIsUWvGiMbucvviIDZ0gAHXxB0xliN.jpg"
       title="CheckersAI"
       class="rounded z-depth-1"
       max-width="350px"
    %}
  </div>
</div>

## Overview

From **September 2022** to **December 2022**, I developed **CheckersAI**, an **AI-driven** Checkers agent designed to showcase intelligent decision-making in board games. Unlike a typical graphical mobile app, this was a **full-fledged Python project** focusing on **algorithmic depth**, **strategic heuristics**, and **real-time move adaptations**. I took a hands-on approach—**coding**, **debugging**, and **testing**—to ensure the AI could dynamically handle complex board states and demonstrate high-level play.

Throughout this project, I leveraged my **app development mindset** to create **user-friendly** modules (e.g., for searching, evaluating moves, and simulating board states) while simultaneously employing **advanced AI techniques** like **alpha-beta pruning** and **heuristic-based evaluation**. The result was an agent capable of making **efficient** and **adaptable** moves, effectively outperforming many baseline strategies.

<br>

## Core Highlights

1. **Full-Cycle AI Development**

   - Organized the project from **requirements gathering** (e.g., rules of Checkers, desired difficulty) to final **coding and testing**.
   - Implemented in **Python**, ensuring modular code structure and maintainability.

2. **Alpha-Beta Search with Heuristics**

   - Designed an **evaluation function** to reward aggressive captures and positional advantages while penalizing moves leaving pieces vulnerable.
   - Integrated **alpha-beta pruning** to reduce computational overhead, enabling deeper lookahead within feasible time.

3. **Dynamic Board Adaptation**

   - Developed a **custom Board class** for real-time state updates, undo/redo functionality, and robust move validation.
   - Handled edge cases (king promotions, multi-jump scenarios) and user-defined parameters (variable board dimensions).

4. **Debugging & Problem-Solving**
   - Overcame issues with incorrectly accessed board functions, eventually refining the usage of helper methods (e.g., checking if a piece is king).
   - Fine-tuned numeric weightings (for example, awarding +7 for successful captures or penalizing -7 when pieces got jumped) to strike a balance between aggression and safety.

<br>

## Technical Approach

### 1. Search Algorithm (Alpha-Beta Pruning)

- **Depth-Limited Search**: Set a default search depth (e.g., 3 or 4 ply) to manage compute time.
- **Pruning Efficiency**: Employed alpha-beta cuts to prune non-promising branches early, enabling the AI to explore **more** critical positions in limited time.

```python
# Example snippet of alpha-beta logic (simplified)
best_move = self.alpha_beta_search(self.board, self.depth_search, -100000, 100000, 0)
self.board.make_move(Move(best_move), self.color)
```

### 2. Heuristic-Based Evaluation

- **Positive Scores**: Jump captures, edge-protecting moves, king promotions.
- **Negative Scores**: Exposing pieces to easy captures, repetitive or stagnant moves, vacating safe rows too soon.
- **Adaptive Weight Tuning**: Incrementally tested and adjusted these values (+7 for jumping, etc.) to achieve an **optimal** balance of offense and defense.

```python
# Example excerpt from 'evaluate' function
if len(eval_board.saved_move[-2][1]) != 0:
    jumpLen = len(eval_board.saved_move[-2][1])
    point += jumpLen * 7  # Reward capturing opponent pieces
...
if eval_board.board[last_move[-1][0]][last_move[-1][1]].is_king:
    point += 3  # Additional reward for getting a king
```

### 3. Board & Move Management

- **Board Representation**: Created a 2D list of `Checker` objects, each storing color, location, and a boolean `is_king`.
- **Move Class**: Encapsulated sequences of jumps or slides, including multi-step captures.
- **Undo Feature**: Implemented a `saved_move` stack to revert the board to previous states, simplifying debugging.

<br>

## My Additional Responsibilities

- **Requirements & Rule Analysis**: Learned and adapted official Checkers rules, verifying correct move patterns (e.g., forced jumps, multi-hops).
- **Testing & Tuning**: Ran numerous trials against baseline AIs (e.g., Random or Poor AI) to measure improvements, adjusting scoring parameters.
- **Report & Documentation**: Authored the final AI report, outlining the approach to alpha-beta, heuristics, encountered issues, and enhancements.

<br>

## Project Outcomes

- **Intelligent Gameplay**: The agent effectively balanced offense and defense, often securing wins against simpler AI opponents.
- **Modular, Extensible Code**: Thanks to clear data structures (`Board`, `Checker`, `Move`), the logic can be extended to variations like larger boards or custom scoring.
- **Insights into Tuning**: Fine-tuning numeric weights taught me how delicate heuristic adjustments can significantly alter AI behavior—mirroring real-world complexities in software parameter optimization.
- **Advanced Debugging Skills**: Tracked down subtle function usage errors and improved my ability to **refactor** code swiftly under changing requirements.

<br>

## Personal Growth & Reflection

- **Algorithmic Rigor**: Gained deeper insight into **search algorithms**, heuristics design, and the interplay of **time complexity** vs. **depth** in game AI.
- **Adaptability**: Strengthened my skill in pivoting quickly—an essential trait in **app development**—when faced with ambiguous or evolving specs.
- **Communication & Documentation**: Learned to present complex AI concepts in accessible terms, ensuring thorough knowledge transfer to teammates or stakeholders.

<br>

## Final Thoughts

Through **CheckersAI**, I honed my **app developer skill set** in a less traditional context—building an AI agent rather than a standard mobile interface. The experience underscores my **passion** for tackling challenging problems with **robust code**, **algorithmic insights**, and strategic creativity. This project reflects my readiness to develop **high-performance** solutions that blend **intuitive design**, **logical architecture**, and **optimized algorithms**—assets I’m eager to contribute to any forward-thinking engineering team.
