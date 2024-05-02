export const code = (value: string, anchor?: string) => {
  const codeTag = `<code>${value}</code>`;
  if (anchor) {
    return `<a href="${anchor}">${codeTag}</a>`;
  }
  return codeTag;
};
