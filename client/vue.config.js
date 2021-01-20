
module.exports = {
    publicPath: './',
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        // 以上的ip與埠為本機，下面為需要跨域的
        proxy: {    //配置跨域
            '/api': {
                target: 'https://protected-garden-60426.herokuapp.com/', // 連接的後端api http://localhost:3000 https://protected-garden-60426.herokuapp.com/
                ws: true,  // 如果要代理websockets
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/api': '' // 請求的時候用這個api就可以
                }
            }
        }
    }
}