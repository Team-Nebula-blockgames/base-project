function formatBalance(bal) {
  if (String(bal).includes(".")) {
    bal = `${String(bal).split(".")[0]}.${String(bal)
      .split(".")[1]
      .slice(0, 4)}`;
  }
  return bal;
}

export default formatBalance;
