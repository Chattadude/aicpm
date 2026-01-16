# Standardization Path

This document outlines a pragmatic, phased path for standardizing **AICPM (Authenticated AI Content Provenance Marking)** across platforms, providers, and regulatory environments.

AICPM is designed from the outset to be **standardizable**, vendor-neutral, and compatible with existing web and cryptographic ecosystems.

---

## 1. Design Goals for Standardization

AICPM is intentionally structured to satisfy common standards requirements:

- Open, inspectable data formats
- Cryptographically verifiable claims
- No reliance on proprietary detection
- Backward-compatible adoption
- Incremental deployability
- Clear separation of concerns (generation, signing, verification, display)

The goal is not to replace existing efforts, but to **provide a missing, composable primitive** for AI content provenance.

---

## 2. Relationship to Existing Efforts

AICPM is complementary to — not competitive with — current provenance initiatives.

### 2.1 C2PA and Media Provenance

C2PA focuses primarily on **media assets** (images, video, audio) using embedded manifests and asset binding.

AICPM extends similar provenance principles to:

- Text content
- Chunk-level granularity
- Streaming and conversational outputs
- Editor-preserving workflows

Where C2PA embeds provenance *into assets*, AICPM embeds provenance *alongside content* in a format suitable for text and web documents.

---

### 2.2 AI Disclosure and Labeling Frameworks

Many regulatory and policy proposals require AI disclosure but do not specify *how* disclosure should be implemented.

AICPM provides a **technical reference architecture** that policy frameworks can reference without mandating a specific vendor or detector.

---

## 3. Proposed Standardization Phases

### Phase 1: Open Reference Specification

**Status:** In progress

Deliverables:
- Public specification (`spec.md`)
- Threat model (`threat-model.md`)
- Reference architecture (`architecture.md`)
- Verification logic examples
- Canonical JSON schema

Outcome:
- Independent implementations possible
- Early feedback from platforms and researchers

---

### Phase 2: Voluntary Adoption and Tooling

Goals:
- Browser-side verifiers
- Editor and CMS plugins
- Provider-side signing libraries
- Open test vectors

Key principle:
> Adoption must not require coordination across providers.

Any AI provider can sign AICPM manifests independently.

---

### Phase 3: Multi-Stakeholder Working Group

Potential hosts:
- W3C Community Group
- IETF Working Group
- Open-source foundation (e.g., Linux Foundation)
- Cross-industry consortium

Scope:
- Schema stabilization
- Key discovery mechanisms
- Interop test suites
- Versioning and backward compatibility rules

AICPM is designed so this phase can begin **after real-world deployment**, not before.

---

### Phase 4: Formal Standard Submission

Potential targets:
- W3C Recommendation (web provenance / metadata)
- IETF RFC (signed content manifests)
- ISO/IEC technical report (AI governance infrastructure)

At this stage, AICPM may become:
- A standalone standard, or
- A modular extension referenced by broader provenance standards

---

## 4. Governance Principles

AICPM standardization should adhere to the following principles:

- **Neutrality:** No single vendor controls verification
- **Transparency:** All cryptographic claims are inspectable
- **Extensibility:** New fields and use cases can be added safely
- **Minimalism:** Core fields remain small and stable
- **Human Interpretability:** Provenance remains readable, not opaque

---

## 5. Regulatory Alignment

AICPM is designed to align with emerging regulatory needs:

- AI disclosure requirements
- Auditability and traceability
- Platform accountability
- Consumer transparency

Importantly, AICPM enables **technical compliance without behavioral enforcement**:
- No content blocking
- No probabilistic judgments
- No centralized censorship

Regulators can require *declaration*, not *detection*.

---

## 6. Backward Compatibility and Evolution

AICPM includes explicit versioning:

```json
"aicpm_version": "0.1"
