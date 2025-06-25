import Koa from 'koa';
import Router from '@koa/router';
const app = new Koa();
const router = new Router();
import mockList from './api/index.js';
// 模拟接口请求延迟1s
async function getRes(fn,ctx){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fn(ctx))
        },500)
    })
}
// 注册 mock 路由
mockList.forEach(item => {
  const { url, method, response } = item;
  router[method](url, async ctx => {
    const res = await getRes(response,ctx);
    ctx.body = res;
  });
});

app.use(router.routes());
app.listen(3001, () => {
  console.log('Mock server is running on port 3001');
});