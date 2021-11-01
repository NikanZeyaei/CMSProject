import express from 'express';
import articleRouter from './routes/articles';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(articleRouter);

app.get('/', (req, res) => {
  const posts: any[] = [];
  posts.push({
    title: 'This is my first post',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae sunt sed laborum necessitatibus voluptatum amet officiis libero deleniti alias aperiam.',
    date: new Date().toLocaleString(),
    id: 1,
  });
  posts.push({
    title: 'This is my Second post',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae sunt sed laborum necessitatibus voluptatum amet officiis libero deleniti alias aperiam.',
    date: new Date().toLocaleString(),
    id: 2,
  });
  res.render('index', { posts: posts });
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
