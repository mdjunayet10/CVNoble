import test from 'node:test';
import assert from 'node:assert/strict';
import { fitDocumentScale } from '../src/preview-scale.mjs';

const page = { pageWidth: 800, pageHeight: 1200, viewportWidth: 400, viewportHeight: 300 };
test('fit page keeps both document dimensions inside the viewport', () => {
  const scale = fitDocumentScale(page);
  assert.equal(scale, 0.25);
  assert.ok(800 * scale <= 400 && 1200 * scale <= 300);
});
test('fit width may exceed viewport height and accounts for side padding', () => {
  assert.equal(fitDocumentScale({ ...page, mode: 'width', padding: 20 }), 0.45);
});
test('zoom bounds contain very small and very large viewports', () => {
  assert.equal(fitDocumentScale({ ...page, viewportWidth: 1, viewportHeight: 1 }), 0.1);
  assert.equal(fitDocumentScale({ ...page, viewportWidth: 8000, viewportHeight: 12000 }), 2);
  assert.equal(fitDocumentScale({ ...page, padding: 1000 }), 0.1);
});
test('invalid geometry, reversed limits and unsupported modes are rejected', () => {
  for (const value of [0, -1, NaN, Infinity]) assert.throws(() => fitDocumentScale({ ...page, pageWidth: value }), RangeError);
  assert.throws(() => fitDocumentScale({ ...page, minScale: 3, maxScale: 2 }), RangeError);
  assert.throws(() => fitDocumentScale({ ...page, padding: -1 }), RangeError);
  assert.throws(() => fitDocumentScale({ ...page, mode: 'unknown' }), TypeError);
});
