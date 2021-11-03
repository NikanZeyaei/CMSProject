import express from 'express';
import session from 'express-session';
import path from 'path';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import { randomString } from './helpers/randomString';
import indexRouter from './routes/index';
import panelRouter from './routes/panel';
import postsRouter from './routes/posts';
import tagsRouter from './routes/tags';
import searchRouter from './routes/search';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.session_secret!,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  }),
);
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/posts', express.static(path.join(__dirname, 'posts')));
const fileStorage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, 'public/posts/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${file.filename}-${file.originalname}`);
  },
});
app.use(multer({ storage: fileStorage }).single('image'));

app.use(indexRouter);
app.use('/panel', panelRouter);
app.use('/posts', postsRouter);
app.use('/tags', tagsRouter);
app.use('/search', searchRouter);

const main = async () => {
  await mongoose.connect(process.env.mongodb_host!);
  app.listen(3000, () => {
    console.log('Running on port 3000');
  });
};

main();
