# Style guide — TYPO3 Tutorial: Editors

## Audience

This manual is written for **editors** — people who log in to the TYPO3
backend to create and manage content, not developers or system
administrators. Every rule below exists to serve that audience.

## Relationship to the official style guide

The official TYPO3 documentation writing conventions
([TYPO3CMS-Guide-HowToDocument](https://github.com/TYPO3-Documentation/TYPO3CMS-Guide-HowToDocument))
still govern reST syntax, headline anchors, formatting, and structure — see
`AGENTS.md`. **This file governs editorial voice and content decisions
specific to this manual**, and intentionally overrides the general style
guide's tone and level of detail where the two disagree. If a rule below
conflicts with the general guide, follow this file.

Mention that a change follows this style guide in the commit body (for
example: "simplified per STYLEGUIDE.md") rather than re-explaining the
rationale from scratch each time — that gives approvers enough context
without repeating the same justification in every commit.

## Principles

### 1. Remove obvious information

Editors don't need context they can already infer. Cut sentences that
restate what a screenshot or the next step already shows.

> Before:
> "With TYPO3, an editor's work is done via the backend and having an
> active backend account is required."
>
> After: cut entirely — the reader is already trying to log in.

### 2. Remove very technical jargon

Prefer plain descriptions over implementation detail or internal TYPO3
terminology that only makes sense to developers.

> Before: "A mount point lets you select any other page in the page tree...
> See the Mounts section in TYPO3 Explained for more information."
>
> After: "Similar to a Shortcut, but instead of redirecting to another
> page, it redirects to a whole subtree somewhere else in the page tree."

### 3. Friendly, conversational tone

Write as if talking to someone new to the job. Use "let's", "you", and
short sentences instead of formal, passive phrasing.

> Before: "Enter your domain name into the address bar of your browser and
> append `/typo3` to the end of it to access the backend login page."
>
> After: "If you are a TYPO3 editor, the backend is where you will most
> likely spend most of your time. So let's start by logging in."

### 4. Less detail on warnings and errors

Editors need to know *what to do*, not the full technical explanation of
*why* something happens. Trim admin/developer-facing detail out of notes,
warnings, and troubleshooting sections — or move it into a clearly marked
"for your administrator" list instead of prose aimed at the editor.

> Before: a `..  warning::` block explaining `[BE][adminOnly]` configuration
> and quoting exact maintenance-mode error strings.
>
> After: a short "Things your administrator can check" bullet list, kept
> separate from the steps the editor themselves needs to follow.

## Examples in this repo

The PRs listed below rewrite existing pages using these principles and are
good reference points for tone and level of detail:

- #306 — Overhaul backend login page
- #308 — Overhaul creating pages page
- #309 — Overhaul creating multiple pages page
- #310 — Overhaul "Working with pages" page
- #311 — Overhaul "Page types" page
