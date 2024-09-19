var http = require('http');
var url = require('url');
var querystring = require('querystring');
var server = http.createServer(
	function (req, res) {
		const contentType = req.headers['content-type'];
		if (req.method === 'POST') {
			let body = '';
			req.on('data', function (chunk) {
				body += chunk.toString();
			});
			req.on('end', function () {
				if (contentType === 'application/json') {
					try {
						const jsonData = JSON.parse(body);
						res.writeHead(200, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify({ message: 'Received JSON data', data: jsonData }));
					} catch (error) {
						res.writeHead(400, { 'Content-Type': 'text/plain' });
						res.end(JSON.stringify({ error: error.message }));
					}
				} else if (contentType === 'application/x-www-form-urlencoded') {
					try {
						const formData = querystring.parse(body);
						res.writeHead(200, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify({ message: 'Received form', data: formData }));
					} catch (error) {
						res.writeHead(400, { 'Content-Type': 'text/plain' });
						res.end(JSON.stringify({ error: error.message }));
					}
				} else {
					res.writeHead(415, { 'Content-Type': 'text/plain' });
					res.end(JSON.stringify({ error: 'Unsupported Media Type\n' }));
				}
			});
		}
		else if (req.method === 'GET') {
			const queryData = url.parse(req.url, true).query;
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({
				message: 'GET request received',
				queryData: queryData
			}));
		}
	}
)
// 启动服务器，监听8000端口，绑定127.0.0.1地址
server.listen(8000, '127.0.0.1', function () {
	console.log('Server is listening on http://127.0.0.1:8000');
});
