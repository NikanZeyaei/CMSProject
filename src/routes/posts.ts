import { Router } from 'express';
import { nanoid } from 'nanoid';
import { post } from '../types/post';

const router = Router();

const content =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus pariatur eius exercitationem molestias eveniet. Natus odio, nesciunt quia itaque quod sit esse exercitationem neque delectus saepe. Dignissimos dolor aperiam ducimus fuga ratione delectus magni! Odio perferendis repudiandae cum numquam fugit, sit ipsa quod debitis voluptas necessitatibus qui vel, esse vero?';

let posts: post[] = [];
posts.push({
  title: 'This is my first post',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae sunt sed laborum necessitatibus voluptatum amet officiis libero deleniti alias aperiam.',
  date: new Date().toLocaleString(),
  content: content,
  id: nanoid(),
  url: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg',
});
posts.push({
  title: 'This is my Second post',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae sunt sed laborum necessitatibus voluptatum amet officiis libero deleniti alias aperiam.',
  date: new Date().toLocaleString(),
  content: content,
  id: nanoid(),
  url: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg',
});

router.get('/', (req, res) => {
  res.render('index', {
    posts: posts,
  });
});

router.get('/panel/new', (req, res) => {
  res.render('newPost');
});

router.post('/panel/new', (req, res) => {
  const {
    title,
    description,
    content,
  }: { title: string; description: string; content: string } = req.body;
  const id = nanoid();
  posts.push({
    title: title,
    description: description,
    date: new Date().toLocaleString(),
    id: id,
    content: content,
    url: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg',
  });
  res.redirect(`/posts/${id}`);
});

router.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  let foundPost: post | undefined;
  for (const post of posts) {
    if (post.id === id) {
      foundPost = post;
      break;
    }
  }
  if (foundPost) {
    res.render('post', { post: foundPost });
  } else {
    res.send('not found');
  }
});

router.get('/posts/:id/edit', (req, res) => {
  const { id } = req.params;
  let foundPost: post | undefined;
  for (const post of posts) {
    if (post.id === id) {
      foundPost = post;
      break;
    }
  }
  if (foundPost) {
    res.render('editPost', { post: foundPost });
  } else {
    res.send('not found');
  }
});

router.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    content,
  }: { title: string; description: string; content: string } = req.body;
  let foundPost: post | undefined;
  for (const post of posts) {
    if (post.id === id) {
      foundPost = post;
      break;
    }
  }
  const newPosts: post[] = [];
  for (const post of posts) {
    if (post.id !== id) {
      newPosts.push(post);
    }
  }
  if (foundPost) {
    foundPost.title = title;
    foundPost.description = description;
    foundPost.content = content;
    newPosts.push(foundPost);
    posts = newPosts;
    res.redirect(`/posts/${foundPost.id}`);
  } else {
    res.send('not found');
  }
});

router.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  // posts = posts.filter((post) => {
  //   post.id !== id;
  // });
  const newPosts: post[] = [];
  for (const post of posts) {
    if (post.id !== id) {
      newPosts.push(post);
    }
  }
  posts = newPosts;
  res.redirect('/');
});

export = router;
