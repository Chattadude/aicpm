1. Overview

AICPM (Authenticated AI Content Provenance Marking) is a cryptographically verifiable architecture for disclosing AI-generated text provenance at the content chunk level.

The system enables transparent, tamper-resistant “AI nutrition labels” that remain verifiable after publication, redistribution, and editing, without relying on centralized trust authorities or opaque detection models.

AICPM is designed to be:

Provider-signed (origin attestation)

Browser-verifiable (client-side validation)

Editor-preserving (human edits allowed and detectable)

Human-readable (no black-box scoring)

2. Problem Statement

Current approaches to AI content disclosure suffer from fundamental limitations:

Self-attestation
Publishers can arbitrarily claim “low AI usage” without proof.

Post-hoc detection
AI detectors rely on probabilistic inference, are error-prone, and degrade rapidly as models improve.

Binary labeling
Content is labeled as either “AI” or “Human,” ignoring mixed-authorship realities.

Loss of provenance on edit
Once AI-generated text is edited, existing disclosure mechanisms fail or are invalidated.

These shortcomings prevent meaningful transparency, undermine trust, and are incompatible with real-world editorial workflows.

3. Design Principles

AICPM is built on five core principles:

3.1 Origin Over Detection

AI provenance must be declared and signed at generation time, not inferred later.

3.2 Chunk-Level Granularity

Content is segmented into discrete chunks, each independently signed and verifiable.

3.3 Cryptographic Verifiability

All AI-origin claims must be verifiable using standard public-key cryptography.

3.4 Edit Preservation

Human edits invalidate cryptographic signatures without erasing AI-origin attribution.

3.5 Open Verification

Verification requires no privileged access, APIs, or vendor services.

4. System Actors

AICPM defines four primary actors:

4.1 AI Provider

An entity that generates AI text and cryptographically signs provenance metadata using a private key.

4.2 Editor / Publisher

A system or individual that incorporates AI-generated text into human-authored documents.

4.3 Verifier

A client-side or server-side process that validates provenance signatures and computes AI contribution metrics.

4.4 Reader

An end user who views human-readable provenance summaries (e.g., AI percentage badges).

5. High-Level Architecture

At a high level, AICPM consists of three layers:

Generation Layer
AI providers sign content chunks at creation time.

Embedding Layer
Signed provenance metadata is embedded directly in exported documents.

Verification Layer
Independent verifiers validate signatures and compute disclosure metrics.

No centralized registry, watermark detector, or runtime service is required.

6. Content Chunk Model

A chunk is the smallest unit of provenance tracking in AICPM.

Each chunk represents a contiguous segment of AI-generated text and includes:

Chunk identifier

Provider identifier

Model identifier

Session identifier

Timestamp

Cryptographic hash of text

Provider signature

Chunks are embedded inline within documents and referenced by a single manifest.

7. Provenance Manifest

Each AICPM-compliant document includes a single embedded provenance manifest:

<script type="application/aicpm+json">


The manifest contains:

Provider public keys

Chunk metadata

Cryptographic signatures

The manifest is read-only metadata and does not alter document rendering.

8. Verification Flow (Summary)

Extract manifest

Locate chunk elements

Hash chunk text

Verify signature

Classify chunk as:

Verified AI

Edited AI

Invalid / missing

Aggregate results into human-readable metrics

9. Disclosure Outputs

A verifier may compute and display:

Total AI percentage

Verified AI percentage

Edited AI percentage

Human-authored percentage

Number of verified and invalid chunks

Presentation is intentionally decoupled from verification logic.

10. Non-Goals

AICPM explicitly does not attempt to:

Detect undisclosed AI usage

Enforce policy or moderation

Identify authorship or identity

Prevent content editing

It provides truthful provenance where declared, not surveillance.

11. Intended Use Cases

Journalism and publishing

Academic writing

Legal and regulatory disclosure

AI-assisted creative workflows

Browser extensions and platform badges

12. Status

This document defines the reference architecture for AICPM v0.1.
The specification is intentionally minimal and implementation-agnostic to encourage adoption and experimentation.
