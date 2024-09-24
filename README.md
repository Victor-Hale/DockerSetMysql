# Overview

mysql install

## Setup Sail Development Environment

### Prerequisites

- Docker
- Docker Compose
- Git

# Run

```
docker-compose up
```

# 分支介绍

本分支将模块化处理转化成了es

​	在分支feature/api_learn中，使用的是commonjs，并且初步实现了post和get请求以及请求的数据的获取。但是会觉得有点冗余，接下来，这个分支将有着全新的体验。

​	本分支涉及到web框架核心，基本的web框架例如php的laravel，golang的gin，均采用了路由树的设计，本分支就很简单的体现了一个小的路由树的设计。
​	文件树介绍

```
├── app.js
├── handlers.js
└── router.js
```

## 单个文件介绍

### app.js

​	本文件重在于将请求转发给路由树，并且启动web服务。

### handlers.js

​	核心业务逻辑实现文件，后面还会区分controller model dao service等层来进行更为复杂的逻辑开发。

### router.js

​	转发路由树，用于基本的请求分发。

## 启动

在app_2目录下运行

```
 node app.js
```

### 注意事项

启动包含.env的文件时，应当在根目录执行。
例如

```
node app_2/database.js
```

这样才可以访问到env的数据

将sql用于handle

```
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

```

