Reference Verifier

This document defines a reference verifier for AICPM (Authenticated AI Content Provenance Marking).

The reference verifier demonstrates how any third party—browser, publisher, auditor, or end user—can independently validate AI content provenance without trusting the content host or AI provider beyond their published public keys.

The verifier is intentionally simple, transparent, and deterministic.

1. Verifier Goals

A conforming AICPM verifier MUST:

Verify cryptographic signatures on AI-generated content chunks

Validate integrity of chunk text against recorded hashes

Distinguish between unmodified and edited AI-origin content

Operate entirely client-side (no network calls required)

Require no proprietary services or accounts

A verifier MUST NOT:

Attempt probabilistic AI detection

Infer intent, quality, or truthfulness

Enforce policy or moderation decisions

Require access to private keys or training data

2. Inputs

A reference verifier consumes the following inputs:

2.1 Document Content

The rendered text content as presented to the user (e.g., HTML, Markdown, PDF text layer).

2.2 AICPM Manifest

A non-executing embedded block containing:

AICPM version

Provider registry

Chunk metadata

Cryptographic signatures

Example (simplified):

<script type="application/aicpm+json">
{
  "aicpm_version": "0.1",
  "created_at": "2026-01-15T18:22:11Z",
  "providers": [
    {
      "provider_id": "example-ai",
      "public_keys": [
        { "key_id": "ed25519-2026-01", "alg": "ed25519", "key": "..." }
      ]
    }
  ],
  "chunks": [ ... ]
}
</script>

3. Verification Steps

A conforming verifier MUST perform the following steps in order.

Step 1: Locate AICPM Manifest

Identify embedded application/aicpm+json blocks

Reject documents with multiple conflicting manifests

Validate manifest schema and required fields

Step 2: Load Provider Keys

Extract provider public keys from the manifest

Match provider_id and key_id references

Reject chunks referencing unknown or missing keys

Step 3: Extract Chunk Text

For each declared chunk:

Locate corresponding text in the document

Normalize text according to AICPM canonicalization rules

Compute the SHA-256 hash

Step 4: Compare Hashes

If computed hash matches chunk_hash_b64u:

Mark chunk as unmodified

If hash does not match:

Mark chunk as edited

Skip signature verification for that chunk

Step 5: Verify Signatures

For unmodified chunks only:

Verify sig_b64u using:

Declared public key

Declared algorithm

Canonicalized chunk hash

Mark chunk as:

Verified AI-origin, or

Invalid signature

4. Verification Outcomes

Each chunk MUST resolve to exactly one of the following states:

State	Meaning
Verified AI-origin	Hash and signature valid
AI-origin (edited)	Text modified after generation
Invalid	Signature present but invalid
Unverifiable	Missing keys or malformed metadata

The verifier MUST NOT collapse these states into a single binary result.

5. Aggregate Disclosure

The verifier MAY compute aggregate metrics, such as:

Percentage of AI-origin content

Percentage of edited AI content

Number of providers involved

Aggregate values MUST be derived solely from verified chunk data and MUST be reproducible.

6. Reference UI Behavior (Non-Normative)

A reference verifier UI may:

Display a summary badge (e.g., “AI: 72.5% • edited”)

Highlight AI-origin text segments

Provide expandable per-chunk details

Allow inspection of provider identities and keys

UI presentation is explicitly out of scope for the AICPM specification.

7. Security Considerations

A verifier MUST assume:

The document host may be adversarial

The publisher may attempt to misrepresent AI usage

The verifier environment may be offline

AICPM’s security model relies on:

Cryptographic integrity

Explicit scope limitation

No hidden signals or heuristics

8. Minimal Reference Implementation

A minimal reference verifier can be implemented in:

JavaScript (browser extension or embedded script)

Python (CLI audit tool)

Rust / Go (server-side batch validation)

Required primitives:

SHA-256 hashing

Ed25519 signature verification

Base64url decoding

Deterministic text canonicalization

No AI models or external APIs are required.

9. Compliance Statement

An implementation MAY claim “AICPM Reference Verifier Compatible” if it:

Implements all mandatory steps in Section 3

Correctly classifies all verification outcomes in Section 4

Does not add non-deterministic inference

10. Future Extensions (Non-Binding)

Potential extensions include:

Streaming verification

Detached manifests

Non-text modalities (audio, image, video)

Registry-backed provider discovery

These extensions MUST NOT alter core verification semantics.
