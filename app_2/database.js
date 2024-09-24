import mysql from'mysql2';
import config_mysql from './config/sql.js';


const connection = mysql.createConnection({
    host: config_mysql.host,
    port: config_mysql.port,
    user: config_mysql.user,
    password: config_mysql.password,
    database: config_mysql.database,
});

const find = `selete * form users`
const insert = `insert into users (name, age) values ('lsj', '18');`
const update = `update users set name='lisijia' where name='wenzhuhao';`
const deleted = `delete from users where id='2';`

connection.query(find, (err, result, fields) => {
	if (err) {
		console.error(err)
		return
	  }
	  console.log(result)
})

connection.end()