import express from 'express';
import usersController from '../controllers/users';
let router = express.Router();

router.post('/login', usersController.login);
// router.post('/logout', usersController.login);

module.exports = router;