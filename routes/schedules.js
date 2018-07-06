import express from 'express';
import schedulesController from '../controllers/schedules';
import middleware from '../middleware';
import schedulesSchema from '../schemas/schedules'
import validate from 'express-joi-validator';
const router = express.Router();


// middleware that is specific to this router
//router.use(middleware.auth);

router.post('/', validate(schedulesSchema), schedulesController.create);

router.get('/', schedulesController.getAll);

router.get('/:id', schedulesController.get);

// router.post('/', schedulesController.create);

router.delete('/:id', schedulesController.delete);

router.put('/:id', validate(schedulesSchema), schedulesController.edit);

module.exports = router;