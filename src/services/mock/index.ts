// import Koa from 'koa';
// import Router from '@koa/router';
// const app = new Koa();
// const router = new Router();
// import mockList from './api/index.js';
// // 模拟接口请求延迟1s
// async function getRes(fn,ctx){
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(fn(ctx))
//         },500)
//     })
// }
// // 注册 mock 路由
// mockList.forEach(item => {
//   const { url, method, response } = item;
//   router[method](url, async ctx => {
//     const res = await getRes(response,ctx);
//     ctx.body = res;
//   });
// });

// app.use(router.routes());
// app.listen(3001, () => {
//   console.log('Mock server is running on port 3001');
// });
import Koa from 'koa';
import Router from '@koa/router';

// 定义 Mock 接口类型
export type MockMethodType =  {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  response: (ctx: Koa.Context) => any | Promise<any>;
}

// 导入 Mock 列表（确保你的 mock 数据文件也是 TypeScript 或带有类型声明）
import mockList from './api/index';

const app = new Koa();
const router = new Router();

/**
 * 模拟接口请求延迟
 * @param fn 响应函数
 * @param ctx Koa 上下文
 * @returns Promise 包装的响应
 */
async function getRes(fn: (ctx: Koa.Context) => any, ctx: Koa.Context): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, 500);
  });
}

// 注册 mock 路由
mockList.forEach((item: MockMethodType) => {
  const { url, method, response } = item;
  
  (router[method])(
    url, 
    async (ctx: Koa.Context) => {
      try {
        const res = await getRes(response, ctx);
        ctx.body = res;
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
        console.error('Mock server error:', error);
      }
    }
  );
});
// 添加错误处理中间件
app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
    ctx.app.emit('error', err, ctx);
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

// 错误事件监听
app.on('error', (err: Error, ctx: Koa.Context) => {
  console.error('Server error:', err, ctx);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock server is running on port ${PORT}`);
});

// 导出类型和app实例以便测试或其他模块使用
export { app };