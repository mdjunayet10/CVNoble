/** A standalone download-name example; it grants no filesystem access. */
export function documentFilename(title, { extension = 'pdf', maxCharacters = 80 } = {}) {
  if (typeof title !== 'string') throw new TypeError('title must be a string');
  if (!['pdf', 'json'].includes(extension)) throw new TypeError('extension must be pdf or json');
  if (!Number.isInteger(maxCharacters) || maxCharacters < 8 || maxCharacters > 160) throw new RangeError('maxCharacters must be an integer between 8 and 160');
  let stem = title.normalize('NFKC')
    .replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/gu, '')
    .replace(/[<>:"/\\|?*]+/gu, '-')
    .replace(/\s+/gu, ' ')
    .replace(/^[. -]+|[. -]+$/gu, '');
  const budget = maxCharacters - extension.length - 1;
  stem = Array.from(stem).slice(0, budget).join('').replace(/[. -]+$/gu, '') || (budget >= 5 ? 'my-cv' : 'cv');
  if (/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/iu.test(stem)) {
    stem = ('cv-' + stem).slice(0, budget);
  }
  return `${stem}.${extension}`;
}
