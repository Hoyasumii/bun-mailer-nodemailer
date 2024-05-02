export const paragraphList = (...contents: Array<string>): string => {
  return contents.map(content => `<p>${content}</p>`).join("");
};
