import express from 'express';
import postsRouter from './routes/posts';
import path from 'path';
import methodOverride from 'method-override';
import { nanoid } from 'nanoid';
import { post } from './types/post';

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));

app.use(postsRouter);

app.listen(3000, () => {
  console.log('Running on port 3000');
});
