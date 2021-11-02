export const findAllPosts = 'SELECT * FROM posts;';

export const findPostById = 'SELECT * FROM posts where id = ?;';

export const updatePostById =
  'update posts set title = ?,description = ?,content = ? , updated_at = ? where id = ?;';

export const deletePostById = 'delete from posts where id = ?;';

export const insertNewPost =
  'insert into posts(title, description, content,image_url, created_at,updated_at) VALUES (?,?,?,?,?,?)';

export const getAllTags =
  'select p.id ,t.title from posts AS p inner join tags_posts AS tp on p.id = tp.post_id inner join tags AS t on t.id = tp.tag_id;';
