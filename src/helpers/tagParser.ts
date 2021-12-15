export const tagParser = (tags: string) => {
	return tags
		.split(',')
		.filter((tag) => tag)
		.map((tag) => tag.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ''));
};
