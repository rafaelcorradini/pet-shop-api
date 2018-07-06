import express from 'express';
import servicesController from '../controllers/services';
import middleware from '../middleware';
import servicesSchema from '../schemas/services'
import validate from 'express-joi-validator';
const router = express.Router();


// middleware that is specific to this router
//router.use(middleware.auth);

router.post('/', validate(servicesSchema), servicesController.create);

router.get('/', servicesController.getAll);

router.get('/:id', servicesController.get);

// router.post('/', servicesController.create);

router.delete('/:id', servicesController.delete);

router.put('/:id', validate(servicesSchema), servicesController.edit);

module.exports = router;