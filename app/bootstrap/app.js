import database from './database.js';
import log from './log.js';

async function initApp(app) {
  await database();
  await log(app);
}

export default initApp;