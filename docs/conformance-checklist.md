# Conformance Checklist

This document defines **conformance criteria** for implementations of **AICPM (Authenticated AI Content Provenance Marking)**.

It provides a checklist-style reference to help implementers determine whether a system is **AICPM-compatible**, **AICPM-conformant**, or **AICPM-claiming**.

This document is **normative where explicitly stated** and otherwise informational.

---

## 1. Conformance Levels

An implementation MAY claim one or more of the following:

- **AICPM Generator-Compatible**
- **AICPM Editor-Compatible**
- **AICPM Verifier-Compatible**

Each claim has independent requirements.

---

## 2. AICPM Generator Compatibility

An AI provider or generation system MAY claim  
**“AICPM Generator-Compatible”** if it satisfies all REQUIRED items below.

### REQUIRED

- ☐ Generates AI content in discrete, addressable chunks
- ☐ Computes a deterministic cryptographic hash of each chunk
- ☐ Signs each chunk hash using a provider-controlled private key
- ☐ Includes `provider_id`, `model_id`, and `timestamp` in the signed payload
- ☐ Emits an AICPM-compliant manifest containing:
  - `aicpm_version`
  - Provider registry
  - Chunk metadata
- ☐ Does not expose private keys to clients or editors

### MUST NOT

- ☐ Fabricate or modify signatures post-generation
- ☐ Delegate signing authority to publishers or editors
- ☐ Generate provenance for non-AI-authored content

---

## 3. AICPM Editor Compatibility

An editor or CMS MAY claim  
**“AICPM Editor-Compatible”** if it satisfies all REQUIRED items below.

### REQUIRED

- ☐ Preserves AICPM metadata through edit operations
- ☐ Associates text ranges with chunk identifiers
- ☐ Correctly invalidates signatures when AI-origin text is edited
- ☐ Includes a complete AICPM manifest at export time
- ☐ Supports documents with mixed human and AI-origin content

### SHOULD

- ☐ Support multiple AI providers in a single document
- ☐ Maintain stable chunk identifiers across edits
- ☐ Warn users when provenance integrity is degraded

### MUST NOT

- ☐ Re-sign AI-origin content
- ☐ Modify or normalize provider metadata
- ☐ Suppress or hide provenance data

---

## 4. AICPM Verifier Compatibility

A verifier MAY claim  
**“AICPM Verifier-Compatible”** if it satisfies all REQUIRED items below.

### REQUIRED

- ☐ Locates embedded `application/aicpm+json` manifests
- ☐ Validates manifest structure and required fields
- ☐ Recomputes cryptographic hashes of chunk text
- ☐ Verifies signatures using declared public keys
- ☐ Distinguishes at least the following states:
  - Verified AI-origin
  - AI-origin (edited)
  - Invalid signature
  - Unverifiable
- ☐ Operates deterministically

### SHOULD

- ☐ Support offline verification
- ☐ Provide per-chunk inspection
- ☐ Expose aggregate AI disclosure metrics

### MUST NOT

- ☐ Perform probabilistic AI detection
- ☐ Infer intent, quality, or truthfulness
- ☐ Require network access for verification

---

## 5. Manifest Conformance

An AICPM manifest is considered **conformant** if:

- ☐ It declares a valid `aicpm_version`
- ☐ All referenced providers are declared
- ☐ All chunks reference declared providers and keys
- ☐ All cryptographic fields are base64url-encoded
- ☐ No executable code is included

---

## 6. Cryptographic Conformance

An implementation is cryptographically conformant if:

- ☐ Approved hash functions are used (e.g., SHA-256)
- ☐ Approved signature schemes are used (e.g., Ed25519)
- ☐ Canonicalization rules are applied consistently
- ☐ Signature verification is strict (no soft failures)

---

## 7. Partial Conformance and Degradation

An implementation MAY still be considered AICPM-compatible if:

- ☐ Edited chunks are correctly marked as AI-origin (edited)
- ☐ Verification failures are surfaced, not hidden
- ☐ No false claims of verification are made

Graceful degradation is preferred over rejection.

---

## 8. Prohibited Claims

An implementation MUST NOT claim AICPM conformance if it:

- ☐ Generates unverifiable provenance
- ☐ Relies on watermarking or detection
- ☐ Requires proprietary verification services
- ☐ Obscures or suppresses provenance data
- ☐ Alters signed content while asserting validity

---

## 9. Self-Assertion Statement (Optional)

Implementations MAY include a self-asserted statement such as:

> “This implementation is AICPM Verifier-Compatible per  
> `docs/conformance-checklist.md`.”

Such statements are **informational only** and do not imply certification.

---

## 10. Future Certification (Non-Normative)

Future work MAY include:

- Interoperability test suites
- Conformance badges
- Third-party audits

These are explicitly out of scope for the current version.

---

## 11. Summary

AICPM conformance is intentionally:

- Modular
- Verifiable
- Self-contained
- Non-centralized

This checklist exists to promote **honest, interoperable adoption** rather than enforcement.

---

### Related Documents

- `spec.md`
- `architecture.md`
- `reference-verifier.md`
- `editor-integration-guidelines.md`
- `standardization-path.md`
