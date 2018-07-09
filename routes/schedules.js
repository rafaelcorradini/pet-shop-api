import express from 'express';
import schedulesController from '../controllers/schedules';
import middleware from '../middleware';
import schedulesSchema from '../schemas/schedules'
import validate from 'express-joi-validator';
const router = express.Router();


// middleware that is specific to this router
router.use(middleware.auth);

router.post('/', middleware.permissions, validate(schedulesSchema), schedulesController.create);

router.get('/', middleware.permissions, schedulesController.getAll);

router.get('/:id', middleware.permissions, schedulesController.get);

router.delete('/:id', middleware.permissions, schedulesController.delete);

router.put('/:id', middleware.permissions, validate(schedulesSchema), schedulesController.edit);

module.exports = router;