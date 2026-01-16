# AICPM Specification
## Authenticated AI Content Provenance Marking (v0.1)

**Status:** Draft  
**Intended Audience:** Platform implementers, AI providers, publishers, auditors  
**Normative Language:** RFC 2119 (MUST, SHOULD, MAY)

---

## 1. Scope

This document defines the AICPM (Authenticated AI Content Provenance Marking) specification for disclosing AI-generated text content provenance at the chunk level.

The specification defines:
- A data model for AI-generated text chunks
- A cryptographic signing and verification process
- A browser-verifiable provenance mechanism
- A non-destructive embedding model for HTML and text documents

AICPM does **not** define:
- Detection or classification of AI-generated content
- Enforcement or policy decisions based on provenance
- UI or UX requirements beyond reference examples

---

## 2. Design Goals

An AICPM-compliant system MUST satisfy the following goals:

1. **Authenticity** — AI-origin claims are cryptographically verifiable
2. **Granularity** — Provenance applies at the chunk (sub-document) level
3. **Tamper Evidence** — Post-generation edits are detectable
4. **Provider Accountability** — Only AI providers can assert AI-origin
5. **Editor Preservation** — Content may be edited without loss of attribution
6. **Browser Verifiability** — Verification can occur without backend services
7. **Human Readability** — Content remains readable without tooling

---

## 3. Terminology

- **Chunk**: A contiguous span of AI-generated text
- **Provider**: An AI system or service issuing AI-generated text
- **Manifest**: A signed data structure describing AI-generated chunks
- **Verified Chunk**: A chunk whose signature and hash validate
- **Edited Chunk**: A chunk whose signature does not validate but remains AI-origin
- **Human Content**: Content not associated with any AICPM chunk

---

## 4. Actors and Trust Model

### 4.1 AI Provider
- Generates text
- Computes chunk hashes
- Signs chunk metadata using a private key
- Publishes corresponding public keys

### 4.2 Publisher / Editor
- Inserts AI-generated chunks into documents
- MAY edit content post-generation
- MUST NOT possess provider private keys

### 4.3 Verifier
- Validates chunk signatures and hashes
- Computes AI-origin percentages
- MAY operate fully client-side

---

## 5. Cryptographic Requirements

### 5.1 Algorithms

An AICPM implementation MUST support:
- **Hash Function:** SHA-256
- **Signature Algorithm:** Ed25519

### 5.2 Key Management

- Provider private keys MUST remain server-side
- Public keys MUST be distributed in the manifest
- Key rotation is permitted via `key_id`

---

## 6. Chunk Data Model

Each AI-generated chunk MUST include the following fields:

| Field | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | Unique chunk identifier |
| `provider_id` | string | Yes | AI provider identifier |
| `model_id` | string | Yes | Model identifier |
| `session_id` | string | Yes | Generation session identifier |
| `timestamp` | ISO 8601 | Yes | Generation time |
| `chunk_hash_b64u` | string | Yes | Base64url SHA-256 hash of chunk text |
| `key_id` | string | Yes | Signing key identifier |
| `sig_b64u` | string | Yes | Base64url Ed25519 signature |
| `text_len` | number | Yes | Character length at generation time |

---

## 7. Manifest Structure

The manifest MUST be embedded as a non-executing block:

```html
<script type="application/aicpm+json">
{
  "aicpm_version": "0.1",
  "created_at": "ISO-8601 timestamp",
  "providers": [ ... ],
  "chunks": [ ... ]
}
</script>
