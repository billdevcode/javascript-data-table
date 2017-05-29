(() => {
  const body = document.body;
  const fragment = document.createDocumentFragment();
  let div, span, form, input, label;

  const createDashboard = () => {
    div = document.getElementsByClassName('menu-dashboard')[0];
    form = document.createElement('form');
    form.classList.add('search-form');
    form.onsubmit = (ev) => {
      ev.preventDefault();
    }
    div.appendChild(form);

    input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search';
    input.onkeyup = (ev) => {
      filterTable(ev);
    };
    input.classList.add('search-box');
    form.appendChild(input);

    fragment.appendChild(div);
    body.appendChild(fragment);
  }

  const toggleDataColumns = (ev, key) => {
    ev.stopPropagation();
    let checkBox = ev.currentTarget;
    let columnDatas = document.getElementsByClassName(`${key}-data`);
    let columnHeading = document.getElementsByClassName(`${key}-heading`)[0];

    if (checkBox.classList.contains(`data-toggle--hidden`)) {
      columnHeading.style.display = '';
      for (let i = 0; i < columnDatas.length; i++) {
        columnDatas[i].style.display = '';
      }
      checkBox.classList.remove(`data-toggle--hidden`);
      checkBox.classList.add(`data-toggle--visible`);
    } else {
      columnHeading.style.display = 'none';
      for (let i = 0; i < columnDatas.length; i++) {
        columnDatas[i].style.display = 'none';
      }
      checkBox.classList.remove(`data-toggle--visible`);
      checkBox.classList.add(`data-toggle--hidden`);
    }
  }

  window.toggleDataColumns = toggleDataColumns;

  const filterTable = (ev) => {

    let form, input, filter, table, tr, td, i;
    form = document.getElementsByClassName('search-form')[0];
    input = document.getElementsByClassName('search-box')[0];
    filter = input.value.toUpperCase();
    tr = document.getElementsByClassName('table-row-data');

    for (let i = 0; i < tr.length; i++) {
      td = tr[i].childNodes;
      for (let j = 0; j < td.length; j++) {
        if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
          td[j].parentNode.style.display = '';
          break;
        } else {
          td[j].parentNode.style.display = 'none';
        }
      }
    }
    if (ev.keyCode == 27) {
      form.reset();
      for (let i = 0; i < tr.length; i++) {
        tr[i].style.display = '';
      }
    }
  }

  createDashboard();

})();
