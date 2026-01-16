Threat Model — AICPM
1. Scope and Objectives

This document defines the threat model for AICPM (Authenticated AI Content Provenance Marking).

The objectives of this threat model are to:

Identify realistic adversaries and misuse scenarios

Clarify which attacks AICPM prevents, detects, or does not address

Set correct expectations for implementers, publishers, and regulators

Ensure transparency about residual risks and trust boundaries

AICPM is designed to provide cryptographically verifiable disclosure of AI-generated text, not to prevent all forms of deception or misuse.

2. Trust Model

AICPM assumes the following trust relationships:

Trusted

AI Provider Signing Service

Holds private signing keys

Generates signatures at content generation time

Cryptographic Primitives

SHA-256 for hashing

Ed25519 for digital signatures

Semi-Trusted

Publishers

May edit content

May attempt to minimize apparent AI usage

Are not trusted to self-report AI provenance

Untrusted

End-Users

Browsers

Client-side JavaScript

Content Editors / CMS Systems

Third-party scripts

No private keys or trust assumptions are placed in the browser.

3. Adversary Classes
3.1 Malicious Publisher

Capabilities

Can edit, delete, or rearrange text

Can strip metadata or HTML attributes

Can attempt to forge AI disclosure labels

Goals

Reduce apparent AI usage

Misrepresent AI-generated content as human-authored

3.2 Content Tamperer

Capabilities

Can modify AI-generated text after publication

Can copy AI text into new documents

Goals

Reuse AI content without attribution

Break provenance while preserving readability

3.3 Key Compromise Attacker

Capabilities

Gains access to a provider’s signing key

Goals

Forge AI provenance

Sign arbitrary content as “AI-generated”

3.4 Naïve or Malicious Verifier

Capabilities

Implements verification incorrectly

Ignores parts of the specification

Goals

False positives or false negatives

Selective enforcement

4. Threats Addressed by AICPM
4.1 Forged AI Disclosure Labels

Threat
Publishers falsely claim “low AI usage” or “human-only” authorship.

Mitigation

AI provenance is provider-signed

Signatures cannot be generated client-side

Verification is deterministic and public

Status: ✅ Mitigated

4.2 Post-Generation Text Modification

Threat
AI text is edited after generation to evade detection.

Mitigation

Hash mismatch invalidates signature

Modified chunks are still counted as AI-origin (edited)

Editing increases transparency rather than hiding provenance

Status: ✅ Detected and disclosed

4.3 Selective Deletion of AI Metadata

Threat
Publisher removes manifest or chunk attributes.

Mitigation

Missing provenance is explicitly detectable

Absence of provenance is a verifiable state

Verifiers MAY treat missing provenance as unknown or untrusted

Status: ⚠️ Detectable, not preventable

4.4 Client-Side Forgery

Threat
Browser scripts attempt to generate fake AI signatures.

Mitigation

No private keys in client

Verification uses public keys only

Forgery without provider keys is computationally infeasible

Status: ✅ Mitigated

5. Threats Explicitly Out of Scope
5.1 Human-Rewritten AI Content

If a human rewrites AI-generated text such that:

No original chunk text remains

No original hashes match

Then AICPM cannot and does not attempt to classify that text as AI-generated.

This is a conscious design choice.

Status: ❌ Out of scope

5.2 Optical Character Recognition (OCR) or Re-Typing

AI text that is:

Printed

Screenshotted

Re-typed manually

cannot retain cryptographic provenance.

Status: ❌ Out of scope

5.3 Non-Text Media

Images, audio, and video are not covered by this specification.

Status: ❌ Out of scope (future work)

5.4 Malicious AI Providers

If an AI provider intentionally:

Mislabels content

Signs human-written text as AI

Withholds signatures

AICPM does not prevent this.

Trust in providers is an external governance issue.

Status: ❌ Out of scope

6. Key Compromise Considerations

If a provider signing key is compromised:

Attackers MAY forge valid AI signatures

Verifiers MUST rely on key rotation and revocation

Manifests SHOULD include key_id for revocation support

AICPM supports:

Multiple active keys

Key rotation without breaking historical verification

7. Residual Risk Summary
Risk	Impact	Mitigation
Metadata stripping	Medium	Detectable absence
Human rewriting	High	Out of scope
Key compromise	High	Operational controls
Partial verifier adoption	Medium	Open spec + reference code
8. Design Philosophy

AICPM follows the principle:

“Make deception expensive, detectable, and explicit — not impossible.”

The goal is not perfect attribution, but:

Transparent disclosure

Verifiable provenance

Honest failure modes

9. Conclusion

AICPM meaningfully raises the cost of AI provenance manipulation while preserving editorial freedom and privacy.

It is designed to integrate into real publishing workflows, not idealized threat-free environments.
