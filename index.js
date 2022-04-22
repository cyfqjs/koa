const Koa = require('koa');
const app = new Koa();

app.use( async(ctx, next)=>{
    ctx.response.body = 'Hello koa'
})

app.listen(3333, ()=>{
    console.log('sever is running at http://localhost:3333');
})