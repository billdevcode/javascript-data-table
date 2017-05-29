var sortedData = [];
var cacheData = {};

const resetForm = () => {
  const form = document.getElementsByClassName('search-form')[0];
  form.reset();
}

const sortDataAsc = (key, data) => {
  if (cacheData[key] && cacheData[key].asc) {
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

const initPage1Button = () => {
  let allPageButtons = document.getElementsByClassName('table-controls-pages');
  const allPageButtonsLength = allPageButtons.length;
  for (let i = 0; i < allPageButtonsLength; i++) {
    allPageButtons[i].classList.remove('table-controls-pages--active');
  }
  let page1Button = document.getElementsByClassName('page-1')[0];
  page1Button.classList.add('table-controls-pages--active');
}

const hidePreviousAndNextButtons = (pageNumber, buttonsLength) => {
  let previousButton = document.getElementsByClassName('table-controls-previous')[0];
  let nextButton = document.getElementsByClassName('table-controls-next')[0];

  if (pageNumber === '1') {
    previousButton.style.visibility = 'hidden';
  } else {
    previousButton.style.visibility = 'visible';
  }

  if (pageNumber === buttonsLength.toString()) {
    nextButton.style.visibility = 'hidden';
  } else {
    nextButton.style.visibility = 'visible';
  }
}
