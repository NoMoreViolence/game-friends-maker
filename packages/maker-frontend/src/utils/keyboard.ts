export const isEnterTyped = (e: React.KeyboardEvent<HTMLInputElement>): boolean => {
  if (e.keyCode === 13) {
    return true;
  }
  return false;
};
