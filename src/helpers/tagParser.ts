export const tagParser = (text: string) => {
  return text
    .split(',')
    .filter((tag) => tag)
    .map((tag) => tag.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ''));
};
