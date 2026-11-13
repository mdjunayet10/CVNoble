import { fitDocumentScale } from '../src/preview-scale.mjs';
import { documentFilename } from '../src/document-filename.mjs';

const viewport = { pageWidth: 794, pageHeight: 1123, viewportWidth: 390, viewportHeight: 700, padding: 16 };
console.log('Download filename:', documentFilename('Alex Morgan — Resume'));
console.log('Fit page scale:', fitDocumentScale({ ...viewport, mode: 'page' }).toFixed(3));
console.log('Fit width scale:', fitDocumentScale({ ...viewport, mode: 'width' }).toFixed(3));
