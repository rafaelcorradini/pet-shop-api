import express from 'express';
import productsController from '../controllers/products';
import middleware from '../middleware';
let router = express.Router();


// middleware that is specific to this router
router.use(middleware.auth);

router.get('/', middleware.permissions, productsController.get);

router.get('/:id', middleware.permissions, productsController.get);

router.post('/', productsController.create);

router.delete('/:id', productsController.delete);

router.put('/:id', productsController.edit);

module.exports = router;