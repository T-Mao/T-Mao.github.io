---
layout: page
title: Mini Shell (C)
description: A small but capable POSIX-style shell
img: https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
importance: 999
category: group
related\_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
       title="Shell"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

This **group project** implements a simple shell in C that runs on `openlab` with GCC 11. It supports built-in commands, executes local binaries in the foreground or background, manages jobs with signals, and handles input and output redirection.

<br>

## Features

- **Built-ins**: `cd`, `pwd`, `jobs`, `bg`, `fg`, `kill`, `quit`. Built-ins run in the shell process. `jobs` lists running and stopped background tasks. `fg` and `bg` accept either `%JID` or `PID`.
- **Foreground execution**: spawn with `fork`, replace with `execv` or `execvp`, and `waitpid` for completion. Ctrl-C sends `SIGINT` to the foreground child only.
- **Background execution**: append `&` to run jobs without blocking the prompt. Children are reaped by a `SIGCHLD` handler.
- **Job control**: track `pid`, status, and command line in a job table. Ctrl-Z stops the foreground job with `SIGTSTP`, `fg` and `bg` send `SIGCONT`. `kill` terminates by id or pid.
- **I/O redirection**: `<`, `>`, and `>>` are parsed and applied via `open` and `dup2` with the required modes. One input and one output redirect at most, as specified.
- **Parsing**: whitespace-tokenized argv with background and redirection handling. Both absolute and PATH-based execution are supported through `execv` and `execvp`.

<br>

## Architecture

- **Parser**: `parseline` tokenizes the command line, detects `&`, and resolves optional `<`, `>`, `>>` into file descriptors stored for later `dup2`.
- **Built-ins**: `buildin_command` implements control-flow commands directly. `jobs`, `fg`, `bg`, and `kill` read or update the job table.
- **Signal layer**:

  - `SIGINT` handler targets the foreground child.
  - `SIGTSTP` stops the foreground child and updates status to Stopped.
  - `SIGCHLD` reaps finished background jobs without blocking.

- **Evaluator**: `eval` wires parsing, built-ins, forking, redirection, and waiting. For background jobs, it prints the pid and returns the prompt immediately.

<br>

## How to Build and Run

```bash
# Build the shell
gcc -o shell hw2.c

# Optional helpers from the assignment packet
gcc -o counter counter.c      # prints a line every second
gcc -o add add.c              # prints n+2 for input n
```

**Examples**

```bash
prompt > pwd
/home/uci-user
prompt > cd ..
prompt > counter
Counter: 0
Counter: 1
^C
prompt > counter &
12345 counter &
prompt > jobs
[1] (12345) Running counter &
prompt > kill %1
prompt > jobs
```

**Redirection**

```bash
# number.txt contains: 40
prompt > add < number.txt > added_number.txt
prompt > cat added_number.txt
42
```

The above follows the assignment’s redirection contract.

<br>

## Notes on Design Choices

- The shell accepts both `/bin/ls` style absolute commands and `ls` resolved via `PATH`. This is achieved by trying `execv` first, then `execvp`.
- Foreground and background states are tracked in a fixed-size job array with pid, status text, and the original command line, which makes `jobs`, `fg`, and `bg` straightforward.
