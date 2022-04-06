const whitespaceFilter = (list) => {
  var array = [];

  for (let i = 0; i < list.length; i++) {
    if (Array.isArray(list[i])) {
      for (let j = 0; j < list[i].length; j++) {
        array.push(list[i][j].trim());
      }
      continue;
    }
    array.push(list[i].trim());
  }
  return array;
};

export default whitespaceFilter;
