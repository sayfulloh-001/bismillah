const fs = require('fs');
const zlib = require('zlib');

function cropPNG(inputPath, outputPath, cropX, cropY, cropW, cropH) {
  const buf = fs.readFileSync(inputPath);
  let pos = 8;
  let width, height, bitDepth, colorType;
  let idatBuffers = [];

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
      bitDepth = buf[pos + 16];
      colorType = buf[pos + 17];
    } else if (type === 'IDAT') {
      idatBuffers.push(buf.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }

  if (colorType !== 6 && colorType !== 2) {
    console.log('Skipping non-RGB(A) image', colorType);
    return false;
  }

  const bytesPerPixel = colorType === 6 ? 4 : 3;
  const rawData = zlib.inflateSync(Buffer.concat(idatBuffers));
  const srcStride = 1 + width * bytesPerPixel;

  const dstStride = 1 + cropW * bytesPerPixel;
  const dstRaw = Buffer.alloc(dstStride * cropH);

  for (let y = 0; y < cropH; y++) {
    const srcY = cropY + y;
    if (srcY >= height) break;
    const srcRowStart = srcY * srcStride;
    const dstRowStart = y * dstStride;

    dstRaw[dstRowStart] = rawData[srcRowStart];

    const copySrcStart = srcRowStart + 1 + cropX * bytesPerPixel;
    const copyLen = Math.min(cropW, width - cropX) * bytesPerPixel;
    rawData.copy(dstRaw, dstRowStart + 1, copySrcStart, copySrcStart + copyLen);
  }

  const compressed = zlib.deflateSync(dstRaw);

  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function createChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const total = Buffer.concat([typeBuf, data]);
    const crc = crc32(total);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, total, crcBuf]);
  }

  const pngHeader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(cropW, 0);
  ihdrData.writeUInt32BE(cropH, 4);
  ihdrData[8] = bitDepth;
  ihdrData[9] = colorType;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  const finalPNG = Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(outputPath, finalPNG);
  console.log('Saved cropped PNG:', outputPath, cropW + 'x' + cropH);
  return true;
}

module.exports = { cropPNG };
