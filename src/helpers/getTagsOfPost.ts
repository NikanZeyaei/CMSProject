import { pool } from '../models/pool';
import { getAllTags } from '../models/queries';
import { tag, post } from '../types/types';
/**
 *
 * returns all tag of a certain post
 *
 * @param  {number} id
 */
export const getTagsOfPost = async (id: number): Promise<string[] | null> => {
  const poolResult = await pool.promise().query(getAllTags);
  const queryResult = poolResult[0] as tag[];
  if (queryResult) {
    const tags: string[] = [];
    queryResult.forEach((tag) => {
      if (tag.id === id) {
        tags.push(tag.title);
      }
    });
    return tags;
  } else {
    return null;
  }
};

/*
TODO Make this look better
*/

export const getTagsOfAllPosts = async (
  posts: post[],
): Promise<(string[] | null)[]> => {
  let allTags: [string[] | null] = [[]];
  for (const post of posts) {
    allTags.push(await getTagsOfPost(post.id));
  }
  const finalTags = [];
  for (let index = 1; index < allTags.length; ++index) {
    finalTags.push(allTags[index]);
  }
  return finalTags;
};

export const embedTagsToPosts = (
  posts: post[],
  tags: (string[] | null)[],
): post[] => {
  let index = 0;
  const finalPosts = posts.map((post) => {
    post.tags = tags[index++];
    return post;
  });
  return finalPosts;
};
