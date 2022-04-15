import fs from 'fs';

export const streamVideoAction = async (ctx, next) => {
  const videoId = ctx.params.videoId;
  const range = ctx.headers.range || '0-';

  const videoPath = `./videos/${videoId}.mp4`;
  const videoSize = fs.statSync(videoPath).size;
  const chunkSize = 10 ** 6;
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + chunkSize, videoSize - 1);
  const contentLength = end - start + 1;

  ctx.set('Content-Range', `bytes ${start}-${end}/${videoSize}`);
  ctx.set('Accept-Ranges', 'bytes');
  ctx.set('Content-Length', contentLength);
  ctx.set('Content-Type', 'video/mp4');
  ctx.status = 206;
  ctx.body = fs.createReadStream(videoPath, { start, end });
};
