export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  categoryColor: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-production-rag-systems",
    title: "Building Production RAG Systems: Lessons from Enterprise Deployments",
    description:
      "Key architectural decisions, retrieval optimization, and evaluation frameworks for RAG at scale.",
    date: "2025-01-15",
    readingTime: "8 min read",
    category: "GenAI",
    categoryColor: "text-accent-primary bg-accent-primary/10",
    content: `
## Introduction

After deploying RAG systems across multiple enterprise contexts at HTC Global Services, I've learned that the gap between a working demo and a production-ready system is substantial. This post shares key lessons from building a multimodal RAG system that achieved 95% first-query resolution across 1,000+ documents.

## The Architecture That Worked

Our final architecture used **pgvector** for vector storage combined with **LangChain** for orchestration. Here's why this combination proved effective:

### Vector Database Selection

We evaluated several options:
- **Pinecone**: Great managed service, but cost scaled linearly with document count
- **Weaviate**: Feature-rich but added operational complexity
- **pgvector**: Won due to existing PostgreSQL infrastructure and surprisingly competitive performance

The key insight: for most enterprise use cases, pgvector's performance is sufficient, and the operational simplicity of staying within PostgreSQL outweighs marginal performance gains from specialized vector DBs.

### Chunking Strategy

Our chunking evolved through three iterations:

1. **Fixed-size chunks (512 tokens)**: Simple but broke context at sentence boundaries
2. **Semantic chunking**: Better coherence but inconsistent chunk sizes
3. **Hybrid approach**: Semantic splitting with size guardrails (256-1024 tokens)

The hybrid approach gave us the best retrieval accuracy while maintaining predictable token usage.

## Evaluation Framework

The most impactful decision was creating a **gold-question set** before optimizing anything else.

### Building the Gold Set

We collected 200 real user queries from stakeholders and manually annotated:
- The ideal retrieved documents
- The expected answer
- Edge cases and ambiguous queries

This investment paid dividends—every optimization could be measured against ground truth.

### Metrics That Mattered

- **First-query resolution rate**: Did users get their answer without reformulating?
- **Retrieval precision@5**: Were the top 5 chunks relevant?
- **Answer faithfulness**: Did the generated answer align with retrieved context?

## Key Optimizations

### 1. Query Expansion

Single queries often miss relevant documents due to vocabulary mismatch. We implemented HyDE (Hypothetical Document Embeddings):

\`\`\`python
def expand_query(query: str) -> list[str]:
    # Generate hypothetical answer
    hypothetical = llm.generate(
        f"Write a paragraph that would answer: {query}"
    )
    return [query, hypothetical]
\`\`\`

This improved retrieval precision by 23%.

### 2. Reranking

Initial retrieval with embedding similarity is fast but imprecise. We added a cross-encoder reranking step:

\`\`\`python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
reranked = reranker.rank(query, initial_results, top_k=5)
\`\`\`

### 3. Metadata Filtering

For enterprise documents, metadata (department, date, document type) proved crucial. Pre-filtering by metadata before vector search reduced noise significantly.

## Lessons Learned

1. **Start with evaluation**: Build your gold set before optimizing
2. **Hybrid retrieval wins**: Combine semantic and keyword search
3. **Chunking matters more than embedding models**: Spend time on chunking strategy
4. **Monitor in production**: User reformulation rate is your north star metric

## Results

After these optimizations:
- **95% first-query resolution** (up from 67%)
- **40% reduction in discovery time** across 10+ teams
- **Deployed across 1,000+ documents** with consistent performance

The system now handles natural-language queries across technical documentation, policies, and historical records—significantly reducing the time employees spend searching for information.
    `,
  },
  {
    slug: "dspy-prompt-optimization",
    title: "DSPy in Production: From Manual Prompts to Optimized Pipelines",
    description:
      "How we improved Cohen's κ from 0.55 to 0.85 using DSPy for automated prompt optimization.",
    date: "2024-11-20",
    readingTime: "6 min read",
    category: "GenAI",
    categoryColor: "text-accent-primary bg-accent-primary/10",
    content: `
## The Problem

At HTC Global Services, we built a GenAI call-center QA auditor that needed to score customer service calls on multiple dimensions: professionalism, problem resolution, compliance, and empathy.

The initial approach used hand-crafted prompts with GPT-4o. It worked, but inter-rater reliability (measured by Cohen's κ) hovered around **0.55-0.60**—barely acceptable for production use.

## Why DSPy?

Traditional prompt engineering is:
- **Brittle**: Small prompt changes cause unpredictable output shifts
- **Non-transferable**: Prompts optimized for one model rarely work for others
- **Hard to iterate**: No systematic way to improve

DSPy treats prompts as learnable parameters, not fixed strings. Instead of writing prompts, you define:
1. **Signatures**: Input/output specifications
2. **Modules**: Composable building blocks
3. **Metrics**: What "good" looks like

Then DSPy optimizes the prompts automatically.

## Our Implementation

### Defining the Signature

\`\`\`python
class CallQualityAssessment(dspy.Signature):
    """Assess call quality based on transcript and scoring rubric."""

    transcript: str = dspy.InputField(desc="Full call transcript with timestamps")
    rubric: str = dspy.InputField(desc="Scoring criteria and examples")

    professionalism_score: int = dspy.OutputField(desc="1-5 score")
    professionalism_evidence: str = dspy.OutputField(desc="Specific quotes supporting score")
    resolution_score: int = dspy.OutputField(desc="1-5 score")
    resolution_evidence: str = dspy.OutputField(desc="Specific quotes supporting score")
\`\`\`

### The Key Insight: Evidence Enforcement

The breakthrough came from requiring **timestamp evidence** for every score. This wasn't just for explainability—it forced the model to ground assessments in specific transcript moments.

\`\`\`python
class QAModule(dspy.Module):
    def __init__(self):
        self.assess = dspy.ChainOfThought(CallQualityAssessment)

    def forward(self, transcript, rubric):
        result = self.assess(transcript=transcript, rubric=rubric)
        # Validate evidence contains timestamps
        if not self._has_valid_timestamps(result.professionalism_evidence):
            raise dspy.AssertionError("Evidence must include timestamps")
        return result
\`\`\`

### Optimization with Human Feedback

We used 50 human-scored calls as our training set:

\`\`\`python
from dspy.teleprompt import BootstrapFewShot

def metric(gold, pred):
    # Cohen's kappa between human and model scores
    return cohen_kappa_score(gold.scores, pred.scores)

optimizer = BootstrapFewShot(metric=metric, max_bootstrapped_demos=4)
optimized_module = optimizer.compile(QAModule(), trainset=human_scored_calls)
\`\`\`

## Results

After DSPy optimization:

| Metric | Before | After |
|--------|--------|-------|
| Cohen's κ (professionalism) | 0.58 | 0.82 |
| Cohen's κ (resolution) | 0.55 | 0.85 |
| Cohen's κ (compliance) | 0.62 | 0.88 |
| Avg. assessment time | 45s | 12s |

### Business Impact

- **$100K/year QA cost savings**: Reduced manual review by 70%
- **Scaled to 10K+ calls/month**: Previously only 2K were reviewed
- **~70% more root causes surfaced**: Systematic coverage caught patterns human spot-checking missed

## Lessons for Production DSPy

1. **Start with clear metrics**: DSPy needs a numeric signal to optimize against
2. **Assertions are powerful**: Use them to enforce output structure
3. **Evidence requirements improve reliability**: Grounding reduces hallucination
4. **Human-in-the-loop matters**: Our best results came from continuous feedback integration

## What's Next

We're exploring DSPy's newer optimizers (MIPROv2) and multi-stage pipelines for more complex assessments. The framework's ability to treat prompts as learnable parameters has fundamentally changed how we approach LLM applications.
    `,
  },
  {
    slug: "anomaly-detection-time-series",
    title: "Statistical Anomaly Detection at Scale: NPDS Surveillance Case Study",
    description:
      "Building seasonality-aware baselines for 9M+ records and detecting signals 3 weeks early.",
    date: "2024-09-10",
    readingTime: "10 min read",
    category: "MLOps",
    categoryColor: "text-accent-tertiary bg-accent-tertiary/10",
    content: `
## The Challenge

The National Poison Data System (NPDS) receives millions of poison exposure reports annually. Traditional surveillance methods rely on threshold-based alerts that trigger only after a substance has already become a significant problem.

Our goal: detect emerging substance signals **weeks earlier** than traditional methods, while minimizing false positives.

## Understanding the Data

We worked with 9M+ records spanning several years. The data exhibited complex patterns:

- **Daily seasonality**: Call volumes peak mid-afternoon
- **Weekly seasonality**: Weekends differ from weekdays
- **Monthly/Annual seasonality**: Flu season, holidays, school schedules
- **Trend components**: Gradual shifts in substance categories

### The Baseline Problem

A naive approach—flagging values above a fixed threshold—fails spectacularly:
- Winter flu season triggers constant false positives
- Weekend dips mask Monday spikes
- Holiday periods look anomalous when they're actually predictable

## Our Approach

### 1. Decomposition-Based Baselines

We decomposed each substance's time series into components:

\`\`\`python
from statsmodels.tsa.seasonal import STL

def build_baseline(series, period=7):
    stl = STL(series, period=period, robust=True)
    result = stl.fit()

    # Baseline = trend + seasonal
    baseline = result.trend + result.seasonal
    # Residuals are what we monitor for anomalies
    residuals = result.resid

    return baseline, residuals
\`\`\`

### 2. Multi-Scale Seasonality

Single-period decomposition missed patterns. We implemented hierarchical decomposition:

\`\`\`python
def multi_scale_baseline(series):
    # Remove weekly pattern first
    weekly_stl = STL(series, period=7).fit()
    deseasonalized = series - weekly_stl.seasonal

    # Then remove monthly pattern
    monthly_stl = STL(deseasonalized, period=30).fit()

    # Combined baseline
    baseline = weekly_stl.seasonal + monthly_stl.seasonal + monthly_stl.trend
    return baseline
\`\`\`

### 3. Adaptive Thresholds

Fixed standard deviation thresholds don't account for heteroscedasticity (variance changing over time). We used rolling statistics:

\`\`\`python
def adaptive_threshold(residuals, window=28):
    rolling_std = residuals.rolling(window=window).std()
    rolling_mean = residuals.rolling(window=window).mean()

    # Z-score with local statistics
    z_scores = (residuals - rolling_mean) / rolling_std

    # Flag if z-score exceeds threshold for consecutive days
    return detect_consecutive_anomalies(z_scores, threshold=2.5, min_consecutive=3)
\`\`\`

## The Critical Insight: Consecutive Anomalies

Single-day spikes are often noise. Real emerging signals show **sustained deviation**. We required 3+ consecutive days above threshold before alerting.

This simple heuristic reduced false positives by 60% while maintaining sensitivity to true signals.

## AWS SageMaker Deployment

Processing 9M+ records required scalable infrastructure:

### Architecture

\`\`\`
S3 (raw data)
    → SageMaker Processing (daily ETL)
    → Feature Store (baseline/residuals)
    → SageMaker Endpoint (anomaly scoring)
    → SNS (alerts)
    → QuickSight (dashboards)
\`\`\`

### Key Decisions

1. **Processing Jobs over Lambda**: Long-running decomposition exceeded Lambda limits
2. **Feature Store for baselines**: Pre-computed baselines reduced inference latency
3. **Batch inference**: Daily runs were sufficient; real-time wasn't needed

## Results

### Detection Performance

| Metric | Traditional | Our System |
|--------|-------------|------------|
| Average detection lead time | Baseline | +3.2 weeks |
| False positive rate | 12% | 4% |
| Missed emerging signals | 23% | 8% |

### Operational Impact

- **3 weeks earlier detection** on average for emerging substance signals
- **Reduced analyst triage time** by focusing on high-confidence alerts
- **Quarterly reports** now include forward-looking signal analysis

## Lessons Learned

1. **Domain knowledge matters**: Understanding seasonal patterns required epidemiologist input
2. **Consecutive > single**: Requiring sustained deviation dramatically improved precision
3. **Hierarchical decomposition**: Multiple seasonal periods are common in real data
4. **Infrastructure scales with data**: SageMaker handled growth gracefully

## What's Next

We're exploring:
- **Prophet integration**: Facebook's library handles holidays and special events natively
- **Regional decomposition**: Geographic patterns may reveal localized outbreaks earlier
- **Multivariate signals**: Cross-substance correlations might predict emerging trends

The core insight—that statistical baselines with domain-informed thresholds outperform complex ML for this problem—continues to guide our approach.
    `,
  },
];
