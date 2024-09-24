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

# express

本分支为搭建一个express框架以及详解

## TypeORM

### 连接并导出

```
import { DataSource } from "typeorm"
import dbConfig from "../../config/db.js"
import User from "../../http/models/users.js"


const dataSource = new DataSource({
    type: dbConfig.databasetype,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [User], //指定项目中要与数据库交互的实体类
    synchronize: false,//是否自动创建实体类到数据库中，设置为false则需要手动创建
});

async function initializeDatabase() {
    try {
        await dataSource.initialize();
        console.log("Connection to the database has been established.");
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
    }
}

export { dataSource, initializeDatabase };
```

### model

```
import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
        age: {
            type: "int",
        },
    },
});

```

### controller

```
import { dataSource } from '../../cmd/init/database.js';
import User from '../models/users.js';
const userRepository = dataSource.getRepository(User);

async function index(req, res) {
    try {
        const user = await userRepository.findOne({ where: { id: 1 } });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send('Internal Server Error');
    }
}

export default {
	index
};	
```

## *Sequelize

### 连接数据库

在文件app/cmd/init/database.js中，对数据库连接进行了初始化的定义，首先是创建一个数据库的连接对象

```
const connection = new Sequelize({
	host: dbConfig.host,
	port: dbConfig.port,
	username: dbConfig.username,
	password: dbConfig.password,
	database: dbConfig.database,
	dialect: dbConfig.databasetype,
  })
```

其实在Sequelize中这已经创建了一个数据库的连接，但是为了连接可以成功，所以选择了对连接进行初始化

```
async function init() {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

```

然后导出

```
const database = {
	connection,
	init
  };
  
  export default database;
```

 

.authenticate()函数在官方中的说法是：

```
你可以使用 .authenticate() 函数测试连接是否正常：
```

但是在实际的使用中，通过打印可以发现他向数据库发送了一条简单的查询

```
SELECT 1+1 AS result
```

所以实际上的处理流程是

```
.authenticate() 方法用于验证数据库连接是否成功。它尝试连接到数据库并执行一条简单的查询（通常是 SELECT 1），以确保数据库凭据和配置正确。如果连接成功，它会返回一个 Promise，通常在 .then() 中处理成功的结果，而在 .catch() 中处理错误。
```

我们可以在main.js文件中通过此命令验证数据库是否连接成功，如果失败的话则应该抛出错误或者做其他处理。

```
database.init();
```

### model

关于Sequelize的模型使用，有两种方案
第一种方案也是本框架中使用的方案，通过继承sequelize包中的Model来实现模型，需要注意的是database的导出采用的是默认导出还是命名导出，在这里踩过坑。

```
import { DataTypes , Model } from "sequelize";
import database from "../../cmd/init/database.js";

class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // 主键
      autoIncrement: true, // 自增
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // 非空
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false, // 非空
    }
  },
  {
    sequelize: database.connection, // 连接 sequelize 对象
    modelName: "users", // 表名
    timestamps: false, // 时间戳createdAt/updatedAt 
  }
);

export default Users;
```

第二种方案是根据连接的.define函数来设立模型

```
const Users = database.connection.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // 主键
    autoIncrement: true, // 自增
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // 非空
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false, // 非空
  }
}, {
  timestamps: false, // 时间戳createdAt/updatedAt 
});
```

根据官方说法，二者的区别不大，本质上是等效的
