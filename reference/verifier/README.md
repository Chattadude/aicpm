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
