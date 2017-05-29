(() => {

  const body = document.body;
  const fragment = document.createDocumentFragment();
  const tableHeadings = [
    {
      key: 'firstName',
      title: 'First Name'
    },
    {
      key: 'lastName',
      title: 'Last Name'
    },
    {
      key: 'age',
      title: 'Age'
    },
    {
      key: 'position',
      title: 'Position'
    },
    {
      key: 'office',
      title: 'Office'
    },
    {
      key: 'phone',
      title: 'Phone'
    }
  ];
  const paginationRow = 10;
  const paginationList = {};
  let table, tr, th, td, input, div, span, btn;

  const createTableHeadings = (keyForSort=null, sortClassName=null) => {
    tr = document.createElement('tr');
    tr.classList.add('table-row-headings');
    const tableHeadingsLength = tableHeadings.length;
    for (let i = 0; i < tableHeadingsLength; i++) {
      th = document.createElement('th');
      th.appendChild(document.createTextNode(tableHeadings[i].title));
      th.classList.add(`${tableHeadings[i].key}-heading`);
      th.style.backgroundImage = 'url("./assets/sort.png")';
      th.style.backgroundRepeat = 'no-repeat';
      th.style.backgroundPosition = 'right';
      th.onclick = (ev, key) => {
        clickToSortData(ev, tableHeadings[i].key);
      };
      if (keyForSort === tableHeadings[i].key && sortClassName) {
        th.classList.add(sortClassName);
      }
      inputs = document.getElementsByClassName('data-toggle');
      const inputsLength = inputs.length;
      for (let i = 0; i < inputsLength; i++) {
        inputs[i].checked = true;
        inputs[i].onclick = (ev, key) => {
          window.toggleDataColumns(ev, tableHeadings[i].key);
        };
      }
      tr.appendChild(th);
    }
    table.appendChild(tr)
  }

  const onBlurData = (ev) => {
    const tableCell = ev.currentTarget;
    const tableCellData = ev.currentTarget.innerHTML;
    const tableRow = tableCell.parentNode.classList.value;
    const splitClassNames = tableRow.split(' ');
    const cellKey = tableCell.classList.value.split(' ')[1].split('-')[0]
    const rowKey = splitClassNames[1].split('-')[1];
    const rowNum = splitClassNames[2].split('-')[1];

    if (tableCellData !== paginationList[rowKey][rowNum-1][cellKey]) {
      paginationList[rowKey][rowNum-1][cellKey] = tableCellData;
    }
  }

  const clearTableData = () => {
    const table = document.getElementsByClassName("data-table");
    table[0].innerHTML = '';
  }

  const clickToSortData = (ev, key) => {
    resetForm();
    const heading = ev.currentTarget;
    clearTableData();
    if (heading.classList.contains('ascending')) {
      createTableHeadings(key, 'descending');
      buildTable(sortDataDesc(key, jsonSampleData));
    } else {
      createTableHeadings(key, 'ascending');
      buildTable(sortDataAsc(key, jsonSampleData));
    }
    initPage1Button();
  }

  const createPaginationList = (data) => {
    let count = 1;
    const dataLength = data.length;
    for (let i = 0; i < dataLength; i+paginationRow) {
      paginationList[count] = data.slice(i, i+=paginationRow);
      count++;
    }
    return paginationList;
  }

  const createPaginatedTable = (data, paginatedListKey=1) => {
    const paginatedList = data[paginatedListKey];
    const paginatedListLength = paginatedList.length;
    let count = 1;
    for (let i = 0; i < paginatedListLength; i++) {
      tr = document.createElement('tr');
      tr.classList.add('table-row-data', `key-${paginatedListKey}`, `row-${i+1}`);
      for (let key in paginatedList[i]) {
        td = document.createElement('td');
        td.classList.add('data-cell', `${key}-data`);
        td.appendChild(document.createTextNode(paginatedList[i][key]));
        td.contentEditable="true";
        td.onblur = (ev) => {
          onBlurData(ev);
        }
        tr.appendChild(td);
      }
      table.appendChild(tr)
    }
  }

  const buildTable = (dataCollection) => {
    const dataCollectionLength = dataCollection.length;
    const paginatedList = createPaginationList(dataCollection);
    createPaginatedTable(paginatedList);
  }

  const buildTableControls = (tableLength) => {
    let tableControls = document.getElementsByClassName('table-controls-bar')[0];
    if (tableControls !== undefined) {
      tableControls.innerHTML = '';
      div = tableControls;
    } else {
      div = document.createElement('div');
      div.classList.add('table-controls-bar');
    }

    span = document.createElement('span');
    span.classList.add('table-controls-left');
    btn = document.createElement('button');
    btn.classList.add('table-controls', 'table-controls-previous');
    btn.appendChild(document.createTextNode('Previous Page'));
    btn.onclick = (ev) => {
      goToPreviousPage(ev);
    }
    span.appendChild(btn);
    div.appendChild(span);

    span = document.createElement('span');
    let count = 1, pageNum;
    for (let i = 0; i < tableLength; i+paginationRow) {
      btn = document.createElement('button');
      btn.classList.add('table-controls-pages', `page-${count}`);
      btn.appendChild(document.createTextNode(count));
      btn.onclick = (ev) => {
        goToPage(ev);
      }
      span.appendChild(btn);
      i+=paginationRow;
      count++;
    }
    div.appendChild(span);

    span = document.createElement('span');
    span.classList.add('table-controls-right');
    btn = document.createElement('button');
    btn.classList.add('table-controls', 'table-controls-next');
    btn.appendChild(document.createTextNode('Next Page'));
    btn.onclick = (ev) => {
      goToNextPage(ev);
    }
    span.appendChild(btn);

    div.appendChild(span);
    body.appendChild(div);
    let firstPageButton = document.getElementsByClassName('page-1')[0];
    firstPageButton.classList.add('table-controls-pages--active');
    let previousButton = document.getElementsByClassName('table-controls-previous')[0];
    previousButton.style.visibility = 'hidden';
    if (tableLength <= paginationRow) {
      let nextButton = document.getElementsByClassName('table-controls-next')[0];
      nextButton.style.visibility = 'hidden';
    }
  }

  const goToPage = (ev) => {
    let pageButton = ev.currentTarget;
    let pageNumber = pageButton.innerHTML;
    let allPageButtons = document.getElementsByClassName('table-controls-pages');
    resetForm();

    if (!pageButton.classList.contains('table-controls-pages--active')) {
      const allPageButtonsLength = allPageButtons.length;
      for (let i = 0; i < allPageButtonsLength; i++) {
        allPageButtons[i].classList.remove('table-controls-pages--active');
      }
      hidePreviousAndNextButtons(pageNumber, allPageButtonsLength);
      pageButton.classList.add('table-controls-pages--active');
      clearTableData();
      createTableHeadings();
      createPaginatedTable(paginationList, pageNumber);
    }
  }

  const goToPreviousPage = (ev) => {
    resetForm();
    let activePage = document.getElementsByClassName('table-controls-pages--active')[0].innerHTML;
    let previousPage = document.getElementsByClassName(`page-${activePage-1}`)[0];
    previousPage.click();
  }

  const goToNextPage = (ev) => {
    resetForm();
    let activePage = document.getElementsByClassName('table-controls-pages--active')[0].innerHTML;
    activePage = parseInt(activePage);
    let nextPage = document.getElementsByClassName(`page-${activePage+1}`)[0];
    nextPage.click();
  }

  table = document.createElement('table');
  table.classList.add('data-table');
  createTableHeadings();
  buildTable(jsonSampleData);
  fragment.appendChild(table);
  body.appendChild(fragment);
  buildTableControls(jsonSampleData.length);
})();
