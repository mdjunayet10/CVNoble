/** A standalone viewport-fitting example; not the production preview engine. */
export function fitDocumentScale({ pageWidth, pageHeight, viewportWidth, viewportHeight, mode = 'page', padding = 0, minScale = 0.1, maxScale = 2 }) {
  const dimensions = { pageWidth, pageHeight, viewportWidth, viewportHeight, minScale, maxScale };
  for (const [name, value] of Object.entries(dimensions)) {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError(`${name} must be a positive finite number`);
  }
  if (!Number.isFinite(padding) || padding < 0) throw new RangeError('padding must be a non-negative finite number');
  if (minScale > maxScale) throw new RangeError('minScale must not exceed maxScale');
  if (mode !== 'page' && mode !== 'width') throw new TypeError('mode must be page or width');
  const availableWidth = Math.max(0, viewportWidth - 2 * padding);
  const availableHeight = Math.max(0, viewportHeight - 2 * padding);
  const widthScale = availableWidth / pageWidth;
  const requested = mode === 'width' ? widthScale : Math.min(widthScale, availableHeight / pageHeight);
  return Math.min(maxScale, Math.max(minScale, requested));
}
