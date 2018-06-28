import express from 'express';
import productsController from '../controllers/products';
import middleware from '../middleware';
const router = express.Router();


// middleware that is specific to this router
// router.use(middleware.auth);

router.post('/', productsController.create);

router.get('/', productsController.getAll);

// router.post('/', productsController.create);

// router.delete('/:id', productsController.delete);

// router.put('/:id', productsController.edit);

module.exports = router;