import { Router } from 'express';
import * as service from '../controllers/test.controller.js';


const router = Router();

router.get('/', service.test);
router.post('/', service.test2);
router.get('/db/', service.test4);
router.get('/:id', service.test3);


export default router;