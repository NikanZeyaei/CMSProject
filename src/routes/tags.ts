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

router.get('/:tag', (req, res) => {});

export = router;
