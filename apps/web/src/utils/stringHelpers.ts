export const getCharacterByIndex = (index: number, upper: boolean = true) => {
  return String.fromCharCode("A".charCodeAt(0) + index);
};
