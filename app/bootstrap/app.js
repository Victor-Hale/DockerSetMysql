import database from './database.js';

async function initApp() {
  await database();
  // 其他初始化代码
}

export default initApp;