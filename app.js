const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

app.use(async ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
});

app.listen(3000);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:3000/');