# DT Feed Website (Mock)

Mock marketing-style vulnerability feed experience with searchable records, qualitative runtime context, and gated Dynatrace teaser elements.

## Prerequisites

- Node.js 20+
- npm (bundled with Node.js)

Check your versions:

```bash
node -v
npm -v
```

## Run locally

1. Open a terminal in this project folder:

```bash
cd "/Users/thomas.siegl/Library/CloudStorage/OneDrive-Dynatrace/Documents/GitHub/DT-Feed-Website"
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app:

- http://localhost:3000

## Quick route checks

- Home: http://localhost:3000/
- Vulnerability Feed: http://localhost:3000/vulnerability-feed
- Methodology: http://localhost:3000/vulnerability-feed/methodology
- Example vulnerability detail: http://localhost:3000/vulnerability-feed/vulnerabilities/dtvf-2026-0001
- Example package detail: http://localhost:3000/vulnerability-feed/packages/npm/lodash

## Useful scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Troubleshooting

If `npm` is not found, install Node.js from the official website, then restart your terminal and re-run the commands above.
