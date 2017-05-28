(() => {
  const body = document.body;
  const fragment = document.createDocumentFragment();
  let table, tr, th, td;

  const createTableFromData = () => {
    for (let i = 0; i < jsonSampleData.length; i++) {
      tr = document.createElement('tr');
      tr.classList.add("table-row-data");
      table.appendChild(tr)
      for (let key in jsonSampleData[i]) {
        td = document.createElement('td');
        td.appendChild(document.createTextNode(jsonSampleData[i][key]));
        tr.appendChild(td);
      }
    }
  }

  const createTableHeadings = () => {
    const tableHeadings = [
      'First Name',
      'Last Name',
      'Age',
      'Position',
      'Office',
      'Phone'
    ];

    tr = document.createElement('tr');
    tr.classList.add("table-row-headings");

    for (let i = 0; i < tableHeadings.length; i++) {
      th = document.createElement('th');
      th.appendChild(document.createTextNode(tableHeadings[i]));
      tr.appendChild(th);
    }
    table.appendChild(tr)
  }

  table = document.createElement('table');
  table.classList.add("data-table");
  createTableHeadings();
  createTableFromData();
  fragment.appendChild(table);
  body.appendChild(fragment);
})();
