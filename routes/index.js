import Router from 'koa-router';
import { streamVideoAction } from '../controllers/VideoController.js';
import { getFilesInDirRecursive } from '../helpers/dir.js';

const router = new Router();

router.get('/:videoId?', async (ctx) => {
  const videoFilesArr = getFilesInDirRecursive('./videos')
    .map((file) => file.replace(/.mp4/, ''));

  const viewVariables = {
    title: 'Video Stream APP',
    data: videoFilesArr,
    videoId: ctx.params.videoId || (videoFilesArr.length ? videoFilesArr[0] : ''),
  };
  await ctx.render('index', viewVariables);
});

router.get('/video/:video', streamVideoAction);

export default router;
