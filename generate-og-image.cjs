#!/usr/bin/env node
/**
 * Generates a 1200x630 OG social preview image using sharp + SVG rendering.
 * Outputs: client/public/og-image.png
 */
const sharp = require('sharp');
const path  = require('path');

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#0A0A0A"/>
  <text
    x="50%"
    y="54%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="340"
    font-weight="400"
    letter-spacing="16"
    fill="#FFFFFF"
  >RH</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(__dirname, 'client/public/og-image.png'))
  .then(info => console.log(`Generated og-image.png  ${info.width}x${info.height}`))
  .catch(err => { console.error(err); process.exit(1); });
