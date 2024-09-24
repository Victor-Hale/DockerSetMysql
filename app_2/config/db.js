import dotenv from 'dotenv';

dotenv.config();

const mysql = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'test',
  port: process.env.MYSQL_PORT || 3306,
};

export default mysql;