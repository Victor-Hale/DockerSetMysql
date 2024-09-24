import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const db = {
  databasetype: process.env.DATABASE_TYPE ||'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'test',
  port: process.env.MYSQL_PORT || 3306,
};

const connection = new Sequelize({
	host: db.host,
	port: db.port,
	username: db.username,
	password: db.password,
	database: db.database,
	dialect: db.databasetype,
  })


export default connection;