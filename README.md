<h1 align="center">CVNoble · Code Showcase</h1>
<p align="center"><strong>Selected engineering examples from the ideas behind a professional CV-building product.</strong></p>
<p align="center"><a href="https://cvnoble.com">Explore CVNoble</a> · <a href="https://cvnoble.com/templates">Browse templates</a> · <a href="mailto:support@cvnoble.com">Contact</a></p>

## About CVNoble

**CVNoble** is a browser-based CV and resume builder owned by **Md. Junayet Hossai Mohit**. It helps users move from choosing a template to editing their experience, reviewing an A4 document and downloading a professional PDF. Users can begin as guests and sign in to save eligible CVs to their accounts.

The product combines structured content editing, photo and no-photo templates, design controls, live previews and searchable, watermark-free PDF export. Free and Pro workflows support different document needs, while native owner applications provide operational visibility into the service.

Visit **[cvnoble.com](https://cvnoble.com)** to use the complete product.

## About this repository

This is a deliberately limited **code showcase**, not the CVNoble application source or a self-hosting distribution. It contains independently written, standalone examples of two general engineering concerns:

- Fitting a document preview into a constrained viewport.
- Preparing a readable filename for a document download.

The examples use synthetic input, have no production credentials and do not connect to CVNoble or any external service. They demonstrate the concepts without including the production implementations.

## Product technology

The production product uses Next.js, React, TypeScript and Tailwind CSS for its website; Firebase for authentication and cloud document storage; and Cloudflare Workers/D1 for backend services. Creem handles billing. Native owner clients are built for macOS and Android.

**This sample package itself uses plain JavaScript and Node's built-in test runner.** It has no external runtime dependencies.

## Included examples

| File | Demonstrates |
| --- | --- |
| `src/preview-scale.mjs` | Fit-to-width/page calculations, input validation and bounded zoom |
| `src/document-filename.mjs` | Unicode-aware filename normalization and portable filename boundaries |
| `examples/demo.mjs  | Small, synthetic usage examples |
| `test/*.test.mjs` | Boundary cases for both utilities |

```text
CVNoble-Public-Showcase/
├── src/
│   ├── preview-scale.mjs
│   └── document-filename.mjs
├── examples/demo.mjs
├── test/
├── package.json
├── PACKAGE-MANIFEST.json
└── README.md
```

## Run locally

Use **Node.js 24 or later**. No dependency installation or account setup is needed.

```sh
npm test
npm run demo
```

Example:

```js
import { fitDocumentScale } from './src/preview-scale.mjs';
import { documentFilename } from './src/document-filename.mjs';

const scale = fitDocumentScale({
  pageWidth: 794,
  pageHeight: 1123,
  viewportWidth: 390,
  viewportHeight: 700,
  padding: 16,
  mode: 'page',
});

const filename = documentFilename('Alex Morgan — Resume');
```

These helpers do not render, save or export a CV. A production application needs its own user experience, rendering, authorization, persistence and service integrations.

## Scope and boundaries

The production frontend, original template catalog, visual design assets, animation system, document/PDF renderers, backend APIs, database schema, billing integration and native owner application source are **not included**. Neither are internal identifiers, operational data, customer information, real credentials, compiled website bundles or private Git history.

The full application is maintained separately in a private repository. Do not add its archive or source tree to this repository. Publicly posted code can be read and copied; keeping the production implementation separate limits what this showcase discloses.

## Ownership

**Owner:** Md. Junayet Hossai Mohit  
**Project:** CVNoble  
**Website:** https://cvnoble.com  
**Contact:** support@cvnoble.com

© 2026 CVNoble. All rights reserved. This repository does not grant a project-wide open-source license. Contact the owner to discuss reuse, collaboration or access to the product's private source.
