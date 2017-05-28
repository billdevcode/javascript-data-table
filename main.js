var sortedData = [];
var cacheData = {};

const sortDataAsc = (key, data) => {
  if (cacheData[key] && cacheData[key].asc) {
    console.log(cacheData)
    sortedData = cacheData[key].asc;
  } else {
    sortedData = data.concat().sort( (a,b) => {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }
      return 0;
    });
    cacheData[key] = { asc: [].concat(sortedData) };
  }
  return sortedData;
}

const sortDataDesc = (key, data) => {
  if (cacheData[key] && cacheData[key].desc) {
    console.log(cacheData)
    sortedData = cacheData[key].desc;
  } else {
    sortedData = data.concat().sort( (a,b) => {
      if (a[key] < b[key]) {
        return 1;
      }
      if (a[key] > b[key]) {
        return -1;
      }
      return 0;
    });
    cacheData[key] = { desc: [].concat(sortedData) };
  }
  return sortedData;
}
