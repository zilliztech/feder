export const project = () => {};

export const uint8toChars = (data) => {
  return String.fromCharCode(...data);
};

export const generateArray = (num) => {
  return Array.from(new Array(num).keys());
};
