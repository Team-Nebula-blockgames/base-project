const whitespaceFilter = (list) => {
  var array = [];
  for (let i = 0; i < list.length; i++) {
    array.push(list[i].trim());
  }
  return array;
};

export default whitespaceFilter;
