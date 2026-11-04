const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const ts = require("typescript");
const filename = path.resolve(__dirname, "../lib/branchDirectory.ts");
const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {compilerOptions: {module: ts.ModuleKind.CommonJS, esModuleInterop: true}}).outputText;
const moduleShim = {exports: {}};
new Function("require", "module", "exports", compiled)(createRequire(filename), moduleShim, moduleShim.exports);
const {branchDirectory, hasCoordinates, mapsSearchUrl, directionsUrl} = moduleShim.exports;
const origin = {lat: 23.7600768, lng: 90.3479296};
assert.equal(branchDirectory.length, 137);
assert.equal(new Set(branchDirectory.map(b => b.id)).size, 137);
for (const branch of branchDirectory) {
  assert(hasCoordinates(branch), branch.id + " needs a valid pin");
  const search = new URL(mapsSearchUrl(branch));
  const route = new URL(directionsUrl(branch, origin));
  assert.equal(route.searchParams.get("origin"), origin.lat + "," + origin.lng);
  if (branch.googlePlaceId) {
    assert.equal(search.searchParams.get("query_place_id"), branch.googlePlaceId);
    assert.equal(route.searchParams.get("destination_place_id"), branch.googlePlaceId);
  } else {
    const pin = branch.lat + "," + branch.lng;
    assert.equal(search.searchParams.get("query"), pin, branch.id + " search must retain its pin");
    assert.equal(route.searchParams.get("destination"), pin, branch.id + " directions must retain its pin");
    assert(!search.searchParams.has("query_place_id"));
    assert(!route.searchParams.has("destination_place_id"));
  }
}
const sample = branchDirectory.find(b => b.id === "verc-0003");
const updated = {...sample, lat: sample.lat + 0.01, lng: sample.lng + 0.01};
assert.notEqual(mapsSearchUrl(sample), mapsSearchUrl(updated));
assert.notEqual(directionsUrl(sample), directionsUrl(updated));
console.log("PASS: all 137 offices retain the same destination across map links and directions; CMS pin edits update both links.");
