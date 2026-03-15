# Marketing OS — Orchestration Plan

## What This Document Is

This is the build plan for the orchestration layer — the machine-readable workflow execution system that turns Marketing OS from a collection of agent files into a runnable system.

**Current state (2026-03-13):** All 12 YAML schemas are complete and runnable. The orchestration layer is fully built. This document now serves as the reference spec for the schema format and execution model.

**Target state (achieved):** Every high-frequency workflow has a `.yaml` schema executed by Claude in any runtime context: claude.ai chat (Tier 0), the web app (Tier 1), or Claude Code for development. The schema is the single source of truth — the runtime changes, the schema doesn't.

**Runtime tiers:**
- **Tier 0 (today):** Claude.ai Projects + GitHub MCP. Claude reads YAMLs from the live repo, executes steps as conversation turns, writes outputs back via GitHub API. No build required.
- **Tier 1 (4–6 weeks):** Web app (Next.js + Vercel + Claude API). Workflow sidebar, input forms, gate buttons, output streaming. Each step is a Claude API call with the agent `.md` as the system prompt.
- **Tier 2 (future):** Full multi-tenant SaaS. Same YAML schemas, different infrastructure.

**The YAML schemas are runtime-agnostic.** They don't care whether they're being executed by Claude in a chat window, a Next.js API route, or Claude Code. This is the key design decision. Define them once; run them anywhere.

---

## Orchestration Schema Specification

### File naming and location

- Human-readable workflow: `[system]/workflows/[workflow-name].md` (already exists)
- Machine-readable schema: `[system]/workflows/[workflow-name].yaml` (to be built)
- Workflow run outputs: `[system]/workflows/runs/[workflow-name]/[YYYY-MM-DD-HHMMSS]/`

### Schema structure

```yaml
# [workflow-name].yaml

name: Human-readable workflow name
version: "1.0"
description: One sentence — what this workflow produces
system: growth-marketing | product-marketing | system-intelligence
trigger: manual | scheduled | event   # how this workflow starts

# Context files injected into every step unless overridden at the step level
global_context:
  - core/brand/voice-and-tone.md
  - core/brand/messaging-pillars.md
  - core/icp/primary-icp.md

# Input the human provides before the workflow starts
inputs:
  - name: input_name
    description: What this is
    required: true | false
    example: "Example value"

# Ordered sequence of steps
steps:
  - id: step_1_id          # snake_case, unique within the workflow
    name: Human-readable step name
    agent: path/to/agent.md
    context:               # files this step reads (merged with global_context)
      - core/competitive/landscape-overview.md
    input:                 # where this step's input comes from
      source: user_input | step_output | file
      ref: input_name | step_id.output | path/to/file.md
    output:
      path: runs/{{run_id}}/step-1-output.md    # where output is written
      format: markdown                           # markdown | json | text
    gate:
      type: none | human_approval | quality_score
      # for human_approval:
      criteria: "What the human should evaluate this against"
      # for quality_score:
      agent: path/to/scoring-agent.md
      threshold: 7                               # out of 10; below = auto-retry
      max_retries: 1
    on_failure: stop | retry | skip              # if gate not passed
    on_success: continue | notify               # what happens after this step

  - id: step_2_id
    name: Second step
    agent: path/to/second-agent.md
    input:
      source: step_output
      ref: step_1_id.output                     # reads from previous step's output file
    output:
      path: runs/{{run_id}}/step-2-output.md
    gate:
      type: human_approval
      criteria: "Review this against messaging-pillars.md — does it reinforce the primary claim?"

# Final deliverable — what the human receives at the end of the workflow
output:
  summary: What the completed workflow produces
  deliverables:
    - path: runs/{{run_id}}/step-2-output.md
      label: "Final output label"
    - path: runs/{{run_id}}/run-summary.md
      label: "Run summary"

# Cross-system side effects — what this workflow writes to core/
writes_to_core:
  - path: core/brand/messaging-pillars.md
    condition: on_human_approval   # only written after human approves the relevant step
    written_by: step_2_id
```

---

## How Claude Code Executes a YAML Schema

When you ask Claude Code to run a workflow:

### Step 1 — Find and validate the schema
```
Read [workflow-name].yaml
Verify all referenced agent files exist
Verify all referenced context files exist (flag missing ones)
Resolve {{run_id}} = YYYY-MM-DD-HHMMSS timestamp
Create output directory: [system]/workflows/runs/[workflow-name]/[run_id]/
```

