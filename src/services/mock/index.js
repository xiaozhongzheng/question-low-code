import Koa from 'koa';
import Router from '@koa/router';
import mockList from './api/index.js';
import bodyParser from 'koa-bodyparser'; // 引入 bodyParser 中间件

const app = new Koa();
const router = new Router();

// 使用 bodyParser 中间件来解析请求体
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text'], // 允许解析的类型
    jsonLimit: '10mb',                     // JSON 数据大小限制
    formLimit: '10mb',                     // 表单数据大小限制
    textLimit: '10mb',                     // 文本数据大小限制
    strict: true                           // 严格模式
}));

async function getRes(fn, ctx) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const res = fn(ctx);
            resolve(res);
        }, 500);
    });
}

mockList.forEach((item) => {
    const { url, method, response } = item;
    router[method](url, async (ctx) => {
        console.log('Received body:', ctx.request.body);
        const res = await getRes(response, ctx);
        ctx.body = res;
    });
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
        ctx.app.emit('error', err, ctx);
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
    console.error('Server error:', err, ctx);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Mock server is running on port ${PORT}`);
});

export { app };