import headlers from './handlers.js';

const routers = {
	'/add': {
		'POST': headlers.handleAdd,
	},
	'/subtract': {
		'POST': headlers.handleSubtract,
	},
	'/find': {
		'GET': headlers.handleFind,
	}
}

export default routers;