### Step 2 — Collect inputs
```
For each input defined in inputs[]:
  If required: ask the user for the value before starting
  If not required: use default or skip
Store collected inputs as run_inputs.json in the run directory
```

### Step 3 — Execute each step in order
```
For each step in steps[]:
  1. Assemble context:
     - Read all files in global_context[]
     - Read all files in step.context[]
     - Read input from step.input.source/ref

  2. Run the agent:
     - Read the agent.md file
     - Execute: [agent instructions] + [context] + [input]
     - Capture output

  3. Write output:
     - Write to step.output.path (resolved with run_id)

  4. Evaluate gate:
     - If gate.type == none: continue to next step
     - If gate.type == quality_score:
         Run scoring agent against output
         If score >= threshold: continue
         If score < threshold AND retries remaining: re-run step with score feedback
         If score < threshold AND no retries: present to human with score + note
     - If gate.type == human_approval:
         Present output to human with gate.criteria as the evaluation frame
         Wait for: approve / reject:[reason] / modify:[change]
         If approve: continue
         If reject: re-run step with rejection reason as prepended feedback
         If modify: apply modification, re-score if applicable, re-present
```

### Step 4 — Write core/ side effects
```
For each entry in writes_to_core[]:
  If condition == on_human_approval: only write if the relevant step was approved
  Write the step's output to the core/ path
  Append to core/system-intelligence/changelog.md:
    "[run_id] [workflow-name] updated [core_path] — [step name]"
```

### Step 5 — Write run summary
```
Write runs/[run_id]/run-summary.md:
  - Workflow name and version
  - Run timestamp
  - Inputs used
  - Each step: name, status (completed/skipped/failed), output path, gate result
  - Deliverables: list of final output paths
  - Core/ writes: what was written to core/ and when
```

---

## YAML Schemas — Complete ✅

All 12 high-frequency workflows are instrumented. Schema files are live in the repo.

| Workflow | File | Status |
|---|---|---|
| `weekly-performance-review` | `growth-marketing/workflows/weekly-performance-review.yaml` | ✅ |
| `weekly-competitive-pulse` | `product-marketing/market-intelligence/workflows/weekly-competitive-pulse.yaml` | ✅ |
| `weekly-system-review` | `system-intelligence/workflows/weekly-system-review.yaml` | ✅ |
| `ad-copy-generation` | `growth-marketing/workflows/ad-copy-generation.yaml` | ✅ |
| `creative-intelligence-sprint` | `growth-marketing/workflows/creative-intelligence-sprint.yaml` | ✅ |
| `campaign-brief-to-launch` | `growth-marketing/workflows/campaign-brief-to-launch.yaml` | ✅ |
| `email-sequence-build` | `growth-marketing/workflows/email-sequence-build.yaml` | ✅ |
| `new-positioning-sprint` | `product-marketing/positioning/workflows/new-positioning-sprint.yaml` | ✅ |
| `new-competitor-battlecard` | `product-marketing/sales-enablement/workflows/new-competitor-battlecard.yaml` | ✅ |
| `quarterly-win-loss-review` | `product-marketing/customer-intelligence/workflows/quarterly-win-loss-review.yaml` | ✅ |
| `l2-launch-playbook` | `product-marketing/launches/workflows/l2-launch-playbook.yaml` | ✅ |
| `post-launch-retrospective` | `system-intelligence/workflows/post-launch-retrospective.yaml` | ✅ |

---

## Cross-Workflow Orchestration

Some workflows trigger other workflows. The orchestration schema handles this via a `triggers` block:

```yaml
# In weekly-performance-review.yaml
on_completion:
  triggers:
    - condition: "performance_narrative_analyst output contains 'scale' recommendation"
      workflow: campaign-brief-to-launch
      input_mapping:
        brief: step_performance_narrative.output
    - condition: "any metric below threshold for 2 consecutive weeks"
      workflow: experiment-cycle
      input_mapping:
        hypothesis: step_analytics.output.underperforming_elements
```

This is the automation path for the future. When the web app is built, these trigger conditions become webhook-fired workflow executions. For now, Claude Code reads the `on_completion.triggers` and surfaces them as suggestions: "Based on this run, I recommend also running [X]. Want me to start it now?"

---

## State Management Design

### Within a workflow run

All state is files in the run directory:

```
growth-marketing/workflows/runs/ad-copy-generation/2026-03-12-143022/
├── run-inputs.json          ← inputs collected before run started
├── step-1-brief-analysis.md ← output of step 1
├── step-2-headlines.md      ← output of step 2
├── step-3-body-copy.md      ← output of step 3
├── step-4-quality-gate.md   ← scoring agent output
└── run-summary.md           ← final run log
```

