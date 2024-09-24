import db from './database.js';

// handleAdd 是一个post方法，处理添加用户的请求参数A+参数B,我们试图给他设置路由为/add
function handleAdd(req, res) {
	let body = '';
	let result = 0;
	req.on('data', function (chunk) {
		body += chunk.toString();
	});
	req.on('end', function () {
		const jsonData = JSON.parse(body);
		result = jsonData.A + jsonData.B;
		res.end(JSON.stringify({ result: result }));
	});
}

// handleSubtract 是一个post方法，处理减去用户的请求参数A-参数B,我们试图给他设置路由为/subtract
function handleSubtract(req, res) {
	let body = '';
	let result = 0;
	req.on('data', function (chunk) {
		body += chunk.toString();
	});
	req.on('end', function () {
		const jsonData = JSON.parse(body);
		result = jsonData.A - jsonData.B;
		res.end(JSON.stringify({ result: result }));
	});
}
// handleFind 是一个get方法，处理查找用户的请求参数,我们试图给他设置路由为/find
function handleFind(req, res) {
	const find = `select * from users`
	db.query(find, (err, result) => {
		if (err) {
			res.end(JSON.stringify({ error: err.message }));
		} else {
			res.end(JSON.stringify({ result: result }));
		}
	})
		
}

export default {
	handleAdd,
	handleSubtract,
	handleFind
};