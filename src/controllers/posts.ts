import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { pool } from '../models/pool';
import {
  findAllPosts,
  findPostById,
  updatePostById,
  deletePostById,
  insertNewPost,
} from '../models/queries';
import { post } from '../types/post';

const dummyURL =
  'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg';

/**
 * This controller renders the index page with all the posts
 *
 * @async
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const getIndex = async (req: Request, res: Response) => {
  const poolResult = await pool.promise().query(findAllPosts);
  const posts = poolResult[0] as post[];
  res.render('index', {
    posts: posts,
  });
};
/**
 *
 * This controller is for the /posts/:id GET request.
 * It extracts the id from the request parameters and searches the database for that post
 * and the renders the post
 *
 * @async
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const poolResult = await pool.promise().query(findPostById, [id]);
  const queryResult = poolResult[0] as post[];
  if (queryResult.length) {
    const post = queryResult[0] as post;
    res.render('post.ejs', { post });
  } else {
    res.send('Post not found');
  }
};

/**
 * This controller is for the /posts/:id/edit GET request.
 * It extracts the id from the request parameters and searches the database for that post
 * and then renders the edit page for that post
 *
 * @async
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const getEditPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const poolResult = await pool.promise().query(findPostById, [id]);
  const queryResult = poolResult[0] as post[];
  if (queryResult.length) {
    const post = queryResult[0] as post;
    res.render('editPost', { post });
  } else {
    res.send('Post not found (for edit)');
  }
};

/**
 *
 * This controller is for the /posts/:id PUT request.
 * It extracts the new title, description and content from the request parameters and searches the database for that post
 * and then updated it.
 * And finally it redirects the user to the /posts/:id page
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const editPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    description,
    content,
  }: { title: string; description: string; content: string } = req.body;
  const poolResult = await pool.promise().query(findPostById, [id]);
  const queryResult = poolResult[0] as post[];
  if (queryResult.length) {
    const post = queryResult[0] as post;
    await pool
      .promise()
      .query(updatePostById, [
        title,
        description,
        content,
        Date.now(),
        post.id,
      ]);
    res.redirect(`/posts/${post.id}`);
  } else {
    res.send('not found');
  }
};

/**
 *
 * This controller is for the /posts/:id DELETE request.
 * it extracts the id from the request parameters and searches the database for a post.
 * if the post exists, it will delete it and return to /,
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const poolResult = await pool.promise().query(findPostById, [id]);
  const queryResult = poolResult[0] as post[];
  if (queryResult.length) {
    await pool.promise().query(deletePostById, [id]);
    return res.redirect('/');
  }
  res.send('Post not found (for delete)');
};

export const postNewPost = async (req: Request, res: Response) => {
  const {
    title,
    description,
    content,
  }: { title: string; description: string; content: string } = req.body;
  const queryResult = (await pool
    .promise()
    .query(insertNewPost, [
      title,
      description,
      content,
      dummyURL,
      Date.now(),
      Date.now(),
    ])) as unknown as [ResultSetHeader];
  const id = queryResult[0].insertId;
  res.redirect(`/posts/${id}`);
};
