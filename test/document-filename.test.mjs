import test from 'node:test';
import assert from 'node:assert/strict';
import { documentFilename } from '../src/document-filename.mjs';

test('readable Unicode names remain readable', () => {
  assert.equal(documentFilename('  Alex   Morgan  '), 'Alex Morgan.pdf');
  assert.equal(documentFilename('আমার জীবনবৃত্তান্ত'), 'আমার জীবনবৃত্তান্ত.pdf');
});
test('path separators, controls and empty input do not produce a path', () => {
  const value = documentFilename('../Alex/Resume\\Final\u0000');
  assert.doesNotMatch(value, /[\/\\\u0000]/u);
  assert.equal(documentFilename(' ... '), 'my-cv.pdf');
});
test('Windows device names receive a safe prefix', () => {
  assert.equal(documentFilename('CON'), 'cv-CON.pdf');
  assert.equal(documentFilename('LPT1.notes'), 'cv-LPT1.notes.pdf');
});
test('length includes the extension and valid JSON downloads are supported', () => {
  assert.ok(Array.from(documentFilename('Long name '.repeat(50), { maxCharacters: 24 })).length <= 24);
  assert.equal(documentFilename('Example', { extension: 'json' }), 'Example.json');
  assert.ok(documentFilename('', { extension: 'json', maxCharacters: 8 }).length <= 8);
});
test('non-string input, unsafe extensions and invalid length limits are rejected', () => {
  assert.throws(() => documentFilename(null), TypeError);
  assert.throws(() => documentFilename('Example', { extension: '../html' }), TypeError);
  assert.throws(() => documentFilename('Example', { maxCharacters: 3 }), RangeError);
});
