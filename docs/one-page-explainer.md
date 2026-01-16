AICPM — Authenticated AI Content Provenance Marking

A practical, cryptographically verifiable “AI nutrition label” for text

What is AICPM?

AICPM (Authenticated AI Content Provenance Marking) is an open architecture for disclosing AI-generated text in a way that is:

Cryptographically verifiable

Tamper-resistant

Browser-verifiable

Editor-preserving

Human-readable

Instead of watermarking text or relying on post-hoc detection, AICPM attaches a signed provenance manifest at the time content is generated. This manifest allows any downstream reader, platform, or tool to independently verify how the content was produced — without trusting the publisher or the hosting platform.

Why existing approaches fall short

Current AI disclosure methods generally rely on one of three approaches:

Watermarks

Fragile under copying, editing, or reformatting

Often proprietary

Difficult for end users to verify independently

Heuristic or probabilistic detection

Inherently unreliable

Produces false positives and false negatives

Fails under paraphrasing or translation

Platform-level labels (“This was AI-generated”)

Not portable

Not verifiable

Dependent on trust in the platform

These approaches attempt to guess provenance after the fact, rather than prove it at creation time.

What AICPM does differently

AICPM treats AI provenance as a first-class cryptographic artifact, not a detection problem.

At generation time, the AI provider produces:

A set of content chunks

A cryptographic hash of each chunk

A digital signature binding those hashes to:

The provider

The model

The generation session

A timestamp

This information is packaged into a non-executing, embedded manifest that travels with the text.

Anyone can later:

Verify the signature

Confirm the text has not been altered

See which parts were AI-generated

Do so entirely client-side (e.g., in a browser)

No watermark extraction.
No platform trust required.
No probabilistic guessing.

What AICPM does not attempt to do

AICPM is intentionally scoped.

It does not:

Judge content quality, truth, or intent

Detect undisclosed AI content

Prevent misuse or copying

Enforce policy or regulation

AICPM provides verifiable disclosure, not enforcement.

Who AICPM is for

AICPM is designed for adoption across the AI ecosystem, including:

AI providers seeking verifiable disclosure without watermark fragility

Publishers and platforms needing portable provenance metadata

Browser and tool developers enabling client-side verification

Policy and standards groups seeking a neutral, auditable mechanism

End users who want transparency without technical complexity

Why now?

AI-generated content is no longer edge-case — it is becoming the default.

As AI output scales:

Detection becomes less reliable

Trust shifts from content to provenance

Disclosure requirements are increasing globally

AICPM addresses this moment by offering a technical primitive that policy, platforms, and tools can align around — without central control or proprietary lock-in.

How AICPM fits into the broader landscape

AICPM is complementary, not competitive, with existing efforts:

It can coexist with watermarking

It supports emerging content authenticity initiatives

It provides a concrete, inspectable data model for disclosure

Think of AICPM as a checksum and signature layer for AI text provenance — simple enough to adopt, rigorous enough to trust.

Status

Reference architecture: ✔

Specification: ✔

Threat model: ✔

Governance and adoption model: ✔

The project is open, implementation-agnostic, and designed to evolve through community and standards engagement.

Learn more
https://github.com/Chattadude/aicpm

GitHub repository:
https://github.com/Chattadude/aicpm