### Between sessions

If a workflow is interrupted mid-run (session ends before completion):
- The run directory and all completed step outputs are preserved on disk
- On next session: `resume [workflow-name]` reads the run directory, identifies the last completed step, and continues from the next step
- Claude Code reads `run-summary.md` (partial) to understand what has already been done

```yaml
# Resume behavior — Claude Code reads this on session start if run is incomplete
resume:
  check_for_incomplete: true
  incomplete_run_message: "Found an incomplete run of [workflow] from [timestamp]. Steps completed: [list]. Resume from step [next_step]?"
```

### Long-running workflows (positioning sprint, launch playbook)

Workflows that span multiple days (e.g., `new-positioning-sprint` which is a 7-day process) use **checkpoints** rather than continuous execution:

```yaml
# In new-positioning-sprint.yaml
steps:
  - id: discovery
    ...
    checkpoint: true    # pause here; don't automatically continue to next step
    checkpoint_message: "Discovery complete. Review the output and come back when ready for the canvas build (typically 1–2 days later)."
```

A `checkpoint: true` step behaves like a human approval gate but explicitly signals a multi-session pause point. Claude Code writes the checkpoint state and tells the user what to do next and when to resume.

---

## Observability: What Gets Logged

Every workflow run writes three levels of logs:

**1. Run-level log** (`run-summary.md` in the run directory)
- Full step-by-step execution record
- Gate results with human decisions preserved
- Core/ writes that were made
- Duration (approximate)

**2. Signal log** (written to `core/system-intelligence/signal-log/`)
- For workflows that produce deliverables: what was produced, which agent, what context was used
- Tagged for the `pattern-analyst` to read in the weekly system review
- Format defined in `integrations/data-flow.md` — Flow 2

**3. Changelog** (appended to `core/system-intelligence/changelog.md`)
- Only for runs that wrote to `core/`
- Format: `[date] [workflow] updated [core_path] — [brief reason]`

---

## Execution Model Across Tiers

The same YAML schema runs identically across all three tiers. The runtime changes; the schema doesn't.

### Tier 0: Claude.ai + GitHub MCP execution

```
User types: /run ad-copy-generation
  → Claude reads growth-marketing/workflows/ad-copy-generation.yaml via GitHub MCP
  → Claude reads global_context files from repo via GitHub MCP
  → Collects inputs via conversation ("What's your campaign brief?")
  → For each step:
      Reads agent.md via GitHub MCP
      Runs agent with context + input (in conversation)
      Writes output file to repo via GitHub MCP API
      If gate: presents output in chat, waits for "approve" / "reject: [reason]"
  → Writes run-summary.md to repo via GitHub MCP
  → Appends to changelog via GitHub MCP
```

**No build required. Works today.**

### Tier 1: Web App + claude.ai execution

**Architectural rule: no Claude API. All AI execution runs through claude.ai (Claude Max subscription).**

The web app is a management interface and launcher. Claude.ai is the AI execution layer. They share the GitHub repo as the state layer.

```
User opens web app
  → Sees workflow list (rendered from YAML files in GitHub repo)
  → Fills in workflow inputs in a form
  → Clicks "Run in Claude"
  → Web app opens claude.ai with pre-formatted prompt:
      "Run [workflow-name].yaml with these inputs:
       campaign_brief: [value]
       platforms: [value]
       ..."
  → Claude.ai reads YAML from GitHub repo via GitHub MCP
  → Claude.ai executes each step (same as Tier 0 execution above)
  → Claude.ai writes output files to GitHub repo via GitHub MCP
  → Web app reads new run-summary.md from GitHub repo
  → Web app renders run history and output in its UI
```

**What the web app handles (no AI):**
- Workflow list and input forms (reads YAMLs from repo)
- Run history and output viewer (reads run dirs from repo)
- `core/` data editor (reads/writes repo files via GitHub API)
- KPI dashboard (direct HubSpot + Google Ads API calls, no Claude)
- Workflow launcher (opens claude.ai with correct prompt)

**What claude.ai handles (all AI):**
- YAML schema execution
- Agent runs
- Gate approvals (conversation turns)
- Repo writes via GitHub MCP

The YAML schemas are identical across tiers. The handoff mechanism (pre-formatted claude.ai prompt) is the only Tier 1-specific behavior.
