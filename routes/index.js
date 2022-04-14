import Router from 'koa-router';
import { streamVideoAction } from '../controllers/VideoController.js';
import { getFilesInDirRecursive } from '../helpers/dir.js';

const router = new Router();

router.get('/:videoId?', async (ctx) => {
  const videoFilesArr = getFilesInDirRecursive('./videos');
  const filesWithPathArr = [];

  if (videoFilesArr.length > 0) { 
    videoFilesArr.forEach((file = '') => {
      if (file) {
        parseInt
        filesWithPathArr.push({
          path: file.replace(/.mp4/, ''),
          name: `sample_${file}`,
        });
      }
    });
  }

  const viewVariables = {
    title: 'Video Stream APP',
    data: filesWithPathArr,
    videoId: ctx.params.videoId || 1,
  };
  await ctx.render('index', viewVariables);
});

router.get('/video/:videoId', streamVideoAction);

export default router;
