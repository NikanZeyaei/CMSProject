import { Router } from 'express';
import { getIndex } from '../controllers/posts';

const router = Router();

router.get('/', getIndex);

export = router;
