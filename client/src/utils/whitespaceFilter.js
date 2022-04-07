const whitespaceFilter = (list) => {
  var array = [];

  for (let i = 0; i < list.length; i++) {
    if (Array.isArray(list[i])) {
      for (let j = 0; j < list[i].length; j++) {
        if (list[i][j].substring(0, 2) === "0x") array.push(list[i][j].trim());
      }
      continue;
    }
    if (list[i].substring(0, 2) === "0x") array.push(list[i].trim());
  }
  return array;
};

export default whitespaceFilter;
