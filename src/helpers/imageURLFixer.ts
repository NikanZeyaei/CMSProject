export const imageURLFixer = (url: string) => {
  if (!url) {
    return 'posts/uploads/undefined-notfound.png';
  } else {
    const splitted = url?.split('/');
    let result = '';
    for (let index = 1; index < splitted.length; ++index) {
      result += splitted[index] + '/';
    }
    return result.substring(0, result.length - 1);
  }
};
