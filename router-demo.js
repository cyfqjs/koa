// const Koa = require('koa');
// const fs = require('fs');
// const app = new Koa();


// /**
// * @name 
// * @description 使用promise封装异步读取文件方法
// * @params  {string} page html文件名称
// * @return { promise }
// * @author qijianshuang
// * @version 2022-04-22 11:02:02 星期五
// */
// function render( page) {
//     return new Promise((resolve,reject)=>{
//         let viewUrl = `./view/${page}`
//         fs.readFile(viewUrl,'binary',(err, data)=>{
//             if(err) {
//                 reject(err)
//             } else {
//                 resolve(data)
//             }
//         })
//     })
// }

// /**
// * @name 
// * @description 根据url获取HTML内容
// * @params {string} url koa2上下文的url，ctx.url
// * @return {string}     获取HTML文件内容
// * @author qijianshuang
// * @version 2022-04-22 11:06:05 星期五
// */


// async function route( url ) {
//     let view = '404.html'
//     switch( url ) {
//         case '/':
//             view = 'index.html'
//             break
//         case '/index':
//             view = 'index.html'
//             break
//         case '/todo':
//             view = 'todo.html'
//             break
//         case '/404' :
//             view = '404.html'
//             break
//         default:
//             break
            
//     }
//     return  await render( view )
    
// }

// app.use(async (ctx ,next) =>{
//     let url = ctx.request.url
//     let html = await route( url )
//     ctx.body = html 
// })

// app.listen(3333, ()=>{
//     console.log('sever is running at http://localhost:3333');
// })


/*
    应用中间件解决问题
    1.node中的中间件是什么
        在nodeJs中，中间件主要是指封装所有http请求细节处理的方法，一次性的http请求可能会
        包含很多的工作：IP过滤，查询字符，请求体解析，cookie处理，权限验证，参数验证，异常处理等，
        但对web应用来说，并不希望接触到这么多细节性的处理，因此使用中间件来简化及隔离这些
        基础设施与业务逻辑之间的细节，让开发者更加关注在业务的开发。

 */


const Koa = require('koa');
const fs = require('fs')
const app = new Koa()

const Router = require('koa-router')

let home = new Router()

home.get('/',async cxt=>{
    let html = `
        <ul>
            <li><a href="/page/helloWorld"></a>page/helloWorld</li>
            <li><a href="/page/404"></a>page/404</li>
        </ul>
    `
    cxt.body = html
})

let page = new Router()
page.get('/404', async (cxt)=>{
    cxt.body = '404 page'
}).get('/helloWorld', async (cxt) =>{
    cxt.body = 'helloWorld page'
})

// 装载所有子路由

let router = new Router()
router.use('/',home.routes(),home.allowedMethods())
router.use('/page',page.routes(),page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3333, ()=>{
    console.log('sever is running at http://localhost:3333')
})
