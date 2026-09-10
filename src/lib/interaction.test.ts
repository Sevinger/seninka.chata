import assert from "node:assert/strict";
import test from "node:test";

import { carouselStep, heroShouldAutoplay } from "./interaction.ts";

test("reduced motion keeps the hero video paused", () => {
  assert.equal(heroShouldAutoplay(true), false);
  assert.equal(heroShouldAutoplay(false), true);
});

test("carousel advances by one visible card plus its gap", () => {
  assert.equal(carouselStep({ cardWidth: 640, gap: 24 }, "next"), 664);
  assert.equal(carouselStep({ cardWidth: 640, gap: 24 }, "previous"), -664);
});

test("carousel does not emit a negative-zero offset", () => {
  assert.equal(Object.is(carouselStep({ cardWidth: 0, gap: 0 }, "previous"), -0), false);
});
