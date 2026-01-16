# Why Not Watermarks?

This document explains why **AICPM intentionally does not rely on watermarking or post-hoc AI detection techniques** for AI-generated content disclosure.

While watermarking and detection are often proposed as solutions to AI provenance, they fail to meet the requirements for durability, verifiability, and trust at internet scale.

AICPM addresses these limitations by shifting disclosure to a **cryptographically signed, creation-time provenance model**.

---

## 1. What Is a Watermark?

In the context of AI-generated content, a watermark is typically:

- A statistical pattern embedded into generated text, images, or audio
- A signal detectable by a proprietary or semi-public classifier
- A probabilistic indicator rather than a verifiable fact

Watermarks are usually applied:
- At generation time (model-level watermarking), or
- Post-generation (content transformation watermarking)

---

## 2. Fundamental Limitations of Watermarking

### 2.1 Watermarks Are Fragile

Watermarks are inherently vulnerable to benign transformations:

- Copy/paste
- Reformatting
- Translation
- Summarization
- OCR / retyping
- Editing or paraphrasing

Even minimal human or automated edits can degrade or erase watermark signals entirely.

A disclosure system that fails under normal editing workflows cannot serve as a durable provenance mechanism.

---

### 2.2 Watermarks Are Probabilistic, Not Verifiable

Watermark detection produces likelihoods, not proofs:

- False positives are unavoidable
- False negatives increase with content length and edits
- Detection thresholds are subjective and tunable

This creates ambiguity rather than trust.

AICPM requires **deterministic verification**, not statistical inference.

---

### 2.3 Watermarks Require Centralized Trust

Watermarking systems rely on:

- Proprietary detectors
- Secret model parameters
- Vendor-controlled verification services

This creates a single point of trust and failure.

Independent third parties cannot verify provenance without trusting the watermark issuer’s tooling and claims.

AICPM instead uses **public-key cryptography**, enabling verification by anyone, anywhere, without vendor dependency.

---

### 2.4 Watermarks Do Not Bind Identity

Watermarks typically do not cryptographically bind:

- The AI provider
- The model identity
- The generation session
- The signing key

As a result:
- Attribution is weak or absent
- Accountability is unclear
- Multiple parties can claim or deny authorship

AICPM explicitly binds provenance to a **provider-controlled signing key and model identifier**.

---

## 3. Limitations of Post-Hoc AI Detection

Watermarking is often paired with AI “detectors.” These approaches suffer from additional failures:

- Detectors degrade rapidly as models evolve
- Adversarial prompting reduces detection accuracy
- Human-written content is increasingly misclassified
- Detectors cannot distinguish edited AI content from human text

Detection answers the wrong question:
> “Does this look like AI?”

AICPM answers the correct question:
> “Was this content declared and signed as AI-generated at creation time?”

---

## 4. Why Provenance Beats Watermarking

| Property | Watermarks | AICPM |
|--------|-----------|-------|
| Survives editing | ❌ | ✅ |
| Deterministic verification | ❌ | ✅ |
| Public verification | ❌ | ✅ |
| Provider accountability | ❌ | ✅ |
| Works at text granularity | ⚠️ | ✅ |
| Browser-verifiable | ❌ | ✅ |
| Tamper-evident | ❌ | ✅ |

AICPM treats AI provenance as a **metadata integrity problem**, not a signal detection problem.

---

## 5. AICPM’s Design Choice

AICPM intentionally avoids watermarking because:

- Disclosure must survive real-world usage
- Verification must not require proprietary tools
- Trust must be cryptographic, not probabilistic
- Provenance must be explicit, not inferred

Watermarks may continue to exist as **supplementary signals**, but they cannot serve as the foundation for trustworthy AI disclosure.

AICPM provides that foundation.

---

## 6. Summary

Watermarking attempts to *hide* signals inside content.

AICPM does the opposite:
- It **declares** provenance
- It **signs** provenance
- It **verifies** provenance

At internet scale, transparency beats concealment.

