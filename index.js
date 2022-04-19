import Koa from 'koa';
import cors from '@koa/cors';
import render from 'koa-ejs';
import path from 'path';
import serve from 'koa-static';
import mount from 'koa-mount';
// eslint-disable-next-line import/extensions
import router from './routes/index.js';

const app = new Koa();
const dirname = path.resolve();

app
  .use(mount('/public', serve(`${dirname}/public`)))
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

render(app, {
  root: path.join(dirname, 'view'),
  layout: 'index',
  viewExt: 'html',
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error(`${(new Date()).toUTCString()} uncaughtException:`, err.message);
  console.error(err.stack);
  process.exit(1);
});
