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
  let table, tr, th, td, input;

  const createTableHeadings = (keyForSort=null, sortClassName=null) => {
    tr = document.createElement('tr');
    tr.classList.add('table-row-headings');

    for (let i = 0; i < tableHeadings.length; i++) {
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

      for (let i = 0; i < inputs.length; i++) {
        inputs[i].checked = true;
        inputs[i].onclick = (ev, key) => {
          window.toggleDataColumns(ev, tableHeadings[i].key);
        };
      }
      tr.appendChild(th);
    }
    table.appendChild(tr)
  }

  const createTableFromData = (data) => {
    for (let i = 0; i < data.length; i++) {
      tr = document.createElement('tr');
      tr.classList.add('table-row-data');
      for (let key in data[i]) {
        td = document.createElement('td');
        td.classList.add(`${key}-data`);
        td.classList.add('data-cell');
        td.appendChild(document.createTextNode(data[i][key]));
        tr.appendChild(td);
      }
      table.appendChild(tr)
    }
  }

  const clearTableData = () => {
    const table = document.getElementsByClassName("data-table");
    table[0].innerHTML = '';
  }

  const clickToSortData = (ev, key) => {
    const heading = ev.currentTarget;
    clearTableData();
    if (heading.classList.contains('ascending')) {
      createTableHeadings(key, 'descending');
      createTableFromData(sortDataDesc(key, jsonSampleData));
    } else {
      createTableHeadings(key, 'ascending');
      createTableFromData(sortDataAsc(key, jsonSampleData));
    }
  }

  table = document.createElement('table');
  table.classList.add('data-table');
  createTableHeadings();
  createTableFromData(jsonSampleData);
  fragment.appendChild(table);
  body.appendChild(fragment);
})();
