#!/usr/bin/env node
/**
 * Generates a 1200x630 OG social preview image using only Node.js built-ins.
 * Outputs: client/public/og-image.png
 */
const zlib = require('zlib');
const fs = require('fs');

const W = 1200;
const H = 630;

// ------------------------------------------------------------------
// CRC32 for PNG chunks
// ------------------------------------------------------------------
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const tb = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([tb, data])));
  return Buffer.concat([len, tb, data, crcBuf]);
}

// ------------------------------------------------------------------
// Image buffer (RGB, 3 bytes/pixel)
// ------------------------------------------------------------------
const img = Buffer.alloc(W * H * 3);

function setPixel(x, y, r, g, b) {
  if (x < 0 || x >= W || y < 0 || y >= H) return;
  const i = (y * W + x) * 3;
  img[i] = r; img[i+1] = g; img[i+2] = b;
}

function fillRect(x0, y0, w, h, r, g, b) {
  for (let y = y0; y < y0 + h; y++)
    for (let x = x0; x < x0 + w; x++)
      setPixel(x, y, r, g, b);
}

function drawRoundRect(x0, y0, w, h, radius, r, g, b) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) {
      const dx = Math.min(x - x0, x0 + w - 1 - x);
      const dy = Math.min(y - y0, y0 + h - 1 - y);
      if (dx < radius && dy < radius) {
        const dist = Math.sqrt((radius - dx - 1) ** 2 + (radius - dy - 1) ** 2);
        if (dist > radius - 1) continue;
      }
      setPixel(x, y, r, g, b);
    }
  }
}

// ------------------------------------------------------------------
// Bitmap font glyphs (7-wide × 9-tall, 1 = filled)
// ------------------------------------------------------------------
const GLYPHS = {
  R: [
    [1,1,1,1,1,0,0],
    [1,0,0,0,0,1,0],
    [1,0,0,0,0,1,0],
    [1,1,1,1,1,0,0],
    [1,0,0,1,0,0,0],
    [1,0,0,0,1,0,0],
    [1,0,0,0,0,1,0],
    [1,0,0,0,0,1,0],
    [0,0,0,0,0,0,0],
  ],
  H: [
    [1,0,0,0,0,1,0],
    [1,0,0,0,0,1,0],
    [1,0,0,0,0,1,0],
    [1,1,1,1,1,1,0],
    [1,0,0,0,0,1,0],
    [1,0,0,0,0,1,0],
    [1,0,0,0,0,1,0],
    [1,0,0,0,0,1,0],
    [0,0,0,0,0,0,0],
  ],
};

function drawGlyph(glyph, startX, startY, scale, r, g, b) {
  const rows = GLYPHS[glyph];
  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[row].length; col++) {
      if (rows[row][col]) {
        fillRect(startX + col * scale, startY + row * scale, scale, scale, r, g, b);
      }
    }
  }
}

// ------------------------------------------------------------------
// Compose image
// ------------------------------------------------------------------

// Dark background
fillRect(0, 0, W, H, 26, 26, 26);   // #1A1A1A

// Subtle gradient-like strips at the top & bottom
for (let y = 0; y < 6; y++) fillRect(0, y, W, 1, 45 - y*3, 45 - y*3, 45 - y*3);
for (let y = H - 6; y < H; y++) fillRect(0, y, W, 1, 26 + (H-y)*3, 26 + (H-y)*3, 26 + (H-y)*3);

// Central rounded card
drawRoundRect(440, 195, 320, 240, 28, 38, 38, 38);

// Badge / circle background for initials
const cx = 600, cy = 280, radius = 88;
for (let y = cy - radius; y <= cy + radius; y++) {
  for (let x = cx - radius; x <= cx + radius; x++) {
    const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    if (d <= radius) setPixel(x, y, 60, 60, 60);
  }
}

// Draw "RH" initials — each glyph is 7×9 cells at scale=10 → 70×90 px
const SCALE = 10;
const glyphW = 7 * SCALE;  // 70
const glyphH = 9 * SCALE;  // 90
const totalW = glyphW * 2 + SCALE * 2; // two glyphs + 1-cell gap
const startX = cx - Math.floor(totalW / 2);
const startY = cy - Math.floor(glyphH / 2);

drawGlyph('R', startX,            startY, SCALE, 255, 255, 255);
drawGlyph('H', startX + glyphW + SCALE * 2, startY, SCALE, 255, 255, 255);

// Decorative horizontal rule below circle
fillRect(460, 395, 280, 3, 80, 80, 80);

// ------------------------------------------------------------------
// Encode as PNG
// ------------------------------------------------------------------
const rows = [];
for (let y = 0; y < H; y++) {
  rows.push(Buffer.from([0]));  // filter: None
  rows.push(img.slice(y * W * 3, (y + 1) * W * 3));
}
const raw = Buffer.concat(rows);
const compressed = zlib.deflateSync(raw, { level: 6 });

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr.writeUInt8(8,  8);  // 8-bit depth
ihdr.writeUInt8(2,  9);  // color type: RGB
ihdr.writeUInt8(0, 10);  // deflate
ihdr.writeUInt8(0, 11);  // adaptive filtering
ihdr.writeUInt8(0, 12);  // no interlace

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),  // PNG signature
  pngChunk('IHDR', ihdr),
  pngChunk('IDAT', compressed),
  pngChunk('IEND', Buffer.alloc(0)),
]);

fs.writeFileSync('client/public/og-image.png', png);
console.log(`Generated client/public/og-image.png  (${(png.length / 1024).toFixed(1)} KB)`);
