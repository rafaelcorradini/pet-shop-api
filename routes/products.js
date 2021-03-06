import express from 'express';
import productsController from '../controllers/products';
import middleware from '../middleware';
import productsSchema from '../schemas/products'
import validate from 'express-joi-validator';
const router = express.Router();


// middleware that is specific to this router
router.use(middleware.auth);

router.post('/', middleware.permissions, validate(productsSchema), productsController.create);

router.get('/', middleware.permissions, productsController.getAll);

router.get('/:id', middleware.permissions, productsController.get);

router.delete('/:id', middleware.permissions, productsController.delete);

router.put('/:id', middleware.permissions, validate(productsSchema), productsController.edit);

module.exports = router;