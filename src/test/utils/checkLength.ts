export const checkLength = (isExact: boolean, length: number): boolean => {
  if (isExact === true && length === 7) {
    return true;
  }

  if (isExact === false && length >= 2 && length <= 7) {
    return true;
  }

  return false;
};
