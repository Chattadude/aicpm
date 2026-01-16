AICPM — Authenticated AI Content Provenance Marking

AICPM is a cryptographically verifiable architecture for disclosing AI-generated content provenance at the chunk level, enabling transparent, tamper-resistant “AI nutrition labels” for text content.

This project defines a reference architecture, data model, and verification flow for identifying AI-generated text in a way that is:

Provider-signed

Browser-verifiable

Editor-preserving

Human-readable

Why AICPM Exists

Current approaches to AI disclosure rely on:

Self-reported percentages

Platform-controlled labels

Watermarks that break under editing

AICPM introduces a trust-preserving alternative:

AI provenance claims must be cryptographically signed at creation time by the AI provider and verifiable downstream, even after human editing.

This prevents:

Publishers forging “low AI” claims

Platforms unilaterally rewriting attribution

Consumers being misled by unverifiable labels

Core Concepts
🔹 Chunk-Level Provenance

Text is segmented into discrete chunks, each carrying:

Origin metadata (human / AI / mixed)

Provider identity

Cryptographic signature

Chunks may be edited, merged, or reordered — provenance persists.

🔹 Provider-Signed Claims

AI origin claims are signed server-side by the provider.
Private keys never enter the browser or editor.

🔹 Verifiable Disclosure

Any downstream verifier (browser extension, audit tool, platform)
can independently validate provenance without trusting the publisher.

Reference Implementation

This repository includes a working reference implementation demonstrating:

A browser-based editor

A mock AI provider signing content

Chunk-level provenance tracking

Exported HTML with embedded verification metadata

A client-side verifier badge (“AI Nutrition Label”)

This implementation is illustrative, not prescriptive.

Intended Audience

AICPM is designed for:

Browser vendors

AI model providers

Publishers and CMS vendors

Regulators and standards bodies

Researchers in AI safety and provenance

Status

🟢 Early architecture / reference phase

This project is under active development and discussion.
Specifications may evolve based on feedback and real-world testing.

License

Apache License 2.0

Acknowledgments

This work is informed by emerging efforts in content authenticity, cryptographic attestations, and responsible AI disclosure, including—but not limited to—industry discussions around provenance, labeling, and transparency.
