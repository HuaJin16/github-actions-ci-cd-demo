import assert from "node:assert/strict";
import test from "node:test";

import { getPassRate } from "../src/metrics.js";

test("getPassRate returns 50 for 2 of 4", () => {
  assert.equal(getPassRate(2, 4), 50);
});
