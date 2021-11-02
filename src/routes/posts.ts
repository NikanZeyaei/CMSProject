import { Router } from 'express';
import {
  getIndex,
  getPostById,
  getEditPostById,
  getNewPostPanel,
  editPostById,
  deletePost,
  postNewPost,
} from '../controllers/posts';

const router = Router();

router.get('/', getIndex);

router.get('/panel/new', getNewPostPanel);

router.post('/panel/new', postNewPost);

router.get('/posts/:id', getPostById);

router.get('/posts/:id/edit', getEditPostById);

router.put('/posts/:id', editPostById);

router.delete('/posts/:id', deletePost);

export = router;
