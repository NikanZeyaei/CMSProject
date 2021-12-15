import { Request, Response } from 'express';
import postModel from '../models/post';

const ITEMS_PER_PAGE = 2;

export const getSearch = async (req: Request, res: Response) => {
	const page = req.query.page || 1;
	if (req.query.tag) {
		const { tag } = req.query;
		const totalPosts = await postModel.find({ tags: tag }).count();
		const posts = await postModel
			.find({ tags: tag })
			.skip((+page - 1) * ITEMS_PER_PAGE)
			.limit(ITEMS_PER_PAGE)
			.sort([['created_at', -1]]);
		res.render('showByTag', {
			posts: posts,
			currentPage: +page,
			hasNextPage: ITEMS_PER_PAGE * +page < totalPosts,
			hasPreviousPage: +page > 1,
			nextPage: +page + 1,
			previousPage: +page - 1,
			lastPage: Math.ceil(totalPosts / ITEMS_PER_PAGE),
		});
	} else if (req.query.title) {
		const { title } = req.query;
		const totalPosts = await postModel
			.find({ $text: { $search: `${title}` } })
			.count();
		const posts = await postModel
			.find({ $text: { $search: `${title}` } })
			.skip((+page - 1) * ITEMS_PER_PAGE)
			.limit(ITEMS_PER_PAGE)
			.sort([['created_at', -1]]);
		res.render('showByTag', {
			posts: posts,
			currentPage: +page,
			hasNextPage: ITEMS_PER_PAGE * +page < totalPosts,
			hasPreviousPage: +page > 1,
			nextPage: +page + 1,
			previousPage: +page - 1,
			lastPage: Math.ceil(totalPosts / ITEMS_PER_PAGE),
		});
	} else {
		res.render('search');
	}
};
