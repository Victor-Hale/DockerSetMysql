import http from 'http';
import router from './router.js';
import url from 'url';

var server = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);

    const routeHandler = router[parsedUrl.pathname];
    if (routeHandler && routeHandler[req.method]) {
        routeHandler[req.method](req, res, parsedUrl);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});
// 启动服务器，监听8000端口，绑定127.0.0.1地址
server.listen(8000, '127.0.0.1', function () {
    console.log('Server is listening on http://127.0.0.1:8000');
});