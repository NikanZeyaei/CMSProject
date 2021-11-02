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

router.get('/new', getNewPostPanel);

router.post('/new', postNewPost);

export = router;
