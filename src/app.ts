import express from 'express';
import session from 'express-session';
import postsRouter from './routes/posts';
import path from 'path';
import methodOverride from 'method-override';

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

app.use(postsRouter);

app.listen(3000, () => {
  console.log('Running on port 3000');
});
