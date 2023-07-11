export const formatError = (data) => {
  let str = data.toString();
  const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
  if (capitalizedStr.endsWith('.')) {
    str = capitalizedStr.slice(0, -1);
  }
  return str;
};
