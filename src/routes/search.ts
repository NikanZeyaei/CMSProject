import { Router } from 'express';
import { getSearch } from '../controllers/search';

const router = Router();

router.get('/', getSearch);

export = router;
