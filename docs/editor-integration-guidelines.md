Editor Integration Guidelines

This document provides implementation guidance for integrating AICPM (Authenticated AI Content Provenance Marking) into text editors, content management systems, and authoring tools.

These guidelines are non-normative but represent best practices derived from the AICPM reference implementation.

1. Scope

These guidelines apply to:

Web-based editors (e.g., CMS, publishing tools)

Desktop editors (e.g., word processors, markdown editors)

Hybrid AI-assisted writing environments

They do not prescribe UI design, editorial policy, or disclosure language.

2. Integration Goals

An editor integrating AICPM SHOULD aim to:

Preserve cryptographic provenance across editing workflows

Avoid disrupting natural author behavior

Clearly distinguish human-authored and AI-origin content

Enable verifiable disclosure at export time

An editor MUST NOT:

Modify AICPM metadata without invalidating signatures

Attempt to “repair” broken signatures

Generate provenance on behalf of an AI provider

3. Chunk Lifecycle in Editors
3.1 Chunk Insertion

When AI-generated text is inserted:

The editor SHOULD treat each AI chunk as an atomic provenance unit

The editor SHOULD store:

Original chunk text

Associated AICPM metadata

The editor MUST NOT re-sign or alter metadata

Editors MAY visually tag inserted chunks (e.g., subtle indicators).

3.2 Chunk Editing

If a user edits AI-origin text:

The editor MUST mark the chunk as edited

The original signature MUST be preserved but considered invalid

The editor MUST NOT delete provenance data

This allows downstream verifiers to distinguish:

AI-origin (edited)

AI-origin (unmodified)

3.3 Chunk Deletion

If an AI chunk is deleted:

The editor SHOULD remove the chunk from the document body

The editor SHOULD remove the corresponding chunk entry from the manifest

No disclosure is required for deleted content

4. Storage Model

Editors SHOULD maintain an internal representation that associates:

Text ranges

Chunk identifiers

Original hashes

Edit state

This association MAY be implemented via:

Inline markers

Sidecar metadata

Internal document models

The storage model MUST survive copy, paste, and undo operations within the editor.

5. Export Requirements

At export time (HTML, Markdown, PDF, etc.):

The editor MUST embed a complete AICPM manifest

The manifest MUST reflect the final document state

Chunk order MUST match document order

Edited chunks MUST be flagged implicitly via hash mismatch

The manifest MUST be embedded as a non-executing block.

6. Multi-Provider Support

Editors MAY support multiple AI providers.

In such cases:

Each chunk MUST reference its originating provider

Providers MUST be declared once in the manifest

Keys MUST NOT be merged or normalized

Editors SHOULD NOT assume trust equivalence between providers.

7. User Experience Considerations (Non-Normative)

Editors MAY:

Show inline indicators for AI-origin text

Provide per-chunk inspection panels

Offer aggregate AI-percentage summaries

Allow users to filter or review AI-origin content

Editors SHOULD avoid:

Alarmist warnings

Mandatory disclosure prompts

Blocking workflows based on AI usage

AICPM is designed to support disclosure without disruption.

8. Collaboration and Versioning

In collaborative editing environments:

Provenance metadata SHOULD be merged deterministically

Concurrent edits MUST correctly invalidate affected chunks

Chunk identifiers SHOULD remain stable across versions

Editors MUST NOT attribute AI provenance to human edits.

9. Failure Modes

If provenance data becomes inconsistent:

The editor SHOULD preserve the data verbatim

The editor SHOULD warn that verification may fail

The editor MUST NOT silently discard metadata

Verification is the responsibility of the verifier, not the editor.

10. Compliance Statement

An editor MAY claim “AICPM Editor-Compatible” if it:

Preserves AICPM metadata through edit cycles

Correctly marks edited AI-origin text

Emits valid manifests at export

Does not fabricate or alter signatures

11. Reference Implementations

The AICPM repository includes:

A web-based reference editor

Export logic demonstrating manifest injection

Verifier-compatible output examples

These implementations are illustrative, not prescriptive.

12. Design Philosophy

AICPM editor integration is guided by three principles:

Do not interfere with authorship

Do not guess

Do not hide provenance

Editors are stewards of metadata—not arbiters of truth.

Related Documents

spec.md

architecture.md

reference-verifier.md

interop-examples.md

why-not-watermarks.md
