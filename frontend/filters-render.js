
function createBlockFilters() {
  const div = document.createElement('div');
  div.classList.add('wrap-inputs', 'wrap-inputs--filter');
  return div;
}

function createFilterItems(spanText, inputType, valueFilterBy, arrStudents) {
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
    filterStudents(arrStudents)
  });

  label.append(span);
  label.append(input);

  return label;
}

function renderBlockFilters(arrStudents) {
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
      valueFilterBy: 'studyStart',
    },
  ]

  container.append(blockFilters);

  for (const features of featuresFiltersElems) {
    const filter = renderFilter(features, arrStudents);
    blockFilters.append(filter);
  }
} //renderBlockFilters

function renderFilter(features, arrStudents) {
  const filter = createFilterItems(features.spanText, features.inputType, features.valueFilterBy, arrStudents);
  return filter;
}






