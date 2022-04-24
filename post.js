// 解析上下文中node原生请求的post参数

const Koa = require('koa');
const app = new Koa()

app.use( async (ctx)=>{
    if(ctx.url === '/' && ctx.method === 'GET' ) {
        // 当GET请求时返回表单页面
        let html = `
            <h1>koa2 request post demo</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>nickName</p>
                <input name="nickName" /><br/>
                <p>email</p>
                <input name="email" /><br/>
                <button type="submit">submit</button>
            </form>
        `
        ctx.body = html;
    } else if(ctx.url === '/' && ctx.method === 'POST') {
        // 当POST请求的时候，解析POST表单里的数据，并显示出来
        let postData = await parsePostData( ctx )
        ctx.body = postData
    } else {
        // 其他请求显示404
        ctx.body = `<h1>404!!!</h1>`
    }
})

function parsePostData(ctx) {
    return new Promise((resolve,reject)=>{
        try {
            let postData = '';
            ctx.req.addListener("data",data=>{
                postData += data;
            })
            ctx.req.addListener("end",()=>{
                let parseData = parseQueryStr( postData )
                resolve(parseData) 
            })
        } catch (err) {
            reject(err)
        }
    })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
    let queryData = {}
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);

    for( let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=')
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
    }
    return queryData
}

app.listen(3333,()=>{})