const isEmpty = (text) => {
  if (text === undefined) {
    return true;
  }
  if (text.trim() === null) {
    return true;
  }
  if (text.trim() === '') {
    return true;
  }
  if (text === 0) {
    return true;
  }
  return false;
};

export default isEmpty;
