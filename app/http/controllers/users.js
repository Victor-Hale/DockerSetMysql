import usersModel from '../models/users.js';
import status from '../models/status.js';

async function index(req, res) {
    try {
        const users = await usersModel.findAll();
        if (users) {
            res.send(users);
        } else {
            res.status(status.NOT_FOUND).send('User not found');
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(status.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
}

export default {
	index
};	