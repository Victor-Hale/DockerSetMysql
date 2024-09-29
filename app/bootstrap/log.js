import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDirectory = path.join(__dirname, '../log');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), {flags: 'a'});

// 自定义日志格式

//自定义token
morgan.token('date', function() {
    return new Date().toISOString(); // 获取当前时间的 ISO 字符串格式
});

async function init (app) {
  await app.use(morgan('combined', {stream: accessLogStream}));
}

console.log('Log configuration loading successfully.');
export default init;