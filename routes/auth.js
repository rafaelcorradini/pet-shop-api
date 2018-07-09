import express from 'express';
import usersController from '../controllers/users';
import usersSchema from '../schemas/users';
import validate from 'express-joi-validator';
let router = express.Router();

router.post('/login', usersController.login);
router.post('/register', validate(usersSchema), usersController.register);

module.exports = router;