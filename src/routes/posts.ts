import { Router } from 'express';
import {
  getPostById,
  getEditPostById,
  editPostById,
  deletePost,
} from '../controllers/posts';

const router = Router();

router.get('/:id', getPostById);

router.get('/:id/edit', getEditPostById);

router.put('/:id', editPostById);

router.delete('/:id', deletePost);

export = router;
