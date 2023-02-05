
function createFormNewStudent() {
  const wrapForm = document.createElement('div');
  const wrapInputs = document.createElement('div');
  const wrapMessagesErrorForm = document.createElement('div');

  const form = document.createElement('form');
  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  const btn = document.createElement('button');

  wrapForm.classList.add('wrap-form');
  wrapInputs.classList.add('wrap-inputs');
  wrapMessagesErrorForm.classList.add('wrap-messages-error');
  form.classList.add('form', 'form--new-student');
  legend.textContent = 'Новый студент';
  btn.classList.add('btn', 'btn-primary', 'btn-form--new-student');
  btn.textContent = 'Добавить студента';

  wrapForm.append(form);
  form.append(fieldset);
  fieldset.append(legend);
  fieldset.append(wrapInputs);
  fieldset.append(wrapMessagesErrorForm);
  fieldset.append(btn);

  return {
    wrapForm,
    wrapInputs,
    wrapMessagesErrorForm,
    form,
    btn,
  }
}

function createItemsFormNewStudent(inputType, inputName, text) {
  const label = document.createElement('label');
  const span = document.createElement('span');
  const input = document.createElement('input');

  input.classList.add('form-control', 'form-control-sm', `form__input--${inputName}`);
  input.type = inputType;
  input.placeholder = text;
  input.name = inputName;
  span.textContent = text;
  label.append(span);
  label.append(input);

  return {
    label,
    span,
    input,
  }
}

function createMessageErrorForm(textError) {
  const message = document.createElement('p');
  message.classList.add('wrap-messages-error__text');
  message.textContent = textError;
  return message;
}

function renderFormNewStudent(arrStudents) {
  const container = document.getElementById('studentTableApp');
  const formNewStudent = createFormNewStudent();
  const wrapInputs = formNewStudent.wrapInputs;

  const featuresForm = [
    {
      inputType: 'text',
      inputName: 'surname',
      text: 'Фамилия',
    },
    {
      inputType: 'text',
      inputName: 'name',
      text: 'Имя',
    },
    {
      inputType: 'text',
      inputName: 'lastname',
      text: 'Отчество',
    },
    {
      inputType: 'date',
      inputName: 'birthday',
      text: 'Дата рождения',
    },
    {
      inputType: 'number',
      inputName: 'studyStart',
      text: 'Год начала обучения',
    },
    {
      inputType: 'text',
      inputName: 'faculty',
      text: 'Факультет',
    },
  ]

  formNewStudent.form.addEventListener('submit', function(e) {
    e.preventDefault();
    createObjNewStudentFromForm(formNewStudent);
  })

  container.append(formNewStudent.wrapForm);

  for (const obj of featuresForm) {
    renderItemsFormNewStudent(obj.inputType, obj.inputName, obj.text);
  }

  function renderItemsFormNewStudent(inputType, inputName, text) {
    const items = createItemsFormNewStudent(inputType, inputName, text);
    const label = items.label;

    wrapInputs.append(label);
  }
} //renderFormNewStudent


