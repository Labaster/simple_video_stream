import Koa from 'koa';
import cors from '@koa/cors';
import render from 'koa-ejs';
import path from 'path';
import router from './routes/index.js';
import serve from 'koa-static';
import mount from 'koa-mount';

const app = new Koa();
const __dirname = path.resolve();

app
  .use(mount('/public', serve(__dirname + '/public')))
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

render(app, {
  root: path.join(__dirname, 'view'),
  layout: 'index',
  viewExt: 'html',
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});