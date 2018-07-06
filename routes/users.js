import express from 'express';
import usersController from '../controllers/users';
import middleware from '../middleware';
import usersSchema from '../schemas/users'
import validate from 'express-joi-validator';
let router = express.Router();


// middleware that is specific to this router
//router.use(middleware.auth);

router.get('/', usersController.getAll);

router.get('/:id', usersController.get);

router.post('/', validate(usersSchema), usersController.create);

router.delete('/:id', middleware.permissions, usersController.delete);

router.put('/:id', validate(usersSchema), usersController.edit);

module.exports = router;