export const tagParser = (text: string) => {
  return text
    .replace(/ /g, '')
    .split(',')
    .filter((tag) => tag)
    .map((tag) => tag.toLowerCase());
};
