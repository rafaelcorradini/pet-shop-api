import express from 'express';
import animalsController from '../controllers/animals';
import middleware from '../middleware';
import animalsSchema from '../schemas/animals'
import validate from 'express-joi-validator';
const router = express.Router();


// middleware that is specific to this router
//router.use(middleware.auth);

router.post('/', validate(animalsSchema), animalsController.create);

router.get('/', animalsController.getAll);

router.get('/:id', animalsController.get);

// router.post('/', animalsController.create);

router.delete('/:id', animalsController.delete);

router.put('/:id', validate(animalsSchema), animalsController.edit);

module.exports = router;