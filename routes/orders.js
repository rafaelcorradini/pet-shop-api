import express from 'express';
import ordersController from '../controllers/orders';
import middleware from '../middleware';
import ordersSchema from '../schemas/orders'
import validate from 'express-joi-validator';
const router = express.Router();


// middleware that is specific to this router
router.use(middleware.auth);

router.post('/', middleware.permissions, validate(ordersSchema), ordersController.create);

router.get('/', middleware.permissions, ordersController.getAll);

router.get('/:id', middleware.permissions, ordersController.get);

router.delete('/:id', middleware.permissions, ordersController.delete);

router.put('/:id', middleware.permissions, validate(ordersSchema), ordersController.edit);

module.exports = router;