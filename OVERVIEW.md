# AICPM — Authenticated AI Content Provenance Marking

AICPM is a lightweight, verifiable way to label AI-generated content inside documents.

It is designed to work like a **nutrition label for information**, showing what portion of a document was AI-generated, what was edited, and what provenance can be cryptographically verified.

This project is an MVP reference implementation intended to support future open standardization.

---

## The Problem

AI-generated text is rapidly blending into human writing, journalism, research, and online publishing.

Today, readers have no reliable way to answer basic questions:

- Was this written by a human or AI?
- Was it edited after generation?
- Can anyone verify the claim of AI involvement?
- Can provenance survive copy/paste?

Current approaches (watermarks, detection models, trust claims) are either fragile, proprietary, or unverifiable.

---

## What AICPM Is

AICPM is a document-level provenance system that supports:

- **Chunk-level labeling** (paragraph or sentence spans)
- **Provider-signed manifests** (Ed25519 signatures)
- **Offline verification**
- **Multiple AI providers per document**
- **Tamper evidence** (edited chunks become invalid)
- **Browser verification** via a simple extension

The result is a reproducible label such as:

- AI Total: 42%
- Verified AI: 30%
- Edited AI: 12%
- Human: 58%

---

## What AICPM Is NOT

AICPM is not:

- A content detector
- A moderation system
- A censorship system
- A watermarking system
- A “truth engine”

It does not decide what is true.

It provides verifiable provenance signals so readers can judge credibility.

---

## High-Level Architecture

AICPM uses a three-part model:

### 1) Provider (Signer)
A provider service holds a private signing key and signs AI text chunks.

### 2) Document Manifest
The document embeds an AICPM manifest containing:
- provider IDs and public keys
- chunk hashes
- signatures
- timestamps and metadata

### 3) Verifier (Reader)
A verifier checks:
- chunk hashes match text
- signatures validate against provider public keys
- provenance is complete vs stripped/orphaned/partial

This can be done entirely offline.

---

## Why Not Watermarks?

Watermarks are fragile:
- They are often destroyed by paraphrasing or editing
- They depend on model behavior
- They do not provide chunk-level provenance
- They do not provide verifiable signatures tied to a provider identity

AICPM is designed as an explicit provenance declaration model rather than an invisible watermarking mechanism.

---

## Current Features in This Repo

This repo includes:

- A mock provider service that signs AI chunks (private key not in browser)
- An editor demo that inserts mock AI paragraphs and exports signed HTML
- A browser extension that verifies provenance and displays a nutrition label
- Schema drafts and test vectors for verification outcomes
- Reference verifier logic and expected results

---

## Quick Demo Summary

1. Start mock provider (signing service)
2. Start static server
3. Open editor
4. Insert mock AI paragraph
5. Export HTML
6. Open exported file
7. Badge appears with AI provenance breakdown

---

## Status

This is an MVP reference implementation.

The goal is to publish an interoperable architecture, schemas, and test vectors
that can be adopted by publishers, browsers, AI providers, and tools.

---

## Standardization Goal

AICPM is structured to support standardization by providing:

- Clear manifest schema
- Deterministic verification rules
- Test vectors and expected results
- Reference verifier implementation

---

## License

MIT (see LICENSE).

---

## Contact / Collaboration

If you are interested in standards collaboration, browser integration, or editor integration,
please open an issue or discussion in this repository.
