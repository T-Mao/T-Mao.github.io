---
layout: post
title: Shipping Bug‑Free iOS Apps With a Lean SDET Strategy
date: 2025-04-21 09:00:00
description: A deep dive into the mobile‑first test pyramid, Appium + pytest pipelines, and why accessibility is the best API you never documented.
tags: [ios, swiftui, appium, pytest, sdet]
categories: quality-engineering
thumbnail: https://miro.medium.com/v2/resize:fit:1200/1*yyUuN3qEJQLdRQBbtfqklg.jpeg
pretty_table: true
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://miro.medium.com/v2/resize:fit:1200/1*yyUuN3qEJQLdRQBbtfqklg.jpeg"
       title="SDET"
       class="rounded z-depth-1"
       max-width="800px"
    %}
  </div>
</div>

> _An SDET is not “QA with a cooler title”._  
> An SDET owns the **code that ships** _and_ the **code that proves it works**—continuously, deterministically, and cheaply.  
> This post dissects the exact tool‑chain I use in production.

---

## 1 · The Mobile‑First Test Pyramid

| Layer     | Scope                 | Primary Tech                        | 90ᵗʰ‑pct Run‑time | Blast Radius |
| :-------- | :-------------------- | :---------------------------------- | ----------------: | -----------: |
| Unit      | pure logic / reducers | **XCTest**                          |             40 ms |     refactor |
| Component | SwiftUI layout        | ViewInspector + point‑free snapshot |            250 ms |     PR block |
| Contract  | REST/GraphQL          | Pact‑Swift                          |               1 s |  integration |
| E2E       | binary on sim/real    | **Appium 2 + pytest**               |             4–7 s |      release |
| Chaos     | rotation, low‑mem     | `simctl`, XCUITest hooks            |              10 s |      hot‑fix |

Key design decision: **no business logic in the view layer**.  
Every tap routes through a single Swift _reducer_ (`handle(token:)`).  
Result: six‑second green bar for ~300 unit assertions.

---

## 2 · Unit Tests – Math > Pixels

```swift
mutating func handle(_ token: Token) {
    switch token {
    case .digit(let d):      accumulate(d)
    case .op(let op):        pushOperator(op)
    case .equals:            solve()
    case .percent:           percentify()
    case .sign:              toggleSign()
    case .backspace:         backspace()
    }
}
```

```swift
func test_order_of_operations() {
    var calc = Calculator()
    ["2", "+", "3", "×", "4", "="].map(Token.init).forEach(calc.handle)
    XCTAssertEqual(calc.display, "14")   // precedence preserved
}
```

- Arithmetic uses **`Decimal`**, not `Double`; no IEEE‑754 traps.
- `justCalculated` is a _state flag_, toggled strictly inside the reducer—never from SwiftUI gestures.

---

## 3 · UI Automation – Python Loves Swift

### 3.1 Session‑Scoped Driver

```python
@pytest.fixture(scope="session")
def driver():
    caps = {
        "platformName": "iOS",
        "automationName": "XCUITest",
        "deviceName": "iPhone 15 Pro Max",
        "platformVersion": "17.5",
        "app": BUILD_ARTIFACT,
        "newCommandTimeout": 300
    }
    drv = webdriver.Remote("http://127.0.0.1:4723", caps)
    yield drv
    drv.quit()
```

Reuse the same simulator session for the whole suite—saves ~25 s on a 50‑case run.

### 3.2 Data‑Driven Scenarios

```python
@pytest.mark.parametrize("seq, expected", [
    (["5","0","%","+","2","5","%","="], "0.75"),
    (["8","8","+","⌫","⌫","⌫","⌫"],     "0"),        # brutal backspaces
])
def test_sequences(driver, seq, expected):
    clear_all(driver)
    for key in seq: tap(driver, key)
    assert display(driver) == expected
```

One additional edge case = one extra tuple. 92 E2E cases, still readable.

---

## 4 · Accessibility IDs – The Contract You Forgot to Write

```swift
Text(expression.isEmpty ? display
     : "\(expression) \(display)")
    .accessibilityIdentifier("Display")
```

- **Testing** – Appium anchors on `"Display"`, zero XPath.
- **Accessibility** – VoiceOver inherits the same identifier.
- **Refactors** – swap the whole UI, tests stay green.

---

## 5 · CI – 35 s Pull Request, 150 s Nightly

| Stage            | Command                         |  Time |
| :--------------- | :------------------------------ | ----: |
| Build & Lint     | `xcodebuild -quiet` + SwiftLint |  12 s |
| Unit / Component | `swift test --parallel`         |   6 s |
| Contract         | `pact-broker verify`            |   7 s |
| Smoke E2E        | `pytest tests/smoke`            |  10 s |
| Nightly Blitz    | `pytest -n auto --reruns 2`     | 150 s |

Flaky spec? CI quarantines after three consecutive reds—mean‑time‑to‑green < 24 h.

---

## 6 · Mutation Testing – Trust, but Verify

Running Stryker‑SwiftMutation on reducers surfaces _false‑positive_ unit tests—the ones that never fail because they never assert:

- killed mutants ≥ 85 % ⇒ tests are honestly exercising logic
- each surviving mutant becomes **a new TDD card** in Jira

---

## 7 · Portable Playbooks

| Concern   | iOS                 | Android                  | Server      |
| :-------- | :------------------ | :----------------------- | :---------- |
| Unit      | **XCTest**          | JUnit + Robolectric      | pytest‑cov  |
| Contract  | Pact‑Swift          | Pact‑KMP                 | Pact Broker |
| UI        | **Appium 2** (XCUI) | Appium 2 (UIAutomator2)  | —           |
| Chaos     | `simctl`            | Firebase Test Lab faults | Toxiproxy   |
| Reporting | Allure‑Swift        | Allure                   | Allure      |

Same mental model, three stacks—on‑boarding a new SDET takes one sprint, not a quarter.

---

## 8 · Outcome Snapshot (Solo Implementation)

| Metric                    |           Before |                After |
| :------------------------ | ---------------: | -------------------: |
| Unit assertions           |                0 |              **312** |
| UI cases                  |                0 |               **92** |
| PR feedback loop          | 15 min manual QA |           **< 90 s** |
| Production crashes (90 d) |                — |                **0** |
| Interview hit‑rate        |              n/a | 4 on‑sites scheduled |

---

## 9 · What’s Next

1. **Analytics contract tests** – every UI event validated against Amplitude schema.
2. **On‑device fuzzing** – random rotations / locale switches via XCTest.
3. **Real‑device farm** – iOS 17 + 18 smoke on physical hardware.
