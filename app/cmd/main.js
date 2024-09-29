import express from 'express';
import router from '../routes/api.js';
import initApp from '../bootstrap/app.js';

const app = express();

initApp(app).then(() => {
	app.use('/api', router);
	
	app.listen(3000, () => {
	  console.log('Server is running on port 3000');
	});
  }).catch(error => {
	console.error('Failed to initialize the app:', error);
  });