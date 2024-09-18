var http = require('http');
var url = require('url');
var server = http.createServer(
	function(req, res){
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Hello World\n');
	}
)
server.listen(8080, '127.0.0.1');