Interoperability Examples

This document provides concrete, end-to-end examples illustrating how AICPM (Authenticated AI Content Provenance Marking) interoperates across common content workflows.

The goal is to demonstrate that AICPM is:

Practical across existing publishing stacks

Resilient to normal editing and formatting

Verifiable without trusted intermediaries

Compatible with both human-authored and AI-assisted content

1. Blog Publishing Workflow
Scenario

A technology blog uses an AI assistant to draft portions of an article. A human editor revises, rearranges, and supplements the text before publishing.

Flow

AI provider generates text chunks and signs each chunk at generation time.

Signed chunks are embedded in the editor as structured metadata.

Human edits occur:

Some AI-generated paragraphs are modified

Some are deleted

New human-authored text is added

On publish:

AICPM manifest is embedded as a non-executing block

Edited AI chunks are flagged as edited=true

Human-only content is excluded from provenance claims

Outcome

Readers see a clear AI percentage label

Edited AI content is disclosed without invalidating provenance

No watermarking or hidden signals are used

Verification is possible in any browser

2. Newsroom / CMS Integration
Scenario

A newsroom CMS integrates multiple AI providers for summarization, headline suggestions, and background research.

Flow

CMS receives AI content from different providers, each with its own signing keys.

AICPM provider registry includes:

Provider identity

Public verification keys

Model identifiers

Editors selectively accept or reject AI suggestions.

Final article includes:

Mixed-provider AI chunks

Human-authored sections

Clear provenance boundaries

Outcome

Multi-provider AI usage is transparently disclosed

Editors retain full control

No single platform or model is privileged

Publishers cannot falsify lower AI usage

3. LLM Chat Transcript Export
Scenario

A user exports a chat transcript from an AI system and republishes it (e.g., blog, documentation, research appendix).

Flow

AI responses are chunk-signed at generation time.

User annotations and commentary are added later.

Transcript is exported as HTML or Markdown with:

Original AI chunks preserved

Human annotations excluded from provenance

AICPM manifest accompanies the export.

Outcome

Readers can distinguish AI responses from human commentary

Selective quoting does not break verification

Edited AI responses are correctly flagged

No reliance on proprietary chat platforms

4. Document Editing & Reformatting
Scenario

An article is copied between formats (HTML → Markdown → PDF).

Flow

AICPM metadata travels with content as structured data.

Formatting changes do not affect:

Chunk hashes (unless text is modified)

Provider signatures

Text modifications:

Invalidate the original signature for that chunk

Preserve attribution as “AI-origin (edited)”

Outcome

Normal publishing workflows remain unchanged

Provenance degrades gracefully rather than breaking

Verification logic remains deterministic

5. Partial Reuse and Quotation
Scenario

A third party quotes a paragraph from an AICPM-enabled article.

Flow

Quoted chunk retains:

Original hash

Provider signature

Provider identity

Quoting context is external to AICPM scope.

Verification confirms:

Chunk authenticity

AI origin

No claim about surrounding text

Outcome

Quoted AI content remains verifiable

No over-claiming of provenance

Encourages responsible reuse

6. What AICPM Explicitly Does Not Do

These examples clarify what AICPM intentionally avoids:

❌ It does not watermark text

❌ It does not attempt to detect AI content probabilistically

❌ It does not prevent copying or editing

❌ It does not enforce platform control

❌ It does not assert truth, quality, or intent

AICPM provides verifiable provenance, not judgment.

7. Interoperability Summary

Across these examples, AICPM demonstrates:

Compatibility with existing editors and CMSs

Independence from proprietary platforms

Robustness under editing and reuse

Clear separation of provenance and policy

These properties are foundational for adoption across browsers, publishers, and standards bodies.
