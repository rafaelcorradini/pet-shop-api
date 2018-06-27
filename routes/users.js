import express from 'express';
import usersController from '../controllers/users';
import middleware from '../middleware';
let router = express.Router();


// middleware that is specific to this router
router.use(middleware.auth);

router.get('/', middleware.permissions, usersController.get);

router.get('/:id', middleware.permissions, usersController.get);

router.post('/', usersController.create);

router.delete('/:id', usersController.delete);

router.put('/:id', usersController.edit);

module.exports = router;