export const getCapitalLetter = (string) => {
  const removedChar = string.replace("/", "");
  return removedChar.charAt(0).toUpperCase() + removedChar.slice(1);
};

export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

export const toAllCapitals = (string) => string.toUpperCase();

export const getPageTitle = (string) => {
  const split = string.split("/");
  const lastItem = split[split.length - 1];
  return getCapitalLetter(lastItem.replace("-", " "));
};
