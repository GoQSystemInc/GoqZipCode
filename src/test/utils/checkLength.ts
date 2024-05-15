export const checkLength = (isExact: boolean, length: number): boolean => {
  if (isExact === true && length !== 7) {
    return false;
  }

  if (isExact === false && length <= 1) {
    return false;
  }

  return true;
};
