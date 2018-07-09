import express from 'express';
import animalsController from '../controllers/animals';
import middleware from '../middleware';
import animalsSchema from '../schemas/animals'
import validate from 'express-joi-validator';
const router = express.Router();


// middleware that is specific to this router
router.use(middleware.auth);

router.post('/', middleware.permissions, validate(animalsSchema), animalsController.create);

router.get('/', middleware.permissions, animalsController.getAll);

router.get('/:id', middleware.permissions, animalsController.get);

router.delete('/:id', middleware.permissions, animalsController.delete);

router.put('/:id', middleware.permissions, validate(animalsSchema), animalsController.edit);

module.exports = router;