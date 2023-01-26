export const shortify = (text: string, maxLength = 60) => {
  return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
};
