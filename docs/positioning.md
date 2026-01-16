# AICPM Positioning & Rationale

## What AICPM Is

**AICPM (Authenticated AI Content Provenance Marking)** is an open, cryptographically verifiable architecture for disclosing AI-generated text provenance at the content level.

It enables **transparent, tamper-resistant, human-readable “AI nutrition labels”** without relying on detection, watermarking, or centralized authorities.

AICPM is designed to work **at the point of generation**, not after the fact.

---

## What Problem AICPM Solves

Current approaches to AI disclosure rely on one or more flawed assumptions:

- That AI-generated content can be reliably *detected* after publication
- That platforms can or should centrally label all content
- That watermarking survives copy, paste, edits, or transformations
- That disclosure requires surveillance or identity tracking

In practice, these approaches fail under routine user behavior.

**AICPM addresses a different question entirely:**

> “If AI-generated content *wants* to disclose its provenance, how can that disclosure remain verifiable, durable, and trustworthy?”

---

## What AICPM Is *Not*

AICPM is explicitly **not**:

- ❌ An AI detector
- ❌ A watermarking system
- ❌ A content moderation tool
- ❌ A surveillance or identity system
- ❌ A centralized registry or authority
- ❌ A regulatory enforcement mechanism

AICPM does **not** claim to identify all AI content.  
It enables **authentic disclosure**, not coercive labeling.

---

## Core Design Principles

### 1. Provenance, Not Detection

AICPM treats provenance as a **cryptographic fact**, not a probabilistic guess.

If content carries an AICPM manifest, its origin can be verified.  
If it does not, AICPM makes no claim.

---

### 2. Provider-Signed, Not Platform-Imposed

Signatures originate from the AI provider at generation time.

Platforms and browsers verify — they do not assert authorship.

This avoids:
- platform liability
- editorial interference
- retroactive labeling

---

### 3. Editor-Preserving by Default

Content edits:
- invalidate signatures **locally**
- do not break surrounding content
- do not prevent publication

This reflects real-world author workflows.

---

### 4. Human-Readable Transparency

AICPM manifests are:
- inspectable
- auditable
- understandable by non-experts

No opaque scoring systems.  
No black-box classifiers.

---

### 5. Decentralized Trust Model

Trust is established through:
- public keys
- cryptographic verification
- open specifications

There is no root authority and no single point of failure.

---

## Why AICPM Instead of Watermarking

| Approach | Weakness |
|--------|----------|
| Watermarking | Fragile under copy/edit |
| Detection | Probabilistic and adversarial |
| Platform labels | Centralized and inconsistent |
| Metadata-only | Easily stripped |

**AICPM differs fundamentally**:  
It binds provenance to content *cryptographically*, not heuristically.

---

## Compatibility with Existing Efforts

AICPM is complementary to:

- C2PA (media provenance)
- Platform disclosure policies
- Regulatory transparency requirements

It fills a gap specifically for **text-based AI content**, where existing provenance frameworks are limited.

---

## Intended Adoption Path

AICPM is designed for voluntary, incremental adoption by:

- AI model providers
- Editors and publishing tools
- Browser vendors
- Standards bodies
- Researchers and journalists

Adoption does **not** require:
- mandates
- exclusive agreements
- platform lock-in

---

## Why This Matters

AI-generated text is becoming indistinguishable from human writing — and that is not inherently bad.

The risk arises when **authorship claims become unverifiable**.

AICPM does not attempt to control speech.

It preserves **choice**:
- choice to disclose
- choice to verify
- choice to trust

---

## One-Sentence Summary

> **AICPM is a cryptographically verifiable way for AI-generated text to carry its own proof of origin — without surveillance, detection, or central authority.**
