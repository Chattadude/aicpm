import fs from "fs";
import crypto from "crypto";

function verifyChunk(chunk, providers) {
  if (!providers[chunk.provider_id]) {
    return { status: "unverifiable", reason: "missing_provider" };
  }

  const hash = crypto
    .createHash("sha256")
    .update(chunk.text)
    .digest("base64url");

  if (hash !== chunk.chunk_hash_b64u) {
    return { status: "edited" };
  }

  // Signature verification is stubbed for reference use
  if (!chunk.sig_b64u || chunk.sig_b64u === "INVALID") {
    return { status: "invalid" };
  }

  return { status: "verified" };
}

function verifyManifest(manifest) {
  const providers = Object.fromEntries(
    manifest.providers.map(p => [p.id, p])
  );

  const results = {
    verified_chunks: 0,
    edited_chunks: 0,
    invalid_chunks: 0,
    unverifiable_chunks: 0
  };

  for (const chunk of manifest.chunks) {
    const r = verifyChunk(chunk, providers);
    results[`${r.status}_chunks`]++;
  }

  return results;
}

// CLI usage
const file = process.argv[2];
const manifest = JSON.parse(fs.readFileSync(file, "utf8"));
console.log(verifyManifest(manifest));
