import { Request, Response } from 'express';
import postModel from '../models/post';

export const getPostsByTag = async (req: Request, res: Response) => {
  const { tag } = req.params;
  const posts = await postModel.find({ tags: tag }).sort([['created_at', -1]]);
  res.render('showByTag', { posts });
};
