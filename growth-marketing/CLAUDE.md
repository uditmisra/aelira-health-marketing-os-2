# Growth Marketing System — Configuration

This file extends the master `CLAUDE.md`. Read the master first, then this.

## System purpose
Automate, accelerate, and continuously improve performance marketing across paid, organic, email, and SEO channels.

## Active channels
[ TODO: list channels in use — Google Ads, Meta, LinkedIn, Email, SEO, etc. ]

## Current priorities
[ TODO: what is the highest-leverage growth focus this quarter? ]

## Budget allocation
[ TODO: rough split across channels ]

## Key constraints
[ TODO: brand safety rules, geographic restrictions, audience exclusions, etc. ]

## Integration status
[ TODO: which MCP servers are connected and live ]

## Agent execution order for common tasks

**Ad copy request:**
1. creative-headline-agent (generates headlines)
2. creative-copy-agent (generates body copy)
3. asset-quality-gate (scores before presenting)

**Full campaign launch:**
1. campaign-brief-to-launch workflow

**Weekly review:**
1. weekly-performance-review workflow → weekly-cmio-report-generator
