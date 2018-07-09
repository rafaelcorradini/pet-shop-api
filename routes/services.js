import express from 'express';
import servicesController from '../controllers/services';
import middleware from '../middleware';
import servicesSchema from '../schemas/services'
import validate from 'express-joi-validator';
const router = express.Router();


// middleware that is specific to this router
router.use(middleware.auth);

router.post('/', middleware.permissions, validate(servicesSchema), servicesController.create);

router.get('/', middleware.permissions, servicesController.getAll);

router.get('/:id', middleware.permissions, servicesController.get);

router.delete('/:id', middleware.permissions, servicesController.delete);

router.put('/:id', middleware.permissions, validate(servicesSchema), servicesController.edit);

module.exports = router;