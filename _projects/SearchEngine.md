---
layout: page
title: Search Engine (Python, MongoDB)
description: A TF-IDF search engine over the UCI ICS corpus with HTML-aware weighting, bigram indexing, PageRank, and a Flask JSON API.
img: https://tse1.mm.bing.net/th/id/OIP.0Tb_u4VXDxoKizGfhAFMvQHaE7?w=474&h=474&c=7&p=0
importance: 98
category: group
related_publications: false
---

<div class="row">
  <div class="col-sm mt-3 mt-md-0 text-center">
    {% include figure.liquid
       loading="eager"
       path="https://tse1.mm.bing.net/th/id/OIP.0Tb_u4VXDxoKizGfhAFMvQHaE7?w=474&h=474&c=7&p=0"
       title="Search Engine"
       class="rounded z-depth-0"
       max-width="300px"
    %}
  </div>
</div>

## Overview

I worked with a teammate to implement a production-style search engine for the UCI ICS corpus. The system builds an inverted index with token normalization and lemmatization, ranks results using TF-IDF combined with HTML tag importance and PageRank, and exposes a JSON API for search. We used Python for the pipeline, NLTK for preprocessing, BeautifulSoup for robust HTML parsing, and MongoDB for persistence and retrieval.

<br>

## Highlights

- **Inverted index over 37k+ pages** with weighted tokens extracted from HTML, stored in MongoDB for fast aggregation queries.
- **Ranking formula** that multiplies TF, IDF, tag weight, and PageRank to surface authoritative matches.
- **Bigram expansion** of queries to capture short phrases.
- **PageRank computation** from outbound link graphs and persisted scores used at ranking time.
- **Concurrent processing**: multi-process indexing and multi-threaded TF-IDF computation and retrieval.
- **Flask search API** with CORS that returns top results with titles and snippets.

<br>

## Architecture

1. **Data loading**: bookkeeping map from document id to URL is inserted into `url_data` in MongoDB.
2. **Indexing**: HTML is parsed, tokens are lemmatized and stop words removed; tag weights are applied; bigrams are generated; per-document token weights accumulate in memory.
3. **Link analysis**: outbound links are extracted and a graph is built; PageRank scores are computed and stored.
4. **Scoring**: TF-IDF is computed in parallel and multiplied by tag weight and PageRank; the result is written back to `collection`.
5. **Search**: queries are preprocessed like documents, then MongoDB aggregation returns high-score postings which are combined into final rankings.

<br>

## Technical Details

### HTML-aware token weighting

We weight tokens based on tag importance to boost high-signal locations such as `<title>`, headings, and bold text. This produces better early-precision in results lists.

### Bigram index for short phrases

After stop-word removal and lemmatization, we add bigrams like “artificial intelligence” to capture intent beyond single terms.

### PageRank for authority

We build a link graph from extracted anchors, compute PageRank with damping, then inject those scores into the ranking multiplier, which favors well-referenced pages without ignoring relevance.

### Parallelism

- **Indexing** runs with a process pool to parse and tokenize documents concurrently.
- **TF-IDF** uses a thread pool to compute token scores across the vocabulary.
- **Retrieval** queries per-token postings in parallel and merges scores thread-safely.

### Data model in MongoDB

- `data` collection: `{ document, url, links, main_content, page_rank }` for snippets and link analysis.
- `collection`: `{ token, documents: [{ document, score }] }` for ranked postings and fast `$unwind`/`$sort`.

<br>

## Ranking Formula

For token _t_ in document _d_:

```
score(t, d) = tf(t, d) * idf(t) * tag_weight(t, d) * pagerank(d)
```

TF is frequency normalized by document token count. IDF is computed as log(N / df). Tag weight derives from the highest-value tag that emitted the token. PageRank comes from the link graph. Implementation uses precomputed IDF and PageRank maps for efficiency.

<br>

## CLI and API

- **CLI**: an interactive loop accepts queries, times the search, and prints the top results with URLs and main content.
- **API**: a Flask endpoint accepts JSON `{ "query": "..." }` and returns `{ time_taken, total_docs, searched_top_n }` for integration and demos.

<br>

## How to Run

**Prereqs**: MongoDB running on localhost:27017, Python 3.8 or newer, and `nltk`, `beautifulsoup4`, `pymongo`, `tqdm`, `numpy`.

1. Start MongoDB, then execute:

```bash
python src/main.py
```

`main.py` builds the index if absent, computes PageRank and TF-IDF, prints index statistics, and starts the interactive search loop. First run takes a few minutes on a typical laptop.

<br>

## Results and Observations

- **Early precision** improves with tag weighting. Title and H1 tokens dominate top ranks for navigational queries.
- **Authority bias** from PageRank helps disambiguate head terms and reduces noisy pages that match only in body text.
- **Throughput** benefits from process and thread pools during indexing, scoring, and retrieval.

<br>

## My Role

I focused on pipeline orchestration, HTML-aware preprocessing, ranking integration, and retrieval logic. Specifically: tag-weighted token emission, bigram expansion, TF-IDF computation with parallelism, and the search aggregator that merges per-token postings into final scores. I also helped wire PageRank into the score multiplier and structured the MongoDB schema for postings and snippets.

<br>

## Appendix: Key Modules

- `preprocessing.py` for tokenization, lemmatization, tag weighting, bigrams, link extraction, and snippet generation.
- `indexing.py` for multi-process indexing and inverted index creation.
- `page_ranking.py` for PageRank over the outbound link graph.
- `ranking_calc.py` for parallel TF-IDF with PageRank.
- `mongodb_interaction.py` for batch inserts and collection indexes.
- `search.py` for parallel retrieval and result formatting.
- `tf_idf.py` as the orchestrator that builds the database, runs ranking, and prints statistics.
