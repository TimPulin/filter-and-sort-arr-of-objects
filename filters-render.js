
function createBlockFilters() {
  const div = document.createElement('div');
  div.classList.add('wrap-inputs', 'wrap-inputs--filter');
  return div;
}

function createFilterItems(spanText, inputType, valueFilterBy) {
  const label = document.createElement('label');
  const span = document.createElement('span');
  const input = document.createElement('input');

  label.classList.add('filter__label')
  span.classList.add('filter__span')
  span.textContent = `сортировка по ${spanText}`;
  input.classList.add('form-control', 'form-control-sm', 'filter__input');
  input.type = inputType;
  input.setAttribute('data-filter-by', valueFilterBy);
  input.addEventListener('input', () => {


    filterStudents(input)
  });

  label.append(span);
  label.append(input);

  return label;
}

document.addEventListener('DOMContentLoaded', () => {
  renderBlockFilters();
});

function renderBlockFilters() {
  const container = document.getElementById('studentTableApp');
  const blockFilters = createBlockFilters();
  const featuresFiltersElems = [
    {
      spanText: 'фио',
      inputType: 'text',
      valueFilterBy: 'fio',
    },
    {
      spanText: 'факультету',
      inputType: 'text',
      valueFilterBy: 'faculty',
    },
    {
      spanText: 'дате рождения',
      inputType: 'number',
      valueFilterBy: 'birthday',
    },
    {
      spanText: 'годам обучения',
      inputType: 'number',
      valueFilterBy: 'startEducation',
    },
  ]

  container.append(blockFilters);

  for (const features of featuresFiltersElems) {
    const filter = renderFilter(features, blockFilters);
    blockFilters.append(filter);
  }
} //renderBlockFilters

function renderFilter(features) {
  const filter = createFilterItems(features.spanText, features.inputType, features.valueFilterBy);
  return filter;
}






