import express from 'express';
import session from 'express-session';
import path from 'path';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import indexRouter from './routes/index';
import panelRouter from './routes/panel';
import postsRouter from './routes/posts';

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

app.use(indexRouter);
app.use('/panel', panelRouter);
app.use('/posts', postsRouter);

const main = async () => {
  await mongoose.connect(process.env.mongodb_host!);
  app.listen(3000, () => {
    console.log('Running on port 3000');
  });
};

main();
