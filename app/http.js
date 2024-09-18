var http = require('http');
var url = require('url');
var server = http.createServer(
	function (req, res) {
		const contentType = req.headers['content-type'];
		if (req.method === 'POST') {
			let body = '';
			req.on('data', function (chunk) {
				body += chunk.toString();
			});
			req.on('end', function () {
				const contentType = req.headers['content-type'];
				if (contentType === 'application/json') {
					try {
						const jsonData = JSON.parse(body);
						res.writeHead(200, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify({ message: 'Received JSON data', data: jsonData }));
					} catch (error) {
						res.writeHead(400, { 'Content-Type': 'text/plain' });
						res.end('Invalid JSON\n');
					}
				} else if (contentType === 'application/x-www-form-urlencoded') {
					const formData = querystring.parse(body);
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ message: 'Received form-data', data: formData }));
				} else {
					res.writeHead(415, { 'Content-Type': 'text/plain' });
					res.end('Unsupported Media Type\n');
				}
			});
		}
		else {
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('GET request received\n');
		}
	}
)
server.listen(8080, '127.0.0.1'); 