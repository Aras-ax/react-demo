function formatNum(num) {
  if (num < 1000) {
    return num;
  }

  return (num / 1000).toFixed(1) + "K";
}

function formatDate(date) {}

export { formatNum, formatDate };
