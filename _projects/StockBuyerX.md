---
layout: page
title: StockBuyerX
description: A reinforcement-learning portfolio simulator with a custom Gym environment, PPO baseline, and risk-aware diagnostics across large-cap equities and an S\&P 500 ETF.
img: https://img.freepik.com/premium-photo/trading-graph-interface-blue_269648-467.jpg
importance: 199
category: group
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://img.freepik.com/premium-photo/trading-graph-interface-blue_269648-467.jpg"
       title="StockBuyerX"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

**StockBuyerX** is a full pipeline for training and evaluating reinforcement learning agents on daily equity data. We built a **custom OpenAI Gym environment** that models portfolio actions, cash, positions, and mark-to-market P\&L, then trained a **PPO** policy per asset. The project tracks **profit**, **Sharpe ratio**, **maximum drawdown**, and an interpretable **holding ratio** so I can compare behavior across assets and splits.

- **Symbols**: AAPL, MSFT, GOOGL, AMZN, SPLG
- **Period**: 2018-01-01 to 2022-12-31
- **Stack**: Python, Gym, Stable-Baselines3 (PPO, A2C, DDPG), PyTorch, yfinance, NumPy, Matplotlib

> Academic simulation on historical data. For research only, not financial advice.

<br>

## System Design

1. **Data**: Download daily OHLCV via `yfinance`, forward/backward fill, and split into **train 70%**, **validation 15%**, **test 15%**.
2. **Environment**: `StockTradingEnv` exposes a continuous action space with Buy, Sell, Hold magnitudes and returns a compact observation that combines a **5-day OHLCV window** with portfolio state (cash, net worth, shares held, cost basis, realized sales).
3. **Reward and Diagnostics**: Reward is time-weighted to encourage sustained survivability while logging **profit**, **Sharpe**, and **max drawdown** at every step. A derived **holding ratio** provides a human-readable signal of the agent’s allocation behavior.
4. **Training and Evaluation**: Train PPO per asset in `DummyVecEnv`, then **replay** the policy on validation and test splits. I also ran **A2C** and **DDPG** sanity checks on standard control tasks to benchmark code paths.

<br>

## Key Implementation Details

### Custom Gym Environment

- **Observation**: a `6×6` tensor composed of five rows of scaled OHLCV for the last five bars plus one row of portfolio state features.
- **Action space**: `Box(low=[0,0], high=[3,1])`. The first value selects Buy, Sell, or Hold; the second is the fraction to apply.
- **Execution model**: the environment samples a price within the time step’s range and updates `balance`, `shares_held`, `cost_basis`, and `net_worth`.
- **Metrics**:

  - **Profit**: running net worth relative to initial capital.
  - **Sharpe ratio**: computed from incremental P\&L with a fixed reference rate for comparison.
  - **Max drawdown**: peak-to-trough on cumulative profit.
  - **Holding ratio**: share of cumulative trades that remain invested, visualized over time.

### Training Loop

- One **PPO (MlpPolicy)** model per asset with configurable timesteps.
- During training I log per-step metrics and then generate plots for:

  - Profit curves by asset
  - Holding ratio by asset and the implied **cash** ratio
  - Sharpe ratios vs a reference line

- I repeat the same plots for **validation** and **test** to check generalization.

### Baseline Agents

To ensure my RL plumbing behaved as expected, I trained **A2C** and **DDPG** on `CartPole-v1` and `Pendulum-v1` respectively and compared average episodic rewards against PPO. This kept model/eval code paths honest before running longer equity experiments.

<br>

## What Worked Well

- **Asset-wise isolation** made debugging easier. By training a separate PPO per ticker, I could attribute behavior to the policy and the series without cross-asset confounding.
- **Interpretable diagnostics** helped explain decisions. Profit, Sharpe, drawdown, and the holding ratio together paint a clear picture of stability vs aggression.
- **Vectorized env wrapper** (`DummyVecEnv`) removed friction when moving between training, validation, and testing.

<br>

## Findings

- Policies tended to stabilize around **consistent holding patterns** for high-liquidity names like AAPL and MSFT.
- The **holding ratio vs cash** plot made it obvious when the agent preferred staying risk-off.
- **Sharpe** and **drawdown** moved in the expected directions when rewards favored survivability over short bursts of profit.

I did not optimize for absolute return because the reward emphasized stability and learning dynamics rather than alpha generation.

<br>

## Limitations and Next Steps

**Limitations**

- No transaction costs or slippage.
- Actions are learned **per asset** instead of a joint portfolio vector, so cross-asset allocation is implicit rather than optimized globally.
- Price execution is simulated within the bar, which is convenient but idealized.

**Next steps**

- Move to a **multi-asset joint environment** with a simplex-constrained allocation vector.
- Add **fees, slippage**, and position limits.
- Replace the time-weighted reward with a **risk-adjusted return** objective that combines profit, drawdown, and volatility more rigorously.
- Use **walk-forward evaluation** and `EvalCallback` from SB3 for more principled early stopping.
- Engineer features such as rolling returns, ATR, and cross-sectional signals to improve state representation.

<br>

## How to Reproduce

1. Install: `pip install stable-baselines3 gym yfinance pandas numpy matplotlib torch`
2. Set `ASSETS`, `START_DATE`, `END_DATE`, and `run_times`.
3. Run the notebook or script to download data, train PPO per asset, and render plots for train, validation, and test.
