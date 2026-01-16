Frequently Asked Questions (FAQ)

This document answers common questions about AICPM (Authenticated AI Content Provenance Marking), its design decisions, and its intended use.

What problem does AICPM solve?

AICPM provides a cryptographically verifiable way to disclose AI-generated text at the content level, rather than relying on platform trust, watermarking, or unverifiable claims.

It enables:

Transparent disclosure of AI-origin content

Tamper-resistant provenance

Verification without platform lock-in

Is AICPM a watermarking system?

No.

AICPM does not modify text to embed hidden signals.
Instead, it attaches signed provenance metadata that travels with the content.

See why-not-watermarks.md for a detailed comparison.

Does AICPM detect AI-generated content?

No.

AICPM does not perform detection or classification.
It records verifiable provenance at generation time, not probabilistic inference after the fact.

Who creates the AICPM signature?

Only the AI provider that generated the content can create a valid signature.

Editors, publishers, and users cannot fabricate AI provenance under AICPM.

What happens if AI-generated text is edited?

If AI-origin text is edited:

The original signature becomes invalid

The content remains marked as AI-origin

Verifiers can distinguish edited vs. unedited AI content

This preserves honesty without penalizing normal editing.

Can AICPM be removed or stripped?

Yes—like any metadata, AICPM can be removed.

However:

Removal is detectable

No false “human-only” claims can be created

Platforms cannot forge low-AI labels

AICPM is designed to prevent lying, not to enforce compliance.

Does AICPM track users or collect personal data?

No.

AICPM contains no user identifiers, no IP data, and no tracking signals.
It records only:

Provider identity

Model identity

Cryptographic hashes

Timestamps

Is AICPM tied to a specific AI company?

No.

AICPM is provider-agnostic and supports multiple AI providers in a single document.

Each provider maintains its own keys and trust boundaries.

How is AICPM verified?

Verification is performed by a separate verifier that:

Parses the embedded manifest

Recomputes hashes

Validates signatures using provider public keys

Produces human-readable results

See reference-verifier.md.

Does AICPM require an internet connection?

No.

Verification can be performed offline once provider public keys are available.

Can AICPM be used for images, audio, or video?

The current specification applies to text content.

The architecture is extensible, but non-text media formats are out of scope for this version.

How is AICPM different from platform labels like “AI-generated”?

Platform labels are:

Centralized

Non-portable

Non-verifiable

AICPM is:

Cryptographically verifiable

Portable across platforms

Independent of hosting or policy

Does AICPM enforce disclosure?

No.

AICPM enables verifiable disclosure but does not mandate behavior.

It is compatible with voluntary adoption, regulation, and platform policy.

Is AICPM a legal or regulatory standard?

Not currently.

AICPM is a technical reference architecture intended to inform:

Standards bodies

Policymakers

Industry adoption

See standardization-path.md.

Is AICPM compatible with human-only content?

Yes.

Documents with no AI-origin content simply omit AICPM manifests.

No negative inference is made.

Can AICPM be gamed?

AICPM prevents:

Forged AI labels

False low-AI claims

Post-hoc manipulation of provenance

It does not prevent bad actors from omitting metadata entirely.

This is a governance problem, not a cryptographic one.

Why chunk-level provenance?

Chunk-level provenance allows:

Partial AI assistance disclosure

Honest mixed-authorship representation

Precise attribution without exaggeration

Whole-document labels are insufficient for modern workflows.

Is AICPM final?

No.

AICPM is intentionally:

Versioned

Extensible

Open to iteration

This repository represents a starting point, not a closed specification.

How can I contribute?

Contributions are welcome in the form of:

Issues

Pull requests

Design critiques

Interop experiments

See governance.md for contribution guidelines.

Where should I start?

Recommended reading order:

one-page-explainer.md

architecture.md

spec.md

why-not-watermarks.md

editor-integration-guidelines.md
