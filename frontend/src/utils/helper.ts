export const parseAuthor = (authors: string[]) => {
  if (authors.length === 0) {
    return 'Author tidak diketahui';
  }

  const count = 3;

  if (authors.length > count) {
    return `${authors.slice(0, count).join(', ')} dan ${
      authors.length - count
    } lainnya`;
  }
  return authors.join(', ');
};
