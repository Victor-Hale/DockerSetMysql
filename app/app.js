// 引入三个must模块:http、url、querystring
var http = require('http');
var url = require('url');
var querystring = require('querystring');
// 创建一个http服务器 就是http.createServer()方法
var server = http.createServer(
	// 处理请求的回调函数 req代表请求对象 res代表响应对象 
	// 在这里就是当请求发生时回调该匿名函数
	// 同时 这个function也是匿名函数
	function (req, res) {
		// 获取请求头的content-type字段信息
		// 请求一般包含请求行[请求方法（get、post）、请求路径（url）等]、请求头（headers）和请求体（body）
		const contentType = req.headers['content-type'];
		// 判断请求方法是否为POST
		if (req.method === 'POST') {
			let body = '';
			// 监听请求体数据，放入body变量中
			req.on('data', function (chunk) {
				body += chunk.toString();
			});
			// 请求体数据接收完毕后，进行处理，一定要有end事件！这个相当于请求数据接收结束。
			req.on('end', function () {
				// 判断请求体数据类型，这个就是刚刚获取到的请求头的content-type字段信息
				// 根据content-type字段信息，通过这个判断req body数据是什么类型
				// 可以试着console.log(contentType)看看请求头的content-type字段信息是什么
				// 如果请求头的content-type字段信息是application/json，那么就解析JSON数据
				// 如果请求头的content-type字段信息是application/x-www-form-urlencoded，那么就解析表单数据
				// 如果请求头的content-type字段信息是其他类型，那么就返回415错误
				// 这里没有写form-data类型，因为form-data类型的数据解析比较复杂，需要用到第三方模块，这里就不写了
				// 而且form-data类型的数据一般都是用于文件上传的，所以一般用不到。（以前我们搞错了，现在json多一点）
				if (contentType === 'application/json') {
					// 响应一般包括响应头（headers）和响应体（body）和响应状态码（statusCode）
					// try catch 捕获JSON.parse异常 ，则机使用，如果返回的code不同那么最好就不用
					try {
						// 解析JSON数据 ， 这个JSON.parse会经常使用的
						const jsonData = JSON.parse(body);
						// 响应状态码为200，响应头的Content-Type为application/json，响应体为JSON数据
						// 这就是http响应的基本格式
						res.writeHead(200, { 'Content-Type': 'application/json' });
						// 响应体为JSON数据 ， JSON.stringify是将数据转换为JSON字符串的函数，也可能会经常使用，具体得看框架包括什么。
						// 然后用res.end()方法将响应返回给客户端
						res.end(JSON.stringify({ message: 'Received JSON data', data: jsonData }));
					} catch (error) {
						// 响应状态码为400，响应头的Content-Type为application/json，响应体为JSON数据，错误信息为error.message
						res.writeHead(400, { 'Content-Type': 'text/plain' });
						// 必须用error.message，因为error对象可能是Error对象，也可能是字符串，所以用error.message来获取错误信息
						// 然后用res.end()方法将响应返回给客户端
						// 必须要res.end()，否则客户端会一直等待，直到超时
						res.end(JSON.stringify({error: error.message  }));
					}
					// 后面的处理方法类似
				} else if (contentType === 'application/x-www-form-urlencoded') {
					try {
						const formData = querystring.parse(body);
						res.writeHead(200, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify({ message: 'Received form', data: formData }));
					}catch(error){
						res.writeHead(400, { 'Content-Type': 'text/plain' });
						res.end(JSON.stringify({error: error.message }));
					}
					// 这个是请求的数据类型既不是json也不是x-www-form-urlencoded，所以返回415错误
				} else {
					res.writeHead(415, { 'Content-Type': 'text/plain' });
					res.end(JSON.stringify({error: 'Unsupported Media Type\n' }));
				}
			});
		}
		// 如果请求方法不是POST，那么就判断是否为GET请求
		else if(req.method === 'GET'){
			// 获取url中的query参数，get就是url.parse来获取query参数的
			// 这里还有一种参数叫params，这个参数是用来匹配路径参数的
			// http://example.com/users/:id?query=nodejs&page=2
			// 这里的:id就是params参数，query=nodejs&page=2就是query参数
			// 值得注意的是:id 有些语言的语法规则也可以写成{id},例如：http://example.com/users/{id}?query=nodejs&page=2
			const queryData = url.parse(req.url, true).query;
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({
				message: 'GET request received',
				queryData: queryData
			  }));
		}
	}
)
// 启动服务器，监听8080端口，绑定127.0.0.1地址
server.listen(8080, '127.0.0.1', function () {
	console.log('Server is listening on http://127.0.0.1:8080');
  });
// 这样就创建了一个简单的http服务器，可以接收GET和POST请求，并对请求进行处理。
// 但是这个只是最基本的处理，实际应用中还需要对请求进行更复杂的处理，比如权限验证、参数校验、日志记录等等。
// 这里就需要打开终端，访问到文件的根目录，输入node app.js启动服务器，然后在浏览器中访问http://127.0.0.1:8080,就可以看到服务器返回的get请求的响应信息。