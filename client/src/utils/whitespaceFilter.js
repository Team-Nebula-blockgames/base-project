const whitespaceFilter = (list) => {
  var array = [];

  for (let i = 0; i < list.length; i++) {
    if (Array.isArray(list[i])) {
      for (let j = 0; j < list[i].length; j++) {
        var temp = list[i][j].trim();
        if (temp.substring(0, 2) === "0x") array.push(temp);
      }
      continue;
    }
    var temp2 = list[i].trim();
    if (temp2.substring(0, 2) === "0x") array.push(temp2);
  }
  if (array.length > 200) array = array.splice(0, 200);
  return array;
};

export default whitespaceFilter;
