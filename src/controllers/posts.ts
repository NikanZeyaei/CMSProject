import { Request, Response } from 'express';
import postModel from '../models/post';
import { isValidObjectId } from 'mongoose';
import { tagParser } from '../helpers/tagParser';
import { post } from '../types/types';

export const getIndex = async (req: Request, res: Response) => {
  const posts = (await postModel.find({}).sort([['created_at', -1]])) as post[];
  res.render('index', { posts });
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const post = await postModel.findById(id);
    if (post) {
      res.render('post', { post });
    } else {
      res.send('Post not found');
    }
  } else {
    res.send('Post not found');
  }
};

export const getEditPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    const post = await postModel.findById(id);
    if (post) {
      res.render('editPost', { post });
    } else {
      res.send('Post not found (for edit)');
    }
  } else {
    res.send('Post not found (for edit)');
  }
};

export const editPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    description,
    content,
  }: { title: string; description: string; content: string } = req.body;
  if (isValidObjectId(id)) {
    await postModel.findByIdAndUpdate(id, {
      title: title,
      description: description,
      content: content,
      updated_at: Date.now(),
    });
    res.redirect(`/posts/${id}`);
  } else {
    res.send('Not found (Edit)');
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    await postModel.findByIdAndDelete(id);
    return res.redirect('/');
  } else {
    res.send('Post not found (for delete)');
  }
};

export const postNewPost = async (req: Request, res: Response) => {
  const {
    title,
    description,
    content,
    tags,
  }: { title: string; description: string; content: string; tags: string } =
    req.body;

  const tagsList = tagParser(tags);
  const post = await postModel.create({
    title: title,
    description: description,
    content: content,
    tags: tagsList,
    image_url: 'http://localhost:3000/img/notfound.png',
    created_at: Date.now(),
    updated_at: Date.now(),
  });
  const id = post._id.toString();
  res.redirect(`/posts/${id}`);
};

export const getNewPostPanel = (req: Request, res: Response) => {
  res.render('newPost');
};
