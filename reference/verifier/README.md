# AICPM Reference Verifier (Minimal)

This is a **non-production reference verifier** for AICPM.

Its purpose is to:
- Demonstrate deterministic verification behavior
- Validate conformance against `/docs/test-vectors`
- Serve as a baseline for independent implementations

This verifier:
- Uses SHA-256 over chunk text
- Treats signature verification as stubbed
- Focuses on classification outcomes, not cryptographic policy

Run:

```bash
node verifier.js ../../docs/test-vectors/valid-unmodified.json

## What AICPM Is

- A provenance *architecture*, not a watermark
- Chunk-level, provider-signed AI disclosure
- Verifiable without vendor APIs
- Editor- and browser-friendly

## What AICPM Is Not

- A content moderation system
- A detector or classifier
- A DRM or enforcement mechanism
- A consumer-facing product
