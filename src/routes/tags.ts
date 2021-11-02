import { Router } from 'express';
import { getPostsByTag } from '../controllers/tags';

const router = Router();

router.get('/:tag', getPostsByTag);

export = router;
