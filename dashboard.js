(() => {
  const body = document.body;
  const fragment = document.createDocumentFragment();
  let div, form, input, label;

  const createDashboard = () => {
    div = document.createElement('div');
    div.classList.add('menu-dashboard');

    form = document.createElement('form');
    div.appendChild(form);

    input = document.createElement('input');
    input.type = 'text';
    input.classList.add('search-box');
    form.appendChild(input);

    input = document.createElement('input');
    input.type = 'submit';
    input.value = 'Search';
    input.classList.add('submit-button');
    form.appendChild(input);

    fragment.appendChild(div);
    body.appendChild(fragment);
  }

  createDashboard();

})();
