import { Router } from 'express';
import { body } from 'express-validator';

import exampleController from '../controllers/example.controller';

const router = Router();

router.get('/', exampleController.example);
router.post('/', [ body('var1').exists(), body('var2').isString()], exampleController.example);

export default router;