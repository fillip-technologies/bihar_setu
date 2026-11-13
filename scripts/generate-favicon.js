const fs = require('fs');
const zlib = require('zlib');

// 1. Read bihar-setu-navbar-logo.png to extract emblem
const buf = fs.readFileSync('src/assets/bihar-setu-navbar-logo.png');
let pos = 8;
const idats = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') idats.push(buf.slice(pos + 8, pos + 8 + len));
  pos += 12 + len;
}
const decompressed = zlib.inflateSync(Buffer.concat(idats));
const srcW = buf.readUInt32BE(16);
const srcH = buf.readUInt32BE(20);
const srcStride = srcW * 4 + 1;

// Emblem bounds: x: 4 to 149 y: 5 to 221 w: 145 h: 216
const embMinX = 4, embMaxX = 149, embMinY = 5, embMaxY = 221;
const embW = embMaxX - embMinX + 1;
const embH = embMaxY - embMinY + 1;

console.log('Emblem size:', embW, 'x', embH);

// Generate 256x256 favicon canvas
const dstSize = 256;
const dstStride = dstSize * 4 + 1;
const dstBuf = Buffer.alloc(dstSize * dstStride);

// Stylish circle in deep brand mahogany #521810 with subtle gold accent ring #CB9010
const cx = dstSize / 2;
const cy = dstSize / 2;
const radius = dstSize * 0.46; // circle radius ~118px

for (let y = 0; y < dstSize; y++) {
  dstBuf[y * dstStride] = 0; // filter byte
  for (let x = 0; x < dstSize; x++) {
    const idx = y * dstStride + 1 + x * 4;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= radius) {
      if (dist >= radius - 5) {
        const edgeAlpha = Math.min(1, radius - dist + 1);
        dstBuf[idx]   = 203; // R (Gold #CB9010)
        dstBuf[idx+1] = 144; // G
        dstBuf[idx+2] = 16;  // B
        dstBuf[idx+3] = Math.round(255 * edgeAlpha);
      } else {
        // Deep Royal Mahogany #521810
        dstBuf[idx]   = 82; // R
        dstBuf[idx+1] = 24; // G
        dstBuf[idx+2] = 16; // B
        dstBuf[idx+3] = 255;
      }
    } else if (dist < radius + 1.5) {
      const edgeAlpha = Math.max(0, 1 - (dist - radius) / 1.5);
      dstBuf[idx]   = 203;
      dstBuf[idx+1] = 144;
      dstBuf[idx+2] = 16;
      dstBuf[idx+3] = Math.round(255 * edgeAlpha);
    } else {
      dstBuf[idx+3] = 0; // Transparent
    }
  }
}

// Scale and place the emblem inside the circle
const targetH = Math.round(dstSize * 0.68); // ~174px
const scale = targetH / embH;
const targetW = Math.round(embW * scale);
const offsetX = Math.round((dstSize - targetW) / 2);
const offsetY = Math.round((dstSize - targetH) / 2);

console.log('Target emblem scaled size:', targetW, 'x', targetH, 'at offset:', offsetX, offsetY);

for (let dy = 0; dy < targetH; dy++) {
  const py = offsetY + dy;
  if (py < 0 || py >= dstSize) continue;
  const sy = Math.floor(dy / scale);
  if (sy >= embH) continue;

  for (let dx = 0; dx < targetW; dx++) {
    const px = offsetX + dx;
    if (px < 0 || px >= dstSize) continue;
    const sx = Math.floor(dx / scale);
    if (sx >= embW) continue;

    const srcIdx = (embMinY + sy) * srcStride + 1 + (embMinX + sx) * 4;
    const sa = decompressed[srcIdx + 3];
    if (sa > 10) {
      const sr = decompressed[srcIdx];
      const sg = decompressed[srcIdx + 1];
      const sb = decompressed[srcIdx + 2];

      const dstIdx = py * dstStride + 1 + px * 4;
      const da = dstBuf[dstIdx + 3];

      const normSA = sa / 255;
      const invSA = 1 - normSA;

      dstBuf[dstIdx]   = Math.round(sr * normSA + dstBuf[dstIdx] * invSA);
      dstBuf[dstIdx+1] = Math.round(sg * normSA + dstBuf[dstIdx+1] * invSA);
      dstBuf[dstIdx+2] = Math.round(sb * normSA + dstBuf[dstIdx+2] * invSA);
      dstBuf[dstIdx+3] = Math.max(da, sa);
    }
  }
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.slice(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function writePNG(path, w, h, bufData) {
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const compressed = zlib.deflateSync(bufData);
  const outPng = Buffer.concat([
    header,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
  fs.writeFileSync(path, outPng);
  console.log('Saved', path, 'size:', outPng.length);
}

// Ensure public directory exists
if (!fs.existsSync('public')) fs.mkdirSync('public');

writePNG('public/favicon.png', dstSize, dstSize, dstBuf);
writePNG('public/apple-touch-icon.png', dstSize, dstSize, dstBuf);

// Also generate SVG favicon with base64 embedded high-res emblem for maximum browser compatibility
const b64 = fs.readFileSync('public/favicon.png').toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="256" height="256" />
</svg>`;
fs.writeFileSync('public/favicon.svg', svg);
console.log('Saved public/favicon.svg');
